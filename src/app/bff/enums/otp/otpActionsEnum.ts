/**
 * @description OTP Actions (enum)
 */
export enum OTPActionsEnum {
  /** 前台登入 */
  FrontendLogin = '1',
  /** 會員驗證 */
  MemberAuthentication = '2',
  /** 後台登入 */
  BackendLogin = '3',
  /** 非會員驗證 */
  NonMemberAuthentication = '4',
  /** 保留 */
  Reserve = '5',
  /** 投保驗證 */
  InsureAuthentication = '6',
  /** 會員註冊 */
  MemberRegister = '7'
}
