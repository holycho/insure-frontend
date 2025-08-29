export interface PaymentDetailResp {
  policy: Policy;
}

export interface Policy {
  applicantName: string;
  discount: number;
  totalFeeDiscount: number;
  prodInfo: ProdInfo[];
}

export interface ProdInfo {
  plan: Plan[];
  subPlan: Plan[];
}

export interface Plan {
  planCode: string;
  planType: string;
  expYear: number;
  ver: number;
  planShowName: string;
  insuranceCategory: string;
  profit: Profit[];
}

export interface Profit {
  profitId: string;
  description?: string;
}
