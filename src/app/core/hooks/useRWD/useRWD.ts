import { useEffect, useState } from 'react';
import { DeviceTypeEnum } from './types';

const useRWD = () => {
  const [deviceType, setDeviceType] = useState(DeviceTypeEnum.PC);

  /**
   * @description Component unmount cleanup
   */
  useEffect(() => {
    handleRWD();

    window.addEventListener('resize', handleRWD);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    () => {
      window.removeEventListener('resize', handleRWD);
    };
  }, []);

  /**
   * @description 偵測裝置寬度變動
   */
  const handleRWD = () => {
    if (window.innerWidth > 1024) {
      setDeviceType(DeviceTypeEnum.PC);
    } else if (window.innerWidth > 576) {
      setDeviceType(DeviceTypeEnum.Tablet);
    } else {
      setDeviceType(DeviceTypeEnum.Mobile);
    }
  };

  return deviceType;
};

export default useRWD;
