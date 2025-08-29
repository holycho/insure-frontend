import { useEffect } from 'react';

/**
 * @description Beforeunload Hook (透過 Browser 介入防止 close、reload、back)
 * @param intervene 是否透過 Browser 介入
 */
const useBeforeunload = (intervene: boolean) => {
  useEffect(() => {
    intervene && window.addEventListener('beforeunload', handleBeforeunload);
    return () => { intervene && window.removeEventListener('beforeunload', handleBeforeunload); };
  }, [intervene]);

  const handleBeforeunload = (event: BeforeUnloadEvent) => {
    const e = event || window.event;
    e.preventDefault();
    // if (e) e.returnValue = '';
    return '';
  };
};

export default useBeforeunload;
