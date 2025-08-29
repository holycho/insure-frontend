import React, { useEffect, useRef } from 'react';
import { DatePicker00FieldProps } from './types';
import { useField } from 'formik';
import commonService from 'app/core/services/commonService';

declare const $: any;

const DatePicker00Field: React.FC<DatePicker00FieldProps> = ({ curDate, ...props }) => {
  const [field, , helpers] = useField(props.name);
  const inputElemIdRef = useRef<string>(props.id.split('.').join('-'));

  useEffect(() => {
    const inputElem = $(`#${inputElemIdRef.current}`);
    if (inputElem && inputElem.datepickerTW) {
      const now = new Date();
      inputElem.datepicker('destroy');
      inputElem.datepickerTW({
        defaultDate: now,
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
        yearRange: '1912:' + (props.maxYear ?? now.getFullYear().toString()),
        beforeShow: function () {
          setTimeout(function () {
            $('.ui-datepicker').css('z-index', 99);
          }, 0);
        },
        onSelect: function (date: string) {
          if (date) {
            helpers.setValue(commonService.convertToTWDate(date));
          }
        }
      });
    }
    // eslint-disable-next-line
  }, [inputElemIdRef]);

  /**
   * @description 若有當前日期，則更新
   */
  useEffect(() => {
    // 若無值則需放空字串，否則會放 undefined
    // (導致 formik 判定為 null[即未 touched] => 再導致 submit 無法觸發 touched)
    helpers.setValue(curDate ?? '');
  }, [helpers, curDate]);

  return (
    <div className="date-picker-00">
      <input type="text" {...field} {...props} id={inputElemIdRef.current} />
    </div>
  );
};

export default DatePicker00Field;
