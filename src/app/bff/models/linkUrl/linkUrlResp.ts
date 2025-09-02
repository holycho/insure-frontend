export interface LinkUrlResp {
  header?: LinkInfo[];
  footer?: LinkInfo[];
}

export interface LinkInfo {
  id: string;
  text: string;
  type: string; // 目錄: 0, 文字: 1, 按鈕: 2, 展開文字: 3, 文件: 4
  link?: string; // 屬於 type = 1/2
  msg?: string; // 屬於 type = 3
  doc?: string; // 屬於 type = 4
  login: string;
  target: string;
  icon?: string; // 屬於 文字: 1 (手機版呈現 icon)
  child?: LinkInfo[]; // 屬於 type = 0
  disabled?: boolean;
  message?: string;
}