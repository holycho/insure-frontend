import { CityAreaResp } from 'app/bff/models/cityArea';
import { MemRegReq, MemRegResp } from 'app/bff/models/memReg';
import { ParamsResp } from 'app/bff/models/params';
import { RecommendProdResp } from 'app/bff/models/recommendProd';
import { SignupOtpReq, SignupOtpResp } from 'app/bff/models/signupOtp';
import { PersonalInfoFormValues } from 'app/features/Member/Register/PersonalInfo/types';
import { RegisterStepCodesEnum } from 'app/features/Member/Register/types';

export interface RegisterState {
  static: StaticState;
  accessibleSteps: RegisterStepCodesEnum[];
  data: PersonalInfoFormValues | null;
  otp: SignupOtpResp | null;
  complete: {
    result?: MemRegResp;
    topsale?: RecommendProdResp['topsales'];
    memName?: string;
  }
}

interface StaticState {
  cityArea: CityAreaResp['city'];
  emailDomain: ParamsResp['enum'];
}

export const MEMBER_REGISTER__SET_ACCESSIBLE_STEP = 'MEMBER_REGISTER__SET_ACCESSIBLE_STEP';
export const MEMBER_REGISTER__INIT_PROCESS = 'MEMBER_REGISTER__INIT_PROCESS';
export const MEMBER_REGISTER__INIT_PROCESS_DONE = 'MEMBER_REGISTER__INIT_PROCESS_DONE';
export const MEMBER_REGISTER__SAVE_REGISTER_DATA = 'MEMBER_REGISTER__SAVE_REGISTER_DATA';
export const MEMBER_REGISTER__SEND_REGISTER_OTP = 'MEMBER_REGISTER__SEND_REGISTER_OTP';
export const MEMBER_REGISTER__SEND_REGISTER_OTP_DONE = 'MEMBER_REGISTER__SEND_REGISTER_OTP_DONE';
export const MEMBER_REGISTER__SEND_REGISTER_DATA = 'MEMBER_REGISTER__SEND_REGISTER_DATA';
export const MEMBER_REGISTER__SEND_REGISTER_DATA_DONE = 'MEMBER_REGISTER__SEND_REGISTER_DATA_DONE';
export const MEMBER_REGISTER__INIT_REGISTER_COMPLETE = 'MEMBER_REGISTER__INIT_REGISTER_COMPLETE';
export const MEMBER_REGISTER__INIT_REGISTER_COMPLETE_DONE = 'MEMBER_REGISTER__INIT_REGISTER_COMPLETE_DONE';

export interface SetAccessibleStepAction {
  type: typeof MEMBER_REGISTER__SET_ACCESSIBLE_STEP;
  payload: {
    step: RegisterStepCodesEnum;
  };
}

export interface InitProcessAction {
  type: typeof MEMBER_REGISTER__INIT_PROCESS;
}

export interface InitProcessDoneAction {
  type: typeof MEMBER_REGISTER__INIT_PROCESS_DONE;
  payload: {
    response: RegisterState['static'];
  }
}

export interface SaveRegisterDataAction {
  type: typeof MEMBER_REGISTER__SAVE_REGISTER_DATA;
  payload: {
    data: PersonalInfoFormValues;
  };
}

export interface SendRegisterOTPAction {
  type: typeof MEMBER_REGISTER__SEND_REGISTER_OTP;
  payload: {
    args: SignupOtpReq;
  };
}

export interface SendRegisterOTPDoneAction {
  type: typeof MEMBER_REGISTER__SEND_REGISTER_OTP_DONE;
  payload: {
    response: SignupOtpResp;
  };
}

export interface SendRegisterDataAction {
  type: typeof MEMBER_REGISTER__SEND_REGISTER_DATA;
  payload: {
    args: MemRegReq;
  };
}

export interface SendRegisterDataDoneAction {
  type: typeof MEMBER_REGISTER__SEND_REGISTER_DATA_DONE;
  payload: {
    response: MemRegResp;
    memName: string;
  };
}

export interface InitCompleteAction {
  type: typeof MEMBER_REGISTER__INIT_REGISTER_COMPLETE;
}

export interface InitCompleteDoneAction {
  type: typeof MEMBER_REGISTER__INIT_REGISTER_COMPLETE_DONE;
  payload: {
    response: RegisterState['complete']['topsale'];
  }
}

export type RegisterActions =
    SetAccessibleStepAction
  | InitProcessAction
  | InitProcessDoneAction
  | SaveRegisterDataAction
  | SendRegisterOTPAction
  | SendRegisterOTPDoneAction
  | SendRegisterDataAction
  | SendRegisterDataDoneAction
  | InitCompleteAction
  | InitCompleteDoneAction;