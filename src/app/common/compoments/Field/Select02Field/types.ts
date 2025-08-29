export interface Select02FieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

export interface Option {
  value: string;
  text: string;
}