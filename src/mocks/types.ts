import { Mem } from 'app/bff/models/memDetail';

export interface MemData extends Mem {
  sn: string;
  token: string;
}

export interface Param {
  paramType: string;
  paramOrder: string;
  paramText: string;
  paramValue: string;
}

export interface OTP {
  memberId?: string;
  mobile?: string; // 註冊用
  otpSn: string;
  otpCode: string;
  changeMobileOrEmail?: boolean;
}