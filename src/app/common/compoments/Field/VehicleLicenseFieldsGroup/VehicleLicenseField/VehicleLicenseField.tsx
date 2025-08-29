import React from 'react';
import { useField } from 'formik';
import Input00 from 'app/common/compoments/Element/Input/Input00';
import { VehicleLicenseFieldProps } from './types';

const VehicleLicenseField: React.FC<VehicleLicenseFieldProps> = ({ validate, ...props }) => {
  const [field, meta, helpers] = useField({ name: props.name, validate });

  /**
   * @description 車牌英文字母轉大寫
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // field.onChange(event);
    helpers.setValue(event.target.value.toUpperCase());
  };

  return (
    <div className={'form-layout-00__cell form-layout-00__cell--size-1 form-layout-00__cell--mobile-response' + (meta.error && meta.touched ? ' form-layout-00__cell--error' : '')}>
      <Input00 {...field} {...props} onChange={handleChange} />
      <div className="form-layout-00__error-tag error-tag">{meta.error}</div>
    </div>
  );
};

export default VehicleLicenseField;
