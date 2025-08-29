import environment from 'environments';
import { BaseResp } from 'app/bff/models/base';
import { AxiosResponse } from 'axios';
import dayjs from 'dayjs';
import alertService from './alertService';

/**
 * @description 確認 Axios 回應是否為成功
 * @param response Axios 回應
 * @param doAlert 是否需提示
 * @param customMessage 傳入自訂訊息
 */
const isHttpRespSuccess = (response: AxiosResponse<BaseResp<any>>, doAlert = true, customMessage = ''): boolean => {
  if (doAlert) {
    try {
      switch (response.data.respHeader.returnCode) {
        case '0000':
          break;
        default:
          alertService.base('系統提醒', response.data.respHeader.returnMsg);
          break;
      }
    } catch {
      alertService.base('系統提醒', customMessage || '系統處理回覆逾時，請稍後再查詢執行結果。');
      return false;
    }
  }
  return (response.data.respHeader.returnCode === '0000');
};

/**
 * @description 瀏覽器視窗滾動至頂部
 */
const windowScrollToTop = () => {
  window.scrollTo(0, 0);
};

/**
 * @description 附加 Script resource
 * @param resourcePath Resource 檔案路徑
 */
const appendScriptResource = (resourcePath: string) => {
  // Remove duplicated scripts
  const appendedScripts = document.querySelectorAll('script[src="' + resourcePath + '"]');
  Array.prototype.forEach.call(appendedScripts, (node) => node.parentNode.removeChild(node));
  // Append new script
  const script = document.createElement('script');
  script.src = resourcePath;
  document.body.appendChild(script);
};

/**
 * @description 西元日期轉民國日期
 * @param {string} date 日期
 */
const convertToTWDate = (date: string) => {
  const twDate = `${+dayjs(date).format('YYYYMMDD') - 19110000}`;
  const pattern = /(\d{3}|\d{2}|\d{1})(\d{2})(\d{2})/;
  const formatedDate = String(twDate).replace(pattern, '$1/$2/$3');
  return formatedDate;
};

/**
 * @description 民國日期轉西元日期
 * @param {string} date 日期
 */
const convertToADDate = (date: string) => {
  const adDate = +date.replace(/[^0-9]/ig, '') + 19110000;
  const pattern = /(\d{4})(\d{2})(\d{2})/;
  const formatedDate = String(adDate).replace(pattern, '$1/$2/$3');
  return formatedDate;
};

/*
 * @description 處理「民國年份」資料顯示 (轉中文格式)
 * @param date 民國日期字串 (YYY/MM/DD)
 */
const displayTWYear = (date?: string) => {
 if (!date) return '';
 const dateSnippets = date.split('/');
 return `民國${+dateSnippets[0]}年`;
};

/**
 * @description 處理「民國日期」資料顯示 (轉中文格式)
 * @param date 民國日期字串 (YYY/MM/DD)
 */
const displayTWDate = (date?: string) => {
  if (!date) return '';
  const dateSnippets = date.split('/');
  return `民國${dateSnippets[0]}年${dateSnippets[1]}月${dateSnippets[2]}日`;
};

/**
 * @description 處理「民國日期」資料顯示 v2 (轉中文格式)
 * @param date 民國日期字串 (YYY/MM/DD)
 */
const displayTWDate2 = (date?: string) => {
  if (!date) return '';
  const dateSnippets = date.split('/');
  return `${dateSnippets[0]}年${dateSnippets[1]}月${dateSnippets[2]}日`;
};

/**
 * @description 處理「西元日期」期間顯示 (轉中文格式)
 * @param twStartDate 民國日期字串 (YYY/MM/DD)
 * @param twEndDate 民國日期字串 (YYY/MM/DD)
 */
const displayADDateDuration = (twStartDate: string, twEndDate: string) => {
  const startDateSnippets = convertToADDate(twStartDate).split('/');
  const endDateSnippets = convertToADDate(twEndDate).split('/');
  if (startDateSnippets[0] === endDateSnippets[0]) {
    return `西元${startDateSnippets[0]}年${startDateSnippets[1]}月${startDateSnippets[2]}日起至${endDateSnippets[1]}月${endDateSnippets[2]}日止`;
  } else {
    return `西元${startDateSnippets[0]}年${startDateSnippets[1]}月${startDateSnippets[2]}日起至${endDateSnippets[0]}年${endDateSnippets[1]}月${endDateSnippets[2]}日止`;
  }
};

/**
 * @description 金額 (數字) 千分位格式化
 * @param amt 金額 (數字)
 */
const thousandFormat = (amt: string | number) => {
  return amt.toString().replace(/(\d{1,3})(?=(\d{3})+$)/g, '$1,');
};

/**
 * @description 轉換為平方公尺
 * @param val 坪數
 */
const convertToM2 = (val: number | string) => {
  if (!val) return '';
  return (+val) * 3.3058;
};

/**
 * @description 處理「電話號碼」資料顯示
 * @param telAreaCode 電話區碼
 * @param telNumbers 電話號碼
 * @param telExt 電話分機
 */
const displayTelephone = (telAreaCode?: string, telNumbers?: string, telExt?: string) => {
  if (!telAreaCode || !telNumbers) return '無填寫';
  return !telExt ? `${telAreaCode}-${telNumbers}` : `${telAreaCode}-${telNumbers} #${telExt}`;
};

/**
 * @description 取得圖片URL
 * @param imageName 圖檔名稱
*/
const getImageUrl = (imageName: string) => {
  return `${environment.backend.domainName}${environment.backend.resources.images}/${imageName}`;
};

export default {
  isHttpRespSuccess,
  // UI 處理
  windowScrollToTop,
  appendScriptResource,
  // 時間轉換
  convertToTWDate,
  convertToADDate,
  // 時間呈現
  displayTWYear,
  displayTWDate,
  displayTWDate2,
  displayADDateDuration,
  // 千分位處理
  thousandFormat,
  // 其他
  convertToM2,
  displayTelephone,
  getImageUrl
};
