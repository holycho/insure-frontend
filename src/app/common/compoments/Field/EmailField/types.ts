import { ParamsResp } from 'app/bff/models/params';

export interface EmailFieldProps {
  name: string;
  emailDomain: ParamsResp['enum'];
  hintTags?: string[];
}