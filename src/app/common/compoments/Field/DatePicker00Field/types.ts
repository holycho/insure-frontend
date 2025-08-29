export interface DatePicker00FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  /** 可選擇最大年份 */
  maxYear?: number;
  /** 初始日期 */
  curDate?: string;
};