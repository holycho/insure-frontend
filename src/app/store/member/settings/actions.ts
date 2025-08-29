import { SettingsStepCodesEnum } from 'app/features/Member/Settings/types';
import { MEMBER_SETTINGS__INIT_PROCESS, MEMBER_SETTINGS__INIT_PROCESS_DONE, MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES, MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES_DONE, MEMBER_SETTINGS__SAVE_SETTINGS_DATA, MEMBER_SETTINGS__SEND_SETTINGS_OTP, MEMBER_SETTINGS__SEND_SETTINGS_OTP_DONE, MEMBER_SETTINGS__SET_SETTINGS_ACCESSIBLE_STEP, SettingsActions, SettingsState } from './types';
import { PersonalInfoFormValues } from 'app/features/Member/Settings/PersonalInfo/types';
import { SignupOtpReq, SignupOtpResp } from 'app/bff/models/signupOtp';
import { MemReqUd } from 'app/bff/models/mem/memReqUd';

export const setSettingsAccessibleStepAction = (step: SettingsStepCodesEnum): SettingsActions => ({
  type: MEMBER_SETTINGS__SET_SETTINGS_ACCESSIBLE_STEP,
  payload: { step }
});

export const initProcessAction = (): SettingsActions => ({
  type: MEMBER_SETTINGS__INIT_PROCESS
});

export const initProcessDoneAction = (response: SettingsState['static']): SettingsActions => ({
  type: MEMBER_SETTINGS__INIT_PROCESS_DONE,
  payload: { response }
});

export const saveSettingsDataAction = (data: PersonalInfoFormValues): SettingsActions => ({
  type: MEMBER_SETTINGS__SAVE_SETTINGS_DATA,
  payload: { data }
});

export const sendSettingsOTPAction = (args: SignupOtpReq): SettingsActions => ({
  type: MEMBER_SETTINGS__SEND_SETTINGS_OTP,
  payload: { args }
});

export const sendSettingsOTPDoneAction = (response: SignupOtpResp, isEmailChanged: boolean, isMobileChanged: boolean) => ({
  type: MEMBER_SETTINGS__SEND_SETTINGS_OTP_DONE,
  payload: { response, isEmailChanged, isMobileChanged }
});

export const savePersonalInfoChangesAction = (args: MemReqUd, onSuccess?: () => void) => ({
  type: MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES,
  payload: { args, onSuccess }
});

export const savePersonalInfoChangesDoneAction = () => ({
  type: MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES_DONE
});
