import { all, call, put, takeEvery } from 'redux-saga/effects';
import { FetchApplyNoAction, FetchPolicyDetailAction, FetchPolicyListAction, FetchPolicySingleAction, SERVICE_QUERY_POLICY__FETCH_APPLY_NO, SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL, SERVICE_QUERY_POLICY__FETCH_POLICY_LIST, SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE } from './types';
import apiService from 'app/bff/services/apiService';
import { PolicyListResp } from 'app/bff/models/service/policyList';
import { fetchApplyNoDoneAction, fetchPolicyDetailDoneAction, fetchPolicyListDoneAction, fetchPolicySingleDoneAction } from './actions';
import { PolicySingleResp } from 'app/bff/models/service/policySingle';
import { VerifyApplyNoResp } from 'app/bff/models/verifyApplyNo';
import alertService from 'app/core/services/alertService';
import { ForgetStepCodesEnum } from 'app/features/Service/QueryPolicy/Auth/types';
import { PolicyDetailFireResp } from 'app/bff/models/service/policyDetailFire';
import { push } from 'connected-react-router';
import { ROUTES } from 'app/core/router';

function * fetchPolicyList (action: FetchPolicyListAction) {
  const bcType = action.payload.args.bcType; // 有分網投/網要
  const response: PolicyListResp = yield call(apiService.postServicePolicyList, action.payload.header, action.payload.args);
  if (response) {
    // 前綴 yield 以非同步執行
    yield put(fetchPolicyListDoneAction(bcType, response));
  }
}

function * fetchPolicySingle (action: FetchPolicySingleAction) {
  const response: PolicySingleResp = yield call(apiService.postServicePolicySingle, action.payload.args);
  if (response) {
    yield put(fetchPolicySingleDoneAction(response));
  }
}

function * fetchApplyNo (action: FetchApplyNoAction) {
  const response: VerifyApplyNoResp = yield call(apiService.postVerifyApplyNo, action.payload.args);
  if (response) {
    alertService.base('系統提醒', response.resultMsg);
    yield put(fetchApplyNoDoneAction(ForgetStepCodesEnum.Auth, action.payload.args.insuredId, action.payload.args.carLicense));
  }
}

function * fetchPolicyDetail (action: FetchPolicyDetailAction) {
  if (action.payload.planType === 'fire') {
    const args = {
      applyNo: action.payload.applyNo
    };
    const response: PolicyDetailFireResp = yield call(apiService.postServicePolicyDetailFire, args);
    if (response) {
      yield put(fetchPolicyDetailDoneAction('fire', response));
      const firePath = ROUTES.SERVICE__QUERY_POLICY__DETAIL_FIRE.replace(':applyNo', action.payload.applyNo);
      console.log('住火險明細', firePath);
      if (!action.payload.id) {
        yield put(push(firePath));
      } else {
        yield put(push({ pathname: firePath, state: { id: action.payload.id } }));
      }
    }
  }
}

export default function * watchQueryPolicySaga () {
  yield all([
    takeEvery(SERVICE_QUERY_POLICY__FETCH_POLICY_LIST, fetchPolicyList),
    takeEvery(SERVICE_QUERY_POLICY__FETCH_POLICY_SINGLE, fetchPolicySingle),
    takeEvery(SERVICE_QUERY_POLICY__FETCH_APPLY_NO, fetchApplyNo),
    takeEvery(SERVICE_QUERY_POLICY__FETCH_POLICY_DETAIL, fetchPolicyDetail)
  ]);
}