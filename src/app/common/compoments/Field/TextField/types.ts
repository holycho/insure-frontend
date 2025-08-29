export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  fieldSize?: string; // auto, size-2
  hintTags?: string[];
  toUppercase?: boolean;
}