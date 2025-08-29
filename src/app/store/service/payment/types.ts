import { PaymentListReq, PaymentListResp } from 'app/bff/models/service/paymentList';
import { PaymentListMemReq, PaymentListMemResp, Policy } from 'app/bff/models/service/paymentListMem';
import { PaymentSingleResp } from 'app/bff/models/service/paymentSingle';
import { VerifyApplyNoReq } from 'app/bff/models/verifyApplyNo';
import { ForgetStepCodesEnum } from 'app/features/Service/Payment/Auth/types';

// State type
export interface PaymentState {
  authentication: AuthenticationState;
  list: {
    online: PaymentListMemResp['online'];
    propose: PaymentListMemResp['propose'];
  };
  single: {
    policy: Policy | null;
  };
  paymentPolicy?: Policy; // 繳費明細
}

export interface AuthenticationState {
  nonMember: {
    login: {
      forget: {
        currentStep: ForgetStepCodesEnum | null;
        insuredId?: string; // 身份證字號
        vehicleLicense?: string; // 車牌號碼
      }
    }
  }
}

// Actions type constant
export const SERVICE_PAYMENT__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP = 'SERVICE_PAYMENT__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP';
export const SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER = 'SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER';
export const SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER_DONE = 'SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER_DONE';
export const SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER = 'SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER';
export const SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER_DONE = 'SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER_DONE';
export const SERVICE_PAYMENT__RESET_PAYMENT_LIST = 'SERVICE_PAYMENT__RESET_PAYMENT_LIST';
export const SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE = 'SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE';
export const SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE_DONE = 'SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE_DONE';
export const SERVICE_PAYMENT__RESET_PAYMENT_SINGLE = 'SERVICE_PAYMENT__RESET_PAYMENT_SINGLE';
export const SERVICE_PAYMENT__SAVE_PAYMENT_POLICY = 'SERVICE_PAYMENT__SAVE_PAYMENT_POLICY';
export const SERVICE_PAYMENT__RESET_PAYMENT_POLICY = 'SERVICE_PAYMENT__RESET_PAYMENT_POLICY';
export const SERVICE_PAYMENT__RESET_NON_MEMBER_LOGIN_CACHE = 'SERVICE_PAYMENT__RESET_NON_MEMBER_LOGIN_CACHE';
export const SERVICE_PAYMENT__FETCH_APPLY_NO = 'SERVICE_PAYMENT__FETCH_APPLY_NO';
export const SERVICE_PAYMENT__FETCH_APPLY_NO_DONE = 'SERVICE_PAYMENT__FETCH_APPLY_NO_DONE';

// Action creators type
export interface SetNonMemberLoginForgetCurrentStepAction {
  type: typeof SERVICE_PAYMENT__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP;
  payload: {
    step: ForgetStepCodesEnum | null;
  };
}

export interface FetchPaymentListWithMemberAction {
  type: typeof SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER;
  payload: {
    args: PaymentListMemReq
  }
}

export interface FetchPaymentListWithMemberDoneAction {
  type: typeof SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER_DONE;
  payload: {
    response: PaymentListMemResp
  }
}

export interface FetchPaymentListWithNonMemberAction {
  type: typeof SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER;
  payload: {
    args: PaymentListReq;
  }
}

export interface FetchPaymentListWithNonMemberDoneAction {
  type: typeof SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER_DONE;
  payload: {
    response: PaymentListResp
  }
}

export interface ResetPaymentListAction {
  type: typeof SERVICE_PAYMENT__RESET_PAYMENT_LIST;
}

export interface FetchPaymentSingleAction {
  type: typeof SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE;
  payload: {
    id: string;
    applyNo: string;
  };
}

export interface FetchPaymentSingleDoneAction {
  type: typeof SERVICE_PAYMENT__FETCH_PAYMENT_SINGLE_DONE;
  payload: {
    response: PaymentSingleResp
  }
}

export interface ResetPaymentSingleAction {
  type: typeof SERVICE_PAYMENT__RESET_PAYMENT_SINGLE;
}

export interface SavePaymentPolicyAction {
  type: typeof SERVICE_PAYMENT__SAVE_PAYMENT_POLICY;
  payload: {
    policy: Policy
  }
}

export interface ResetPaymentPolicyAction {
  type: typeof SERVICE_PAYMENT__RESET_PAYMENT_POLICY;
}

export interface ResetNonMemberLoginCacheAction {
  type: typeof SERVICE_PAYMENT__RESET_NON_MEMBER_LOGIN_CACHE;
}

export interface FetchApplyNoAction {
  type: typeof SERVICE_PAYMENT__FETCH_APPLY_NO;
  payload: {
    args: VerifyApplyNoReq;
  }
}

export interface FetchApplyNoDoneAction {
  type: typeof SERVICE_PAYMENT__FETCH_APPLY_NO_DONE;
  payload: {
    step: ForgetStepCodesEnum;
    insuredId: string;
    vehicleLicense: string;
  };
}

export type PaymentActions =
  SetNonMemberLoginForgetCurrentStepAction |
  FetchPaymentListWithMemberAction |
  FetchPaymentListWithMemberDoneAction |
  FetchPaymentListWithNonMemberAction |
  FetchPaymentListWithNonMemberDoneAction |
  ResetPaymentListAction |
  FetchPaymentSingleAction |
  FetchPaymentSingleDoneAction |
  ResetPaymentSingleAction |
  SavePaymentPolicyAction |
  ResetPaymentPolicyAction |
  ResetNonMemberLoginCacheAction |
  FetchApplyNoAction |
  FetchApplyNoDoneAction;