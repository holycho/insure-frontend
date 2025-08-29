export interface BankResp {
  banks: Bank[];
};

export interface Bank {
  sn: string;
  bankCode: string;
  bankName: string;
}