import { all, call, put, takeEvery } from 'redux-saga/effects';
import { HomeState, INITIAL_HOME_MAIN } from './types';
import apiService from 'app/bff/services/apiService';
import { PositionEnum } from 'app/bff/enums/position/positionEnum';
import { initialHomeMainDoneAction } from './actions';

function * initialHomeMain () {
  const response: HomeState['main'] = yield all({
    banner: call(apiService.postBanner, { position: PositionEnum.Main }),
    news: call(apiService.postNewsList, { reqPage: 1, reqSize: 3 }),
    promo: call(apiService.postPromoList, { reqPage: 1, reqSize: 3 })
  });
  if (response) {
    yield put(initialHomeMainDoneAction(response));
  }
}

export default function * watchHomeSaga () {
  yield all([
    takeEvery(INITIAL_HOME_MAIN, initialHomeMain)
  ]);
}