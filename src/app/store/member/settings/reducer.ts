import { Reducer } from 'redux';
import { MEMBER_SETTINGS__INIT_PROCESS_DONE, MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES_DONE, MEMBER_SETTINGS__SAVE_SETTINGS_DATA, MEMBER_SETTINGS__SEND_SETTINGS_OTP_DONE, MEMBER_SETTINGS__SET_SETTINGS_ACCESSIBLE_STEP, SettingsActions, SettingsState } from './types';
import { SettingsStepCodesEnum } from 'app/features/Member/Settings/types';

const initialValues: SettingsState = {
  static: {
    cityArea: [],
    emailDomain: []
  },
  accessibleSteps: [SettingsStepCodesEnum.Settings],
  data: null,
  otp: null,
  isEmailChanged: false,
  isMobileChanged: false
};

const settingsReducer: Reducer<SettingsState, SettingsActions> = (state = initialValues, action) => {
  switch(action.type) {
    // 設置可訪問步驟
    case MEMBER_SETTINGS__SET_SETTINGS_ACCESSIBLE_STEP: {
      const currentStep = action.payload.step;
      const accessibleSteps = state.accessibleSteps.filter(it => it !== currentStep).concat(currentStep);
      return { ...state, accessibleSteps };
    }
    // 儲存頁面所需資料
    case MEMBER_SETTINGS__INIT_PROCESS_DONE: {
      return { ...state, static: { ...action.payload.response } };
    }
    // 緩存已修改的會員資料
    case MEMBER_SETTINGS__SAVE_SETTINGS_DATA: {
      return { ...state, data: action.payload.data };
    }
    // 發送 OTP 完成
    case MEMBER_SETTINGS__SEND_SETTINGS_OTP_DONE: {
      return { ...state, otp: action.payload.response, isEmailChanged: action.payload.isEmailChanged, isMobileChanged: action.payload.isMobileChanged };
    }
    // 儲存會員資料修改 完成
    case MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES_DONE: {
      return { ...initialValues };
    }
    default:
      return state;
  }
};

export default settingsReducer;
