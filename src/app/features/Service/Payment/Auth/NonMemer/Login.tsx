import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { ROUTES } from 'app/core/router';
import { fetchPaymentSingleDoneAction, resetPaymentListAction, setNonMemberLoginForgetCurrentStepAction } from 'app/store/service/payment/actions';
import { ForgetStepCodesEnum } from 'app/features/Service/Payment/Auth/types';
import commonService from 'app/core/services/commonService';
import validationService from 'app/core/services/validationService';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import Text00Field from 'app/common/compoments/Field/Text00Field';
import { IProps, LoginFormValues } from './types';
import apiService from 'app/bff/services/apiService';
import { PaymentSingleReq } from 'app/bff/models/service/paymentSingle';

const Login: React.FC<IProps> = (props) => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();

  // 表單初始值
  const initialValues: LoginFormValues = {
    id: '',
    applyNo: ''
  };

  // Formik Config
  const formik = useFormik<LoginFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape({
      id: Yup.string().required('此為必填欄位').test({
        name: 'idValidationSchema',
        test: function (value) {
          const error = { message: '' };
          // 身份證字號/統一編號檢核
          if (value && !value.match(validationService.personalOrTaxIdRegExp)) {
            error.message = '資料格式錯誤';
          }
          return error.message ? this.createError({ message: error.message }) : true;
        }
      }),
      applyNo: Yup.string().required('此為必填欄位')
    }),
    onSubmit: async (values: LoginFormValues) => {
      reduxDispatch(resetPaymentListAction());
      const { id, applyNo } = values;
      const args: PaymentSingleReq = {
        id,
        applyNo
      };
      const response = await apiService.postServicePaymentSingle(args);
      if (response) {
        reduxDispatch(fetchPaymentSingleDoneAction(response));
        routerHistory.push({ pathname: ROUTES.SERVICE__PAYMENT__LIST, state: { id, applyNo } });
      }
    }
  });

  /**
   * @description 頁面初始
   */
  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 跳轉至受理編號查詢頁
   */
  const handleRedirectToForgetProcess = () => {
    reduxDispatch(setNonMemberLoginForgetCurrentStepAction(ForgetStepCodesEnum.Inquiry));
  };

  return (
    <div className="form-layout-outer-00">
      <div className="form-layout-outer-00__descrp">
        {props.desc ?? ''}
      </div>
      <div className="form-layout-outer-00__content">
        <FormikProvider value={formik}>
          <FormikForm>
            <div className="form-layout-00">
              <div className="form-layout-00__title">非會員及公司戶登入</div>
              <div className="form-layout-00__body">
                {/* 被保險人身份證字號 / 統一編號 */}
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">被保險人身份證字號 / 統一編號</div>
                  <div className="form-layout-00__row form-layout-00__row--align-start">
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.id && formik.touched.id ? ' form-layout-00__cell--error' : '')}>
                      <Text00Field name="id" placeholder="請輸入" maxLength={10} />
                      <ErrorMessage name="id" render={(errMsg) => (
                        <div className="dialog-form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                  </div>
                </div>
                {/* 受理編號 */}
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">受理編號</div>
                  <div className="form-layout-00__row form-layout-00__row--align-start">
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.applyNo && formik.touched.applyNo ? ' form-layout-00__cell--error' : '')}>
                      <Text00Field name="applyNo" placeholder="請輸入" />
                      <ErrorMessage name="applyNo" render={(errMsg) => (
                        <div className="dialog-form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout__btn-wrapper--column">
              <button type="submit" className="inside-page-01-layout__btn btn-primary">
                登入
              </button>
              <button type="button" className="inside-page-01-layout__btn btn-text" onClick={handleRedirectToForgetProcess}>
                忘記受理編號？
              </button>
            </div>
          </FormikForm>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Login;
