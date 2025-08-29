// 模擬假資料
import memberData from '../json/member.json';
import unitData from '../json/unit.json';
import materialData from '../json/material.json';
import roofData from '../json/roof.json';
import cityData from '../json/city.json';
import costData from '../json/cost.json';
import feeSrcData from '../json/feeSource.json';
import occData from '../json/occ.json';
import emailDomain from '../json/emailDomain.json';

import { openDB, DBSchema } from 'idb';
import { MemData, Param } from 'mocks/types';

const DB_NAME = 'MockDB';
const DB_VERS = 1;
let db: any;

interface MockDB extends DBSchema {
  'member': {
    key: string; // 主鍵為 id
    value: MemData
  },
  'sys-param': {
    key: number;
    value: Param;
  }
}

/**
 * @description 初始 IndexedDB 資料庫與測試用表單
 */
async function initDB() {
  const db = await openDB<MockDB>(DB_NAME, DB_VERS, {
    upgrade(db) {
      // 若無 'member' 表格，則建立並設定主鍵
      if (!db.objectStoreNames.contains('member')) {
        db.createObjectStore('member', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('sys-param')) {
        db.createObjectStore('sys-param', { autoIncrement: true });
      }
    }
  });
  // 針對空表格，建立測試會員資料
  const totalCount = (await db.transaction('member').store.getAll()).length;
  if (totalCount === 0) {
    for (const mem of memberData) {
      db.add('member', mem);
    }
  }
  const sysCount = (await db.transaction('sys-param').store.getAll()).length;
  if (sysCount === 0) {
    for (const item of unitData) {
      db.add('sys-param', {
        ...item,
        paramType: 'unit'
      });
    }
    for (const item of materialData) {
      db.add('sys-param', {
        ...item,
        paramType: 'material'
      });
    }
    for (const item of roofData) {
      db.add('sys-param', {
        ...item,
        paramType: 'roof'
      });
    }
    for (const item of cityData) {
      db.add('sys-param', {
        ...item,
        paramType: 'city'
      });
    }
    for (const item of costData) {
      db.add('sys-param', {
        ...item,
        paramType: 'cost'
      });
    }
    for (const item of feeSrcData) {
      db.add('sys-param', {
        ...item,
        paramType: 'feeSrc'
      });
    }
    for (const item of occData) {
      db.add('sys-param', {
        ...item,
        paramType: 'occ'
      });
    }
    for (const item of emailDomain) {
      db.add('sys-param', {
        ...item,
        paramType: 'emailDomain'
      });
    }
  }
  db.close();
};

/**
 * @description 開啟連線實體
 */
async function connect() {
  db = await openDB(DB_NAME, DB_VERS); // 資料庫連線
};

/**
 * @description 關閉連線實體
 */
function close() {
  if (!db) return;
  db.close();
}

async function add(table: string, data: MemData) {
  if (!db) return;
  const tx = db.transaction(table, 'readwrite');
  tx.store.add(data);
}

async function update(table: string, data: any) {
  if (!db) return;
  await db.put(table, data);
}

async function del(table: string, key: string) {
  if (!db) return;
  await db.delete(table, key);
}

async function query(table: string, field: string, val: any) {
  const res: any[] = [];
  if (!db) return res;
  let cursor = await db.transaction(table).store.openCursor();
  while (cursor) {
    // console.log(cursor.key, cursor.value);
    if (cursor.value[field] == val) {
      res.push(cursor.value);
    }
    cursor = await cursor.continue();
  }
  return res;
}

async function getAll(table: string) {
  const res: MemData[] = [];
  if (!db) return res;
  let cursor = await db.transaction(table).store.openCursor();
  while (cursor) {
    // console.log(cursor.key, cursor.value);
    res.push(cursor.value);
    cursor = await cursor.continue();
  }
  return res;
};

export default {
  initDB,
  connect,
  close,
  add,
  update,
  del,
  query,
  getAll
};
