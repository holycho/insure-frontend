export interface PolicyDetailFireResp {
  policyInsured: PolicyInsured;
  buildingInfo: BuildingInfo;
  policyDelivery: PolicyDelivery;
  policyInfo: PolicyInfo;
}

export interface PolicyInsured {
  name: string;
  id: string;
  birthday: string;
  mobile: string;
  telAreaNo: string;
  telNo: string;
  telExtNo: string;
  postCode: string;
  cityName: string;
  areaName: string;
  address: string;
  email: string;
  /** 若無抵押權人，則為空字串 */
  mortgageBranchName: string;
  /** 若無抵押權人，則為空字串 */
  mortgageBankName: string;
  /** 若無抵押權人，則為空字串 */
  mortgageName: string;
  isSendToBank: string;
  isInsuredOthers: string;
  occupationName: string;
  bankContact: string | null;
  contactZipCode: string | null;
  contactZipName: string | null;
  contactDistrict: string | null;
  contactFullAddress: string | null;
}

export interface BuildingInfo {
  startTime?: string;
  endTime?: string;
  buildingFullAddress: string;
  buildingYear: string;
  buildingArea: number;
  buildingAreaM: number;
  storeyAbove: number;
  buildingMaterial: string;
  buildingRoof: string;
  buildingCityName: string;
  decorationCost: number;
  policyOthers: string;
  businessFlag: string;
  movablePropertyPrice: number;
  /** 加保動產保額(萬元) */
  extraMovablePropAmount: number;
  /** 火險保額(萬元) */
  fireAmount: number;
  /** 地震險保額, 上限 150(萬元) */
  earthquakeAmount: number;
}

export interface PolicyDelivery {
  deliveryName: string;
  email: string;
}

export interface PolicyInfo {
  applyNo: string;
  policyNo: string;
  policyStatus: string;
  discount: number;
  totalFeeDiscount: number;
  totalFeeOriginal: number;
  isDualInsu: string;
  products: Product[];
  isInsuCertPrint: string; // 可否列印投保證明 (Y/N)
  isInsuFailure: string; // 是否投保失敗 (Y/N)
}

export interface Product {
  campaignName: string;
  groupOrder: number;
  groupName: string;
  planBriefDesc: string;
  planCode: string;
  planShowName: string;
  feeAfterDiscount: number;
  productProfits: ProductProfit[];
}

export interface ProductProfit {
  discount: number;
  displayAmt: string;
  profitDescZhTw: string;
  profitId: string;
}