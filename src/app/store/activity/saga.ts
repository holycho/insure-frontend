import { all, call, put, takeEvery } from 'redux-saga/effects';
import apiService from 'app/bff/services/apiService';
import { NewsListResp } from 'app/bff/models/news/list';
import { NewsDetailResp } from 'app/bff/models/news/detail';
import { PromoListResp } from 'app/bff/models/promo/list';
import { PromoDetailResp } from 'app/bff/models/promo/detail';
import { fetchNewsDetailDoneAction, fetchPromoDetailDoneAction, initialNewsDoneAction, initialPromoDoneAction } from './actions';
import { ACTIVITY__INITIAL_NEWS, FetchNewsDetailAction, InitialNewsAction, ACTIVITY__FETCH_NEWS_DETAIL, InitialPromoAction, FetchPromoDetailAction, ACTIVITY__FETCH_PROMO_DETAIL, ACTIVITY__INITIAL_PROMO } from './types';
import { push } from 'connected-react-router';

function * initialNews (action: InitialNewsAction) {
  const response: NewsListResp = yield call(apiService.postNewsList, action.payload.args);
  if (response) {
    yield put(initialNewsDoneAction(response.totalCount, response.news));
    if (action.payload.onSuccess) action.payload.onSuccess();
  }
}

function * fetchNewsDetail (action: FetchNewsDetailAction) {
  const response: NewsDetailResp = yield call(apiService.postNewsDetail, action.payload.args);
  if (response) {
    // console.log(response);
    yield put(fetchNewsDetailDoneAction(response));
    if (action.payload.data) {
      yield put(push(action.payload.data.linkUrl));
    }
  }
}

function * initialPromo (action: InitialPromoAction) {
  const response: PromoListResp = yield call(apiService.postPromoList, action.payload.args);
  if (response) {
    yield put(initialPromoDoneAction(response.totalCount, response.promo));
    if (action.payload.onSuccess) action.payload.onSuccess();
  }
}

function * fetchPromoDetail (action: FetchPromoDetailAction) {
  const response: PromoDetailResp = yield call(apiService.postPromoDetail, action.payload.args);
  if (response) {
    yield put(fetchPromoDetailDoneAction(response));
    if (action.payload.data) {
      yield put(push(action.payload.data.linkUrl));
    }
  }
}

export default function * watchActivitySaga () {
  yield all([
    takeEvery(ACTIVITY__INITIAL_NEWS, initialNews),
    takeEvery(ACTIVITY__FETCH_NEWS_DETAIL, fetchNewsDetail),
    takeEvery(ACTIVITY__INITIAL_PROMO, initialPromo),
    takeEvery(ACTIVITY__FETCH_PROMO_DETAIL, fetchPromoDetail)
  ]);
}