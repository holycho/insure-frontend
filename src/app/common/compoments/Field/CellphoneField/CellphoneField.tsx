import React from 'react';
import { CellphoneFieldProps } from './types';
import { useField } from 'formik';

const MAX_LENGTH = 10;

const CellphoneField: React.FC<CellphoneFieldProps> = (props) => {
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
    <>
      <div className="form-layout-00__title-tag">行動電話</div>
      <div className="form-layout-00__row">
        <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (meta.error && meta.touched ? ' form-layout-00__cell--error' : '')}>
          <div className="input-00">
            <input {...field} autoComplete="none" type="text" placeholder="0912345678" onChange={handleChange} />
          </div>
          <div className="form-layout-00__error-tag error-tag">{meta.error}</div>
        </div>
      </div>
    </>
  );
};

export default CellphoneField;
