import { Campaign } from 'app/bff/models/campaign';
import { PremiumUI } from 'app/features/Insure/FireInsurance/Calculation/types';

export interface CollapseTable00Props {
  fireAmt: string;
  movablePropertyAmt: string;
  campaign: Campaign;
  premium: PremiumUI[];
}