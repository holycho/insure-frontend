import { SortPageReq } from 'app/bff/models/base';
import { News } from 'app/bff/models/news/list';
import { NewsDetailReq, NewsDetailResp } from 'app/bff/models/news/detail';
import { Promo } from 'app/bff/models/promo/list';
import { PromoDetailReq, PromoDetailResp } from 'app/bff/models/promo/detail';
import { ACTIVITY__FETCH_NEWS_DETAIL, ACTIVITY__FETCH_NEWS_DETAIL_DONE, ACTIVITY__FETCH_PROMO_DETAIL, ACTIVITY__FETCH_PROMO_DETAIL_DONE, ACTIVITY__INITIAL_NEWS, ACTIVITY__INITIAL_NEWS_DONE, ACTIVITY__INITIAL_PROMO, ACTIVITY__INITIAL_PROMO_DONE, ActivityActions } from './types';

export const initialNewsAction = (args: SortPageReq, onSuccess?: () => void): ActivityActions => ({
  type: ACTIVITY__INITIAL_NEWS,
  payload: { args, onSuccess }
});

export const initialNewsDoneAction = (totalCount: number, list: News[]): ActivityActions => ({
  type: ACTIVITY__INITIAL_NEWS_DONE,
  payload: { totalCount, list }
});

export const fetchNewsDetailAction = (args: NewsDetailReq, data: News): ActivityActions => ({
  type: ACTIVITY__FETCH_NEWS_DETAIL,
  payload: { args, data }
});

export const fetchNewsDetailDoneAction = (response: NewsDetailResp) => ({
  type: ACTIVITY__FETCH_NEWS_DETAIL_DONE,
  payload: { response }
});

export const initialPromoAction = (args: SortPageReq, onSuccess?: () => void): ActivityActions => ({
  type: ACTIVITY__INITIAL_PROMO,
  payload: { args, onSuccess }
});

export const initialPromoDoneAction = (totalCount: number, list: Promo[]) => ({
  type: ACTIVITY__INITIAL_PROMO_DONE,
  payload: { totalCount, list }
});

export const fetchPromoDetailAction = (args: PromoDetailReq, data: Promo) => ({
  type: ACTIVITY__FETCH_PROMO_DETAIL,
  payload: { args, data }
});

export const fetchPromoDetailDoneAction = (response: PromoDetailResp) => ({
  type: ACTIVITY__FETCH_PROMO_DETAIL_DONE,
  payload: { response }
});
