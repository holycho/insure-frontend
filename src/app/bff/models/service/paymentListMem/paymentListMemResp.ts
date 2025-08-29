export interface PaymentListMemResp {
  online: Policy[];
  propose: Policy[];
}

export interface Policy {
  applyNo: string;
  planType: string;
  bcType: string;
  carLicense: string;
  cStartDate: string;
  cEndDate: string;
  vStartDate: string;
  vEndDate: string;
  startDate: string;
  endDate: string;
  expired?: boolean;
}