import { Award } from '../../news/detail';

export interface PromoDetailResp {
  subject: string;
  subSubject: string;
  imgName: string;
  partnerImgName: string;
  startTime: string;
  endTime: string;
  subPromo: SubPromo[];
  notice: string[];
}

export interface SubPromo {
  subject: string;
  subSubject: string;
  startTime: string;
  endTime: string;
  awards: Award[];
  head: string[];
  winners?: Winner[];
}

export interface Winner {
  award: string;
  prize: string;
  winnerName: string;
  policyNo: string;
}
