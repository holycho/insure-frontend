import { ROUTES } from './routerPaths';

/**
 * @description 路由路徑對應頁面名稱(實作會員足跡功能)
 */
const RouterPathMatchesName: Readonly<Record<string, string>> = {
  [ROUTES.HOME__MAIN]: '主首頁',
  /** 線上投保-住火險-保費試算 */
  [ROUTES.INSURE__FIRE_INSURANCE__CALCULATION]: '線上投保-住火險-保費試算',
  /** 線上投保-住火險-保費試算-選擇方案 */
  [ROUTES.INSURE__FIRE_INSURANCE__CALCULATION__CHOOSE]: '線上投保-住火險-保費試算-選擇方案',
  /** 線上投保-住火險-投保資料/補齊資料 */
  [ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO]: '線上投保-住火險-投保資料/補齊資料',
  /** 線上投保-住火險-投保資料/條款須知 */
  [ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO__CLAUSES]: '線上投保-住火險-投保資料/條款須知',
  /** 線上投保-住火險-確認資料/確認資料 */
  [ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO]: '線上投保-住火險-確認資料/確認資料',
  /** 線上投保-住火險-確認資料/確認身份(OTP) */
  [ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO__OTP_AUTH]: '線上投保-住火險-確認資料/確認身份',
  /** 線上投保-住火險-確認資料/確認身份(FIDO) */
  [ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO__FIDO_AUTH]: '線上投保-住火險-確認資料/確認身份',
  /** 線上投保-住火險-線上繳費/繳費方式 */
  [ROUTES.INSURE__FIRE_INSURANCE__PAYMENT]: '線上投保-住火險-線上繳費/繳費方式',
  /** 線上投保-住火險-線上繳費/帳戶轉帳 */
  [ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__TRANSFER]: '線上投保-住火險-線上繳費/帳戶轉帳',
  /** 線上投保-住火險-線上繳費/信用卡 */
  [ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__CREDIT_CARD]: '線上投保-住火險-線上繳費/信用卡',
  /** 線上投保-住火險-投保完成 */
  [ROUTES.INSURE__FIRE_INSURANCE__COMPLETE]: '線上投保-住火險-投保完成',
  /** 會員中心-會員資料修改 */
  [ROUTES.MEMBER__SETTINGS]: '會員中心-會員資料修改',
  /** 會員中心-會員資料修改-確認身份(OTP) */
  [ROUTES.MEMBER__SETTINGS__OTP_AUTH]: '會員中心-會員資料修改-確認身份',
  /** 最新消息-列表頁 */
  [ROUTES.ACTIVITY__NEWS]: '最新消息-列表頁',
  /** 最新消息-內頁 */
  [ROUTES.ACTIVITY__NEWS__DETAIL]: '最新消息-內頁',
  /** 熱門活動-列表頁 */
  [ROUTES.ACTIVITY__PROMO]: '熱門活動-列表頁',
  /** 熱門活動-內頁 */
  [ROUTES.ACTIVITY__PROMO__DETAIL]: '熱門活動-內頁'
};

export default RouterPathMatchesName;
