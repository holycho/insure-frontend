import React from 'react';
import { ContactFieldProps } from './types';
import { useField } from 'formik';
import AddressFieldsGroup from '../AddressFieldsGroup';

const ContactField: React.FC<ContactFieldProps> = (props) => {
  const [isSentToBankField, isSentToBankMeta] = useField(props.isSentToBankFName);
  const [recipientField, recipientMeta] = useField(props.recipientFName);
  // console.log(recipientMeta);

  return (
    <>
      <div className="form-layout-00__title-tag">
        保單是否寄送銀行（抵押權人）？
      </div>
      <div className="form-layout-00__row">
        <div className="form-layout-00__cell form-layout-00__cell--full">
          <div className="form-layout-00__row  form-layout-00__row--no-flex">
            <div className={'form-layout-00__cell form-layout-00__cell--mt16 form-layout-00__cell--100' + (recipientMeta.error ? ' form-layout-00__cell--error' : '')}>
              <div className=" radio-group-00-item ">
                <input
                  type="radio"
                  id="send-policy-yes"
                  className="radio-group-00-item__input"
                  {...isSentToBankField}
                  value="Y"
                  checked={isSentToBankField.value === 'Y'}
                />
                <label htmlFor="send-policy-yes" className="radio-group-00-item__label">
                  <span className="radio-group-00-item__icon"></span>
                  <div className="radio-group-00-item__text radio-group-00-item__text--no-wrap text">是，收件人
                  </div>
                </label>
                <div className="radio-group-00-item__extension radio-group-00-item__extension--flex ">
                  <div className="input-00">
                    <input {...recipientField} type="text" disabled={isSentToBankField.value === 'N'} maxLength={100} />
                  </div>
                </div>
              </div>
              <div className="form-layout-00__error-tag error-tag">{recipientMeta.error}</div>
            </div>

            <div className="form-layout-00__cell form-layout-00__cell--bigger-gap-v form-layout-00__cell--100">
              <AddressFieldsGroup dataSource={props.dataSource} postCodeFName={props.bankPostCodeFName} cityIdFName={props.bankCityIdFName} areaIdFName={props.bankAreaIdFName} addressFName={props.bankAddressFName} disabled={isSentToBankField.value === 'N'} />
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--bigger-gap-v form-layout-00__cell--100">
              <div className="radio-group-00-item">
                <input
                  type="radio"
                  id="send-policy-no"
                  className="radio-group-00-item__input"
                  {...isSentToBankField}
                  value="N"
                  checked={isSentToBankField.value === 'N'}
                />
                <label htmlFor="send-policy-no" className="radio-group-00-item__label">
                  <span className="radio-group-00-item__icon"></span>
                  <div className="radio-group-00-item__text text">否</div>
                </label>
              </div>
              <div className="form-layout-00__error-tag error-tag">{isSentToBankMeta.error}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactField;
