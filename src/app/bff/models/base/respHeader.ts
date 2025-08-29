export interface RespHeader {
  token: string;
  sessionId: string;
  txnSeq: string;
  returnCode: string;
  returnMsg: string;
  sortPage: SortPage;
}

interface SortPage {
  reqPage: number;
  reqSize: number;
  totalCount: number;
  offset: number;
  page: number;
  size: number;
}