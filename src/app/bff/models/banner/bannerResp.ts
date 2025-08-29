export interface BannerResp {
  banner: Banner[];
}

export interface Banner {
  position: string;
  subject: string;
  subtitle: string;
  buttonText: string;
  linkUrl: string;
  startTime: string;
  endTime: string;
  imgName: string;
  disabled: boolean;
  message: string;
}
