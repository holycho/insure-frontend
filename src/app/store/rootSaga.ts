import { all, spawn } from 'redux-saga/effects';
import watchLoginSaga from './member/login/saga';
import watchFireSaga from './insure/fireInsurance/saga';
import watchSystemSaga from './system/saga';
import watchLayoutSaga from './layout/saga';
import watchPaymentSaga from './service/payment/saga';
import watchQueryPolicySaga from './service/queryPolicy/saga';
import watchSettingsSaga from './member/settings/saga';
import watchRegisterSaga from './member/register/saga';
import watchHomeSaga from './home/saga';
import watchActivitySaga from './activity/saga';

export default function * rootSaga () {
  yield all([
    spawn(watchLoginSaga),
    spawn(watchActivitySaga),
    spawn(watchHomeSaga),
    spawn(watchSystemSaga),
    spawn(watchFireSaga),
    spawn(watchLayoutSaga),
    spawn(watchPaymentSaga),
    spawn(watchQueryPolicySaga),
    spawn(watchSettingsSaga),
    spawn(watchRegisterSaga)
  ]);
}