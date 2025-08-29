import { MoreUrl } from '../../news/list';

export interface PromoListResp {
  totalCount: number;
  promo: Promo[];
  moreUrl: MoreUrl[];
}

export interface Promo {
  sn: number;
  imgName: string;
  subject: string;
  subSubject: string;
  startTime: string;
  endTime: string;
  linkUrl: string;
  tag: string;
}
