import { City } from 'app/bff/models/cityArea';

export interface AddressFieldsGroupProps {
  label?: string;
  postCodeFName: string;
  cityIdFName: string;
  areaIdFName: string;
  addressFName: string;
  dataSource: City[];
  disabledCity?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  hintTags?: string[];
}

export interface OptionProps {
  text: string;
  value: string;
}
