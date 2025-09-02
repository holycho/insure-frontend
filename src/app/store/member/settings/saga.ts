import { all, call, put, takeEvery } from 'redux-saga/effects';
import apiService from 'app/bff/services/apiService';
import { MEMBER_SETTINGS__INIT_PROCESS, MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES, MEMBER_SETTINGS__SEND_SETTINGS_OTP, SavePersonalInfoChangesAction, SendSettingsOTPAction, SettingsState } from './types';
import { SignupOtpResp } from 'app/bff/models/signupOtp';
import { initProcessDoneAction, sendSettingsOTPDoneAction, setSettingsAccessibleStepAction } from './actions';
import { SettingsRouteMatchesStep } from 'app/features/Member/Settings/types';
import { ROUTES } from 'app/core/router';
import { push } from 'connected-react-router';
import { MemResp } from 'app/bff/models/mem';
import alertService from 'app/core/services/alertService';
import { fetchMemberProfileAction, setMemberAuthorizationAction } from 'app/store/system/actions';
import storageService from 'app/core/services/storageService';
import { StorageKeysEnum } from 'app/core/enum/storage';
import { SigninResp } from 'app/bff/models/signin';

function * initProcess () {
  const response: SettingsState['static'] = yield all({
    cityArea: call(apiService.postCityArea, {}),
    emailDomain: call(apiService.postParams, { paramType: 'emailDomain' })
  });
  // console.log(response);
  yield put(initProcessDoneAction(response));
}

function * sendSettingsOTP (action: SendSettingsOTPAction) {
  const response: SignupOtpResp = yield call(apiService.postSingupOtp, action.payload.args);
  if (response) {
    // 發送驗證 OTP
    const isEmailChanged = !!action.payload.args.email;
    const isMobileChanged = !!action.payload.args.mobile;
    yield put(sendSettingsOTPDoneAction(response, isEmailChanged, isMobileChanged));
    yield put(setSettingsAccessibleStepAction(SettingsRouteMatchesStep[ROUTES.MEMBER__SETTINGS__OTP_AUTH]));
    yield put(push(ROUTES.MEMBER__SETTINGS__OTP_AUTH));
  }
}

function * savePersonalInfoChangesAction (action: SavePersonalInfoChangesAction) {
  const response: MemResp = yield call(apiService.postMemUpd, action.payload.args);
  if (response) {
    yield put(fetchMemberProfileAction({ sn: action.payload.args.sn }));
    const memInfo = storageService.getItem(StorageKeysEnum.Authorization);
    if (memInfo) {
      const authorization: SigninResp = JSON.parse(memInfo);
      // console.log('已登入', authorization);
      if (authorization) {
        const newAuth = { ...authorization, member: { ...authorization.member, name: action.payload.args.name, needAttention: '' } };
        yield put(setMemberAuthorizationAction(newAuth));
        storageService.setItem(StorageKeysEnum.Authorization, JSON.stringify(newAuth));
      }
    }
    alertService.base('系統提醒', '資料修改成功', '確認', false, () => {
      if (action.payload.onSuccess) action.payload.onSuccess();
    });
  }
}

export default function * watchSettingsSaga () {
  yield all([
    takeEvery(MEMBER_SETTINGS__INIT_PROCESS, initProcess),
    takeEvery(MEMBER_SETTINGS__SEND_SETTINGS_OTP, sendSettingsOTP),
    takeEvery(MEMBER_SETTINGS__SAVE_PERSONAL_INFO_CHANGES, savePersonalInfoChangesAction)
  ]);
}