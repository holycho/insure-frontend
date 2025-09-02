import { ForgetStepCodesEnum } from 'app/features/Service/Payment/Auth/types';
import { PaymentActions, SERVICE_PAYMENT__FETCH_APPLY_NO, SERVICE_PAYMENT__FETCH_APPLY_NO_DONE, SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER, SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER_DONE, SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER, SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER_DONE, SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE, SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE_DONE, SERVICE_PAYMENT__RESET_NON_MEMBER_LOGIN_CACHE, SERVICE_PAYMENT__RESET_PAYMENT_LIST, SERVICE_PAYMENT__RESET_PAYMENT_POLICY, SERVICE_PAYMENT__RESET_PAYMENT_SINGLE, SERVICE_PAYMENT__SAVE_PAYMENT_POLICY, SERVICE_PAYMENT__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP } from './types';
import { PaymentListMemReq, PaymentListMemResp, Policy } from 'app/bff/models/service/paymentListMem';
import { PaymentListReq, PaymentListResp } from 'app/bff/models/service/paymentList';
import { VerifyApplyNoReq } from 'app/bff/models/verifyApplyNo';
import { PaymentSingleResp } from 'app/bff/models/service/paymentSingle';

export const setNonMemberLoginForgetCurrentStepAction = (step: ForgetStepCodesEnum | null): PaymentActions => ({
  type: SERVICE_PAYMENT__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP,
  payload: { step }
});

export const fetchPaymentListWithMemberAction = (args: PaymentListMemReq): PaymentActions => ({
  type: SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER,
  payload: { args }
});

export const fetchPaymentListWithMemberDoneAction = (response: PaymentListMemResp): PaymentActions => ({
  type: SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER_DONE,
  payload: { response }
});

export const fetchPaymentListWithNonMemberAction = (args: PaymentListReq): PaymentActions => ({
  type: SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER,
  payload: { args }
});

export const fetchPaymentListWithNonMemberDoneAction = (response: PaymentListResp): PaymentActions => ({
  type: SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER_DONE,
  payload: { response }
});

export const resetPaymentListAction = (): PaymentActions => ({
  type: SERVICE_PAYMENT__RESET_PAYMENT_LIST
});

export const fetchPaymentSingleAction = (id: string, applyNo: string): PaymentActions => ({
  type: SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE,
  payload: { id, applyNo }
});

export const fetchPaymentSingleDoneAction = (response: PaymentSingleResp) => ({
  type: SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE_DONE,
  payload: { response }
});

export const resetPaymentSingleAction = () => ({
  type: SERVICE_PAYMENT__RESET_PAYMENT_SINGLE
});

export const savePaymentPolicyAction = (policy: Policy): PaymentActions => ({
  type: SERVICE_PAYMENT__SAVE_PAYMENT_POLICY,
  payload: { policy }
});

export const resetPaymentPolicyAction = (): PaymentActions => ({
  type: SERVICE_PAYMENT__RESET_PAYMENT_POLICY
});

export const resetNonMemberLoginCacheAction = (): PaymentActions => ({
  type: SERVICE_PAYMENT__RESET_NON_MEMBER_LOGIN_CACHE
});

export const fetchApplyNoAction = (args: VerifyApplyNoReq): PaymentActions => ({
  type: SERVICE_PAYMENT__FETCH_APPLY_NO,
  payload: { args }
});

export const fetchApplyNoDoneAction = (step: ForgetStepCodesEnum, insuredId: string, vehicleLicense: string, demoTip?: string): PaymentActions => ({
  type: SERVICE_PAYMENT__FETCH_APPLY_NO_DONE,
  payload: { step, insuredId, vehicleLicense, demoTip }
});