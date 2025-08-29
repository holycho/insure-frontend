import { StepCodesEnum } from 'app/features/Insure/FireInsurance/types';
import { FireActions, FireState, INSURE_FIRE_INSURANCE__INIT_PROCESS_DONE, INSURE_FIRE_INSURANCE__SAVE_CALCULATION_DATA, INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_DATA, INSURE_FIRE_INSURANCE__SET_ACCESSIBLE_STEP, INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_CLAUSES_DATA, INSURE_FIRE_INSURANCE__SEND_OTP_DONE, INSURE_FIRE_INSURANCE__SAVE_POLICY_INFO, INSURE_FIRE_INSURANCE__SAVE_PAYMENT_RESULT } from './types';
// 注意! v5.0 的 redux 會有問題
import { Reducer } from 'redux';

const initialState: FireState = {
  static: {
    unit: [],
    material: [],
    roof: [],
    city: [],
    cost: [],
    emailDomain: [],
    cityArea: [],
    morgageBank: [],
    payBy: [],
    transferBank: []
  },
  process: {
    accessibleSteps: [StepCodesEnum.Calculation],
    calculation: {},
    insuranceInfo: {
      clauses: {}
    },
    confirmInfo: {
      otpAuth: {}
    },
    payment: {}
  },
  policy: null
};

// 火險投保流程-歸納器
const fireReducer: Reducer<FireState, FireActions> = (state = initialState, action): FireState => {
  switch (action.type) {
    // 設置可訪問步驟
    case INSURE_FIRE_INSURANCE__SET_ACCESSIBLE_STEP: {
      const currentStep = action.payload.step;
      const accessibleSteps = state.process.accessibleSteps.filter(it => it !== currentStep);
      return { ... state, process: { ...state.process, accessibleSteps: [ ...accessibleSteps, currentStep ] } };
    }
    // 初始化流程 (初始取得相關資料) 完成
    case INSURE_FIRE_INSURANCE__INIT_PROCESS_DONE: {
      return { ...state, static: { ...state.static, ...action.payload.response } };
    }
    // 緩存保費試算頁資料
    case INSURE_FIRE_INSURANCE__SAVE_CALCULATION_DATA: {
      return { ...state, process: { ...state.process, calculation: { data: action.payload.data } } };
    }
    // 緩存 投保資料 (補齊資料) 資料
    case INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_DATA: {
      return { ...state, process: { ...state.process, insuranceInfo: { ...state.process.insuranceInfo, data: action.payload.data } } };
    }
    // 緩存 投保資料 (條款須知) 資料
    case INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_CLAUSES_DATA: {
      return {  ...state, process: { ...state.process, insuranceInfo: { ...state.process.insuranceInfo, clauses: { data: action.payload.data } } } };
      break;
    }
    // 發送 OTP 完成
    case INSURE_FIRE_INSURANCE__SEND_OTP_DONE: {
      return { ...state, process: { ...state.process, confirmInfo: { ...state.process.confirmInfo, otpAuth: { otp: action.payload.response } } } };
    }
    // 緩存保單資訊
    case INSURE_FIRE_INSURANCE__SAVE_POLICY_INFO: {
      return { ...state, process: { ...state.process }, policy: action.payload.policy };
    }
    // 緩存繳費結果
    case INSURE_FIRE_INSURANCE__SAVE_PAYMENT_RESULT: {
      return { ...state, process: { ...state.process, payment: { data: action.payload.data } } };
    }
    default:
      return state;
  }
};

export default fireReducer;