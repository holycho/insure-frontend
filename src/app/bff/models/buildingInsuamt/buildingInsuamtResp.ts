export interface BuildingInsuamtResp {
  usingArea: number;
  constructLevel: string;
  constructLevelDesc: string;
  rebuildPrice: number; // 重置成本 (萬元)
  fireAmount: number; // 火險保額 (萬元)
  earthquakeAmount: number; // 地震保額 (萬元)
  noDecorationRebuild: number; // 無裝潢之重置成本 (萬元)
  liabilityAmount: number; // 第三人責任險保額
  movablePropertyPrice: number; // 動產價值保額 (建築物保險金額之30%，但最高以新臺幣80萬元為限)
  propertyAmount: number; // 財物損害保額
}
