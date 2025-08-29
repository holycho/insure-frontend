import { ROUTES } from 'app/core/router';

/**
 * @description [會員資料修改] 步驟代碼
 */
export enum SettingsStepCodesEnum {
  /** Step-1 會員資料修改 */
  Settings = '1',
  /** Step-2 確認身份 */
  SettingsOTPAuth = '2'
}

/**
 * @description [會員資料修改] 路由對應步驟代碼
 */
export const SettingsRouteMatchesStep: Readonly<Record<string, SettingsStepCodesEnum>> = {
  /** Step-1 會員資料修改 */
  [ROUTES.MEMBER__SETTINGS]: SettingsStepCodesEnum.Settings,
  /** Step-2 確認身份 */
  [ROUTES.MEMBER__SETTINGS__OTP_AUTH]: SettingsStepCodesEnum.SettingsOTPAuth
};
