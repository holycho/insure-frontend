import React, { useEffect, useState } from 'react';
import { FormLayout01GroupProps } from './types';
import _ from 'lodash';
import { Plan } from 'app/bff/models/campaign';
import commonService from 'app/core/services/commonService';
import { Field } from 'formik';

const FormLayout01Group: React.FC<FormLayout01GroupProps> = (props) => {
  const [groups, setGroups] = useState<{ groupOrder: string; groupName: string; isPrimary: boolean; plans: Plan[]; }[]>([]);
  const [originPremium, setOriginPremium] = useState<number>(0);
  const [discountPremium, setDiscountPremium] = useState<number>(0);
  const [firePremium, setFirePremium] = useState<number>(0);
  const [earthquakePremium, setEarthquakePremium] = useState<number>(0);

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
   * @description 更新試算結果
   */
  useEffect(() => {
    if (props.premium.length === 0) {
      setOriginPremium(0);
      setDiscountPremium(0);
      setFirePremium(0);
      setEarthquakePremium(0);
      return;
    }
    // 取得對應方案試算結果
    const find = props.premium.find(it => it.campaignId === props.campaign.campaignId);
    if (find) {
      const { origin, discount } = find.premium;
      setOriginPremium(origin.total ?? 0);
      setDiscountPremium(discount.total ?? 0);
      setFirePremium(discount.data.firePremium + discount.data.liabilityPremium + discount.data.propertyPremium + discount.data.raisePremium);
      setEarthquakePremium(discount.data.earthquakePremium);
    }
    // eslint-disable-next-line
  }, [groups, props.premium]);

  return (
    <div className="form-layout-01__group">
      <div className="form-layout-01__cell form-layout-01-cell form-layout-01-cell--bordered">
        <div className="form-layout-01-cell__tag form-layout-01-cell-tag">
          <div className="form-layout-01-cell-tag__head">
            <div className="form-layout-01-cell-tag__title">保費</div>
          </div>
          <div className="form-layout-01-cell-tag__content">
            <div
              className="form-layout-01-cell-tag__prefixed-tag form-layout-01-cell-tag__prefixed-tag--denied"
              data-prefix="NT$">{originPremium}</div>
            <div className="form-layout-01-cell-tag__arrow"></div>
            <div className="form-layout-01-cell-tag__prefixed-tag" data-prefix="NT$">{discountPremium}</div>
          </div>
        </div>
        {groups.map((group, index) => {
          let head: React.ReactNode;
          if (group.isPrimary) {
            head = (
              <div className="form-layout-01-cell__head">
                <div className="form-layout-01-cell__morph-row form-layout-01-cell__morph-row--align-center"></div>
                <Field
                  type="radio"
                  name={props.name}
                  id={`radio-campaign-${String(props.index).padStart(2, '0')}`}
                  className="radio-group-00-item__input"
                  value={props.campaign.campaignId}
                />
                <label htmlFor={`radio-campaign-${String(props.index).padStart(2, '0')}`} className="radio-group-00-item__label">
                  <span className="radio-group-00-item__icon" />
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ marginRight: 10 }}>{group.groupName}</div>
                    <div className="radio-group-00-item__tag color-tag  color-tag--green color-tag--no-width">
                      <div className="color-tag__text">{props.campaign.campaignName}</div>
                    </div>
                  </div>
                  <div className="form-layout-01-cell__prefixed-text" data-prefix="NT$">{firePremium}</div>
                </label>
              </div>
            );
          } else {
            head = (
              <div className="form-layout-01-cell__head">
                <div className="form-layout-01-cell__morph-row form-layout-01-cell__morph-row--align-center">
                  <div className="form-layout-01-cell__mimic-title form-layout-01-cell__mimic-title--bold"
                    data-tooltip-trigger="tooltip-01">{group.groupName}
                  </div>
                  <div className="form-layout-01-cell__prefixed-text" data-prefix="NT$">{earthquakePremium}</div>
                </div>
              </div>
            );
          }
          const content = (
            <div className="form-layout-01-cell__content">
              {group.plans.filter(it => it.showFrontend === 'Y').map((plan, index) => (
                <div key={`plan-${index}`} className="form-layout-01-cell__data form-layout-01-cell__data--align-start form-layout-01-cell__data--setA  space-between">
                  <div className="space-between__former ">
                    <div className="form-layout-01-cell__text">
                      {plan.planShowName}
                    </div>
                  </div>
                  <div className="space-between__latter ">
                    <div className="form-layout-01-cell__text">
                      {`建築物（含裝潢）${commonService.thousandFormat(props.fireAmt ?? 0)}萬，建築物內動產${commonService.thousandFormat(props.movablePropertyAmt ?? 0)}萬`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
          return (
            <div key={`group-${index}`}>
              {head}
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormLayout01Group;
