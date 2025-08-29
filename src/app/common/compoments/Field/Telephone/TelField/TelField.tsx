import React from 'react';
import { TelFieldProps } from './types';
import { useField } from 'formik';

const MAX_LENGTH = 8;

const TelField: React.FC<TelFieldProps> = (props) => {
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
    <div className="form-layout-00__cell form-layout-00__cell--mobile-response">
      <div className="input-00">
        <input {...field} autoComplete="none" type="text" placeholder="電話" onChange={handleChange} />
      </div>
      <div className="form-layout-00__error-tag error-tag">{meta.error}</div>
    </div>
  );
};

export default TelField;
