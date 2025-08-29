import * as Yup from 'yup';

// 統一編號格式
const taxIdRegExp = /^[0-9]{8}$/;
// 身分證字號或統一編號格式
const personalOrTaxIdRegExp = /^[A-Z]{1}[1-2||8-9]{1}[0-9]{8}$|^[0-9]{8}$/;
// 行動電話號碼格式
const cellphoneNumbersRegExp = /^[0]{1}[9]{1}[0-9]{8}$/;
// 汽車車牌號碼格式 原型式：4-2 | 2-4，新式：3-4 (新式規則：不可有 4、i、I、o、O)
const autoLicensePlateNumberRegExp = /^[0-9a-zA-Z]{4}-[0-9a-zA-Z]{2}$|^[0-9a-zA-Z]{2}-[0-9a-zA-Z]{4}$|^[0-35-9a-hj-np-zA-HJ-NP-Z]{3}-[0-35-9a-hj-np-zA-HJ-NP-Z]{4}$/;
// 機車車牌號碼格式 原型式：3-3 | 2-2，新式：3-4 | 2-3 (新式規則：不可有 4、i、I、o、O, 超過 550 c.c.重機規則為 2-3)
const motoLicensePlateNumberRegExp = /^[0-9a-zA-Z]{3}-[0-9a-zA-Z]{3}$|^[0-9a-zA-Z]{2}-[0-9a-zA-Z]{2}$|^[0-35-9a-hj-np-zA-HJ-NP-Z]{2}-[0-35-9a-hj-np-zA-HJ-NP-Z]{3}$|^[0-35-9a-hj-np-zA-HJ-NP-Z]{3}-[0-35-9a-hj-np-zA-HJ-NP-Z]{4}$/;
// 車輛車牌號碼格式 (適用汽車、機車)
const vehicleLicensePlateNumberRegExp = /^[0-9a-zA-Z]{2}-[0-9a-zA-Z]{4}$|^[0-9a-zA-Z]{4}-[0-9a-zA-Z]{2}$|^[0-9a-zA-Z]{3}-[0-9a-zA-Z]{3}$|^[0-9a-zA-Z]{2}-[0-9a-zA-Z]{2}$|^[0-35-9a-hj-np-zA-HJ-NP-Z]{2}-[0-35-9a-hj-np-zA-HJ-NP-Z]{3}$|^[0-35-9a-hj-np-zA-HJ-NP-Z]{3}-[0-35-9a-hj-np-zA-HJ-NP-Z]{4}$/;
// 允許數字
const numbersRegExp = /^\d+$/;

/**
 * @description [Field] 檢核「行動電話」
 */
const cellphoneNumbersSchema = Yup.string()
  .max(10, '長度不得超過 10 字元')
  .matches(cellphoneNumbersRegExp, '資料格式錯誤')
  .required('此為必填欄位');

const captchaSchema = Yup.string()
  .max(6, '長度不得超過 6 字元')
  .matches(numbersRegExp, '只允許輸入數字');

export default {
  taxIdRegExp,
  personalOrTaxIdRegExp,
  cellphoneNumbersRegExp,
  autoLicensePlateNumberRegExp,
  motoLicensePlateNumberRegExp,
  vehicleLicensePlateNumberRegExp,
  cellphoneNumbersSchema,
  captchaSchema
};