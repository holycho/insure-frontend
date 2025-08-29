export interface RecommendProdResp {
  topsales: Topsale[];
}

export interface Topsale {
  prodId: string;
  prodName: string;
  prodIntro: string;
  linkUrl: string;
  imgRectangleName: string;
}