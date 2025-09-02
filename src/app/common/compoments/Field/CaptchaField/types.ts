export interface CaptchaFieldProps {
  name: string;
  duration: number; // 倒數秒數
  onResend?: () => void;
}