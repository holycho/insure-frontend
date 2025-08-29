import { ROUTES } from 'app/core/router';

/**
 * @description [線上投保] [住火險] 網路投保-步驟代碼
 */
export enum StepCodesEnum {
  /** Step-1-1 保費試算 */
  Calculation = '1-1',
  /** Step-1-2 選擇方案 */
  CalculationChoose = '1-2',
  /** Step-2-1 投保資料-補齊資料 */
  InsuranceInfoPatch = '2-1',
  /** Step-2-2 投保資料-條款須知 */
  InsuranceInfoClauses = '2-2',
  /** Step-3-1 確認資料-確認資料 */
  ConfirmInfo = '3-1',
  /** Step-3-2-a 確認資料-確認身份 */
  ConfirmInfoOTPAuth = '3-2-a',
  /** Step-3-2-b 確認資料-確認身份 */
  ConfirmInfoFIDOAuth = '3-2-b',
  /** Step-4-1 線上繳費-繳費方式 */
  Payment = '4-1',
  /** Step-4-2-a 線上繳費-線上繳費 (帳戶轉帳) */
  PaymentTransfer = '4-2-a',
  /** Step-4-2-b 線上繳費-線上繳費 (信用卡) */
  PaymentCreditCard = '4-2-b',
  /** Step-5 投保完成 */
  Complete = '5'
}

/**
 * @description [線上投保] [住火險] 網路投保-步驟文字
 */
export enum StepTextEnum {
  /** Step-1-1 保費試算 */
  Calculation = '保費試算',
  /** Step-1-2 選擇方案 */
  CalculationChoose = '選擇方案',
  /** Step-2 投保資料 */
  InsuranceInfo = '投保資料',
  /** Step-2-1 投保資料-補齊資料 */
  InsuranceInfoPatch = '補齊資料',
  /** Step-2-2 投保資料-條款須知 */
  InsuranceInfoClauses = '條款須知',
  /** Step-3-1 確認資料-確認資料 */
  ConfirmInfo = '確認資料',
  /** Step-3-2-a 確認資料-確認身份（OTP） */
  ConfirmInfoOTPAuth = '確認身份',
  /** Step-3-2-b 確認資料-確認身份（FIDO） */
  ConfirmInfoFIDOAuth = '確認身份（FIDO）',
  /** Step-4-1 線上繳費-繳費方式 */
  PaymentMode = '繳費方式',
  /** Step-4-2 線上繳費-線上繳費 */
  Payment = '線上繳費',
  /** Step-5 投保完成 */
  Complete = '投保完成'
}

export const RouteMatchesStep: Readonly<Record<string, StepCodesEnum>> = {
  /** Step-1-1 保費試算 */
  [ROUTES.INSURE__FIRE_INSURANCE__CALCULATION]: StepCodesEnum.Calculation,
  /** Step-1-2 保費試算 */
  [ROUTES.INSURE__FIRE_INSURANCE__CALCULATION__CHOOSE]: StepCodesEnum.CalculationChoose,
  /** Step-2-1 投保資料-補齊資料 */
  [ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO]: StepCodesEnum.InsuranceInfoPatch,
  /** Step-2-2 投保資料-條款須知 */
  [ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO__CLAUSES]: StepCodesEnum.InsuranceInfoClauses,
  /** Step-3-1 確認資料-確認資料 */
  [ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO]: StepCodesEnum.ConfirmInfo,
  /** Step-3-2-a 確認資料-確認身份 */
  [ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO__OTP_AUTH]: StepCodesEnum.ConfirmInfoOTPAuth,
  /** Step-3-2-b 確認資料-確認身份 */
  [ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO__FIDO_AUTH]: StepCodesEnum.ConfirmInfoFIDOAuth,
  /** Step-4-1 線上繳費-繳費方式 */
  [ROUTES.INSURE__FIRE_INSURANCE__PAYMENT]: StepCodesEnum.Payment,
  /** Step-4-2-a 線上繳費-線上繳費 (帳戶轉帳) */
  [ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__TRANSFER]: StepCodesEnum.PaymentTransfer,
  /** Step-4-2-b 線上繳費-線上繳費 (信用卡) */
  [ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__CREDIT_CARD]: StepCodesEnum.PaymentCreditCard,
  /** Step-5 投保完成 */
  [ROUTES.INSURE__FIRE_INSURANCE__COMPLETE]: StepCodesEnum.Complete
};

export const StepMatchesRoute: Readonly<Record<StepCodesEnum, string>> = {
  /** Step-1-1 保費試算 */
  [StepCodesEnum.Calculation]: ROUTES.INSURE__FIRE_INSURANCE__CALCULATION,
  /** Step-1-2 選擇方案 */
  [StepCodesEnum.CalculationChoose]: ROUTES.INSURE__FIRE_INSURANCE__CALCULATION__CHOOSE,
  /** Step-2-1 投保資料-補齊資料 */
  [StepCodesEnum.InsuranceInfoPatch]: ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO,
  /** Step-2-2 投保資料-條款須知 */
  [StepCodesEnum.InsuranceInfoClauses]: ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO__CLAUSES,
  /** Step-3-1 確認資料-確認資料 */
  [StepCodesEnum.ConfirmInfo]: ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO,
  /** Step-3-2-a 確認資料-確認身份 */
  [StepCodesEnum.ConfirmInfoOTPAuth]: ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO__OTP_AUTH,
  /** Step-3-2-b 確認資料-確認身份 */
  [StepCodesEnum.ConfirmInfoFIDOAuth]: ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO__FIDO_AUTH,
  /** Step-4-1 線上繳費-繳費方式 */
  [StepCodesEnum.Payment]: ROUTES.INSURE__FIRE_INSURANCE__PAYMENT,
  /** Step-4-2-a 線上繳費-線上繳費 (帳戶轉帳) */
  [StepCodesEnum.PaymentTransfer]: ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__TRANSFER,
  /** Step-4-2-b 線上繳費-線上繳費 (信用卡) */
  [StepCodesEnum.PaymentCreditCard]: ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__CREDIT_CARD,
  /** Step-5 投保完成 */
  [StepCodesEnum.Complete]: ROUTES.INSURE__FIRE_INSURANCE__COMPLETE
};
