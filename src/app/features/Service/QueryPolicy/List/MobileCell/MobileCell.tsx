import React from 'react';
import { Policy } from 'app/bff/models/service/policyList';
import { MobileCellProps } from './types';
import { ProdIdEnum } from 'app/bff/enums/prod';

const MobileCell: React.FC<MobileCellProps> = (props) => {
  const { policy, prodId } = props;

  const renderDuration = (policy: Policy) => {
    switch (prodId) {
      case ProdIdEnum.Auto:
      case ProdIdEnum.Moto:
        return (
          <>
            {/* 強制險 */}
            {policy.startTime && policy.endTime && (
              <div className="transposing-table-00-mobile__tags">
                <div className="transposing-table-00-mobile__tag color-tag color-tag--green">
                  <div className="color-tag__text">強制險</div>
                </div>
                <div className="transposing-table-00-mobile__text">{policy.startTime} ~ {policy.endTime}</div>
              </div>
            )}
            {/* 任意險 */}
            {policy.vStartTime && policy.vEndTime && (
              <div className="transposing-table-00-mobile__tags">
                <div className="transposing-table-00-mobile__tag color-tag color-tag--green">
                  <div className="color-tag__text">任意險</div>
                </div>
                <div className="transposing-table-00-mobile__text">{policy.vStartTime} ~ {policy.vEndTime}</div>
              </div>
            )}
          </>
        );
      case ProdIdEnum.Travel:
      case ProdIdEnum.Travel011:
      case ProdIdEnum.Travel012:
      case ProdIdEnum.Travel013:
      case ProdIdEnum.Travel014:
      case ProdIdEnum.Travel015:
      case ProdIdEnum.Psninj:
      case ProdIdEnum.Fire:
      case ProdIdEnum.Pet:
        return (
          <div className="transposing-table-00-mobile__text">{policy.startTime} ~ {policy.endTime}</div>
        );
      default:
        break;
    }
    return null;
  };

  return (
    <div className="transposing-table-00-mobile__cell">
      {/* 受理編號 */}
      <div className="transposing-table-00-mobile__item">
        <div className="transposing-table-00-mobile__title">
          <div className="transposing-table-00-mobile__text transposing-table-00-mobile__text--bold">
            受理編號
          </div>
        </div>
        <div className="transposing-table-00-mobile__content">
          <div className="transposing-table-00-mobile__link">{policy.applyNo}</div>
        </div>
      </div>
      {/* 保險期間 */}
      <div className="transposing-table-00-mobile__item">
        <div className="transposing-table-00-mobile__title">
          <div className="transposing-table-00-mobile__text transposing-table-00-mobile__text--bold">
            保險期間
          </div>
        </div>
        <div className="transposing-table-00-mobile__content">
          {renderDuration(policy)}
        </div>
      </div>
      {/* 保單號碼 */}
      <div className="transposing-table-00-mobile__item">
        <div className="transposing-table-00-mobile__title">
          <div className="transposing-table-00-mobile__text transposing-table-00-mobile__text--bold">
            保單號碼
          </div>
        </div>
        <div className="transposing-table-00-mobile__content">
          {policy.policyNo ? <div className="transposing-table-00-mobile__text">{policy.policyNo}</div> : null}
          {policy.vPolicyNo ? <div className="transposing-table-00-mobile__text">{policy.vPolicyNo}</div> : null}
        </div>
      </div>
      {/* 備註 */}
      <div className="transposing-table-00-mobile__item">
        <div className="transposing-table-00-mobile__title">
          <div className="transposing-table-00-mobile__text transposing-table-00-mobile__text--bold">
            備註
          </div>
        </div>
        <div className="transposing-table-00-mobile__content">
          <div className="transposing-table-00-mobile__text">{policy.remark}</div>
        </div>
      </div>
    </div>
  );
};

export default MobileCell;