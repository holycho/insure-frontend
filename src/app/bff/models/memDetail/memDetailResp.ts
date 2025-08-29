export interface MemDetailResp {
  mem: Mem;
}

export interface Mem {
  id: string;
  name: string;
  mobile: string;
  birthday: string;
  gender: string;
  groupCoLtdId: string | null;
  groupEmpId: string | null;
  groupRelation: string | null;
  groupUnitId: string | null;
  marriage: string;
  telAreaNo: string;
  telExtNo: string;
  telNo: string;
  emailAddr: string;
  postCode: string;
  cityId: string;
  areaId: string;
  address: string;
  registerTime: string;
  adFlag: boolean;
  inviteCode: string | null;
}