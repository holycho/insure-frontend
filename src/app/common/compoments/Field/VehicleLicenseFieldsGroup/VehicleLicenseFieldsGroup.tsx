import React from 'react';
import { VehicleLicenseFieldModesEnum, VehicleLicenseFieldsGroupProps } from './types';
import VehicleLicenseField from './VehicleLicenseField/VehicleLicenseField';
import validationService from 'app/core/services/validationService';

const VehicleLicenseFieldsGroup: React.FC<VehicleLicenseFieldsGroupProps> = (props) => {
  // 車牌號碼 Regular Expression
  const regexp: Readonly<Record<VehicleLicenseFieldModesEnum, RegExp>> = {
    [VehicleLicenseFieldModesEnum.Vehicle]: validationService.vehicleLicensePlateNumberRegExp,
    [VehicleLicenseFieldModesEnum.Auto]: validationService.autoLicensePlateNumberRegExp,
    [VehicleLicenseFieldModesEnum.Moto]: validationService.motoLicensePlateNumberRegExp
  };

  /**
   * @description 檢核「車牌號碼」格式
   */
  const validateVehicleLicense = () => {
    const frontFieldElem = document.querySelector<HTMLInputElement>(`input[name="${props.name[0]}"]`);
    const backFieldElem = document.querySelector<HTMLInputElement>(`input[name="${props.name[1]}"]`);
    if (!frontFieldElem || !backFieldElem) return;

    const frontFieldValue = frontFieldElem.value.toUpperCase();
    const backFieldValue = backFieldElem.value.toUpperCase();
    if (!frontFieldValue || !backFieldValue) return;

    const licensePlateNumbers = `${frontFieldValue}-${backFieldValue}`;
    const isValid = licensePlateNumbers.match(regexp[props.mode]);

    return !isValid ? '資料格式錯誤' : '';
  };

  return (
    <>
      <div className="form-layout-00__title-tag">車牌號碼</div>
      <div className="form-layout-00__row">
        {/* 前段號碼 */}
        <VehicleLicenseField name={props.name[0]} validate={validateVehicleLicense} disabled={props.disabled} />
        {/* 分隔符 */}
        <div className="form-layout-00__dash" />
        {/* 後段號碼 */}
        <VehicleLicenseField name={props.name[1]} validate={validateVehicleLicense} disabled={props.disabled} />
      </div>
      {/* 提示標籤 */}
      {props.hintTags?.map((tag, index) => (
        <div className="form-layout-00__hint-tag hint-tag" key={index}>{tag}</div>
      ))}
    </>
  );
};

export default VehicleLicenseFieldsGroup;
