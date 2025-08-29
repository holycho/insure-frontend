export interface MorgageResp {
  banks: Bank[];
};

export interface Bank {
  bankCode: string;
  bankName: string;
  bankShortname: string;
  printBranchType: string;
  branchs: Branch[];
}

export interface Branch {
  branchCode: string;
  branchName: string;
  bkShortname: string;
  printBranchType: string;
}