import Swal from 'sweetalert2';

declare const $: any;

/**
 * @description 基本 Dialog
 * @param title 標題
 * @param content 內容
 * @param confirmButtonText 「確認按鈕」文字
 */
const base = (title: string, content: string, confirmButtonText: string = '確認', showCloseButton: boolean = true, callback?: () => void) => {
  return Swal.fire({
    scrollbarPadding: false,
    heightAuto: false,
    title: title,
    text: content,
    confirmButtonText: confirmButtonText,
    showCloseButton: showCloseButton,
    closeButtonHtml: ''
  }).then(res => {
    console.log('res', res);
    if (callback && res.isConfirmed) {
      callback();
    }
  });
};

/**
 * @description 確認 Dialog
 * @param title 標題
 * @param content 內容
 * @param confirmButtonText 「確認按鈕」文字
 * @param cancelButtonText 「取消按鈕」文字
 */
const confirm = (title: string, content: string, confirmButtonText: string = '確認', cancelButtonText: string = '取消') => {
  return Swal.fire({
    scrollbarPadding: false,
    heightAuto: false,
    title: title,
    text: content,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    showCancelButton: true,
    showCloseButton: true,
    closeButtonHtml: ''
  });
};

/**
 * @description 自定義內容 (HTML) Dialog
 * @param title 標題
 * @param htmlContent HTML 內容
 * @param confirmButtonText 「確認按鈕」文字
 */
const custom = (title: string, htmlContent: string, confirmButtonText: string = '確認') => {
  return Swal.fire({
    scrollbarPadding: false,
    heightAuto: false,
    customClass: {
      container: 'swal2-custom-dialog'
    },
    title: title,
    html: htmlContent,
    confirmButtonText: confirmButtonText,
    showCloseButton: true,
    closeButtonHtml: ''
  });
};

/**
 * @description 自定義內容 (HTML) Dialog
 * @param title 標題
 * @param htmlContent HTML 內容
 * @param confirmButtonText 「確認按鈕」文字
 * @param cancelButtonText 「取消按鈕」文字
 */
const custom2 = (title: string, htmlContent: string, confirmButtonText: string = '確認', cancelButtonText: string = '取消') => {
  return Swal.fire({
    customClass: {
      container: 'swal2-custom-dialog'
    },
    title: title,
    html: htmlContent,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    showCancelButton: true,
    showCloseButton: true,
    closeButtonHtml: ''
  });
};

/**
 * @description 自定義內容 (HTML) Dialog
 * @param title 標題
 * @param htmlContent HTML 內容
 * @param confirmButtonText 「確認按鈕」文字
 */
const custom3 = (title: string, htmlContent: string, confirmButtonText: string = '確認') => {
  return Swal.fire({
    customClass: {
      container: 'swal2-text-align-justify-dialog'
    },
    title: title,
    html: htmlContent,
    confirmButtonText: confirmButtonText,
    showCloseButton: true,
    closeButtonHtml: ''
  });
};

export default {
  base,
  confirm,
  custom,
  custom2,
  custom3
};
