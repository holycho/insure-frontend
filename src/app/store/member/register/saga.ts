import { all, call, put, takeEvery } from 'redux-saga/effects';
import { MEMBER_REGISTER__INIT_PROCESS, MEMBER_REGISTER__INIT_REGISTER_COMPLETE, MEMBER_REGISTER__SEND_REGISTER_DATA, MEMBER_REGISTER__SEND_REGISTER_OTP, RegisterState, SendRegisterDataAction, SendRegisterOTPAction } from './types';
import apiService from 'app/bff/services/apiService';
import { SignupOtpResp } from 'app/bff/models/signupOtp';
import { initRegisterCompleteDoneAction, initProcessDoneAction, sendRegisterDataDoneAction, sendRegisterOTPDoneAction, setAccessibleStepAction } from './actions';
import { RegisterRouteMatchesStep, RegisterStepCodesEnum } from 'app/features/Member/Register/types';
import { push } from 'connected-react-router';
import { ROUTES } from 'app/core/router';
import { MemRegResp } from 'app/bff/models/memReg';
import { RecommendProdResp } from 'app/bff/models/recommendProd';

function * initProcess () {
  const response: RegisterState['static'] = yield all({
    cityArea: call(apiService.postCityArea, {}),
    emailDomain: call(apiService.postParams, { paramType: 'emailDomain' })
  });
  yield put(initProcessDoneAction(response));
}

function * sendRegisterOTP (action: SendRegisterOTPAction) {
  const response: SignupOtpResp = yield call(apiService.postSingupOtp, action.payload.args);
  if (response) {
    yield put(sendRegisterOTPDoneAction(response));
    const nextRoute = ROUTES.MEMBER__REGISTER__CONFIRM_INFO__OTP_AUTH;
    // 將「確認身份」頁步驟 (Step-2-1) 設為可訪問步驟
    yield put(setAccessibleStepAction(RegisterRouteMatchesStep[nextRoute]));
    // 導頁至「確認身份」頁 (Step-2-1)
    yield put(push(nextRoute));
  }
}

function * sandRegisterData (action: SendRegisterDataAction) {
  const response: MemRegResp = yield call(apiService.postMemRegister, action.payload.args);
  if (response) {
    // 完成會員註冊
    const memName = action.payload.args.mem.name;
    yield put(sendRegisterDataDoneAction(response, memName));
    const nextRoute = ROUTES.MEMBER__REGISTER__COMPLETE;
    // 將「註冊成功」頁步驟 (Step-3) 設為可訪問步驟
    yield put(setAccessibleStepAction(RegisterRouteMatchesStep[nextRoute]));
    // 導頁至「註冊成功」頁 (Step-3)
    yield put(push(nextRoute));
  }
}

function * initComplete () {
  const response: RecommendProdResp = yield call(apiService.postRecommendProd, {});
  if (response) {
    yield put(initRegisterCompleteDoneAction(response['topsales']));
  }
}

export default function * watchRegisterSaga () {
  yield all([
    takeEvery(MEMBER_REGISTER__INIT_PROCESS, initProcess),
    takeEvery(MEMBER_REGISTER__SEND_REGISTER_OTP, sendRegisterOTP),
    takeEvery(MEMBER_REGISTER__SEND_REGISTER_DATA, sandRegisterData),
    takeEvery(MEMBER_REGISTER__INIT_REGISTER_COMPLETE, initComplete)
  ]);
}