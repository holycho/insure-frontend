export interface CampaignResp {
  campaigns: Campaign[];
}

export interface Campaign {
  campaignId: string;
  campaignName: string;
  curCode: string;
  plans: Plan[];
}

export interface Plan {
  groupName: string;
  groupOrder: number;
  planCode: string;
  planShowName: string;
  planDesc: string;
  showFrontend: string;
  profits: Profit[];
  ver: number;
}

export interface Profit {
  deductibleId: string;
  deductibleVer: number;
  profitId: string;
  profitDesc: string;
  profitUnit: string;
  profitUnitName: string;
  profitUnitValue: number;
  profitAmt: number;
  profitAmtDisplay: string;
}