import { FormValues } from 'app/features/Insure/FireInsurance/Calculation/types';
import { FireActions, FireState, INSURE_FIRE_INSURANCE__INIT_PROCESS, INSURE_FIRE_INSURANCE__INIT_PROCESS_DONE, INSURE_FIRE_INSURANCE__RESET_PROCESS, INSURE_FIRE_INSURANCE__SAVE_CALCULATION_DATA, INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_CLAUSES_DATA, INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_DATA, INSURE_FIRE_INSURANCE__SAVE_PAYMENT_RESULT, INSURE_FIRE_INSURANCE__SAVE_POLICY_INFO, INSURE_FIRE_INSURANCE__SEND_OTP_DONE, INSURE_FIRE_INSURANCE__SET_ACCESSIBLE_STEP, PolicyState } from './types';
import { StepCodesEnum } from 'app/features/Insure/FireInsurance/types';
import { InsuranceInfoFormValues } from 'app/features/Insure/FireInsurance/InsuranceInfo/types';
import { ClausesFormValues } from 'app/features/Insure/FireInsurance/InsuranceInfo/Clauses/types';
import { OtpSendResp } from 'app/bff/models/otp/otpSend';
import { PaymentResp } from 'app/bff/models/payment';

export const setAccessiableStepAction = (step: StepCodesEnum): FireActions => ({
  type: INSURE_FIRE_INSURANCE__SET_ACCESSIBLE_STEP,
  payload: { step }
});

export const initProcessAction = (): FireActions => ({
  type: INSURE_FIRE_INSURANCE__INIT_PROCESS
});

export const initProcessDoneAction = (response: FireState['static']): FireActions => ({
  type: INSURE_FIRE_INSURANCE__INIT_PROCESS_DONE,
  payload: { response }
});

export const saveCalcalationDataAction = (data: FormValues): FireActions=> ({
  type: INSURE_FIRE_INSURANCE__SAVE_CALCULATION_DATA,
  payload: { data }
});

export const saveInsuranceInfoDataAction = (data: InsuranceInfoFormValues): FireActions => ({
  type: INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_DATA,
  payload: { data }
});

export const saveInsuranceInfoClausesDataAction = (data: ClausesFormValues): FireActions => ({
  type: INSURE_FIRE_INSURANCE__SAVE_INSURANCE_INFO_CLAUSES_DATA,
  payload: { data }
});

export const sendOtpDoneAction = (response: OtpSendResp): FireActions => ({
  type: INSURE_FIRE_INSURANCE__SEND_OTP_DONE,
  payload: { response }
});

export const savePolicyInfoAction = (policy: PolicyState): FireActions => ({
  type: INSURE_FIRE_INSURANCE__SAVE_POLICY_INFO,
  payload: { policy }
});

export const savePaymentResultAction = (data: PaymentResp): FireActions => ({
  type: INSURE_FIRE_INSURANCE__SAVE_PAYMENT_RESULT,
  payload: { data }
});

export const resetProcessAction = (): FireActions => ({
  type: INSURE_FIRE_INSURANCE__RESET_PROCESS
});
