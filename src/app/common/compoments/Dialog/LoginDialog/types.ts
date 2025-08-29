export interface LoginDialogProps {
  visible: boolean;
}

export interface LoginFormValues {
  memberId: string;
  memberName?: string; // 與驗證過程中需互動呈現的會員資料
  captchaCode: string;
}

export interface LoginOTPAuthFormValues {
  otpCode: string;
}

export enum LoginStepCodesEnum {
  /** Step-1 身分證字號 & 圖形驗證碼 */
  Authentication = '1',
  /** Step-2-1 OTP 驗證 */
  OTP = '2-1'
}