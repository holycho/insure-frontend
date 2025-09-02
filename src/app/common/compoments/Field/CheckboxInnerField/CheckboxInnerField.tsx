import React, { useRef } from 'react';
import { CheckboxInnerFieldProps } from './types';
import { useField } from 'formik';
import CheckboxInner from '../../Element/Checkbox/CheckboxInner';

const CheckboxInnerField: React.FC<CheckboxInnerFieldProps> = (props) => {
  const [field, , helpers] = useField(props.name);
  const inputElemIdRef = useRef<string>(props.id.split('.').join('-'));

  /**
   * @description 處理 onChange 執行的事件
   * @param event event object
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    helpers.setValue(event.target.checked);
  };

  return (
    <CheckboxInner {...field} disabled={props.disabled} id={inputElemIdRef.current} onChange={handleChange}>
      {props.children}
    </CheckboxInner>
  );
};

export default CheckboxInnerField;
