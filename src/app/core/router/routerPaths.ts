/**
 * @description 路由路徑對照
 */
export enum ROUTES {
  /** 首頁 (module) */
  HOME = '',
  /** 首頁-主首頁 (page) */
  HOME__MAIN = '/',

  /** 線上投保 (module) */
  INSURE = '/insure',
  /** 線上投保-住火險 (module) */
  INSURE__FIRE_INSURANCE = '/insure/fire-insurance',
  /** 線上投保-住火險-保費試算 (page) */
  INSURE__FIRE_INSURANCE__CALCULATION = '/insure/fire-insurance/calculation',
  /** 線上投保-住火險-保費試算-選擇方案 (page) */
  INSURE__FIRE_INSURANCE__CALCULATION__CHOOSE = '/insure/fire-insurance/choose',
  /** 線上投保-住火險-投保資料/補齊資料 (page) */
  INSURE__FIRE_INSURANCE__INSURANCE_INFO = '/insure/fire-insurance/insurance-info',
  /** 線上投保-住火險-投保資料/條款須知 (page) */
  INSURE__FIRE_INSURANCE__INSURANCE_INFO__CLAUSES = '/insure/fire-insurance/insurance-info/clauses',
  /** 線上投保-住火險-確認資料/確認資料 (page) */
  INSURE__FIRE_INSURANCE__CONFIRM_INFO = '/insure/fire-insurance/confirm-info',
  /** 線上投保-住火險-確認資料/確認身份(OTP) (page) */
  INSURE__FIRE_INSURANCE__CONFIRM_INFO__OTP_AUTH = '/insure/fire-insurance/confirm-info/otp-auth',
  /** 線上投保-住火險-確認資料/確認身份(FIDO) (page) */
  INSURE__FIRE_INSURANCE__CONFIRM_INFO__FIDO_AUTH = '/insure/fire-insurance/confirm-info/fido-auth',
  /** 線上投保-住火險-線上繳費/繳費方式 (page) */
  INSURE__FIRE_INSURANCE__PAYMENT = '/insure/fire-insurance/payment',
  /** 線上投保-住火險-線上繳費/帳戶轉帳 (page) */
  INSURE__FIRE_INSURANCE__PAYMENT__TRANSFER = '/insure/fire-insurance/payment/transfer',
  /** 線上投保-住火險-線上繳費/信用卡 (page) */
  INSURE__FIRE_INSURANCE__PAYMENT__CREDIT_CARD = '/insure/fire-insurance/payment/credit-card',
  /** 線上投保-住火險-投保完成 (page) */
  INSURE__FIRE_INSURANCE__COMPLETE = '/insure/fire-insurance/complete',

  /** 保險服務 (module) */
  SERVICE = '/service',
  /** 保險服務-保單查詢 (module) */
  SERVICE__QUERY_POLICY = '/service/query-policy',
  /** 保險服務-保單查詢-驗身 (page) */
  SERVICE__QUERY_POLICY__AUTH = '/service/query-policy/auth',
  /** 保險服務-保單查詢-列表 (page) */
  SERVICE__QUERY_POLICY__LIST = '/service/query-policy/list',
  /** 保險服務-保單查詢-明細 (module) */
  SERVICE__QUERY_POLICY__DETAIL = '/service/query-policy/detail',
  /** 保險服務-保單查詢-明細/住火險 (page) */
  SERVICE__QUERY_POLICY__DETAIL_FIRE = '/service/query-policy/detail/fire/:applyNo',
  /** 保險服務-我要繳費 (module) */
  SERVICE__PAYMENT = '/service/payment',
  /** 保險服務-我要繳費-驗身 (page) */
  SERVICE__PAYMENT__AUTH = '/service/payment/auth',
  /** 保險服務-我要繳費-列表 (page) */
  SERVICE__PAYMENT__LIST = '/service/payment/list',

  /** 會員中心 (module) */
  MEMBER = '/member',
  /** 會員中心-會員註冊 (module) */
  MEMBER__REGISTER = '/member/register',
  /** 會員中心-會員註冊-填寫資料頁 (page) */
  MEMBER__REGISTER__PERSIONAL_INFO = '/member/register/personal-info',
  /** 會員中心-會員註冊-確認資料頁 (page) */
  MEMBER__REGISTER__CONFIRM_INFO = '/member/register/confirm-info',
  /** 會員中心-會員註冊-確認身份(OTP) (page) */
  MEMBER__REGISTER__CONFIRM_INFO__OTP_AUTH = '/member/register/confirm-info/otp-auth',
  /** 會員中心-會員註冊-完成會員註冊 (page) */
  MEMBER__REGISTER__COMPLETE = '/member/register/complete',
  /** 會員中心-會員資料修改 (page) */
  MEMBER__SETTINGS = '/member/settings',
  /** 會員中心-會員資料修改-確認身份(OTP) (page) */
  MEMBER__SETTINGS__OTP_AUTH = '/member/settings/otp-auth',

  /** 活動訊息 (module) */
  ACTIVITY = '/activity',
  /** 活動訊息-最新消息 (page) */
  ACTIVITY__NEWS = '/activity/news',
  /** 活動訊息-最新消息內頁 (page) */
  ACTIVITY__NEWS__DETAIL = '/activity/news/detail',
  /** 活動訊息-熱門活動 (page) */
  ACTIVITY__PROMO = '/activity/promo',
  /** 活動訊息-熱門活動內頁 (page) */
  ACTIVITY__PROMO__DETAIL = '/activity/promo/detail'
}
