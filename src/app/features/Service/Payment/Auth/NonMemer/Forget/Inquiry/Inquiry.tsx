import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchApplyNoAction, setNonMemberLoginForgetCurrentStepAction } from 'app/store/service/payment/actions';
import commonService from 'app/core/services/commonService';
import validationService from 'app/core/services/validationService';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import Text00Field from 'app/common/compoments/Field/Text00Field';
import VehicleLicenseFieldsGroup from 'app/common/compoments/Field/VehicleLicenseFieldsGroup';
import { VehicleLicenseFieldModesEnum } from 'app/common/compoments/Field/VehicleLicenseFieldsGroup/types';
import { InquiryFormValues } from './types';

const Inquiry: React.FC = () => {
  const reduxDispatch = useDispatch();

  // 表單初始值
  const initialValues: InquiryFormValues = {
    insuredId: '',
    _vehicleLicenseFront: '',
    _vehicleLicenseBack: ''
  };

  // Formik Config
  const formik = useFormik<InquiryFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape({
      insuredId: Yup.string().required('此為必填欄位').test({
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
      _vehicleLicenseFront: Yup.string().required('此為必填欄位'),
      _vehicleLicenseBack: Yup.string().required('此為必填欄位')
    }),
    onSubmit: (values: InquiryFormValues) => {
      const { insuredId, _vehicleLicenseFront, _vehicleLicenseBack } = values;
      const carLicense = `${_vehicleLicenseFront}-${_vehicleLicenseBack}`;
      reduxDispatch(fetchApplyNoAction({ service: 'payment', insuredId, carLicense }));
    }
  });

  /**
 * @description 頁面初始
 */
  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 返回上一步
   */
  const handlePrevStep = () => {
    reduxDispatch(setNonMemberLoginForgetCurrentStepAction(null));
  };

  return (
    <div className="form-layout-outer-00">
      <div className="form-layout-outer-00__descrp" />
      <div className="form-layout-outer-00__content">
        <FormikProvider value={formik}>
          <FormikForm>
            <div className="form-layout-00">
              <div className="form-layout-00__title">查詢受理編號</div>
              <div className="form-layout-00__body">
                {/* 被保險人身份證字號 / 統一編號 */}
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">被保險人身分證字號 / 統一編號</div>
                  <div className="form-layout-00__row form-layout-00__row--align-start">
                    <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (formik.errors.insuredId && formik.touched.insuredId ? ' form-layout-00__cell--error' : '')}>
                      <Text00Field name="insuredId" placeholder="請輸入" maxLength={10} />
                      <ErrorMessage name="insuredId" render={(errMsg) => (
                        <div className="dialog-form-layout-00__error-tag error-tag">{errMsg}</div>
                      )} />
                    </div>
                  </div>
                  <div className="form-layout-00__hint-tag hint-tag hint-tag--demo">內建測試帳號登入: A151273978</div>
                </div>
                {/* 車牌號碼 */}
                <div className="form-layout-00__section">
                  <VehicleLicenseFieldsGroup
                    name={['_vehicleLicenseFront', '_vehicleLicenseBack']}
                    mode={VehicleLicenseFieldModesEnum.Vehicle}
                  />
                  <div className="form-layout-00__hint-tag hint-tag hint-tag--demo">內建可查詢車牌號: AIP-224(待繳費)、VHR-0301(逾期)</div>
                </div>
              </div>
            </div>
            <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
              <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevStep}>
                返回上一步
              </button>
              <button type="submit" className="inside-page-01-layout__btn btn-primary">
                查詢受理編號
              </button>
            </div>
          </FormikForm>
        </FormikProvider>
      </div>
    </div>
  );
};

export default Inquiry;
