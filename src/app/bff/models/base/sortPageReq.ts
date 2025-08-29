import { SortDirectionsEnum } from 'app/bff/enums/sort';

export interface SortPageReq {
  reqPage: number;
  reqSize: number;
  reqSort?: ReqSort;
}

export interface ReqSort {
  startTime?: SortDirectionsEnum;
  applyNo?: SortDirectionsEnum;
}
