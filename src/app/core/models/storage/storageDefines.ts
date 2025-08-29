import { StorageKeysEnum, StorageTypesEnum } from 'app/core/enum/storage';

/** 定義檔 */
export const StorageDefines: Readonly<Record<StorageKeysEnum, StorageTypesEnum>> = {
  /** 登入授權 (會員主檔 & Access Token) */
  [StorageKeysEnum.Authorization]: StorageTypesEnum.Local
};