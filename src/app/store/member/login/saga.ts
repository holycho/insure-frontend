import { all, call, put, takeEvery } from 'redux-saga/effects';
import apiService from 'app/bff/services/apiService';
import { fetchLoginCaptchaDoneAction, resetLoginCacheAction, saveLoginDataAction, sendLoginOTPDoneAction, setLoginCurrentStepAction, setLoginServiceStepAction } from './actions';
import { CaptchaGetResp } from 'app/bff/models/captchaGet';
import { MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA, MEMBER_LOGIN__LOGOUT, MEMBER_LOGIN__SEND_LOGIN_OTP, MEMBER_LOGIN__SIGNIN, SendLoginOTPAction, SigninAction, SetLoginServiceStepAction } from './types';
import { SigninPreResp } from 'app/bff/models/signinPre';
import { LoginStepCodesEnum } from 'app/common/compoments/Dialog/LoginDialog/types';
import { SigninResp } from 'app/bff/models/signin';
import { resetMemberAction, setMemberAuthorizationAction } from 'app/store/system/actions';
import storageService from 'app/core/services/storageService';
import { StorageKeysEnum } from 'app/core/enum/storage';
import { SignoutResp } from 'app/bff/models/signout';
import { push } from 'connected-react-router';
import { ROUTES } from 'app/core/router';
import { setDialogVisibleAction } from 'app/store/ui/actions';
import alertService from 'app/core/services/alertService';

/**
 * @description 取得圖形驗證碼
 */
function* fetchLoginCaptcha() {
  let args = {};
  if (process.env.REACT_APP_MODE === 'e2e') {
    args = {
      mode: process.env.REACT_APP_MODE
    };
  }
  const response: CaptchaGetResp = yield call(apiService.postCaptcha, args);
  if (response) {
    yield put(fetchLoginCaptchaDoneAction(response));
  }
}

/**
 * @description 發送 OTP
 */
function* sendLoginOTP(action: SendLoginOTPAction) {
  // 驗證成功後，由中台發出 OTP 驗證碼到手機或信箱上
  const response: SigninPreResp = yield call(apiService.postSigninPre, action.payload.args);
  if (response) {
    // 緩存登入資料
    const { captchaSn, ...loginData } = action.payload.args;
    yield put(saveLoginDataAction({ ...loginData, memberName: response.memberName }));
    // 緩存 OTP 資料
    yield put(sendLoginOTPDoneAction(response));
    // 進到下一步 OTP 驗證
    // console.log('登入', action.payload);
    if (action.payload.isService) {
      yield put(setLoginServiceStepAction(LoginStepCodesEnum.OTP));
    } else {
      yield put(setLoginCurrentStepAction(LoginStepCodesEnum.OTP));
    }
  }
}

/**
 * @description 執行登入及後續操作
 */
function* signin(action: SigninAction) {
  const response: SigninResp = yield call(apiService.postSignin, action.payload.args);
  if (response) {
    // 重置登入資料緩存
    yield put(resetLoginCacheAction());
    // 緩存「會員主檔」和「Access Token」至 browser storage
    storageService.setItem(StorageKeysEnum.Authorization, JSON.stringify(response));
    // 緩存「會員主檔」和「Access Token」至 store (global)
    yield put(setMemberAuthorizationAction(response));
    // 關閉「會員登入」Dialog
    yield put(setDialogVisibleAction('loginDialog', false));
    // 接續頁面
    if (action.payload.redirectURL) {
      yield put(push(action.payload.redirectURL));
    }
  }
  // 完成通知
  if (action.payload.onComplete) {
    action.payload.onComplete();
  }
}

/**
 * @description 執行登出
 */
function* logout() {
  const response: SignoutResp = yield call(apiService.postSignout, {});
  if (response) {
    alertService.base('系統提醒', '登出成功');
    // 重置會員相關資料緩存 (global)
    yield put(resetMemberAction());
    // 清除「會員主檔」和「Access Token」
    storageService.removeItem(StorageKeysEnum.Authorization);
    // 導頁至「網投首頁」
    yield put(push(ROUTES.HOME__MAIN));
  }
}

// saga 中間層監控非同步的呼叫
export default function* watchLoginSaga() {
  yield all([
    takeEvery(MEMBER_LOGIN__FETCH_LOGIN_CAPTCHA, fetchLoginCaptcha),
    takeEvery(MEMBER_LOGIN__SEND_LOGIN_OTP, sendLoginOTP),
    takeEvery(MEMBER_LOGIN__SIGNIN, signin),
    takeEvery(MEMBER_LOGIN__LOGOUT, logout)
  ]);
}
