import { ForgetStepCodesEnum } from 'app/features/Service/QueryPolicy/Auth/types';
import { InquiryState, QueryPolicyActions, SERVICE_QUERY_POLICY__FETCH_APPLY_NO, SERVICE_QUERY_POLICY__FETCH_APPLY_NO_DONE, SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL, SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL_DONE, SERVICE_QUERY_POLICY__FETCH_POLICY_LIST, SERVICE_QUERY_POLICY__FETCH_POLICY_LIST_DONE, SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE, SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE_DONE, SERVICE_QUERY_POLICY__RESET_NON_MEMBER_LOGIN_CACHE, SERVICE_QUERY_POLICY__RESET_POLICY_LIST, SERVICE_QUERY_POLICY__RESET_POLICY_SINGLE, SERVICE_QUERY_POLICY__SAVE_INDUIRY_FILTER, SERVICE_QUERY_POLICY__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP } from './types';
import { ReqHeader } from 'app/bff/models/base';
import { PolicyListReq, PolicyListResp } from 'app/bff/models/service/policyList';
import { InsureModeCodesEnum } from 'app/bff/enums/insurance';
import { PolicySingleReq, PolicySingleResp } from 'app/bff/models/service/policySingle';
import { VerifyApplyNoReq } from 'app/bff/models/verifyApplyNo';
import { PolicyDetailFireResp } from 'app/bff/models/service/policyDetailFire';

export const setNonMemberLoginForgetCurrentStepAction = (step: ForgetStepCodesEnum | null): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__SET_NON_MEMBER_LOGIN_FORGET_CURRENT_STEP,
  payload: { step }
});

export const saveInquiryFilterAction = (inquiry: InquiryState): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__SAVE_INDUIRY_FILTER,
  payload: { inquiry }
});

export const fetchPolicyListAction = (header: ReqHeader, args: PolicyListReq): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__FETCH_POLICY_LIST,
  payload: { header, args }
});

export const fetchPolicyListDoneAction = (bcType: InsureModeCodesEnum, response: PolicyListResp): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__FETCH_POLICY_LIST_DONE,
  payload: { bcType, response }
});

export const resetPolicyListAction = (): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__RESET_POLICY_LIST
});

export const fetchPolicySingleAction = (header: ReqHeader, args: PolicySingleReq): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE,
  payload: { header, args }
});

export const fetchPolicySingleDoneAction = (response: PolicySingleResp): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE_DONE,
  payload: { response }
});

export const resetPolicySingleAction = (): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__RESET_POLICY_SINGLE
});

export const resetNonMemberLoginCacheAction = (): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__RESET_NON_MEMBER_LOGIN_CACHE
});

export const fetchApplyNoAction = (args: VerifyApplyNoReq): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__FETCH_APPLY_NO,
  payload: { args }
});

export const fetchApplyNoDoneAction = (nextStep: ForgetStepCodesEnum, insuredId: string, vehicleLicense: string, demoTip?: string): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__FETCH_APPLY_NO_DONE,
  payload: { nextStep, insuredId, vehicleLicense, demoTip }
});

export const fetchPolicyDetailAction = (planType: string, applyNo: string, id?: string): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL,
  payload: { planType, applyNo, id }
});

export const fetchPolicyDetailDoneAction = (planType: string, response: PolicyDetailFireResp): QueryPolicyActions => ({
  type: SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL_DONE,
  payload: { planType, response }
});