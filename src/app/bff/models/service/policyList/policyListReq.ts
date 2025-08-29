import { InsureModeCodesEnum } from 'app/bff/enums/insurance';
import { ProdIdEnum } from 'app/bff/enums/prod';

export interface PolicyListReq {
  /** 商品代碼 */
  productId: ProdIdEnum;
  /** 投保類型 */
  bcType: InsureModeCodesEnum;
  /** 身份證字號或統一編號 */
  id?: string;
  /** 受理編號 */
  applyNo?: string;
}