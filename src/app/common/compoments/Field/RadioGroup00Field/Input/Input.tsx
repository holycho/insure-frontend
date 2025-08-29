import React from 'react';
import { InputProps } from './types';
import { useField } from 'formik';

const Input: React.FC<InputProps> = (props) => {
  const [field, ] = useField(props.name);

  return (
    <div className="radio-group-00-item__extension radio-group-00-item__extension--size-2">
      <div className="input-00">
        <input {...field} type="text" disabled={props.disabled} />
      </div>
    </div>
  );
};

export default Input;
