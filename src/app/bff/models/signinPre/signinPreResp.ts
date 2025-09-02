export interface SigninPreResp {
  memberSn: string;
  memberName: string;
  duration: number; // 前端倒計時
  otpDemoTip?: string;
}