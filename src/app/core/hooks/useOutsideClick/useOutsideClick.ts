import { useEffect, useRef } from 'react';

// 以 declare 宣告三方套件，Jest 測試案例會過不了
// declare const $: any;
import $ from 'jquery';

export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 追加 JQuery.ClickEvent 確保 ts 編譯正常
    const handleClickOutside = (event: MouseEvent | TouchEvent | JQuery.ClickEvent) => {
      // 點擊元件外部區域
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    $('body').on('click', handleClickOutside);
    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);
    return () => {
      $('body').off('click', handleClickOutside);
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [callback]);

  return ref;
};