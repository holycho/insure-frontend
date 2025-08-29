import React from 'react';
import { TextFieldProps } from './types';
import { useField } from 'formik';
import Input00 from '../../Element/Input/Input00';

const TextField: React.FC<TextFieldProps> = ({ fieldSize, hintTags, toUppercase, ...props}) => {
  const [field, meta, helper] = useField(props.name);

  /**
   * @description 處理 onChange 執行的事件
   * @param event event object
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (toUppercase) {
      helper.setValue(event.target.value.toUpperCase());
    } else {
      field.onChange(event);
    }
  };

  return (
    <>
      <div className="form-layout-00__title-tag">{props.label}</div>
      <div className="form-layout-00__row">
        <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (fieldSize ? ` form-layout-00__cell--${fieldSize}` : '') + (meta.error && meta.touched ? ' form-layout-00__cell--error' : '')}>
          <Input00 {...field} {...props} onChange={handleChange} />
          {(meta.error && meta.touched) && <div className="form-layout-00__error-tag error-tag">{meta.error}</div>}
        </div>
      </div>
      {/* 提示標籤 */}
      {hintTags?.map((tag, index) => (
        <div className="form-layout-00__hint-tag hint-tag" key={index}>{tag}</div>
      ))}
    </>
  );
};

export default TextField;