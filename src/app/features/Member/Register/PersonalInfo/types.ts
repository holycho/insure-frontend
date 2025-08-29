import { Mem } from 'app/bff/models/memReg/memRegReq';

export interface PersonalInfoFormValues extends Mem {
  clause1st: boolean;
  clause2nd: boolean;
  clause3rd: boolean;
}