import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
import FormikForm from 'app/common/compoments/Form/FormikForm';
import CaptchaField from 'app/common/compoments/Field/CaptchaField';
import { OTPAuthFormValues } from './types';
import validationService from 'app/core/services/validationService';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import { sendRegisterDataAction, sendRegisterOTPAction } from 'app/store/member/register/actions';
import { MemRegReq } from 'app/bff/models/memReg';
import commonService from 'app/core/services/commonService';
import { SignupOtpReq } from 'app/bff/models/signupOtp';

const OTPAuth: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const registerState = useSelector((state: RootState) => state.member.register);

  // 表單初始值
  const initialValues: OTPAuthFormValues = {
    otpCode: ''
  };

  // Formik Config
  const formik = useFormik<OTPAuthFormValues>({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object().shape({
      otpCode: Yup.string().concat(validationService.captchaSchema)
    }),
    onSubmit: async (values: OTPAuthFormValues) => {
      if (!registerState.otp || !registerState.data) return;
      const args: MemRegReq = {
        // OTP 驗證
        otp: {
          sn: registerState.otp.sn,
          otpCode: values.otpCode
        },
        // 會員資料
        mem: {
          ...registerState.data
        }
      };
      reduxDispatch(sendRegisterDataAction(args));
    }
  });

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 重送 OTP
   */
  const handleResendOTP = () => {
    if (!registerState.data) return;
    const { mobile, emailAddr } = registerState.data;
    const args: SignupOtpReq = {
      mobile: mobile,
      email: emailAddr,
      action: '7'
    };
    reduxDispatch(sendRegisterOTPAction(args));
  };

  /**
   * @description 處理「返回上一步」執行的事件
   */
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
                <CaptchaField name="otpCode" duration={registerState.otp?.duration ?? 30} onResend={handleResendOTP} />
                <div className="form-layout-00__hint-tag hint-tag hint-tag--demo">{registerState.otp?.otpDemoTip ?? ''}</div>
              </div>
            </div>
            <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
              <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevStep}>
                返回上一步
              </button>
              <button type="submit" className="inside-page-01-layout__btn btn-primary">
                下一步
              </button>
            </div>
          </FormikForm>
        </FormikProvider>
      </div>
    </div>

  );
};

export default OTPAuth;
