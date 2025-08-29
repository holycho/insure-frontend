export interface SigninResp {
  /** 登入會員簡易資料，登入後將於 Header 顯示會員姓名 */
  member: {
    sn: string;
    name: string;
  };
  /** 登入後取得的 token，於專案中接需加密(如 localStorage 或 redux store 內) */
  token: string;
}