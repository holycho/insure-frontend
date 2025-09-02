import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FireState, INSURE_FIRE_INSURANCE__INIT_PROCESS } from './types';
import apiService from 'app/bff/services/apiService';
import { initProcessDoneAction } from './actions';

function * initProcess () {
  const response: FireState['static'] = yield all({
    unit: call(apiService.postParams, { paramType: 'unit' }),
    material: call(apiService.postParams, { paramType: 'material' }),
    roof: call(apiService.postParams, { paramType: 'roof' }),
    city: call(apiService.postParams, { paramType: 'city' }),
    cost: call(apiService.postParams, { paramType: 'cost' }),
    payBy: call(apiService.postPayby, {}),
    transferBank: call(apiService.postBank, {}),
    // 屬於通用資料，要歸納到 system 內
    emailDomain: call(apiService.postParams, { paramType: 'emailDomain' }),
    cityArea: call(apiService.postCityArea, {}),
    morgageBank: call(apiService.postMorgage, {})
  });
  // console.log('static', response);
  yield put(initProcessDoneAction(response));
}

export default function * watchFireSaga () {
  yield all([
    takeEvery(INSURE_FIRE_INSURANCE__INIT_PROCESS, initProcess)
  ]);
}