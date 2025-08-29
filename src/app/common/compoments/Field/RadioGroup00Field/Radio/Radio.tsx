import React from 'react';
import { InputProps } from './types';
import Input from '../Input';

const Radio: React.FC<InputProps> = ({ id, text, withInputField, disabledInput, ...props}) => {
  return (
    <div className={'radio-group-00__item radio-group-00-item' + (withInputField ? ' radio-group-00__item--mobile-full': '')}>
      <input type="radio" id={id} className="radio-group-00-item__input" {...props} />
      <label htmlFor={id} className="radio-group-00-item__label">
        <span className="radio-group-00-item__icon"></span>
        <div className={'radio-group-00-item__text text' + (withInputField ? ' radio-group-00-item__text--no-wrap' : '')}>{text}</div>
      </label>
      {/* 根據 withInputField，生成輸入欄位 */}
      {withInputField && (
        <Input name={withInputField} disabled={disabledInput} />
      )}
    </div>
  );
};

export default Radio;
