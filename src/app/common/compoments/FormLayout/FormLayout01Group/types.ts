import { Campaign } from 'app/bff/models/campaign';
import { PremiumUI } from 'app/features/Insure/FireInsurance/Calculation/types';

export interface FormLayout01GroupProps {
  name: string;
  index: number;
  fireAmt: string;
  movablePropertyAmt: string;
  campaign: Campaign;
  premium: PremiumUI[];
}
