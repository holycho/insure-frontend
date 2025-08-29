export interface SignupOtpReq {
  mobile?: string;
  email?: string;
  /** 執行動作(4-非會員驗證 7-註冊) */
  action: string;
}