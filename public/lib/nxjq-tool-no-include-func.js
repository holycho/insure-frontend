// 這隻檔案是給套版廠商實際套用的, 因為套版過程中不需要includeHTMl 的函數（而且這個函數在弱點掃描時容易被掃出問題）, 所以這個版本的js特別移除掉該函數, 以利套版工作進行


/**
 * debounce函數, 用來把一個函數包裝成debounced function
 * 若不清楚何謂"debounce", 請查閱 https://mropengate.blogspot.com/2017/12/dom-debounce-throttle.html
 *  
 * @param {*} func 想被包裝的函數
 * @param {*} wait delay的秒數(以毫秒計)
 * @param {*} immediate 是否忽略wait time, 改為立即發動(例如以resize事件來講, 這邊給true就會讓函數在第一次resize開始的瞬間觸發 )
 * 
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
/**
 * throttle函數, 用來把一個函數包裝成throttled function
 * 若不清楚何謂"throttle", 請查閱 https://mropengate.blogspot.com/2017/12/dom-debounce-throttle.html
 *  
 * @param {*} func 想被包裝的函數
 * @param {*} threshhold 調整觸發頻率後的觸發週期(以毫秒計)
 */


function throttle(func, threshhold) {
  var last, timer;
  if (threshhold) threshhold = 250;
  return function () {
    var context = this;
    var args = arguments;
    var now = +new Date();

    if (last && now < last + threshhold) {
      clearTimeout(timer);
      timer = setTimeout(function () {
        last = now;
        func.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      func.apply(context, args);
    }
  };
}
/**
 * 綁定resize(debounced)事件
 *
 * 
 * @param {number} waitTime debounce的 delay time
 * @param {function} fn resize(debounced)事件發生後的callback
 * @param {boolean} preventTriggeringWhenDetectNoWidthChange 是否避免在沒有偵測到寬度變化時觸發
 */


function bindWindowResizedEvent(waitTime, fn) {
  var preventTriggeringWhenDetectNoWidthChange = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var windowWidth = $(window).width();

  var cbForNoWidthChange = function cbForNoWidthChange() {
    var newWindowWidth = $(window).width();

    if (newWindowWidth !== windowWidth) {
      fn();
      windowWidth = newWindowWidth;
    }
  };

  var cbForNormalCase = fn;
  var debounceCb = preventTriggeringWhenDetectNoWidthChange ? cbForNoWidthChange : cbForNormalCase;
  $(window).on('resize', debounce(debounceCb, waitTime));
}
/**
 * 綁定scrollEvent(debounced)事件
 * 
 * @param {*} target 被觸發scroll的目標(window,element,selector,..etc.)
 * @param {number} waitTime scrollEvent(debounced) 的debounce delay time (毫秒)
 * @param {function} fn 被包裝的function
 */


function bindScrolledEvent(target, waitTime, fn) {
  if (typeof waitTime === "function") {
    fn = waitTime;
    waitTime = 200;
  }

  var timer;
  $(target).on('scroll', function () {
    var self = $(this);

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(function () {
      fn.call(self[0]);
    }, waitTime);
  });
}
/**
 * 輸入一個值, 還有最大/最小值, 然後根據輸入的變數是否超過最大值/低於最小值, 來決定要返回 原本的值, 或返回最大值或最小值
 *
 * 
 * @param {number} input 輸入的數字
 * @param {number} maximum 最大值
 * @param {number} minimum 最小值
 * @returns {number} 最後可以讓得到的值不超過/低於 最大/最小 範圍
 */


function extremumProof(input, maximum, minimum) {
  var output = input > maximum ? maximum : input;
  output = input < minimum ? minimum : output;
  return output;
}
/**
 * 確認某個值有沒有在array裡面
 *
 * 
 * @param {*} value 值
 * @param {object} array 目標陣列
 * @returns {boolean} 是/否
 */


function isInArray(value, array) {
  return array.indexOf(value) > -1;
}
/**
 * transitionend事件 的 瀏覽器 前綴 polyfill
 */


var transitionend = "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend";
/**
 * 統一 touchEvent/mouseEvent 的事件觸發座標取得方式
 * 
 * @param {object}  傳入的event 物件
 * @returns {Object} 一個物件, 內含事件觸發座標的X/Y 座標值
 */

function pointerEventToXY(e) {
  var out = {
    x: 0,
    y: 0
  };

  if (e.type === 'touchstart' || e.type === 'touchmove' || e.type === 'touchend' || e.type === 'touchcancel') {
    var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
    out.x = touch.pageX;
    out.y = touch.pageY;
  } else if (e.type === 'mousedown' || e.type === 'mouseup' || e.type === 'mousemove' || e.type === 'mouseover' || e.type === 'mouseout' || e.type === 'mouseenter' || e.type === 'mouseleave') {
    out.x = e.pageX;
    out.y = e.pageY;
  }

  return out;
}
/**
 * 直接呼叫hasOwnProperty的原型方法(用在hasOwnProperty被改動過的狀況)
 *
 * 
 * @param {object} target 目標物件
 * @param {string} prop 目標prop
 * @returns {boolean} 是/否
 */


function targetHasProp(target, prop) {
  return Object.prototype.hasOwnProperty.call(target, prop);
}
/**
 * 確認一個變數/值是否為空(0不算空值)
 * 
 * @param {*} val
 * @returns {boolean} 是/否
 */


function isEmpty(val) {
  return typeof val === 'number' ? isNaN(val) : !val;
}
/**
 * 輸入一個date物件, 然後返回該date 物件的月份一共有幾天
 *
 * 
 * @param {Object} anyDateInMonth date物件 
 * @returns {Number} 當月的天數
 */


function getDaysInMonthByDate(anyDateInMonth) {
  return new Date(anyDateInMonth.getFullYear(), anyDateInMonth.getMonth() + 1, 0).getDate();
}
/**
 * 確認是否為移動裝置
 * 
 * @returns {boolean} 是否為移動裝置
 */


function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
}
/**
 * 如果字串長度不滿Ｎ, 則在字串頭補上{N-字串長度}個"0"
 * @param {*} length 最大字串長度
 * @returns {string} 改寫後的字串
 */


function paddingZeroOnLeft(str, length) {
  var string = "".concat(str);
  if (string.length >= length) return string; else return paddingZeroOnLeft("0" + string, length);
}
/**
 * 取得特定元素(限定單一節點)中唯一node的視覺寬度(px)
 * 
 * @param {*} element 特定元素(強調只能有單一節點, 如果超過一個節點會報錯)
 * @returns {number} 寬度
 */


function getNodeContentWidth(element) {
  var range = document.createRange();
  range.selectNodeContents(element);
  var rects = range.getClientRects(); //回傳值預設為-1

  var nodeContentWidth = -1;

  if (rects.length > 1) {
    console.warn('函數"getNodeContentWidth"只支援當指定element中只有單元素或單一文字節點的狀況');
  } else {
    if (!isEmpty(rects[0])) {
      nodeContentWidth = rects[0].width;
    } else {
      nodeContentWidth = 0;
    }
  }

  return nodeContentWidth;
}
/**
 * 徑度量轉度度量
 * 
 * @param {number} element 徑度量
 * @returns {number} 度度量
 */


function radianToDegree(radian) {
  var degree = radian / Math.PI * 180;
  return degree;
}
/**
 * 座標轉角度
 *
 * 
 * @param {*} x 指定的座標值Ｘ
 * @param {*} y 指定的座標值Ｙ
 * @param {*} centerX 坐標系原點Ｘ
 * @param {*} centerY 坐標系原點Ｙ
 * @returns {number} 取得角度(度度量)
 */


function getAngleFromCoordinate(x, y, centerX, centerY) {
  var angle = 90 + radianToDegree(Math.atan2(y - centerY, x - centerX));

  if (angle < 0) {
    angle = 360 + angle;
  }

  return angle;
}
/**
 * 確認值是否為數字(排除無限大的狀況)
 *
 * 
 * @param {*} value 值
 * @returns {boolean} 是/否
 */


function isNumber(value) {
  return typeof value === 'number' && isFinite(value);
}
/**
 * 返回輸入字串的字元長度(中文字算兩個字元, 英文與空白算一個)
 *
 * 
 * @param {string} inputText
 * @returns {Number}  textLength  字元長度
 */


function getCharacterLengthOfString(inputText) {
  var textLength = inputText.replace(/[^\x00-\xff]/g, "pp").length + (inputText.match(/\n/g) || []).length;
  return textLength;
}
/**
 *用表達式判斷一串字串裡面有沒有全型字
 *
 * 
 * @param {string} text 想要檢驗的字串
 * @returns {boolean} 有/沒有全型字
 */


function hasFullTypeChar(text) {
  var re = /[^\x00-\xff]/g;
  if (re.test(text)) return true;
  return false;
}
/**
 *用表達式判斷一串字串裡面有沒有半型字
 *
 * 
 * @param {string} text 想要檢驗的字串
 * @returns {boolean} 有/沒有半型字
 */


function hasHalfTypeChar(text) {
  var re = /[\u0000-\u00ff]/g;
  if (re.test(text)) return true;
  return false;
}
/**
 * 檢驗一個物件是不是dom node，返回布林值
 *
 * 
 * @param {Object} 想要被檢驗的物件
 * @returns {Boolean} 是/否
 */


function isNode(o) {
  return (typeof Node === "undefined" ? "undefined" : _typeof(Node)) === "object" ? o instanceof Node : o && _typeof(o) === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
}
/**
 * 檢驗一個物件是不是dom element，返回布林值
 *
 * 
 * @param {Object} 想要被檢驗的物件
 * @returns {Boolean} 是/否
 */


function isElement(o) {
  return (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
    o && _typeof(o) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
}
/**
 * 應對舊版IE 的window物件底下沒有提供console.log 方法, 而會導致在call console.log時會報錯的問題
 *
 * 
 */


function preventIEError() {
  // 預防IE出錯
  if (window.console === undefined) {
    var em = function em() { };

    window.console = {
      log: em,
      debug: em,
      info: em,
      warn: em
    };
  }

  if (console.log === undefined || console.log === 'undefined') {
    var _em = function _em() { };

    console.log = _em;
  }

  if (console.debug === undefined || console.debug === 'undefined') {
    var _em2 = function _em2() { };

    console.debug = _em2;
  }

  if (console.info === undefined || console.info === 'undefined') {
    var _em3 = function _em3() { };

    console.info = _em3;
  }

  if (console.warn === undefined || console.warn === 'undefined') {
    var _em4 = function _em4() { };

    console.warn = _em4;
  } // end : 預防IE出錯

}

/**
 * 輸入任何數字 return 含有千分位的數字字串，小數點以後依照國際規範推薦不用千分位
 *
 * @param {Number} value 輸入任何數字
 * @return {String} return 任何數字的千分位，小數點以後依照國際規範推薦不做千分位
 */


function thousandsNumber(value) {
  var thisNumber = value,
    thousandsInteger = Math.floor(Math.abs(value)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    hasDecimal = Math.abs(thisNumber) - Math.abs(parseInt(thisNumber)) > 0,
    NumberDecimal = hasDecimal === true ? Math.abs(thisNumber).toString().substring(Math.abs(thisNumber).toString().indexOf(".")) : '';

  if (thisNumber >= 0) {
    return thousandsInteger + NumberDecimal;
  } else {
    return '-' + thousandsInteger + NumberDecimal;
  }
}