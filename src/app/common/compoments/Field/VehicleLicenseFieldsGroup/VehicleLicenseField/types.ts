import { FieldValidator } from 'formik';

export interface VehicleLicenseFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  validate?: FieldValidator;
}
