import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FETCH_MEMBER_PROFILE, FetchMemberProfileAction } from './types';
import apiService from 'app/bff/services/apiService';
import { MemDetailResp } from 'app/bff/models/memDetail';
import { fetchMemberProfileDoneAction } from './actions';

function * fetchMemberProfile (action: FetchMemberProfileAction) {
  const response: MemDetailResp = yield call(apiService.postMemDetail, action.payload.args);
  if (response) {
    yield put(fetchMemberProfileDoneAction(response.mem));
  }
}

export default function * watchSystemSaga () {
  yield all([
    takeEvery(FETCH_MEMBER_PROFILE, fetchMemberProfile)
  ]);
}