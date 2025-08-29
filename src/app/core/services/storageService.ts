import { StorageKeysEnum, StorageTypesEnum } from '../enum/storage';
import { StorageDefines } from '../models/storage';

/**
 * @description 設定儲存值
 */
const setItem = (key: StorageKeysEnum, value: string) => {
  switch (StorageDefines[key]) {
    case StorageTypesEnum.Local: {
      localStorage.setItem(key, value);
      break;
    }
    case StorageTypesEnum.Session: {
      sessionStorage.setItem(key, value);
      break;
    }
    default:
      break;
  }
};

/**
 * @description 取得儲存值
 */
const getItem = (key: StorageKeysEnum) => {
  switch (StorageDefines[key]) {
    case StorageTypesEnum.Local: {
      return localStorage.getItem(key);
    }
    case StorageTypesEnum.Session: {
      return sessionStorage.getItem(key);
    }
    default:
      return '';
  }
};

/**
 * @description 移除儲存值
 */
const removeItem = (key: StorageKeysEnum) => {
  switch (StorageDefines[key]) {
    case StorageTypesEnum.Local: {
      localStorage.removeItem(key);
      break;
    }
    case StorageTypesEnum.Session: {
      sessionStorage.removeItem(key);
      break;
    }
    default:
      break;
  }
};

/**
 * @description 清除全部儲存值
 */
const clearAll = {
  local: () => {
    localStorage.clear();
  },
  session: () => {
    sessionStorage.clear();
  },
  all: () => {
    localStorage.clear();
    sessionStorage.clear();
  }
};

export default {
  setItem,
  getItem,
  removeItem,
  clearAll
};
