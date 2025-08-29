import React from 'react';
import { AgreementFieldProps } from './types';
import { useField } from 'formik';
import dayjs from 'dayjs';

const AgreementField: React.FC<AgreementFieldProps> = ({ id, ...props }) => {
  const [field, , helpers] = useField(props.name);

  /**
   * @description 處理 onChange 執行的事件
   * @param event event object
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Checkbox 勾選時，field value 設為當下時間
    helpers.setValue(event.target.checked ? dayjs().format('YYYY/MM/DD HH:mm:ss') : '');
  };

  return (
    <div className="checkbox-00">
      {/* 若 field value 有時間戳記字串時，則顯示為勾選 */}
      <input type="checkbox" className="checkbox-group-01" id={id} {...field} {...props} checked={field.value} onChange={handleChange} />
      <label htmlFor={id}>
        <span></span>
        <div className="text">本人已閱覽並同意上述相關告知事項</div>
      </label>
    </div>
  );
};

export default AgreementField;
