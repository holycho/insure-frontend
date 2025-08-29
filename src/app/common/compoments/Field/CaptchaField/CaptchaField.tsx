import { useField } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { CaptchaFieldProps } from './types';

const CaptchaField: React.FC<CaptchaFieldProps> = (props) => {
  const [field, meta] = useField(props.name);
  const [rest, setRest] = useState<number>(props.duration);
  const [time, setTime] = useState<number>(Date.now());
  const restRef = useRef(rest);

  useEffect(() => {
    restRef.current = rest;
  });

  useEffect(() => {
    // 當時間更新，觸發計時器開始
    const intervalId = setInterval(() => {
      if (restRef.current === 1) {
        clearInterval(intervalId);
        setRest(restRef.current - 1);
        return;
      }
      setRest(restRef.current - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  /**
   * @description 重新發送驗證碼
   */
  const handleResend = () => {
    if (rest > 0) return;
    setTime(Date.now());
    setRest(props.duration);
    if (props.onResend) props.onResend();
  };

  return (
    <>
      <div className="form-layout-00__title-tag">驗證碼</div>
      <div className="form-layout-00__row form-layout-00__row--align-start">
        <div className={'form-layout-00__cell form-layout-00__cell--mobile-response' + (meta.error && meta.touched ? ' form-layout-00__cell--error' : '')}>
          <div className="input-00">
            <input {...field} type="text" placeholder="六位數字" maxLength={6} />
          </div>
          <div className="form-layout-00__error-tag error-tag">{meta.error}</div>
        </div>
        <button type="button" className={'form-layout-00__verification-link verification-link-00' + (rest > 0 ? ' verification-link-00--disable' : '')} onClick={handleResend}>
          重新發送驗證碼 {rest > 0 ? `${String(rest).padStart(2, '0')} 秒` : ''}
        </button>
      </div>
      <div className="form-layout-00__hint-tag hint-tag">已發送驗證碼至您的手機及電子郵件信箱，請於5分鐘內查看並輸入</div>
    </>
  );
};

export default CaptchaField;
