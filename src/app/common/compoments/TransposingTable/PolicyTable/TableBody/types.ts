import { Policy } from 'app/bff/models/service/policyList';

export interface IProps {
  list: Policy[];
  prefix: string;
  planType?: string;
  id?: string;
}