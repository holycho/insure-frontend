/**
 * Created by EIJI on 2014/1/3.
 * 源碼請至 https://github.com/apolkingg8/JQueryDatePickerTW
 * 因為源碼有部分bug, 所以我們有根據 bug 的狀況做了修正, 請看標有 "NEUX REVIEW" 註解的部分
 */

(function () {
  // NEUX REVIEW : 移除沒有使用到的變數宣告
  // var yearTextSelector = '.ui-datepicker-year';

  // NEUX REVIEW : 移除全域變數
  // var dateNative = new Date(),
  //   dateTW = new Date(
  //     dateNative.getFullYear() - 1911,
  //     dateNative.getMonth(),
  //     dateNative.getDate()
  //   );

  // 補0函式
  var padLeft = function (str, len) {
    // NEUX REVIEW
    // 這邊這一行判斷string length在源碼沒有做型別防呆，所以如果不補上toString, 最後會導致NAN錯誤, 所以這部分我們做了修正
    // if (str.length >= len) {
    if (str.toString().length >= len) {
      return str;
    } else {
      return padLeft(("0" + str), len);
    }
  };


  // 應該有更好的做法
  var funcColle = {
    onSelect: {
      basic: function (dateText, inst) {
        /*
        var yearNative = inst.selectedYear < 1911
            ? inst.selectedYear + 1911 : inst.selectedYear;*/
        // NEUX REVIEW : 移除全域變數相關的code
        // dateNative = new Date(inst.selectedYear, inst.selectedMonth, inst.selectedDay);

        // 年分小於100會被補成19**, 要做例外處理
        var yearTW = inst.selectedYear > 1911
          ? padLeft(inst.selectedYear - 1911, 4)
          : inst.selectedYear;
        var monthTW = padLeft(inst.selectedMonth + 1, 2);
        var dayTW = padLeft(inst.selectedDay, 2);

        // NEUX REVIEW： 把dateTW改為這個scope底下的 變數
        var dateTW = new Date(
          yearTW + '-' +
          monthTW + '-' +
          dayTW + 'T00:00:00.000Z'
        );

        return $.datepicker.formatDate(twSettings.dateFormat, dateTW);
      }
    }
  };

  var twSettings = {
    closeText: '關閉',
    prevText: '上個月',
    nextText: '下個月',
    currentText: '今天',
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    weekHeader: '周',
    dateFormat: 'yy/mm/dd',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: true,
    yearSuffix: '年',

    onSelect: function (dateText, inst) {
      $(this).val(funcColle.onSelect.basic(dateText, inst));
      if (typeof funcColle.onSelect.newFunc === 'function') {
        funcColle.onSelect.newFunc(dateText, inst);
      }
    }
  };

  // 把yearText換成民國
  var replaceYearText = function (minGuoDateStr) {
    var $yearText = $('.ui-datepicker-year');

    if (twSettings.changeYear !== true) {
      $yearText.text('民國' + minGuoDateStr.split('/')[0]);
    } else {
      // 下拉選單
      if ($yearText.prev('span.datepickerTW-yearPrefix').length === 0) {
        $yearText.before("<span class='datepickerTW-yearPrefix'>民國</span>");
      }
      $yearText.children().each(function () {
        if (parseInt($(this).text()) > 1911) {
          $(this).text(parseInt($(this).text()) - 1911);
        }
      });
    }
  };

  //NEUX REVIEW : 新增一個可以把dateString(規定必須是yy/mm/dd格式)轉換成date Object的函數
  var dateStrToDate = function (dateStr) {
    var dateObj = new Date(dateStr);
    return dateObj
  }
  //NEUX REVIEW : 新增一個可以把民國年dateString(規定必須是yy/mm/dd格式)轉換成西元年dateString的函數
  var minGuoStrToCeStr = function (minGuoStr) {
    var arr = minGuoStr.split('/');
    var ceStr = parseInt(arr[0]) + 1911 + '/' + arr[1] + '/' + arr[2];
    return ceStr;
  }

  //NEUX REVIEW : 新增一個可以把西元年dateString(規定必須是yy/mm/dd格式)轉換成民國年dateString的函數
  var ceStrToMinGuoStr = function (ceStr) {
    var arr = ceStr.split('/');
    var minGuoStr = parseInt(arr[0]) - 1911 + '/' + arr[1] + '/' + arr[2];
    return minGuoStr;
  }

  //NEUX REVIEW : 新增一個可以產生輸入date物件的的民國年字串的函數
  var dateToMinguoStr = function (dateInput) {
    return (dateInput.getFullYear() - 1911) + '/' + padLeft((dateInput.getMonth() + 1), 2) + '/' + dateInput.getDate();
  }



  $.fn.datepickerTW = function (options) {
    // NEUX REVIEW : 把input強制設定為readonly, 避免手機版彈出鍵盤
    $(this).attr('readonly', true);

    // NEUX REVIEW : 把原本在click handler 內部的變數提到外層, 並修改原本的boolean判斷和原本的變數名字
    var inputHasValue = (!!$(this).val());
    var inputValueMinGuoNow = inputHasValue ? $(this).val() : dateToMinguoStr(new Date());

    // NEUX REVIEW :  把原始值用data方法暫存
    $(this).data('original-minguo-value', inputValueMinGuoNow);

    // setting on init,
    if (typeof options === 'object') {
      //onSelect例外處理, 避免覆蓋
      if (typeof options.onSelect === 'function') {
        funcColle.onSelect.newFunc = options.onSelect;
        options.onSelect = twSettings.onSelect;
      }
      // year range正規化成西元, 小於1911的數字都會被當成民國年
      if (options.yearRange) {
        var temp = options.yearRange.split(':');
        for (var i = 0; i < temp.length; i += 1) {
          //民國前處理
          if (parseInt(temp[i]) < 1) {
            temp[i] = parseInt(temp[i]) + 1911;
          } else {
            temp[i] = parseInt(temp[i]) < 1911
              ? parseInt(temp[i]) + 1911
              : temp[i];
          }
        }
        options.yearRange = temp[0] + ':' + temp[1];
      }
      // if input val not empty
      // NEUX REVIEW : 修改原本的boolean判斷, 改為使用變數
      if (inputHasValue) {
        options.defaultDate = $(this).val();
      }
    }

    // setting after init
    if (arguments.length > 1) {
      // 目前還沒想到正常的解法, 先用轉換成init setting obj的形式
      if (arguments[0] === 'option') {
        options = {};
        options[arguments[1]] = arguments[2];
      }
    }

    // override settings
    $.extend(twSettings, options);

    // init
    $(this).datepicker(twSettings);

    // beforeRender
    $(this).on('click', function () {
      //NEUX REVIEW ：變數宣告的scope錯誤, 把這個變數提到handler外層
      // var isFirstTime = ($(this).val() === '');

      // NEUX REVIEW ： 開啟一個可以用來存放最後到底是用了inputValueNow or dateNative 的變數
      var finalInputDate = new Date();

      // NEUX REVIEW ： 比照當前的值有沒有跟初期存好的value一樣
      var inputNoValue = !$(this).val();
      var inputValueNow = $(this).val() ? $(this).val() : dateToMinguoStr(new Date());
      var inputValueNow = inputValueNow;
      var originalValue = $(this).data('original-minguo-value');
      var valIsNotChanged = inputValueNow === $(this).data('original-minguo-value');

      // year range and default date

      if ((twSettings.defaultDate || twSettings.yearRange) && valIsNotChanged) {

        if (twSettings.defaultDate) {
          // NEUX REVIEW : 修正給錯的setDate值
          $(this).datepicker('setDate', minGuoStrToCeStr(originalValue));
          finalInputDate = dateStrToDate(minGuoStrToCeStr(originalValue));
        }

        // 當有year range時, select初始化設成range的最末年
        if (twSettings.yearRange) {
          var $yearSelect = $('.ui-datepicker-year'),
            nowYear = twSettings.defaultDate
              ? $(this).datepicker('getDate').getFullYear()
              : new Date().getFullYear();

          $yearSelect.children(':selected').removeAttr('selected');
          if ($yearSelect.children('[value=' + nowYear + ']').length > 0) {
            $yearSelect.children('[value=' + nowYear + ']').attr('selected', 'selected');
          } else {
            $yearSelect.children().last().attr('selected', 'selected');
          }
        }
      }
      else {
        $(this).datepicker('setDate', minGuoStrToCeStr(inputValueNow));
        finalInputDate = dateStrToDate(minGuoStrToCeStr(inputValueNow));
      }
      var finalInputDateStr = $.datepicker.formatDate(twSettings.dateFormat, finalInputDate);

      $(this).data('final-input-date-string', finalInputDateStr)
      $(this).val(ceStrToMinGuoStr(finalInputDateStr));


      replaceYearText(finalInputDateStr);

      //NEUX REVIEW ：移除不需要的value清除操作
      if (inputNoValue) {
        $(this).val('');
      }
    });

    // // afterRender
    $(this).focus(function () {
      replaceYearText($(this).data('final-input-date-string'));
    });

    return this;
  };

})();