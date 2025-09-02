import React, { useEffect } from 'react';
import { AuthFormValues } from './types';
import { ErrorMessage, Field, FormikProvider, useFormik } from 'formik';
import commonService from 'app/core/services/commonService';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import { useDispatch } from 'react-redux';
import { fetchApplyNoAction, fetchPolicySingleDoneAction, resetPolicySingleAction, setNonMemberLoginForgetCurrentStepAction } from 'app/store/service/queryPolicy/actions';
import { ForgetStepCodesEnum } from '../../../types';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import { ROUTES } from 'app/core/router';
import { VerifyApplyNoReq } from 'app/bff/models/verifyApplyNo';
import apiService from 'app/bff/services/apiService';
import { PolicySingleReq } from 'app/bff/models/service/policySingle';

const Auth: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const forgetState = useSelector((state: RootState) => state.service.queryPolicy.authentication.nonMember.login.forget);

  // 表單初始值
  const initialValues: AuthFormValues = {
    applyNo: ''
  };

  // Formik Config
  const formik = useFormik<AuthFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape({
      applyNo: Yup.string().required('此為必填欄位')
    }),
    onSubmit: async (values: AuthFormValues) => {
      const { insuredId } = forgetState;
      const { applyNo } = values;
      if (!insuredId || !applyNo) return;
      // 清除保單 (非會員-忘記受理編號)
      reduxDispatch(resetPolicySingleAction());
      // 查詢保單 (非會員-忘記受理編號)
      const args: PolicySingleReq = {
        id: insuredId,
        applyNo
      };
      const response = await apiService.postServicePolicySingle(args);
      if (response) {
        reduxDispatch(fetchPolicySingleDoneAction(response));
        routerHistory.push({ pathname: ROUTES.SERVICE__QUERY_POLICY__LIST, state: { id: insuredId, applyNo } });
      }
    }
  });

  /**
   * @description 組件初始化後執行的 Effect
   */
  useEffect(() => {
    commonService.windowScrollToTop();
    return () => {
      if (routerHistory.location.pathname.includes(ROUTES.SERVICE__QUERY_POLICY__LIST)) {
        reduxDispatch(setNonMemberLoginForgetCurrentStepAction(null));
      }
    };
  }, []);

  /**
   * @description 重新發送受理編號
   */
  const handleResend = () => {
    const { insuredId, vehicleLicense } = forgetState;
    if (!insuredId || !vehicleLicense) return;
    const args: VerifyApplyNoReq = {
      service: 'policy',
      insuredId,
      carLicense: vehicleLicense
    };
    reduxDispatch(fetchApplyNoAction(args));
  };

  /**
   * @description 處理「上一步」執行的事件
   */
  const handlePrevStep = () => {
    reduxDispatch(setNonMemberLoginForgetCurrentStepAction(ForgetStepCodesEnum.Inquiry));
  };

  return (
    <div className="form-layout-outer-00">
      <div className="form-layout-outer-00__descrp" />
      <div className="form-layout-outer-00__content">
        <FormikProvider value={formik}>
          <FormikForm>
            <div className="form-layout-00">
              <div className="form-layout-00__title">非會員及公司戶登入</div>
              <div className="form-layout-00__body">
                {/* 受理編號 */}
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">受理編號</div>
                  <div className="form-layout-00__row form-layout-00__row--align-start">
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.applyNo && formik.touched.applyNo ? ' form-layout-00__cell--error' : '')}>
                      <div className="input-00">
                        <Field type="text" name="applyNo" />
                      </div>
                      <ErrorMessage name="applyNo" className="form-layout-00__error-tag error-tag" component="div" />
                    </div>
                    <button type="button" className="form-layout-00__verification-link verification-link-00" onClick={handleResend}>重新發送受理編號</button>
                  </div>
                  <div className="form-layout-00__hint-tag hint-tag">受理編號已發送至您的電子郵件信箱，請輸入受理編號以登入。</div>
                  <div className="form-layout-00__hint-tag hint-tag hint-tag--demo">{forgetState.demoTip}</div>
                </div>
              </div>
            </div>
            <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
              <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevStep}>
                返回上一步
              </button>
              <button type="submit" className="inside-page-01-layout__btn btn-primary">
                登入
              </button>
            </div>
          </FormikForm>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Auth;