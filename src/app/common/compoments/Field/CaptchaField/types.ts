export interface CaptchaFieldProps {
  name: string;
  duration: number;
  onResend?: () => void;
}