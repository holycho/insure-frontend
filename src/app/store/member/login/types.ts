import { SigninReq } from './../../../bff/models/signin/signinReq';
import { CaptchaGetResp } from 'app/bff/models/captchaGet';
import { SigninPreReq, SigninPreResp } from 'app/bff/models/signinPre';
import { LoginFormValues, LoginStepCodesEnum } from 'app/common/compoments/Dialog/LoginDialog/types';
import { ROUTES } from 'app/core/router';

export interface LoginState {
  currentStep: LoginStepCodesEnum; // 登入步驟
  serviceStep: LoginStepCodesEnum; // 服務流程登入步驟
  captcha?: CaptchaGetResp; // 緩存 Captcha
  data?: LoginFormValues; // 登入 Step-1 資訊
  otp?: SigninPreResp;
  redirectURL?: ROUTES;
}

export const MEMBER_LOGIN__SET_LOGIN_CURRENT_STEP = 'MEMBER_LOGIN__SET_LOGIN_CURRENT_STEP';
export const MEMBER_LOGIN__SET_LOGIN_SERVICE_STEP = 'MEMBER_LOGIN__SET_LOGIN_SERVICE_STEP';
export const MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA = 'MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA';
export const MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA_DONE = 'MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA_DONE';
export const MEMBER_LOGIN__SAVE_LOGIN_DATA = 'MEMBER_LOGIN__SAVE_LOGIN_DATA';
export const MEMBER_LOGIN__SEND_LOGIN_OTP = 'MEMBER_LOGIN__SEND_LOGIN_OTP';
export const MEMBER_LOGIN__SEND_LOGIN_OTP_DONE = 'MEMBER_LOGIN__SEND_LOGIN_OTP_DONE';
export const MEMBER_LOGIN__SIGNIN = 'MEMBER_LOGIN__SIGNIN'; // 登入
export const MEMBER_LOGIN__RESET_LOGIN_CACHE = 'MEMBER_LOGIN__RESET_LOGIN_CACHE';
export const MEMBER_LOGIN__LOGOUT = 'MEMBER_LOGIN__LOGOUT'; // 登出
export const MEMBER_LOGIN__SET_LOGIN_REDIRECT_URL = 'MEMBER_LOGIN__SET_LOGIN_REDIRECT_URL';

export interface SetLoginCurrentStepAction {
  type: typeof MEMBER_LOGIN__SET_LOGIN_CURRENT_STEP;
  payload: {
    step: LoginStepCodesEnum;
  }
}

export interface SetLoginServiceStepAction {
  type: typeof MEMBER_LOGIN__SET_LOGIN_SERVICE_STEP;
  payload: {
    step: LoginStepCodesEnum;
  }
}

export interface FetchLoginCaptchaAction {
  type: typeof MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA;
}

export interface FetchLoginCaptchaDoneAction {
  type: typeof MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA_DONE;
  payload: {
    response: CaptchaGetResp;
  }
}

export interface SaveLoginDataAction {
  type: typeof MEMBER_LOGIN__SAVE_LOGIN_DATA;
  payload: {
    data: LoginFormValues;
  }
}

export interface SendLoginOTPAction {
  type: typeof MEMBER_LOGIN__SEND_LOGIN_OTP;
  payload: {
    args: SigninPreReq;
    isService: boolean;
  }
}

export interface SendLoginOTPDoneAction {
  type: typeof MEMBER_LOGIN__SEND_LOGIN_OTP_DONE;
  payload: {
    response: SigninPreResp;
  }
}

export interface SigninAction {
  type: typeof MEMBER_LOGIN__SIGNIN;
  payload: {
    args: SigninReq;
    redirectURL?: ROUTES;
    onComplete?: () => Promise<void>;
  }
}

export interface ResetLoginCacheAction {
  type: typeof MEMBER_LOGIN__RESET_LOGIN_CACHE;
}

export interface LogoutAction {
  type: typeof MEMBER_LOGIN__LOGOUT;
}

export interface SetLoginRedirectUrl {
  type: typeof MEMBER_LOGIN__SET_LOGIN_REDIRECT_URL;
  payload: {
    route: ROUTES;
  }
}

export type LoginActions =
  SetLoginCurrentStepAction |
  SetLoginServiceStepAction |
  FetchLoginCaptchaAction |
  FetchLoginCaptchaDoneAction |
  SaveLoginDataAction |
  SendLoginOTPAction |
  SendLoginOTPDoneAction |
  SigninAction |
  ResetLoginCacheAction |
  LogoutAction |
  SetLoginRedirectUrl;
