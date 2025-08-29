import { RegisterStepCodesEnum } from 'app/features/Member/Register/types';
import { MEMBER_REGISTER__INIT_PROCESS, MEMBER_REGISTER__INIT_PROCESS_DONE, MEMBER_REGISTER__INIT_REGISTER_COMPLETE, MEMBER_REGISTER__INIT_REGISTER_COMPLETE_DONE, MEMBER_REGISTER__SAVE_REGISTER_DATA, MEMBER_REGISTER__SEND_REGISTER_DATA, MEMBER_REGISTER__SEND_REGISTER_DATA_DONE, MEMBER_REGISTER__SEND_REGISTER_OTP, MEMBER_REGISTER__SEND_REGISTER_OTP_DONE, MEMBER_REGISTER__SET_ACCESSIBLE_STEP, RegisterActions, RegisterState } from './types';
import { PersonalInfoFormValues } from 'app/features/Member/Register/PersonalInfo/types';
import { SignupOtpReq, SignupOtpResp } from 'app/bff/models/signupOtp';
import { MemRegReq, MemRegResp } from 'app/bff/models/memReg';

export const setAccessibleStepAction = (step: RegisterStepCodesEnum): RegisterActions => ({
  type: MEMBER_REGISTER__SET_ACCESSIBLE_STEP,
  payload: { step }
});

export const initProcessAction = (): RegisterActions => ({
  type: MEMBER_REGISTER__INIT_PROCESS
});

export const initProcessDoneAction = (response: RegisterState['static']): RegisterActions => ({
  type: MEMBER_REGISTER__INIT_PROCESS_DONE,
  payload: { response }
});

export const saveRegisterDataAction = (data: PersonalInfoFormValues): RegisterActions => ({
  type: MEMBER_REGISTER__SAVE_REGISTER_DATA,
  payload: { data }
});

export const sendRegisterOTPAction = (args: SignupOtpReq): RegisterActions => ({
  type: MEMBER_REGISTER__SEND_REGISTER_OTP,
  payload: { args }
});

export const sendRegisterOTPDoneAction = (response: SignupOtpResp): RegisterActions => ({
  type: MEMBER_REGISTER__SEND_REGISTER_OTP_DONE,
  payload: { response }
});

export const sendRegisterDataAction = (args: MemRegReq): RegisterActions => ({
  type: MEMBER_REGISTER__SEND_REGISTER_DATA,
  payload: { args }
});

export const sendRegisterDataDoneAction = (response: MemRegResp, memName: string): RegisterActions => ({
  type: MEMBER_REGISTER__SEND_REGISTER_DATA_DONE,
  payload: { response, memName }
});

export const initRegisterCompleteAction = () => ({
  type: MEMBER_REGISTER__INIT_REGISTER_COMPLETE
});

export const initRegisterCompleteDoneAction = (response: RegisterState['complete']['topsale']) => ({
  type: MEMBER_REGISTER__INIT_REGISTER_COMPLETE_DONE,
  payload: { response }
});
