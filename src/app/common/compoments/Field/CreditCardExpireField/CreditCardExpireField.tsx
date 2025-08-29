import React from 'react';
import { CreditCardExpireFieldProps } from './types';
import { useField } from 'formik';

const CreditCardExpireField: React.FC<CreditCardExpireFieldProps> = (props) => {
  const [mmField, mmMeta] = useField(props.mmFName);
  const [yyField, yyMeta] = useField(props.yyFName);

  return (
    <div className={'credit-card-form-00-form__section' + ((mmMeta.error && mmMeta.touched) || (yyMeta.error && yyMeta.touched) ? ' form-layout-00__cell--error' : '')}>
      <div className="credit-card-form-00-form__title-tag">有效期限</div>
      <div className="credit-card-form-00-form__row credit-card-form-00-form__row--input">
        <div className="credit-card-form-00-form__cell credit-card-form-00-form__cell--mobile-no-grow">
          <div className="input-00">
            <input type="text" placeholder="MM" {...mmField} maxLength={2} />
          </div>
        </div>
        <div className="credit-card-form-00-form__slash">/</div>
        <div className="credit-card-form-00-form__cell credit-card-form-00-form__cell--mobile-no-grow">
          <div className="input-00">
            <input type="text" placeholder="YY" {...yyField} maxLength={2} />
          </div>
        </div>
      </div>
      <div className="credit-card-form-00-form__error-tag error-tag">{mmMeta.error || yyMeta.error}</div>
    </div>
  );
};

export default CreditCardExpireField;
