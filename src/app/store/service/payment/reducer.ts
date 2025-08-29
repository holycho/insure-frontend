import { Reducer } from 'redux';
import { PaymentActions, PaymentState, SERVICE_PAYMENT__FETCH_APPLY_NO_DONE, SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER_DONE, SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER_DONE, SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE_DONE, SERVICE_PAYMENT__RESET_NON_MEMBER_LOGIN_CACHE, SERVICE_PAYMENT__RESET_PAYMENT_LIST, SERVICE_PAYMENT__RESET_PAYMENT_POLICY, SERVICE_PAYMENT__RESET_PAYMENT_SINGLE, SERVICE_PAYMENT__SAVE_PAYMENT_POLICY, SERVICE_PAYMENT__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP } from './types';

const initialState: PaymentState = {
  authentication: {
    nonMember: {
      login: {
        forget: {
          currentStep: null
        }
      }
    }
  },
  list: {
    online: [],
    propose: []
  },
  single: {
    policy: null
  }
};

const paymentReducer: Reducer<PaymentState, PaymentActions> = (state = initialState, action) => {
  switch(action.type) {
    case SERVICE_PAYMENT__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP: {
      return {
        ...state,
        authentication: {
          nonMember: {
            login: {
              forget: {
                currentStep: action.payload.step
              }
            }
          }
        }
      };
    }
    case SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER_DONE: {
      return {
        ...state,
        list: {
          online: action.payload.response.online ?? [],
          propose: action.payload.response.propose ?? []
        }
      };
    }
    case SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER_DONE: {
      return {
        ...state,
        list: {
          online: action.payload.response.online ?? [],
          propose: action.payload.response.propose ?? []
        }
      };
    }
    case SERVICE_PAYMENT__RESET_PAYMENT_LIST: {
      return {
        ...state,
        list: {
          online: [],
          propose: []
        }
      };
    }
    case SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE_DONE: {
      return {
        ...state,
        single: {
          policy: action.payload.response.policy
        }
      };
    }
    case SERVICE_PAYMENT__RESET_PAYMENT_SINGLE: {
      return {
        ...state,
        single: {
          policy: null
        }
      };
    }
    // [我要繳費-列表] 暫存保單資訊
    case SERVICE_PAYMENT__SAVE_PAYMENT_POLICY: {
      return { ...state, paymentPolicy: action.payload.policy };
    }
    // [我要繳費-列表] 重置保單資訊
    case SERVICE_PAYMENT__RESET_PAYMENT_POLICY: {
      return { ...state, paymentPolicy: undefined };
    }
    // [我要繳費-登入-非會員與公司戶-忘記受理編號] 重置非會員與公司戶資料緩存
    case SERVICE_PAYMENT__RESET_NON_MEMBER_LOGIN_CACHE: {
      return { ...state, authentication: initialState.authentication };
    }
    // [我要繳費-登入-非會員與公司戶-忘記受理編號] 查詢受理編號 完成
    case SERVICE_PAYMENT__FETCH_APPLY_NO_DONE: {
      const currentStep = action.payload.step;
      const insuredId = action.payload.insuredId;
      const vehicleLicense = action.payload.vehicleLicense;
      return { ...state, authentication: { ...state.authentication, nonMember: { ...state.authentication.nonMember, login: { ...state.authentication.nonMember.login, forget: { ...state.authentication.nonMember.login.forget, currentStep, insuredId, vehicleLicense } } } } };
    }
    default:
      return state;
  }
};

export default paymentReducer;
