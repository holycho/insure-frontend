import { InsureModeCodesEnum } from 'app/bff/enums/insurance';
import { YesNoCodesEnum } from 'app/core/enum/yesNo';

export interface PolicyListResp {
  totalCount: number;
  policys: Policy[];
}

export interface Policy {
  applyNo: string;
  bcType: InsureModeCodesEnum;
  startTime?: string;
  endTime?: string;
  policyNo?: string;
  /** 任意險 生效時間 */
  vStartTime?: string;
  /** 任意險 結束時間 */
  vEndTime?: string;
  /** 任意險 保單號碼 */
  vPolicyNo?: string;
  remark?: string;
  buttonInfo: ButtonInfo;
}

export interface ButtonInfo {
  showPolicyModify: YesNoCodesEnum;
  showUploadPhoto: YesNoCodesEnum;
  showRefund: YesNoCodesEnum;
}