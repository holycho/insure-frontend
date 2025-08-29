export interface CaptchaCanvasProps extends React.CanvasHTMLAttributes<HTMLCanvasElement> {
  width: number;
  height: number;
  code: string;
}