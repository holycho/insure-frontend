import React from 'react';
import { Text00FieldProps } from './types';
import { useField } from 'formik';
import Input00 from '../../Element/Input/Input00';

const Text00Field: React.FC<Text00FieldProps> = ({ onChange, ...props }) => {
  const [field, , helpers] = useField(props.name);

  /**
   * @description 處理 onChange 執行的事件
   * @param event event object
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event);
    helpers.setTouched(true);
    field.onChange(event);
  };

  return (
    <>
      <Input00 {...field} {...props} onChange={handleChange} />
    </>
  );
};

export default Text00Field;
