import React, { useState } from 'react';
import { Select02FieldProps } from './types';
import { useField } from 'formik';
import useOutsideClick from 'app/core/hooks/useOutsideClick';

const Select02Field: React.FC<Select02FieldProps> = ({ options, ...props }) => {
  const [field, , helper] = useField(props.name);
  const [isActive, setIsActive] = useState<boolean>(false);
  // const [selected, setSelected] = useState<string>('');
  const ref = useOutsideClick(() => {
    setIsActive(false);
  });

  /**
   * @description 處理 onChange 執行的事件
   * @param event event object
   */
  const handleChange = (value: string) => {
    // setSelected(value);
    helper.setValue(value);
  };

  // 直接檢核 field 的 value
  return (
    <div ref={ref} className={'select-02' + (field.value ? ' init' : '') + (isActive ? ' collapsed' : '') + (props.disabled ? ' select-02--disabled' : '')} onClick={() => setIsActive(!isActive)}>
      {/* 需補上 name，若檢核失敗則 focus 此欄位 */}
      <button name={props.name} className="select-header" role="button" type="button">{options.find(it => it.value === field.value)?.text ?? ''}</button>
      <div className="select-option-list-wrapper">
        <ul className="select-option-list">
          {options.map(it => (
            <li key={it.value} className="select-option-list__item" tabIndex={0} role="button" onClick={() => handleChange(it.value)} >{it.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select02Field;
