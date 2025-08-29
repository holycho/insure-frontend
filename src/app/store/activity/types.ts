import { SortPageReq } from 'app/bff/models/base';
import { NewsDetailReq, NewsDetailResp } from 'app/bff/models/news/detail';
import { News } from 'app/bff/models/news/list';
import { PromoDetailReq, PromoDetailResp } from 'app/bff/models/promo/detail';
import { Promo } from 'app/bff/models/promo/list';

export interface ActivityState {
  news: {
    totalCount: number;
    list: News[]; // 當前頁查詢的緩存資料
    detail?: NewsDetailResp; // 明細頁
  };
  promo: {
    totalCount: number;
    list: Promo[]; // 當前頁查詢的緩存資料
    detail?: PromoDetailResp; // 明細頁
  }
}

// Action Type
export const ACTIVITY__INITIAL_NEWS = 'ACTIVITY__INITIAL_NEWS';
export const ACTIVITY__INITIAL_NEWS_DONE = 'ACTIVITY__INITIAL_NEWS_DONE';
export const ACTIVITY__FETCH_NEWS_DETAIL = 'ACTIVITY__FETCH_NEWS_DETAIL';
export const ACTIVITY__FETCH_NEWS_DETAIL_DONE = 'ACTIVITY__FETCH_NEWS_DETAIL_DONE';
export const ACTIVITY__INITIAL_PROMO = 'ACTIVITY__INITIAL_PROMO';
export const ACTIVITY__INITIAL_PROMO_DONE = 'ACTIVITY__INITIAL_PROMO_DONE';
export const ACTIVITY__FETCH_PROMO_DETAIL = 'ACTIVITY__FETCH_PROMO_DETAIL';
export const ACTIVITY__FETCH_PROMO_DETAIL_DONE = 'ACTIVITY__FETCH_PROMO_DETAIL_DONE';

export interface InitialNewsAction {
  type: typeof ACTIVITY__INITIAL_NEWS;
  payload: {
    args: SortPageReq;
    onSuccess?: () => void;
  }
}

export interface InitialNewsDoneAction {
  type: typeof ACTIVITY__INITIAL_NEWS_DONE;
  payload: {
    totalCount: number;
    list: News[];
  }
}

export interface FetchNewsDetailAction {
  type: typeof ACTIVITY__FETCH_NEWS_DETAIL;
  payload: {
    args: NewsDetailReq;
    data: News;
  }
}

export interface FetchNewsDetailDoneAction {
  type: typeof ACTIVITY__FETCH_NEWS_DETAIL_DONE;
  payload: {
    response: NewsDetailResp;
  }
}

export interface InitialPromoAction {
  type: typeof ACTIVITY__INITIAL_PROMO;
  payload: {
    args: SortPageReq;
    onSuccess?: () => void;
  }
}

export interface InitialPromoDoneAction {
  type: typeof ACTIVITY__INITIAL_PROMO_DONE;
  payload: {
    totalCount: number;
    list: Promo[];
  }
}

export interface FetchPromoDetailAction {
  type: typeof ACTIVITY__FETCH_PROMO_DETAIL;
  payload: {
    args: PromoDetailReq;
    data: Promo;
  }
}

export interface FetchPromoDetailDoneAction {
  type: typeof ACTIVITY__FETCH_PROMO_DETAIL_DONE;
  payload: {
    response: PromoDetailResp;
  }
}

export type ActivityActions =
    InitialNewsAction
  | InitialNewsDoneAction
  | FetchNewsDetailAction
  | FetchNewsDetailDoneAction
  | InitialPromoAction
  | InitialPromoDoneAction
  | FetchPromoDetailAction
  | FetchPromoDetailDoneAction;