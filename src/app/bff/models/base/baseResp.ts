import { RespHeader } from './respHeader';

export interface BaseResp<T> {
  respHeader: RespHeader;
  transResp: T;
}