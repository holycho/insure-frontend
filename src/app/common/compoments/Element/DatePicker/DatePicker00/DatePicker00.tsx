import React, { useEffect, useRef, useState } from 'react';
import { DatePicker00Props } from './types';
import commonService from 'app/core/services/commonService';

declare const $: any;

const DatePicker00: React.FC<DatePicker00Props> = (props) => {
  const inputElemIdRef = useRef<string>(props.id);
  const [value, setValue] = useState<string>('');

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
        yearRange: '1912:' + now.getFullYear().toString(),
        beforeShow: function () {
          setTimeout(function () {
            $('.ui-datepicker').css('z-index', 99);
          }, 0);
        },
        onSelect: function (date: string) {
          if (date) {
            setValue(commonService.convertToTWDate(date));
          }
        }
      });
    }
  }, [inputElemIdRef]);

  return (
    <div className="date-picker-00">
      <input type="text" {...props} id={inputElemIdRef.current} value={value} />
    </div>
  );
};

export default DatePicker00;
