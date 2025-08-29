export enum AuthTypeEnum {
  Member = 'Member',
  NonMember = 'NonMember'
}

/**
 * @description [我要繳費-登入] 忘記受理編號登入步驟代碼
 */
export enum ForgetStepCodesEnum {
  /** Step-1 查詢受理編號 */
  Inquiry = '1',
  /** Step-2 驗證受理編號 */
  Auth = '2'
}