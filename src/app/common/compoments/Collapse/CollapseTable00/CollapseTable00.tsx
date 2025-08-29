import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Plan } from 'app/bff/models/campaign';
import commonService from 'app/core/services/commonService';
import CollapseTable00Block from '../CollapseTable00Block';
import { CollapseTable00Props } from './types';

const CollapseTable00: React.FC<CollapseTable00Props> = (props) => {
  const [groups, setGroups] = useState<{ groupOrder: string; groupName: string; isPrimary: boolean; plans: Plan[]; }[]>([]);
  const [premium, setPremium] = useState<{ groupOrder: string, premium: number}[]>([]);

  /**
   * @description 依 groupOrder 分類險種清單
   */
  useEffect(() => {
    const result = _.groupBy(props.campaign.plans, 'groupOrder');
    const _groups = [];
    for (const key of _.keys(result)) {
      const val = result[key];
      _groups.push({ groupOrder: key, groupName: val[0].groupName, isPrimary: key === '1', plans: result[key] });
    }
    setGroups(_groups);
  }, [props.campaign]);

  /**
   * @description 依 groupOrder 分別加總試算結果
   */
  useEffect(() => {
    if (!props.campaign || props.premium.length === 0) return;
    const find = props.premium.find(it => it.campaignId === props.campaign.campaignId);
    if (find) {
      const _firePremium = find.premium.discount.data.firePremium + find.premium.discount.data.liabilityPremium + find.premium.discount.data.propertyPremium + find.premium.discount.data.raisePremium;
      setPremium([
        { groupOrder: '1', premium: _firePremium },
        { groupOrder: '2', premium: find.premium.discount.data.earthquakePremium ?? 0 }
      ]);
    }
  }, [props.campaign, props.premium]);

  /**
   * @description 依 groupOrder 取出加總結果
   * @param groupOrder 群組編號
   */
  const getPremium = (groupOrder: string) => {
    const find = premium.find(it => it.groupOrder === groupOrder);
    if (find) return find.premium.toString();
    return '0';
  };

  return (
    <div className="collapse-table-00__inner">
      {groups.map(group => (
        <CollapseTable00Block key={`group-${group.groupOrder}`} id={+group.groupOrder} planShowName={group.groupName} premium={getPremium(group.groupOrder)} tagName={group.groupOrder === '1' ? `住宅火災保險（${props.campaign.campaignId === 'B2C' ? '基本型' : '進階型'}）` : undefined}>
          {group.plans.filter(it => it.showFrontend === 'Y').map((plan, index) => (
            <div key={`plan-${group.groupOrder}-${index + 1}`} className="collapse-table-00__data space-between">
              <div className="space-between__former space-between__former--fit">
                <div className="collapse-table-00__text">{plan.planShowName}</div>
              </div>
              <div className="space-between__latter">
                <div className="collapse-table-00__text">{`建築物（含裝潢）${commonService.thousandFormat(props.fireAmt ?? 0)}萬，建築物內動產${commonService.thousandFormat(props.movablePropertyAmt ?? 0)}萬`}</div>
              </div>
            </div>
          ))}
        </CollapseTable00Block>
      ))}
    </div>
  );
};

export default CollapseTable00;
