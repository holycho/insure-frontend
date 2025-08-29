export interface MemReq {
  sn: string;
  name: string;
  marriage?: string;
  birthday: string;
  telAreaNo: string;
  telNo: string;
  telExtNo: string;
  mobile: string;
  postCode: string;
  cityId: string;
  areaId: string;
  address: string;
  emailAddr: string;
  groupCoLtdId: string | null;
  groupUnitId: string | null;
  groupEmpId: string | null;
  groupRelation: string | null;
  adFlag: boolean;
  inviteCode: string | null;
  /** 修改手機或郵件需走 OTP 驗證 */
  /** otp編號 */
  otpSn?: string;
  /** otp密碼 */
  otpCode?: string;
}