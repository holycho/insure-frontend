import React from 'react';
import { useField } from 'formik';
import { CreditCardFieldProps } from './types';

const CreditCardField: React.FC<CreditCardFieldProps> = (props) => {
  const [field1, meta1] = useField(props.no1stFName);
  const [field2, meta2] = useField(props.no2ndFName);
  const [field3, meta3] = useField(props.no3rdFName);
  const [field4, meta4] = useField(props.no4thFName);

  return (
    <div className={'credit-card-form-00-form__section' + (((meta1.error && meta1.touched) || (meta2.error && meta2.touched) || (meta3.error && meta3.touched) || (meta4.error && meta4.touched)) ? ' form-layout-00__cell--error' : '')}>
      <div className="credit-card-form-00-form__title-tag">卡號</div>
      <div className="credit-card-form-00-form__row credit-card-form-00-form__row--input">
        <div className="credit-card-form-00-form__cell">
          <div className="input-00">
            <input placeholder="0000" type="text" {...field1} maxLength={4} />
          </div>
        </div>
        <div className="credit-card-form-00-form__cell">
          <div className="input-00">
            <input placeholder="0000" type="text" {...field2} maxLength={4} />
          </div>
        </div>
        <div className="credit-card-form-00-form__cell">
          <div className="input-00">
            <input placeholder="0000" type="text" {...field3} maxLength={4} />
          </div>
        </div>
        <div className="credit-card-form-00-form__cell">
          <div className="input-00">
            <input placeholder="0000" type="text" {...field4} maxLength={4} />
          </div>
        </div>
      </div>
      <div className="credit-card-form-00-form__error-tag error-tag">{meta1.error || meta2.error || meta3.error || meta4.error}</div>
    </div>
  );
};

export default CreditCardField;
