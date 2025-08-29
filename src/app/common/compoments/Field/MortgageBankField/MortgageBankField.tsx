import React, { useEffect, useState } from 'react';
import { MortgageBankFieldProps, OptionProps } from './types';
import { ErrorMessage, useField } from 'formik';
import { RootState } from 'app/store/types';
import { useSelector } from 'react-redux';
import Select02Field from '../Select02Field';

const MortgageBankField: React.FC<MortgageBankFieldProps> = (props) => {
  const bankState = useSelector((state: RootState) => state.insure.fireInsurance.static.morgageBank);
  const [bankField, bankMeta] = useField(props.bankCodeFName);
  const [branchField, branchMeta] = useField(props.branchCodeFName);
  const [bankOptions, setBankOptions] = useState<OptionProps[]>([{ text: '請選擇銀行', value: '' }]);
  const [branchOptions, setBranchOptions] = useState<OptionProps[]>([{ text: '請選擇分行', value: '' }]);

  useEffect(() => {
    if (bankState.length > 0) {
      const _banks = bankState.map(it => ({ text: it.bankName, value: it.bankCode }));
      _banks.unshift({ text: '請選擇銀行', value: '' });
      setBankOptions(_banks);
    }
  }, [bankState]);

  useEffect(() => {
    if (bankField.value) {
      const bank = bankState.find(it => it.bankCode === bankField.value);
      if (bank) {
        const _branches = bank.branchs.map(it => ({ text: it.branchName, value: it.branchCode }));
        _branches.unshift({ text: '請選擇分行', value: '' });
        setBranchOptions(_branches);
      }
    }
    // eslint-disable-next-line
  }, [bankField.value]);

  return (
    <>
      <div className="form-layout-00__title-tag">抵押權人</div>
      <div className="form-layout-00__row form-layout-00__row--wrap">
        <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (bankMeta.error && bankMeta.touched ? ' form-layout-00__cell--error' : '')}>
          <Select02Field name={props.bankCodeFName} options={bankOptions} />
          <ErrorMessage name={props.bankCodeFName} render={(errMsg) => (
            <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
          )} />
        </div>
        <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (branchMeta.error && branchMeta.touched ? ' form-layout-00__cell--error' : '')}>
          <Select02Field name={props.branchCodeFName} options={branchOptions} />
          <ErrorMessage name={props.branchCodeFName} render={(errMsg) => (
            <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
          )} />
        </div>
      </div>
    </>
  );
};

export default MortgageBankField;
