export interface ReqHeader {
  sortPage?: SortPageReq;
}

export interface SortPageReq {
  reqPage: number;
  reqSize: number;
}