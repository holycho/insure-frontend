export interface NewsListResp {
  totalCount: number; // 由 header 擷取合併
  news: News[];
  moreUrl: MoreUrl[]; // 按鈕[更多消息]的連結網址, 同 HP#01的資料結構
}

export interface News {
  sn: number;
  imgName: string;
  subject: string;
  subSubject: string;
  startTime: string;
  endTime: string;
  linkUrl: string;
}

export interface MoreUrl {
  id: string; // 項目 id
  text: string; // 文字標題
  type: string; // 此物件之類型(0-目錄、1-文字、2-按鈕、3-展開文字、4-文件)
  link?: string; // 連結Url，類型為文字或按鈕(type==1 || type ==2)才有此key
  login: string; // 是否需要登入 0-無關登入與否 1-需登入
  target: string; // 是否在新視窗開啟 0-否 1-是
  msg?: string; // 畫面上之展開文字，類型為展開文字(type==3)才有此key
  doc?: string; // 文件位置，類型為文件(type==4)才有此key
  enableSso?: string; // 該連結是否需附帶SSO資訊(utm_source, token) 是-Y 否-N或null
}