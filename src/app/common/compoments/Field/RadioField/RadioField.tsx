import React from 'react';
import { RadioFieldProps } from './types';
import { useField } from 'formik';

const RadioField: React.FC<RadioFieldProps> = (props) => {
  const [field, ] = useField(props.name);

  return (
    <>
      <input
        type="radio"
        id={props.id}
        className="radio-group-00-item__input"
        {...field}
        value={props.value}
        checked={field.value === props.value}
      />
      <label htmlFor={props.id}
        className="radio-group-00-item__label radio-group-00-item__label--align-start">
        <span className="radio-group-00-item__icon"></span>
        <div className="radio-group-00-item__text text">
          {props.text}
          {props.subText && (
            <div className="radio-group-00-item__descrp">
              {props.subText}
            </div>
          )}
        </div>
      </label>
    </>
  );
};

export default RadioField;
