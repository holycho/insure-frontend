export interface NewsDetailResp {
  subject: string;
  subSubject: string;
  imgName: string;
  startTime: string;
  endTime: string;
  newsDetail: DetailBlock[];
}

export interface DetailBlock {
  subject: string;
  order: number; // 區塊順序(1-活動說明 / 2-獎項及抽獎日期 / 3-得獎公告及領獎 / 4-預留區塊1 / 5-預留區塊2 / 6-注意事項)
  content?: string[]; // order 不為 2 的欄位
  awards?: Award[];
  head?: string[];
}

export interface Award {
  cols: ColInfo[];
}

export interface ColInfo {
  colName: string; // 獎項欄位名稱
  colValue: string; // 獎項欄位內容
}