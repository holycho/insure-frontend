import { ReqHeader } from './reqHeader';

export interface BaseReq<T> {
  reqHeader: ReqHeader;
  transReq: T;
}
