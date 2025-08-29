import { BankResp } from 'app/bff/models/bank';
import { Campaign } from 'app/bff/models/campaign';
import { CityAreaResp } from 'app/bff/models/cityArea';
import { MorgageResp } from 'app/bff/models/morgage';
import { OtpSendResp } from 'app/bff/models/otp/otpSend';
import { ParamsResp } from 'app/bff/models/params';
import { PaybyResp } from 'app/bff/models/payby';
import { PaymentResp } from 'app/bff/models/payment';
import { PremiumFireResp } from 'app/bff/models/premiumFire';
import { FormValues } from 'app/features/Insure/FireInsurance/Calculation/types';
import { ClausesFormValues } from 'app/features/Insure/FireInsurance/InsuranceInfo/Clauses/types';
import { InsuranceInfoFormValues } from 'app/features/Insure/FireInsurance/InsuranceInfo/types';
import { StepCodesEnum } from 'app/features/Insure/FireInsurance/types';

export interface FireState {
  static: StaticState;
  process: ProcessState;
  policy: PolicyState | null;
}

interface StaticState {
  unit: ParamsResp['enum'];
  material: ParamsResp['enum'];
  roof: ParamsResp['enum'];
  city: ParamsResp['enum'];
  cost: ParamsResp['enum'];
  emailDomain: ParamsResp['enum'];
  cityArea: CityAreaResp['city'];
  morgageBank: MorgageResp['banks'];
  payBy: PaybyResp['payBy'];
  transferBank: BankResp['banks'];
}

interface ProcessState {
  accessibleSteps: StepCodesEnum[];
  calculation: {
    data?: FormValues;
  };
  insuranceInfo: {
    data?: InsuranceInfoFormValues;
    clauses: {
      data?: ClausesFormValues;
    }
  };
  confirmInfo: {
    otpAuth: {
      otp?: OtpSendResp;
    };
  };
  payment: {
    data?: PaymentResp;
  }
}

export interface PolicyState {
  applyNo: string;
  amount: number;
  campaign: Campaign;
  premium: PremiumFireResp;
}

// Actions type constant
export const INSURE_FIRE_INSURANCE__SET_ACCESSIBLE_STEP = 'INSURE_FIRE_INSURANCE__SET_ACCESSIBLE_STEP';
export const INSURE_FIRE_INSURANCE__INIT_PROCESS = 'INSURE_FIRE_INSURANCE__INIT_PROCESS';
export const INSURE_FIRE_INSURANCE__INIT_PROCESS_DONE = 'INSURE_FIRE_INSURANCE__INIT_PROCESS_DONE';
export const INSURE_FIRE_INSURANCE__SAVE_CALCULATION_DATA = 'INSURE_FIRE_INSURANCE__SAVE_CALCULATION_DATA';
export const INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_DATA = 'INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_DATA';
export const INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_CLAUSES_DATA = 'INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_CLAUSES_DATA';
export const INSURE_FIRE_INSURANCE__SEND_OTP_DONE = 'INSURE_FIRE_INSURANCE__SEND_OTP_DONE';
export const INSURE_FIRE_INSURANCE__SAVE_POLICY_INFO = 'INSURE_FIRE_INSURANCE__SAVE_POLICY_INFO';
export const INSURE_FIRE_INSURANCE__SAVE_PAYMENT_RESULT = 'INSURE_FIRE_INSURANCE__SAVE_PAYMENT_RESULT';

export interface SetAccessiableStep {
  type: typeof INSURE_FIRE_INSURANCE__SET_ACCESSIBLE_STEP;
  payload: {
    step: StepCodesEnum;
  };
}

export interface InitProcessAction {
  type: typeof INSURE_FIRE_INSURANCE__INIT_PROCESS;
}

export interface InitProcessDoneAction {
  type: typeof INSURE_FIRE_INSURANCE__INIT_PROCESS_DONE;
  payload: {
    response: FireState['static'];
  };
}

export interface SaveCalcalationDataAction {
  type: typeof INSURE_FIRE_INSURANCE__SAVE_CALCULATION_DATA;
  payload: {
    data: FormValues;
  }
}

export interface SaveInsuranceInfoDataAction {
  type: typeof INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_DATA;
  payload: {
    data: InsuranceInfoFormValues;
  }
}

export interface SaveInsuranceInfoClausesDataAction {
  type: typeof INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_CLAUSES_DATA;
  payload: {
    data: ClausesFormValues;
  }
}

export interface SendOtpDoneAction {
  type: typeof INSURE_FIRE_INSURANCE__SEND_OTP_DONE;
  payload: {
    response: OtpSendResp;
  }
}

export interface SavePolicyInfoAction {
  type: typeof INSURE_FIRE_INSURANCE__SAVE_POLICY_INFO;
  payload: {
    policy: PolicyState;
  }
}

export interface SavePaymentResultAction {
  type: typeof INSURE_FIRE_INSURANCE__SAVE_PAYMENT_RESULT;
  payload: {
    data: PaymentResp;
  }
}

export type FireActions =
  SetAccessiableStep |
  InitProcessAction |
  InitProcessDoneAction |
  SaveCalcalationDataAction |
  SaveInsuranceInfoDataAction |
  SaveInsuranceInfoClausesDataAction |
  SendOtpDoneAction |
  SavePolicyInfoAction |
  SavePaymentResultAction;