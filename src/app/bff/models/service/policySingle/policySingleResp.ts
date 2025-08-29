import { Policy } from 'app/bff/models/service/policyList/policyListResp';

export interface PolicySingleResp {
  policy: Policy | null;
}