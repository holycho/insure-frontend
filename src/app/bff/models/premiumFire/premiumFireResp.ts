export interface PremiumFireResp {
  premium: {
    origin: {
      data: Data;
      total: number;
    };
    discount: {
      data: Data;
      total: number;
    }
  }
}

export interface Data {
  projectCode: string;
  fireAmount: number;
  earthquakeAmount: number;
  raiseAmount: number; // 加保動產保額，無加保為 0
  liabilityAmount: number; // 住綜用，固定 40,000,000，住火為 0
  propertyAmount: number; // 住綜用，固定 10,000，住火為 0
  firePremium: number;
  raisePremium: number;
  earthquakePremium: number;
  liabilityPremium: number;
  propertyPremium: number;
}
