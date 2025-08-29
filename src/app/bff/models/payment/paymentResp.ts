export interface PaymentResp {
  payBy: string;
  planType: string;
  applyNo: string;
  policyNo?: string;
  subPlicyNo?: string;
  amount: number;
}