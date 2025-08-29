import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import { OTPAuthFormValues } from './types';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import { useHistory } from 'react-router-dom';
import CaptchaField from 'app/common/compoments/Field/CaptchaField';
import validationService from 'app/core/services/validationService';
import { RootState } from 'app/store/types';
import { useSelector } from 'react-redux';
import { MemReqUd } from 'app/bff/models/mem/memReqUd';
import { useDispatch } from 'react-redux';
import { savePersonalInfoChangesAction } from 'app/store/member/settings/actions';
import { ROUTES } from 'app/core/router';

const OTPAuth: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const authorizationState = useSelector((state: RootState) => state.system.member.authorization);
  const settingsState = useSelector((state: RootState) => state.member.settings);

  // Formik Config
  const formik = useFormik<OTPAuthFormValues>({
    enableReinitialize: true,
    initialValues: {
      otpCode: ''
    },
    validationSchema: Yup.object().shape({
      otpCode: Yup.string().concat(validationService.captchaSchema)
    }),
    onSubmit: async (values: OTPAuthFormValues) => {
      if (!authorizationState || !settingsState.otp || !settingsState.data) return;
      const args: MemReqUd = {
        ...settingsState.data, // 上一頁資料
        sn: authorizationState.member.sn,
        otpSn: settingsState.otp.sn, // OTP 驗證-流水號
        otpCode: values.otpCode, // OTP 驗證-使用者輸入
        method: 'UPDATE'
      };
      reduxDispatch(savePersonalInfoChangesAction(args, () => {
        routerHistory.push(ROUTES.MEMBER__SETTINGS);
      }));
    }
  });

  const handleResendCaptcha = () => {

  };

  const handlePrevStep = () => {
    routerHistory.goBack();
  };

  return (
    <div className="inside-page-01-layout">
      <div className="inside-page-01-layout__latter">
        <FormikProvider value={formik}>
          <FormikForm>
            <div className="inside-page-01-layout__form form-layout-00">
              <div className="form-layout-00__title">確認身份</div>
              <div className="form-layout-00__body">
                <CaptchaField name="otpCode" duration={30} onResend={handleResendCaptcha} />
              </div>
            </div>
            <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
              <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevStep}>
                取消修改
              </button>
              <button type="submit" className="inside-page-01-layout__btn btn-primary">
                確認
              </button>
            </div>
          </FormikForm>
        </FormikProvider>
      </div>
    </div>
  );
};

export default OTPAuth;