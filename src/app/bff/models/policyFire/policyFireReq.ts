export interface PolicyFireReq {
  bcType: string;
  productId: string;
  policyApplicant: PolicyApplicant;
  policyInfo: PolicyInfo;
  buildingInfo: BuildingInfo;
  mortgage: Mortgage;
  policyDelivery: {
    delivery: string;
  }
}

export interface PolicyApplicant {
  name: string;
  id: string;
  idType: string;
  birthday: string;
  mobile: string;
  telAreaNo: string;
  telNo: string;
  telExtNo: string;
  postCode: string;
  cityId: string;
  areaId: string;
  address: string;
  email: string;
  hearingDisability: string;
  feeSource: string;
  feeSourceNote?: string;
  occDomain: string;
  occId: string;
}

export interface PolicyInfo {
  startTime?: string;
  endTime?: string;
  campaignId?: string;
  agreeTime: string;
  programId?: string;
  isDualInsu: string;
  discount: number;
  totalFeeDiscount: number;
  products: Product[];
}

export interface Product {
  planCode: string;
  planType: string;
  subPlanType: string;
  ver: number;
  fixedFee: number;
  feeAfterDiscount: number;
  profits: Profit[];
}

export interface Profit {
  /** 給付項目代碼 */
  profitId: string;
  /** 實際保額 */
  amt: number;
  /** 顯示保額 */
  displayAmt: string;
  /** 原始保費 */
  fee: number;
  /** 優惠保費 */
  discount: number;
  /** 自負額代碼 */
  deductibleId: string;
  /** 自負額版本 */
  deductibleVer: number;
}

export interface BuildingInfo {
  buildingPostCode: string;
  buildingCityId: string;
  buildingAreaId: string;
  buildingAddress: string;
  buildingFullAddress: string;
  buildingYear: string;
  buildingArea: number;
  buildingAreaM: number;
  storeyAbove: number;
  businessFlag: string;
  buildingMaterial: string;
  buildingRoof: string;
  decorationCost: number;
  buildingGrade: string;
  buildingGradeDescription: string;
  rebuildPrice: number;
  noDecorationRebuild: number;
  movablePropertyPrice: number;
  fireAmount: number;
  extraMovablePropAmount: number;
  earthquakeAmount: number;
}

export interface Mortgage {
  mortgageBank: string | null;
  mortgageBankName: string | null;
  mortgageBranch: string | null;
  mortgageBranchName: string | null;
  bankContact: string | null;
  contactZipCode: string | null;
  contactZipName: string | null;
  contactDistrict: string | null;
  contactFullAddress: string | null;
}
