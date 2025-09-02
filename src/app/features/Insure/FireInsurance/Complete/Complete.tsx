import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import { ROUTES } from 'app/core/router';
import { RootState } from 'app/store/types';
import commonService from 'app/core/services/commonService';
import CollapseTable00Block01 from 'app/common/compoments/Collapse/CollapseTable00Block01';
import { Plan } from 'app/bff/models/campaign';
import { useDispatch } from 'react-redux';
import { resetProcessAction } from 'app/store/insure/fireInsurance/actions';

const Complete: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const processState = useSelector((state: RootState) => state.insure.fireInsurance.process);
  // 建物保額
  const insuAmtState = processState.calculation.data?.insuAmt;
  // 繳費結果
  const paymentState = processState.payment.data;
  // 保單內容
  const policyState = useSelector((state: RootState) => state.insure.fireInsurance.policy);
  const [groups, setGroups] = useState<{ groupOrder: string; groupName: string; isPrimary: boolean; plans: Plan[]; }[]>([]);

  useEffect(() => {
    commonService.windowScrollToTop();

    return () => {
      // 若不是投保流程路由則執行重置
      if (!routerHistory.location.pathname.includes(ROUTES.INSURE__FIRE_INSURANCE)) {
        reduxDispatch(resetProcessAction());
      }
    };
  }, [reduxDispatch, routerHistory.location.pathname]);

  /**
   * @description 依 groupOrder 分類險種清單
   */
  useEffect(() => {
    if (!policyState || !policyState.campaign) return;
    const result = _.groupBy(policyState.campaign.plans, 'groupOrder');
    const _groups = [];
    for (const key of _.keys(result)) {
      const val = result[key];
      _groups.push({ groupOrder: key, groupName: val[0].groupName, isPrimary: key === '1', plans: result[key] });
    }
    setGroups(_groups);
  }, [policyState]);

  const goBack = () => {
    routerHistory.replace(ROUTES.HOME__MAIN);
  };

  return (
    <div className="inside-page-01-layout">
      <div className="inside-page-01-layout__former">
        <div className="inside-page-01-banner inside-page-01-banner--result">
          <div className="inside-page-01-banner__inner">
            <div className="inside-page-01-banner__former inside-page-01-banner__former--center">
              <div className="inside-page-01-banner__title inside-page-01-banner__title--main">感謝您已投保完成</div>
              <div className="inside-page-01-banner__title inside-page-01-banner__title--vice">我們將發送投保完成通知至您的手機與電子郵件信箱。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inside-page-01-layout__latter inside-page-01-layout__latter--result">
        <div className="result-layout-00">
          <div className="result-layout-00__head">
            <div className="share-block-00">
              <div className="share-block-00__former">
                <div className="share-block-00__title">
                  <div className="share-block-00__text">分享我的推薦碼</div>
                  <div className="share-block-00__text share-block-00__text--highlight">XHW1334</div>
                </div>
                <div className="share-block-00__descrp">分享推薦碼給好友，即可享有網路投保專屬優惠！</div>
              </div>
              <div className="share-block-00__latter">
                <div className="share-block-00__social-media-wrapper">
                  <a href="#" className="share-block-00__social-media">
                    <img src="/assets/img/line_circle.svg" alt="" className="img" />
                  </a>
                  <a href="#" className="share-block-00__social-media">
                    <img src="/assets/img/gmail_circle.svg" alt="" className="img" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="result-layout-00__content">
            <div className="result-layout-00__block">
              <div className="result-layout-00__label-text">
                您的保單資訊如下
              </div>
              <div className="share-block-01">
                <div className="share-block-01__former">
                  {paymentState && paymentState.policyNo && (
                    <>
                      <div className="share-block-01__title">
                        保單號碼
                      </div>
                      <div className="share-block-01__descrp">
                        {paymentState.policyNo}
                      </div>
                    </>
                  )}
                  {paymentState && !paymentState.policyNo && (
                    <>
                      <div className="share-block-01__title">
                        受理編號
                      </div>
                      <div className="share-block-01__descrp">
                        {paymentState.applyNo}
                      </div>
                    </>
                  )}
                </div>
                <div className="share-block-01__latter">
                  <div className="share-block-01__btn-wrapper">
                    <a href="#" className="share-block-01__btn btn-primary">列印投保證明</a>
                  </div>
                </div>
              </div>
              <div className="information-collapse-card-group">
                <div className="information-collapse-card-group__item non-min-height collapse-table-00 custom-1-padding">
                  <div className="collapse-table-00__inner collapse-table-00__inner--no-padding">
                    {policyState && groups.map(group => (
                      <CollapseTable00Block01 key={`group-${group.groupOrder}`} id={+group.groupOrder} planShowName={group.groupOrder === '1' ? '承保內容' : group.groupName} tagName={group.groupOrder === '1' ? `住宅火災保險（${policyState.campaign.campaignId === 'B2C' ? '基本型' : '進階型'}）` : undefined}>
                        {group.plans.map((plan, index) => (
                          <div key={`plan-${group.groupOrder}-${index + 1}`} className="collapse-table-00__data space-between">
                            <div className="space-between__former space-between__former--fit">
                              <div className="collapse-table-00__text">{plan.planShowName}</div>
                            </div>
                            <div className="space-between__latter">
                              <div className="collapse-table-00__text">{`建築物（含裝潢）${commonService.thousandFormat(insuAmtState?.fireAmt ?? 0)}萬，建築物內動產${commonService.thousandFormat(insuAmtState && insuAmtState.movablePropertyFlag ? insuAmtState.movablePropertyAmt : 0)}萬`}</div>
                            </div>
                          </div>
                        ))}
                      </CollapseTable00Block01>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="result-layout-00__block">
              <div className="result-layout-00__label-text">
                也許你需要這些保障
              </div>
              <div className="card-collection-05">
                <div className="card-collection-05__item">
                  <div className="photo-card-03">
                    <div className="photo-card-03__bg">
                      <img src="/assets/img/couple.png" alt="" className="img" />
                    </div>
                    <div className="photo-card-03__inner">
                      <div className="photo-card-03__title">平安喜樂-國內遊</div>
                      <div className="photo-card-03__descrp">國內旅行綜合保險</div>
                      <a href="#" className="photo-card-03__btn btn-primary">了解保障</a>
                    </div>
                  </div>
                </div>
                <div className="card-collection-05__item">
                  <div className="photo-card-03">
                    <div className="photo-card-03__bg">
                      <img src="/assets/img/couple.png" alt="" className="img" />
                    </div>
                    <div className="photo-card-03__inner">
                      <div className="photo-card-03__title">吉祥如意-外國行</div>
                      <div className="photo-card-03__descrp">國外旅行綜合保險</div>
                      <a href="#" className="photo-card-03__btn btn-primary">了解保障</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="result-layout-00__block">
              <div className="result-layout-00__label-text">
                好康報你知
              </div>
              <div className="card-collection-06">
                <div className="card-collection-06__item">
                  <div className="photo-card-04">
                    <div className="photo-card-04__former">
                      <div className="photo-card-04__photo">
                        <img src="/assets/img/insured-donate.png" alt="" className="img" />
                      </div>
                    </div>
                    <div className="photo-card-04__latter">
                      <div className="photo-card-04__tag">公益活動</div>
                      <div className="photo-card-04__title">你投保，蓮花做愛心</div>
                      <div className="photo-card-04__descrp">一起為憨兒的生命加值</div>
                    </div>
                  </div>
                </div>
                <div className="card-collection-06__item">
                  <div className="photo-card-04">
                    <div className="photo-card-04__former">
                      <div className="photo-card-04__photo">
                        <img src="/assets/img/photo-card-04-demo.png" alt="" className="img" />
                      </div>
                    </div>
                    <div className="photo-card-04__latter">
                      <div className="photo-card-04__tag">公益活動</div>
                      <div className="photo-card-04__title">你投保，蓮花做愛心</div>
                      <div className="photo-card-04__descrp">一起為憨兒的生命加值</div>
                    </div>
                  </div>
                </div>
                <div className="card-collection-06__item">
                  <div className="photo-card-04">
                    <div className="photo-card-04__former">
                      <div className="photo-card-04__photo">
                        <img src="/assets/img/photo-card-04-demo.png" alt="" className="img" />
                      </div>
                    </div>
                    <div className="photo-card-04__latter">
                      <div className="photo-card-04__tag">公益活動</div>
                      <div className="photo-card-04__title">你投保，蓮花做愛心</div>
                      <div className="photo-card-04__descrp">一起為憨兒的生命加值</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
          <button className="inside-page-01-layout__btn btn-primary" onClick={goBack}>
            返回網路投保首頁
          </button>
        </div>
      </div>
    </div>
  );
};

export default Complete;
