import React, { useEffect, useRef, useState } from 'react';
import { useField } from 'formik';
import { CaptchaFieldProps } from './types';

const CaptchaField: React.FC<CaptchaFieldProps> = (props) => {
  const [field, meta] = useField(props.name);
  const [rest, setRest] = useState<number>(props.duration);
  const [timestamp, setTimestamp] = useState<number>(Date.now());
  const restRef = useRef<number>(props.duration);

  /**
   * @description 利用 rest 狀態更新暫存值
   */
  useEffect(() => {
    restRef.current = rest;
  }, [rest]);

  /**
   * @description 啟動倒數計時器
   */
  useEffect(() => {
    // 當時間更新，觸發計時器開始
    const intervalId = setInterval(() => {
      // 剩餘 1 秒
      if (restRef.current === 1) {
        clearInterval(intervalId);
        setRest(restRef.current - 1);
        return;
      }
      setRest(restRef.current - 1);
    }, 1000);
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [timestamp]);

  /**
   * @description 重新發送驗證碼
   */
  const handleResend = () => {
    if (rest > 0) return;
    // 重置時間戳記與剩餘秒數後回呼重送
    setTimestamp(Date.now());
    setRest(props.duration);
    if (props.onResend) props.onResend();
  };

  /**
   * @description 時間格式化 (mm:ss)
   * @param seconds 秒數
   */
  const timeFormater = (seconds: number) => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
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
          重新發送驗證碼 {rest > 0 ? timeFormater(rest) : ''}
        </button>
      </div>
      <div className="form-layout-00__hint-tag hint-tag">{`已發送驗證碼至您的手機及電子郵件信箱，請於 ${props.duration} 秒內查看並輸入`}</div>
    </>
  );
};

export default CaptchaField;
