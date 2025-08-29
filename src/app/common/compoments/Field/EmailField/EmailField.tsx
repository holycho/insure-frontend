import React, { useState } from 'react';
import { EmailFieldProps } from './types';
import { useField } from 'formik';
import useOutsideClick from 'app/core/hooks/useOutsideClick';

const EmailField: React.FC<EmailFieldProps> = (props) => {
  const [field, meta, helpers] = useField(props.name);
  const [isActive, setIsActive] = useState<boolean>(false);
  const ref = useOutsideClick(() => {
    setIsActive(false);
  });
  // const emailDomainState = useSelector((state: RootState) => state.insure.fireInsurance.static.emailDomain);

  /**
   * @description 顯示/隱藏「自動完成項目列表」
   * @param event event object
   */
  const toogleAutoCompleteList = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.includes('@')) setIsActive(true);
    else setIsActive(false);
    field.onChange(event);
  };

  /**
   * @description 處理郵件網域 onClick 執行的事件
   * @param emailDomain
   */
  const handleItemClick = (emailDomain: string) => {
    helpers.setValue(field.value + emailDomain);
    setIsActive(false);
  };

  return (
    <>
      <div className="form-layout-00__title-tag">
        電子郵件
      </div>
      <div className="form-layout-00__row">
        <div className={'form-layout-00__cell form-layout-00__cell--size-2 form-layout-00__cell--mobile-response' + (meta.error && meta.touched ? ' form-layout-00__cell--error' : '')}>
          <div ref={ref} className={'input-01' + (isActive ? ' input-01--collapsed' : '')}>
            <input {...field} type="text" autoComplete="none" placeholder="請輸入電子郵件地址" onChange={toogleAutoCompleteList} />
            {/* 顯示 email domain 列表 */}
            {isActive && (
              <ul className="input-01__list">
                {props.emailDomain.map((emailDomain, index) => (
                  <li key={`emialDomain-${index}`} className="input-01__item" onClick={() => handleItemClick(emailDomain.paramValue)} >
                    {field.value}{emailDomain.paramValue}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="form-layout-00__error-tag error-tag">{meta.error}</div>
        </div>
      </div>
      {/* <div className="form-layout-00__hint-tag hint-tag">若選擇電子保單，將寄送至此電子郵件信箱。</div> */}
      {props.hintTags?.map((tag, index) => (
        <div className="form-layout-00__hint-tag hint-tag" key={index}>{tag}</div>
      ))}
    </>
  );
};

export default EmailField;
