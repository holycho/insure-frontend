import React, { useEffect, useState } from 'react';
import { AddressFieldsGroupProps, OptionProps } from './types';
// import { useSelector } from 'react-redux';
// import { RootState } from 'app/store/types';
import { ErrorMessage, useField } from 'formik';
import Select02Field from '../Select02Field';

const AddressFieldsGroup: React.FC<AddressFieldsGroupProps> = (props) => {
  const [, , postCodeHelpers] = useField(props.postCodeFName);
  const [cityField, cityMeta] = useField(props.cityIdFName);
  const [areaField, areaMeta, areaHelpers] = useField(props.areaIdFName);
  const [addressField, addressMeta] = useField(props.addressFName);
  // const cityAreaState = useSelector((state: RootState) => state.insure.fireInsurance.static.cityArea);
  const [cityOptions, setCityOptions] = useState<OptionProps[]>([{ text: '請輸入', value: '' }]);
  const [areaOptions, setAreaOptions] = useState<OptionProps[]>([{ text: '請輸入', value: '' }]);

  /**
   * @description 根據來源資料更新「城市」選項，與其他欄位(行政區、郵遞區號等)初始選項
   */
  useEffect(() => {
    if (props.dataSource.length > 0) {
      const _options = props.dataSource.map(it => ({ text: it.cityName, value: it.cityId }));
      _options.unshift({ text: '請輸入', value: '' });
      setCityOptions(_options);
    }
    if (cityField.value && areaField.value) {
      const _cityId = cityField.value;
      const _areaId = areaField.value;
      const city = props.dataSource.find(it => it.cityId === _cityId);
      if (city) {
        // 更新城市可選的「行政區」
        const _options = city.area.map(it => ({ text: it.areaName, value: it.areaId }));
        _options.unshift({ text: '請輸入', value: '' });
        setAreaOptions(_options);
        const area = city.area.find(it => it.areaId === _areaId);
        if (area) {
          postCodeHelpers.setValue(area.postCode);
        }
      }
    }
    // eslint-disable-next-line
  }, [props.dataSource]);

  /**
   * @description 根據「城市」選項更新「行政區」選項
   */
  useEffect(() => {
    if (cityField.value) {
      const city = props.dataSource.find(it => it.cityId === cityField.value);
      if (city) {
        const _options = city.area.map(it => ({ text: it.areaName, value: it.areaId }));
        _options.unshift({ text: '請輸入', value: '' });
        setAreaOptions(_options);
        if (!areaField.value) areaHelpers.setValue(''); // 更換行政區時清除值
      }
    }
    // eslint-disable-next-line
  }, [cityField.value, areaField.value]);

  /**
   * @description 根據「城市」、「行政區」更新「郵遞區號」欄位
   */
  useEffect(() => {
    if (cityField.value && areaField.value) {
      const city = props.dataSource.find(it => it.cityId === cityField.value);
      if (city) {
        const area = city.area.find(it => it.areaId === areaField.value);
        if (area) {
          postCodeHelpers.setValue(area.postCode);
        }
      } else {
        postCodeHelpers.setValue('');
      }
    }
    // eslint-disable-next-line
  }, [cityField.value, areaField.value]);

  return (
    <>
      {props.label && (
        <div className="form-layout-00__title-tag">
          {props.label}
          {props.children}
        </div>
      )}
      <div className="form-layout-00__row form-layout-00__row--wrap">
        <div className="form-layout-00__cell form-layout-00__cell--auto">
          <div className="form-layout-00__row ">
            <div className={'form-layout-00__cell form-layout-00__cell--mobile-half' + (cityMeta.error && cityMeta.touched ? ' form-layout-00__cell--error' : '')}>
              <Select02Field options={cityOptions} name={props.cityIdFName} disabled={props.disabled || props.disabledCity} />
              <ErrorMessage name={props.cityIdFName} render={(errMsg) => (
                <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
              )} />
            </div>
            <div className={'form-layout-00__cell form-layout-00__cell--mobile-half' + (areaMeta.error && areaMeta.touched ? ' form-layout-00__cell--error' : '')}>
              <Select02Field options={areaOptions} name={props.areaIdFName} disabled={props.disabled} />
              <ErrorMessage name={props.areaIdFName} render={(errMsg) => (
                <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
              )} />
            </div>
          </div>
        </div>
        <div className={'form-layout-00__cell form-layout-00__cell--size-2 form-layout-00__cell--mobile-full' + (addressMeta.error && addressMeta.touched ? ' form-layout-00__cell--error' : '')}>
          <div className="input-00">
            <input {...addressField} type="text" placeholder="請輸入地址" disabled={props.disabled} />
          </div>
          <ErrorMessage name={props.addressFName} render={(errMsg) => (
            <div className="form-layout-00__error-tag error-tag">{errMsg}</div>
          )} />
        </div>
      </div>
      {/* 提示標籤 */}
      {props.hintTags?.map((tag, index) => (
        <div className="form-layout-00__hint-tag hint-tag" key={index}>{tag}</div>
      ))}
    </>
  );
};

export default AddressFieldsGroup;
