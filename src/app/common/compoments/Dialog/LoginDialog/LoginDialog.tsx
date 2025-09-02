import React, { useEffect } from 'react';
import { LoginDialogProps, LoginFormValues, LoginOTPAuthFormValues, LoginStepCodesEnum } from './types';
import { useDispatch } from 'react-redux';
import { setDialogVisibleAction } from 'app/store/ui/actions';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import { ErrorMessage, FormikProvider, useFormik } from 'formik';
import FormikForm from '../../Form/FormikForm';
import Text00Field from '../../Field/Text00Field';
import CaptchaCanvas from '../../CaptchaCanvas';
import { fetchLoginCaptchaAction, sendLoginOTPAction, setLoginCurrentStepAction, signinAction } from 'app/store/member/login/actions';
import * as Yup from 'yup';
import CaptchaField from '../../Field/CaptchaField';
import { SigninReq } from 'app/bff/models/signin';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
import { SigninPreReq } from 'app/bff/models/signinPre';

declare const $: any;

const LoginDialog: React.FC<LoginDialogProps> = (props) => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.member.login);

  // Login Formik Config
  const loginFormik = useFormik<LoginFormValues>({
    enableReinitialize: true,
    initialValues: {
      memberId: '',
      captchaCode: ''
    },
    validationSchema: Yup.object().shape({
      memberId: Yup.string().required('此為必填欄位'),
      captchaCode: Yup.string().required('此為必填欄位')
    }),
    onSubmit: async (values: LoginFormValues) => {
      if (!loginState.captcha) return;
      const args: SigninPreReq = {
        memberId: values.memberId,
        captchaSn: loginState.captcha.captchaSn,
        captchaCode: values.captchaCode
      };
      if (process.env.REACT_APP_MODE === 'e2e') {
        args.mode = 'e2e';
      }
      // 執行發送 OTP
      reduxDispatch(sendLoginOTPAction(args, false));
    }
  });

  // OtpAuth Formik Config
  const otpAuthFormik = useFormik<LoginOTPAuthFormValues>({
    enableReinitialize: true,
    initialValues: {
      otpCode: ''
    },
    validationSchema: Yup.object().shape({
      otpCode: Yup.string().required('此為必填欄位')
    }),
    onSubmit: async (values: LoginOTPAuthFormValues) => {
      if (!loginState || !loginState.data || !loginState.otp) return;
      // 驗證 OTP
      // 執行登入
      const args: SigninReq = {
        memberId: loginState.data.memberId,
        memberSn: loginState.otp.memberSn,
        otpCode: values.otpCode
      };
      reduxDispatch(signinAction(args, loginState.redirectURL, async () => {
        console.log('Signin finished!');
      }));
    }
  });

  useEffect(() => {
    reduxDispatch(fetchLoginCaptchaAction());
  }, [reduxDispatch]);

  /**
   * @description 根據狀態，修改樣式
   */
  useEffect(() => {
    if (props.visible) {
      $('.dialog-001').css('display', 'block');
      $('.dialog__backdrop').css('opacity', '1');
      $('.dialog__content').css('display', 'block');
    } else {
      $('.dialog-001').css('display', 'none');
      $('.dialog__backdrop').css('opacity', '0');
      $('.dialog__content').css('display', 'none');
    }
  }, [props.visible]);

  /**
   * @description 關閉跳窗
   */
  const handleClose = () => {
    reduxDispatch(setDialogVisibleAction('loginDialog', false));
  };

  const handleGoBack = () => {
    reduxDispatch(setLoginCurrentStepAction(LoginStepCodesEnum.Authentication));
  };

  const handleResendCaptcha = () => {
    reduxDispatch(fetchLoginCaptchaAction());
  };

  /**
   * @description 導頁至「會員註冊」流程
   */
  const handleRegister = () => {
    // 關閉視窗
    reduxDispatch(setDialogVisibleAction('loginDialog', false));
    // 導頁至「會員資料」頁
    routerHistory.push(ROUTES.MEMBER__REGISTER__PERSIONAL_INFO);
  };

  const handleResendOTP = () => {
      if (!loginState.captcha) return;
      const { values } = loginFormik;
      const args: SigninPreReq = {
        memberId: values.memberId,
        captchaSn: loginState.captcha.captchaSn,
        captchaCode: values.captchaCode
      };
      if (process.env.REACT_APP_MODE === 'e2e') {
        args.mode = 'e2e';
      }
      // 執行發送 OTP
      reduxDispatch(sendLoginOTPAction(args, false));
  };

  return (
    <div className="dialog-001" data-dialog-id="dialog-login">
      <div className="dialog__backdrop" />
      <div className="dialog__wrapper">
        <div style={{ position: 'relative', overflow: 'hidden' }} className="dialog__content">
          <img style={{ position: 'absolute', height: '100%', width: '100%', top: 0, left: 0, opacity: '0.1' }} src="/assets/img/logo_bg.png" />
          <div className="dialog-001__shell">
            <div className="dialog-001__inner">
              {loginState.currentStep === LoginStepCodesEnum.Authentication && (
                <div className="dialog-001__content">
                  <h1 className="dialog-001__title">
                    會員登入
                  </h1>
                  <div className="dialog-001__descrp dialog-001__descrp--color-gs007">
                    登入有助於您的投保流程
                  </div>
                  <FormikProvider value={loginFormik}>
                    <FormikForm>
                      <div className="dialog-001__form dialog-form-layout-00">
                        <div className="dialog-form-layout-00__section">
                          <div className="dialog-form-layout-00__title-tag">身分證字號</div>
                          <div className="dialog-form-layout-00__row">
                            <div className={'dialog-form-layout-00__cell dialog-form-layout-00__cell--full' + (loginFormik.errors.memberId && loginFormik.touched.memberId ? ' dialog-form-layout-00__cell--error' : '')}>
                              <Text00Field name="memberId" placeholder="請輸入" />
                              <ErrorMessage name="memberId" render={(errMsg) => (
                                <div className="dialog-form-layout-00__error-tag error-tag">{errMsg}</div>
                              )} />
                            </div>
                          </div>
                          <div className="form-layout-00__hint-tag hint-tag hint-tag--demo">內建測試帳號登入: A151273978，亦可註冊新會員</div>
                        </div>
                        <div className="dialog-form-layout-00__section">
                          <div className="dialog-form-layout-00__title-tag">圖形驗證碼</div>
                          <div style={{ flexWrap: 'wrap' }} className="dialog-form-layout-00__row">
                            <div className={'dialog-form-layout-00__cell dialog-form-layout-00__cell--size-1' + (loginFormik.errors.captchaCode && loginFormik.touched.captchaCode ? ' dialog-form-layout-00__cell--error' : '')}>
                              <Text00Field name="captchaCode" placeholder="需區分大小寫" />
                              <ErrorMessage name="captchaCode" render={(errMsg) => (
                                <div className="dialog-form-layout-00__error-tag error-tag">{errMsg}</div>
                              )} />
                            </div>
                            <div className="dialog-form-layout-00__verify-code">
                              <CaptchaCanvas width={135} height={34} code={loginState.captcha?.captchaCode ?? ''} />
                            </div>
                            <button type="button" className="dialog-form-layout-00__refresh" onClick={handleResendCaptcha}>
                              <img src="/assets/img/refresh-p.svg" alt="" className="img" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <button id="otpAuth" type="submit" className="dialog-001__btn btn-primary" data-dialog-trigger="dialog-login-step-2">
                          登入
                        </button>
                        <button type="button" className="dialog-001__btn dialog-001__btn--text btn-text" onClick={handleRegister}>
                          新會員註冊
                        </button>
                      </div>
                    </FormikForm>
                  </FormikProvider>
                </div>
              )}
              {loginState.currentStep === LoginStepCodesEnum.OTP && (
                <div className="dialog-001__content">
                  <button className="dialog-001__back" data-dialog-trigger="dialog-login">
                    <img src="/assets/img/arrow-back.svg" alt="" className="img" onClick={handleGoBack} />
                  </button>
                  <h1 className="dialog-001__title">
                    會員登入
                  </h1>
                  <div className="dialog-001__descrp dialog-001__descrp--color-gs007">
                    歡迎回來，{loginState.data?.memberName}！
                  </div>
                  <FormikProvider value={otpAuthFormik}>
                    <FormikForm>
                      <div className="dialog-001__form dialog-001__form--size-2 dialog-form-layout-00">
                        <div className="dialog-form-layout-00__section">
                          <CaptchaField name="otpCode" duration={loginState.otp?.duration ?? 30} onResend={handleResendOTP} />
                          <div className="form-layout-00__hint-tag hint-tag hint-tag--demo">{loginState.otp?.otpDemoTip ?? ''}</div>
                        </div>
                      </div>
                      <button id="otpVerify" type="submit" className="dialog-001__btn btn-primary">
                        登入
                      </button>
                    </FormikForm>
                  </FormikProvider>
                </div>
              )}
              <button type="button" className="dialog__close" onClick={handleClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
