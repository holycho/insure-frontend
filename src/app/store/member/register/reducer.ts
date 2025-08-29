import { Reducer } from 'redux';
import { MEMBER_REGISTER__INIT_PROCESS_DONE, MEMBER_REGISTER__INIT_REGISTER_COMPLETE_DONE, MEMBER_REGISTER__SAVE_REGISTER_DATA, MEMBER_REGISTER__SEND_REGISTER_DATA_DONE, MEMBER_REGISTER__SEND_REGISTER_OTP_DONE, MEMBER_REGISTER__SET_ACCESSIBLE_STEP, RegisterActions, RegisterState } from './types';
import { RegisterStepCodesEnum } from 'app/features/Member/Register/types';

const initialState: RegisterState = {
  static: {
    cityArea: [],
    emailDomain: []
  },
  accessibleSteps: [RegisterStepCodesEnum.PersonalInfo],
  data: null,
  otp: null,
  complete: {}
};

const registerReducer: Reducer<RegisterState, RegisterActions> = (state = initialState, action): RegisterState => {
  switch (action.type) {
    // 設置可訪問步驟
    case MEMBER_REGISTER__SET_ACCESSIBLE_STEP: {
      const currentStep = action.payload.step;
      console.log(currentStep, state.accessibleSteps.filter(it => it !== currentStep));
      const accessibleSteps = state.accessibleSteps.filter(it => it !== currentStep).concat(currentStep);
      console.log('所有步驟', accessibleSteps);
      return { ...state, accessibleSteps };
    }
    // 填寫頁面所需資料
    case MEMBER_REGISTER__INIT_PROCESS_DONE: {
      return { ...state, static: { ...action.payload.response } };
    }
    // 緩存填寫資料頁之會員資料
    case MEMBER_REGISTER__SAVE_REGISTER_DATA: {
      return { ...state, data: action.payload.data };
    }
    // 發送 OTP 完成
    case MEMBER_REGISTER__SEND_REGISTER_OTP_DONE: {
      return { ...state, otp: action.payload.response };
    }
    // 完成會員註冊
    case MEMBER_REGISTER__SEND_REGISTER_DATA_DONE: {
      return { ...state, complete: { result: action.payload.response, memName: action.payload.memName } };
    }
    // 取得推薦商品完成
    case MEMBER_REGISTER__INIT_REGISTER_COMPLETE_DONE: {
      return { ...state, complete: { ...state.complete, topsale: action.payload.response ?? [] } };
    }
    default:
      return state;
  }
};

export default registerReducer;
