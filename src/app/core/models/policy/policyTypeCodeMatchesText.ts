import { PolicyTypeCodesEnum, PolicyTypeTextEnum } from 'app/bff/enums/policy';

/**
 * @description 保單類型對應文字
 */
export const PolicyTypeCodeMatchesText: Readonly<Record<PolicyTypeCodesEnum, PolicyTypeTextEnum>> = {
  /** 強制險 + 任意險 */
  [PolicyTypeCodesEnum.B]: PolicyTypeTextEnum.B,
  /** 強制險 */
  [PolicyTypeCodesEnum.C]: PolicyTypeTextEnum.C,
  /** 任意險 */
  [PolicyTypeCodesEnum.V]: PolicyTypeTextEnum.V
};
