import React from 'react';
import { CodeFieldProps } from './types';
import { useField } from 'formik';

const MAX_LENGTH = 4;

const CodeField: React.FC<CodeFieldProps> = (props) => {
  const [field, meta] = useField(props.name);

  /**
   * @description 處理 onChange 執行的事件
   * @param event event object
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > MAX_LENGTH || !/^\d*$/.test(event.target.value)) return;
    field.onChange(event);
  };

  return (
    <div className="form-layout-00__cell form-layout-00__cell--size-1 form-layout-00__cell--no-shrink">
      <div className="input-00">
        <input {...field} autoComplete="none" type="text" placeholder="區碼" onChange={handleChange} />
      </div>
      <div className="form-layout-00__error-tag error-tag">{meta.error}</div>
    </div>
  );
};

export default CodeField;
