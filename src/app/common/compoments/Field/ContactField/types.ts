import { City } from 'app/bff/models/cityArea';

export interface ContactFieldProps {
  isSentToBankFName: string;
  recipientFName: string;
  bankPostCodeFName: string;
  bankCityIdFName: string;
  bankAreaIdFName: string;
  bankAddressFName: string;
  dataSource: City[];
}