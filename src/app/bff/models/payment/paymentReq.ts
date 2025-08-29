export interface PaymentReq {
  payBy: string;
  planType: string;
  applyNo: string; // 要保號碼
  amount: number; // 繳費金額
  paymentData: CcData | CaData;
}

// 信用卡（payBy='5'）
export interface CcData {
  ccNo: string;
  ccExpire: string;
  ccScode: string;
}

// 活期帳戶（payBy='6'）
export interface CaData {
  caBankCode: string;
  caBankBranchCode?: string;
  caBankName: string;
  caAccountNo: string;
  caTermAgreeTime: string;
}
