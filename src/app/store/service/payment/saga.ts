import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FetchApplyNoAction, FetchPaymentListWithNonMemberAction, SERVICE_PAYMENT__FETCH_APPLY_NO, SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER, SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER } from './types';
import apiService from 'app/bff/services/apiService';
import { PaymentListMemResp } from 'app/bff/models/service/paymentListMem';
import { fetchApplyNoDoneAction, fetchPaymentListWithMemberDoneAction, fetchPaymentListWithNonMemberDoneAction, resetPaymentListAction } from './actions';
import { PaymentListResp } from 'app/bff/models/service/paymentList';
import { VerifyApplyNoResp } from 'app/bff/models/verifyApplyNo';
import alertService from 'app/core/services/alertService';
import { ForgetStepCodesEnum } from 'app/features/Service/Payment/Auth/types';

function * fetchPaymentListWithMember () {
  yield put(resetPaymentListAction());
  const response: PaymentListMemResp = yield call(apiService.postServicePaymentListMem, {});
  if (response) {
    yield put(fetchPaymentListWithMemberDoneAction(response));
  }
}

function * fetchPaymentListWithNonMember (action: FetchPaymentListWithNonMemberAction) {
  yield put(resetPaymentListAction());
  const response: PaymentListResp = yield call(apiService.postServicePaymentList, action.payload.args);
  if (response) {
    console.log('非會員繳費');
    yield put(fetchPaymentListWithNonMemberDoneAction(response));
  }
}

function * fetchApplyNo (action: FetchApplyNoAction) {
  const response: VerifyApplyNoResp = yield call(apiService.postVerifyApplyNo, action.payload.args);
  if (response) {
    alertService.base('系統提醒', response.resultMsg);
    yield put(fetchApplyNoDoneAction(ForgetStepCodesEnum.Auth, action.payload.args.insuredId, action.payload.args.carLicense));
  }
}

export default function * watchPaymentSaga () {
  yield all([
    takeEvery(SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_MEMBER, fetchPaymentListWithMember),
    takeEvery(SERVICE_PAYMENT__FETCH_PAYMENT_LIST_WITH_NON_MEMBER, fetchPaymentListWithNonMember),
    takeEvery(SERVICE_PAYMENT__FETCH_APPLY_NO, fetchApplyNo)
  ]);
}