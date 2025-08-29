import { InsureModeCodesEnum } from 'app/bff/enums/insurance';
import { ProdIdEnum } from 'app/bff/enums/prod';
import { ReqHeader } from 'app/bff/models/base';
import { PolicyListReq, PolicyListResp } from 'app/bff/models/service/policyList';
import { PolicySingleReq, PolicySingleResp } from 'app/bff/models/service/policySingle';
import { ForgetStepCodesEnum } from 'app/features/Service/QueryPolicy/Auth/types';
import { Policy } from 'app/bff/models/service/policyList/policyListResp';
import { VerifyApplyNoReq } from 'app/bff/models/verifyApplyNo';
import { PolicyDetailFireResp } from 'app/bff/models/service/policyDetailFire';

export interface QueryPolicyState {
  authentication: AuthenticationState;
  inquiry: InquiryState;
  list: {
    // 網投
    propose: PolicyListResp;
    // 網要
    apply: PolicyListResp;
  },
  single: {
    policy: Policy | null
  },
  detail: {
    fire: PolicyDetailFireResp | null;
  }
}

export interface InquiryState {
  plan: PlanState;
  proposePage: number; // 網投頁碼
  applyPage: number; // 網要頁碼
  pageSize: number; // 每頁比數
}

export interface PlanState {
  text: string;
  prodId: ProdIdEnum;
  planType: string;
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
export const SERVICE_QUERY_POLICY__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP = 'SERVICE_QUERY_POLICY__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP';
export const SERVICE_QUERY_POLICY__SAVE_INDUIRY_FILTER = 'SERVICE_QUERY_POLICY__SAVE_INDUIRY_FILTER';
export const SERVICE_QUERY_POLICY__FETCH_POLICY_LIST = 'SERVICE_QUERY_POLICY__FETCH_POLICY_LIST';
export const SERVICE_QUERY_POLICY__FETCH_POLICY_LIST_DONE = 'SERVICE_QUERY_POLICY__FETCH_POLICY_LIST_DONE';
export const SERVICE_QUERY_POLICY__RESET_POLICY_LIST = 'SERVICE_QUERY_POLICY__RESET_POLICY_LIST';
export const SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE = 'SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE';
export const SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE_DONE = 'SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE_DONE';
export const SERVICE_QUERY_POLICY__RESET_POLICY_SINGLE = 'SERVICE_QUERY_POLICY__RESET_POLICY_SINGLE';
export const SERVICE_QUERY_POLICY__RESET_NON_MEMBER_LOGIN_CACHE = 'SERVICE_QUERY_POLICY__RESET_NON_MEMBER_LOGIN_CACHE';
export const SERVICE_QUERY_POLICY__FETCH_APPLY_NO = 'SERVICE_QUERY_POLICY__FETCH_APPLY_NO';
export const SERVICE_QUERY_POLICY__FETCH_APPLY_NO_DONE = 'SERVICE_QUERY_POLICY__FETCH_APPLY_NO_DONE';
export const SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL = 'SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL';
export const SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL_DONE = 'SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL_DONE';

// Action creators type
export interface SetNonMemberLoginForgetCurrentStepAction {
  type: typeof SERVICE_QUERY_POLICY__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP;
  payload: {
    step: ForgetStepCodesEnum | null;
  }
}

export interface SaveInquiryFilterAction {
  type: typeof SERVICE_QUERY_POLICY__SAVE_INDUIRY_FILTER;
  payload: {
    inquiry: InquiryState;
  }
}

export interface FetchPolicyListAction {
  type: typeof SERVICE_QUERY_POLICY__FETCH_POLICY_LIST;
  payload: {
    header: ReqHeader;
    args: PolicyListReq;
  };
}

export interface FetchPolicyListDoneAction {
  type: typeof SERVICE_QUERY_POLICY__FETCH_POLICY_LIST_DONE;
  payload: {
    bcType: InsureModeCodesEnum;
    response: PolicyListResp;
  };
}

export interface ResetPolicyListAction {
  type: typeof SERVICE_QUERY_POLICY__RESET_POLICY_LIST;
}

export interface FetchPolicySingleAction {
  type: typeof SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE;
  payload: {
    header: ReqHeader,
    args: PolicySingleReq
  };
}

export interface FetchPolicySingleDoneAction {
  type: typeof SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE_DONE;
  payload: {
    response: PolicySingleResp;
  };
}

export interface ResetPolicySingleAction {
  type: typeof SERVICE_QUERY_POLICY__RESET_POLICY_SINGLE;
}

export interface ResetNonMemberLoginCacheAction {
  type: typeof SERVICE_QUERY_POLICY__RESET_NON_MEMBER_LOGIN_CACHE;
}

export interface FetchApplyNoAction {
  type: typeof SERVICE_QUERY_POLICY__FETCH_APPLY_NO;
  payload: {
    args: VerifyApplyNoReq;
  };
}

export interface FetchApplyNoDoneAction {
  type: typeof SERVICE_QUERY_POLICY__FETCH_APPLY_NO_DONE;
  payload: {
    nextStep: ForgetStepCodesEnum;
    insuredId: string;
    vehicleLicense: string;
  };
}

export interface FetchPolicyDetailAction {
  type: typeof SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL;
  payload: {
    planType: string;
    applyNo: string;
    id?: string;
  }
}

export interface FetchPolicyDetailDoneAction {
  type: typeof SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL_DONE;
  payload: {
    planType: string;
    response: PolicyDetailFireResp;
  }
}

export type QueryPolicyActions =
  SetNonMemberLoginForgetCurrentStepAction |
  SaveInquiryFilterAction |
  FetchPolicyListAction |
  FetchPolicyListDoneAction |
  ResetPolicyListAction |
  FetchPolicySingleAction |
  FetchPolicySingleDoneAction |
  ResetPolicySingleAction |
  ResetNonMemberLoginCacheAction |
  FetchApplyNoAction |
  FetchApplyNoDoneAction |
  FetchPolicyDetailAction |
  FetchPolicyDetailDoneAction;
