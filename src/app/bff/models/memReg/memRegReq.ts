export interface MemRegReq {
  otp?: {
    sn: string;
    otpCode: string;
  }
  mem: Mem;
}

export interface Mem {
  id: string;
  name: string;
  gender: string;
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
  inviteCode: string | null;
  groupCoLtdId?: string | null;
  groupUnitId?: string | null;
  groupEmpId?: string | null;
  groupRelation?: string | null;
  programId?: string | null;
  cooperationId?: string | null;
  adFlag: boolean;
  agreeTimeMaPdp: string;
  regSource: string | null;
}