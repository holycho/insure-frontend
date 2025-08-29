import { CityAreaResp } from 'app/bff/models/cityArea';
import { MemReqUd } from 'app/bff/models/mem/memReqUd';
// import { MemDetailResp } from 'app/bff/models/memDetail';
import { ParamsResp } from 'app/bff/models/params';
import { SignupOtpReq, SignupOtpResp } from 'app/bff/models/signupOtp';
import { PersonalInfoFormValues } from 'app/features/Member/Settings/PersonalInfo/types';
import { SettingsStepCodesEnum } from 'app/features/Member/Settings/types';

export interface SettingsState {
  static: StaticState;
  accessibleSteps: SettingsStepCodesEnum[];
  data: PersonalInfoFormValues | null;
  otp: SignupOtpResp | null;
  isEmailChanged: boolean;
  isMobileChanged: boolean;
}

interface StaticState {
  cityArea: CityAreaResp['city'];
  emailDomain: ParamsResp['enum'];
}

export const MEMBER_SETTINGS__SET_SETTINGS_ACCESSIBLE_STEP = 'MEMBER_SETTINGS__SET_SETTINGS_ACCESSIBLE_STEP';
export const MEMBER_SETTINGS__INIT_PROCESS = 'MEMBER_SETTINGS__INIT_PROCESS';
export const MEMBER_SETTINGS__INIT_PROCESS_DONE = 'MEMBER_SETTINGS__INIT_PROCESS_DONE';
export const MEMBER_SETTINGS__SAVE_SETTINGS_DATA = 'MEMBER_SETTINGS__SAVE_SETTINGS_DATA';
export const MEMBER_SETTINGS__SEND_SETTINGS_OTP = 'MEMBER_SETTINGS__SEND_SETTINGS_OTP';
export const MEMBER_SETTINGS__SEND_SETTINGS_OTP_DONE = 'MEMBER_SETTINGS__SEND_SETTINGS_OTP_DONE';
export const MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES = 'MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES';
export const MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES_DONE = 'MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES_DONE';

export interface SetSettingsAccessibleStepAction {
  type: typeof MEMBER_SETTINGS__SET_SETTINGS_ACCESSIBLE_STEP;
  payload: {
    step: SettingsStepCodesEnum
  };
}

export interface InitProcessAction {
  type: typeof MEMBER_SETTINGS__INIT_PROCESS;
}

export interface InitProcessDoneAction {
  type: typeof MEMBER_SETTINGS__INIT_PROCESS_DONE;
  payload: {
    response: SettingsState['static'];
  };
}

export interface SaveSettingsDataAction {
  type: typeof MEMBER_SETTINGS__SAVE_SETTINGS_DATA;
  payload: {
    data: PersonalInfoFormValues;
  };
}

export interface SendSettingsOTPAction {
  type: typeof MEMBER_SETTINGS__SEND_SETTINGS_OTP;
  payload: {
    args: SignupOtpReq
  }
}

export interface SendSettingsOTPDoneAction {
  type: typeof MEMBER_SETTINGS__SEND_SETTINGS_OTP_DONE;
  payload: {
    response: SignupOtpResp;
    isEmailChanged: boolean;
    isMobileChanged: boolean;
  };
}

export interface SavePersonalInfoChangesAction {
  type: typeof MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES;
  payload: {
    args: MemReqUd;
    onSuccess?: () => void;
  };
}

export interface SavePersonalInfoChangesDoneAction {
  type: typeof MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES_DONE;
}

export type SettingsActions =
    SetSettingsAccessibleStepAction
  | InitProcessAction
  | InitProcessDoneAction
  | SaveSettingsDataAction
  | SendSettingsOTPAction
  | SendSettingsOTPDoneAction
  | SavePersonalInfoChangesAction
  | SavePersonalInfoChangesDoneAction;