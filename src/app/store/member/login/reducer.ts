import { Reducer } from 'redux';
import { LoginStepCodesEnum } from 'app/common/compoments/Dialog/LoginDialog/types';
import { LoginActions, LoginState, MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA_DONE, MEMBER_LOGIN__RESET_LOGIN_CACHE, MEMBER_LOGIN__SAVE_LOGIN_DATA, MEMBER_LOGIN__SEND_LOGIN_OTP_DONE, MEMBER_LOGIN__SET_LOGIN_CURRENT_STEP, MEMBER_LOGIN__SET_LOGIN_REDIRECT_URL, MEMBER_LOGIN__SET_LOGIN_SERVICE_STEP } from './types';

const initialState: LoginState = {
  // 投保流程
  currentStep: LoginStepCodesEnum.Authentication,
  // 保險服務
  serviceStep: LoginStepCodesEnum.Authentication
};

// 登入跳窗-歸納器
const loginReducer: Reducer<LoginState, LoginActions> = (state = initialState, action) => {
  switch(action.type) {
    case MEMBER_LOGIN__SET_LOGIN_CURRENT_STEP: {
      return { ...state, currentStep: action.payload.step };
    }
    case MEMBER_LOGIN__SET_LOGIN_SERVICE_STEP: {
      return { ...state, serviceStep: action.payload.step };
    }
    case MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA_DONE: {
      return { ...state, captcha: action.payload.response };
    }
    case MEMBER_LOGIN__SAVE_LOGIN_DATA: {
      return { ...state, data: action.payload.data };
    }
    case MEMBER_LOGIN__SEND_LOGIN_OTP_DONE: {
      return { ...state, otp: action.payload.response };
    }
    case MEMBER_LOGIN__RESET_LOGIN_CACHE: {
      return { ...initialState };
    }
    case MEMBER_LOGIN__SET_LOGIN_REDIRECT_URL: {
      return { ...state, redirectURL: action.payload.route };
    }
    default:
      return state;
  }
};

export default loginReducer;
