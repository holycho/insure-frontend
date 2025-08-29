import { PremiumFireResp } from 'app/bff/models/premiumFire';
import { Campaign } from 'app/bff/models/campaign';

export interface FormValues {
  building: {
    area: string;
    unit: string;
    storeyTotal: string;
    businessFlag: boolean;
    material: string;
    roof: string;
    cityId: string;
    decorationCost: string;
    effDate: string;
  };
  insuAmt: {
    fireAmtPropose: string; // 火險保額 (建議)
    movablePropertyAmtPropose: string; // 動產保額 (建議)
    fireAmt: string;
    movablePropertyFlag: boolean;
    movablePropertyAmt: string;
  };
  campaigns: Campaign[];
  premiums: PremiumUI[];
  campaignId: string;
}

export interface PremiumUI extends PremiumFireResp {
  campaignId: string;
}

export interface OptionProps {
  text: string;
  value: string;
}
