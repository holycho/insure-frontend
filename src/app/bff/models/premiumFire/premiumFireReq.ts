export interface PremiumFireReq {
  planType: string;
  subPlanType: string;
  projectCode: string;
  fireAmount: number; // 火險保額 (萬元)
  earthquakeAmount: number; // 地震險保額，上限 150 (萬元)
  movablePropertyAmount: number; // 動產保額 (萬元), 火險保額的30% 或上限50萬
  effDateTime: string; // 保險起日 (核心需傳 UTC 時間，格式參照: 2019-01-01T12:34:56)
  expDateTime: string; // 保險迄日 (核心需傳 UTC 時間，格式參照: 2019-01-01T12:34:56)
}
