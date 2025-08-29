import React, { useRef } from 'react';
import { Checkbox01FieldProps } from './types';
import { useField } from 'formik';
import Checkbox01 from '../../Element/Checkbox/Checkbox01';

const Checkbox01Field: React.FC<Checkbox01FieldProps> = (props) => {
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
    // <div className="checkbox-01">
    //   <input type="checkbox" {...field} id={inputElemIdRef.current} onChange={handleChange} />
    //   <label htmlFor={inputElemIdRef.current}>
    //     <span />
    //     <div className="text">{props.children}</div>
    //   </label>
    // </div>
    <Checkbox01 {...field} id={inputElemIdRef.current} onChange={handleChange}>
      {props.children}
    </Checkbox01>
  );
};

export default Checkbox01Field;
