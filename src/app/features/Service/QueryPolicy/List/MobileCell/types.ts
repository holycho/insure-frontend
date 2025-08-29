import { ProdIdEnum } from 'app/bff/enums/prod';
import { Policy } from 'app/bff/models/service/policyList';

export interface MobileCellProps {
  prodId: ProdIdEnum;
  policy: Policy;
}