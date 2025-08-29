export interface VehicleLicenseFieldsGroupProps {
  name: string[];
  mode: VehicleLicenseFieldModesEnum;
  disabled?: boolean;
  hintTags?: string[];
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export enum VehicleLicenseFieldModesEnum {
  Vehicle = 'vehicle',
  Auto = 'auto',
  Moto = 'moto'
}
