import { Reducer } from 'redux';
import { QueryPolicyActions, QueryPolicyState, SERVICE_QUERY_POLICY__FETCH_APPLY_NO_DONE, SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL_DONE, SERVICE_QUERY_POLICY__FETCH_POLICY_LIST_DONE, SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE_DONE, SERVICE_QUERY_POLICY__RESET_NON_MEMBER_LOGIN_CACHE, SERVICE_QUERY_POLICY__RESET_POLICY_LIST, SERVICE_QUERY_POLICY__RESET_POLICY_SINGLE, SERVICE_QUERY_POLICY__SAVE_INDUIRY_FILTER, SERVICE_QUERY_POLICY__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP } from './types';
import { ProdIdEnum } from 'app/bff/enums/prod';
import { InsureModeCodesEnum } from 'app/bff/enums/insurance';

const initialState: QueryPolicyState = {
  authentication: {
    nonMember: {
      login: {
        forget: {
          currentStep: null
        }
      }
    }
  },
  // 查詢條件
  inquiry: {
    plan: {
      text: '汽車險',
      prodId: ProdIdEnum.Auto,
      planType: 'car'
    },
    // 網投頁數
    proposePage: 1,
    // 網要頁數
    applyPage: 1,
    // 每頁比數
    pageSize: 6
  },
  // 查詢結果
  list: {
    // 網投列表
    propose: {
      totalCount: 0,
      policys: []
    },
    // 網要列表
    apply: {
      totalCount: 0,
      policys: []
    }
  },
  single: {
    policy: null
  },
  detail: {
    fire: null
  }
};

const queryPolicyReducer: Reducer<QueryPolicyState, QueryPolicyActions> = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_QUERY_POLICY__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP: {
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
    case SERVICE_QUERY_POLICY__SAVE_INDUIRY_FILTER: {
      return {
        ...state,
        inquiry: action.payload.inquiry
      };
    }
    case SERVICE_QUERY_POLICY__FETCH_POLICY_LIST_DONE: {
      // 網投
      if (action.payload.bcType === InsureModeCodesEnum.Propose) {
        return {
          ...state,
          list: {
            ...state.list,
            propose: {
              ...action.payload.response
            }
          }
        };
      }
      // 網要
      if (action.payload.bcType === InsureModeCodesEnum.Apply) {
        return {
          ...state,
          list: {
            ...state.list,
            apply: {
              ...action.payload.response
            }
          }
        };
      }
      return {
        ...state
      };
    }
    case SERVICE_QUERY_POLICY__RESET_POLICY_LIST: {
      return {
        ...state,
        list: initialState.list
      };
    }
    case SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE_DONE: {
      return {
        ...state,
        single: {
          ...state.single,
          policy: action.payload.response.policy
        }
      };
    }
    case SERVICE_QUERY_POLICY__RESET_POLICY_SINGLE: {
      return {
        ...state,
        single: {
          policy: null
        }
      };
    }
    case SERVICE_QUERY_POLICY__RESET_NON_MEMBER_LOGIN_CACHE: {
      return {
        ...state,
        authentication: {
          ...initialState.authentication
        }
      };
    }
    // [保單查詢-登入-非會員與公司戶-忘記受理編號] 查詢受理編號 完成
    case SERVICE_QUERY_POLICY__FETCH_APPLY_NO_DONE: {
      const currentStep = action.payload.nextStep;
      const insuredId = action.payload.insuredId;
      const vehicleLicense = action.payload.vehicleLicense;
      const demoTip = action.payload.demoTip;
      return { ...state, authentication: { ...state.authentication, nonMember: { ...state.authentication.nonMember, login: { ...state.authentication.nonMember.login, forget: { ...state.authentication.nonMember.login.forget, currentStep, insuredId, vehicleLicense, demoTip } } } } };
    }
    case SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL_DONE: {
      const currentDetail = { ...initialState.detail };
      if (action.payload.planType === 'fire') {
        currentDetail.fire = action.payload.response;
      }
      return { ...state, detail: { ...currentDetail } };
    }
    default:
      return state;
  }
};

export default queryPolicyReducer;
