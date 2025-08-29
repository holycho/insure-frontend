export interface RadioGroup00FieldProps {
  name: string;
  groupClassName: string;
  itemClassName: string;
  options: RadioProps[];
}

export interface RadioProps {
  text: string;
  value: string;
  withInputField?: string;
}
