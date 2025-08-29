import React from 'react';
import { CreditCardScodeFieldProps } from './types';
import { useField } from 'formik';

const CreditCardScodeField: React.FC<CreditCardScodeFieldProps> = (props) => {
  const [field, meta] = useField(props.name);

  return (
    <div className={'credit-card-form-00-form__section' + (meta.error && meta.touched ? ' form-layout-00__cell--error' : '')}>
      <div className="credit-card-form-00-form__title-tag">安全碼（卡片背面三碼）</div>
      <div className="credit-card-form-00-form__row credit-card-form-00-form__row--input">
        <div className="credit-card-form-00-form__cell credit-card-form-00-form__cell--mobile-no-grow">
          <div className="input-00 credit-card-form-00-form__safe-code-input">
            <input placeholder="000" type="text" {...field} maxLength={3} />
          </div>
        </div>
      </div>
      <div className="credit-card-form-00-form__error-tag error-tag">{meta.error}</div>
    </div>
  );
};

export default CreditCardScodeField;
