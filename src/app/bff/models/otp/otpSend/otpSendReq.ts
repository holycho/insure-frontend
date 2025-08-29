export interface OtpSendReq {
  action: string;
  otpLength?: string;
  memberId: string;
  mobile?: string;
  email?: string;
}