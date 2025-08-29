import { all, call, put, takeEvery } from 'redux-saga/effects';
import { LAYOUT__INITIAL_HEADER_AND_FOOTER } from './types';
import apiService from 'app/bff/services/apiService';
import { LinkUrlResp } from 'app/bff/models/linkUrl';
import { initialHeaderAndFooterDoneAction } from './actions';

function * initialHeaderAndFooter () {
  const response: LinkUrlResp = yield call(apiService.postLinkUrl, { page: ['header'] });
  if (response) {
    yield put(initialHeaderAndFooterDoneAction(response));
  }
}

export default function * watchLayoutSaga () {
  yield all([
    takeEvery(LAYOUT__INITIAL_HEADER_AND_FOOTER, initialHeaderAndFooter)
  ]);
}