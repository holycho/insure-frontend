import { PlanTypesEnum } from 'app/bff/enums/plan';
import { InsureModeCodesEnum } from 'app/bff/enums/insurance';

export interface PaymentListMemReq {
  planType?: PlanTypesEnum;
  bcType?: InsureModeCodesEnum;
}
