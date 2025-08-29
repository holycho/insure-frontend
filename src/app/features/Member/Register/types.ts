import { ROUTES } from 'app/core/router';

/**
 * @description 步驟代碼
 */
export enum RegisterStepCodesEnum {
  /** Step-1 填寫資料 */
  PersonalInfo = '1',
  /** Step-2 確認資料 */
  ConfirmInfo = '2',
  /** Step-2-1 確認身份(OTP) */
  OTPAuth = '2-1',
  /** 註冊完成 */
  Complete = '3'
}

/**
 * @description 步驟文字
 */
export enum RegisterStepsTextEnum {
  /** Step-1 填寫資料 */
  PersonalInfo = '填寫資料',
  /** Step-2 確認資料 */
  ConfirmInfo = '確認資料',
  /** Step-2-1 確認身份(OTP) */
  OTPAuth = '確認身份(OTP)',
  /** 註冊完成 */
  Complete = '註冊完成'
}

/**
 * @description 路由對應步驟代碼
 */
export const RegisterRouteMatchesStep: Readonly<Record<string, RegisterStepCodesEnum>> = {
  [ROUTES.MEMBER__REGISTER__PERSIONAL_INFO]: RegisterStepCodesEnum.PersonalInfo,
  [ROUTES.MEMBER__REGISTER__CONFIRM_INFO]: RegisterStepCodesEnum.ConfirmInfo,
  [ROUTES.MEMBER__REGISTER__CONFIRM_INFO__OTP_AUTH]: RegisterStepCodesEnum.OTPAuth,
  [ROUTES.MEMBER__REGISTER__COMPLETE]: RegisterStepCodesEnum.Complete
};

/**
 * @description 步驟代碼對應路由
 */
export const RegisterStepMatchesRoute: Readonly<Record<RegisterStepCodesEnum, string>> = {
  [RegisterStepCodesEnum.PersonalInfo]: ROUTES.MEMBER__REGISTER__PERSIONAL_INFO,
  [RegisterStepCodesEnum.ConfirmInfo]: ROUTES.MEMBER__REGISTER__CONFIRM_INFO,
  [RegisterStepCodesEnum.OTPAuth]: ROUTES.MEMBER__REGISTER__CONFIRM_INFO__OTP_AUTH,
  [RegisterStepCodesEnum.Complete]: ROUTES.MEMBER__REGISTER__COMPLETE
};
