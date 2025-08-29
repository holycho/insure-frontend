import { LoginFormValues, LoginStepCodesEnum } from 'app/common/compoments/Dialog/LoginDialog/types';
import { LoginActions, MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA, MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA_DONE, MEMBER_LOGIN__LOGOUT, MEMBER_LOGIN__RESET_LOGIN_CACHE, MEMBER_LOGIN__SAVE_LOGIN_DATA, MEMBER_LOGIN__SEND_LOGIN_OTP, MEMBER_LOGIN__SEND_LOGIN_OTP_DONE, MEMBER_LOGIN__SET_LOGIN_CURRENT_STEP, MEMBER_LOGIN__SET_LOGIN_REDIRECT_URL, MEMBER_LOGIN__SET_LOGIN_SERVICE_STEP, MEMBER_LOGIN__SIGNIN } from './types';
import { CaptchaGetResp } from 'app/bff/models/captchaGet';
import { SigninPreReq, SigninPreResp } from 'app/bff/models/signinPre';
import { SigninReq } from 'app/bff/models/signin';
import { ROUTES } from 'app/core/router';

export const setLoginCurrentStepAction = (step: LoginStepCodesEnum): LoginActions => ({
  type: MEMBER_LOGIN__SET_LOGIN_CURRENT_STEP,
  payload: { step }
});

export const setLoginServiceStepAction = (step: LoginStepCodesEnum): LoginActions => ({
  type: MEMBER_LOGIN__SET_LOGIN_SERVICE_STEP,
  payload: { step }
});

export const fetchLoginCaptchaAction = (): LoginActions => ({
  type: MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA
});

export const fetchLoginCaptchaDoneAction = (response: CaptchaGetResp): LoginActions => ({
  type: MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA_DONE,
  payload: { response }
});

export const saveLoginDataAction = (data: LoginFormValues): LoginActions => ({
  type:  MEMBER_LOGIN__SAVE_LOGIN_DATA,
  payload: {
    data
  }
});

export const sendLoginOTPAction = (args: SigninPreReq, isService: boolean): LoginActions => ({
  type: MEMBER_LOGIN__SEND_LOGIN_OTP,
  payload: { args, isService }
});

export const sendLoginOTPDoneAction = (response: SigninPreResp): LoginActions => ({
  type: MEMBER_LOGIN__SEND_LOGIN_OTP_DONE,
  payload: { response }
});

export const signinAction = (args: SigninReq, redirectURL?: ROUTES, onComplete?: () => Promise<void>): LoginActions => ({
  type: MEMBER_LOGIN__SIGNIN,
  payload: {
    args,
    redirectURL,
    onComplete
  }
});

export const resetLoginCacheAction = (): LoginActions => ({
  type: MEMBER_LOGIN__RESET_LOGIN_CACHE
});

export const logoutAction = (): LoginActions => ({
  type: MEMBER_LOGIN__LOGOUT
});

export const setLoginRedirectUrl = (route: ROUTES): LoginActions => ({
  type: MEMBER_LOGIN__SET_LOGIN_REDIRECT_URL,
  payload: { route }
});
