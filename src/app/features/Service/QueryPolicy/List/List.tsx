import { InsureModeCodesEnum } from 'app/bff/enums/insurance';
import { ProdIdEnum } from 'app/bff/enums/prod';
import Pagination00 from 'app/common/compoments/Pagination/Pagination00';
import TableBody from 'app/common/compoments/TransposingTable/PolicyTable/TableBody';
import TableHead from 'app/common/compoments/TransposingTable/PolicyTable/TableHead';
import { fetchPolicyListAction, fetchPolicySingleAction, resetPolicyListAction, saveInquiryFilterAction, setNonMemberLoginForgetCurrentStepAction } from 'app/store/service/queryPolicy/actions';
import { PlanState } from 'app/store/service/queryPolicy/types';
import { RootState } from 'app/store/types';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { ListRouteLocationState } from './types';
import { PolicySingleReq } from 'app/bff/models/service/policySingle';
import { Policy } from 'app/bff/models/service/policyList/policyListResp';
import $ from 'jquery';
import MobileCell from './MobileCell';

const planOptions = [
  {
    text: '汽車險',
    prodId: ProdIdEnum.Auto,
    planType: 'car'
  },
  {
    text: '機車險',
    prodId: ProdIdEnum.Moto,
    planType: 'moto',
  },
  {
    text: '旅平險',
    prodId: ProdIdEnum.Travel011,
    planType: 'travel'
  },
  {
    text: '登山險',
    prodId: ProdIdEnum.Travel012,
    planType: 'mountain'
  },
  {
    text: '郵輪險',
    prodId: ProdIdEnum.Travel013,
    planType: 'cruiseship'
  },
  {
    text: '海域險',
    prodId: ProdIdEnum.Travel014,
    planType: 'seaact'
  },
  {
    text: '寵物險',
    prodId: ProdIdEnum.Pet,
    planType: 'pet'
  },
  {
    text: '住火險',
    prodId: ProdIdEnum.Fire,
    planType: 'fire'
  },
  {
    text: '個傷險',
    prodId: ProdIdEnum.Psninj,
    planType: 'psninj'
  }
];

const List: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const routerLocation = useLocation<ListRouteLocationState>();
  const authorization = useSelector((state: RootState) => state.system.member.authorization);
  const queryPolicyState = useSelector((state: RootState) => state.service.queryPolicy);
  const inquiryState = queryPolicyState.inquiry;
  const activePlan = inquiryState.plan;
  const proposeState = queryPolicyState.list.propose;
  const applyState = queryPolicyState.list.apply;
  const singleState = queryPolicyState.single.policy;
  const mobileSelectRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  /**
   * @description 頁面初始
   */
  useEffect(() => {
    if (!authorization) return;
    // 會員查詢「網投」保單
    const proposeHeader = {
      sortPage: {
        reqPage: inquiryState.proposePage,
        reqSize: inquiryState.pageSize
      }
    };
    const proposeArgs = {
      productId: activePlan.prodId,
      bcType: InsureModeCodesEnum.Propose
    };
    reduxDispatch(fetchPolicyListAction(proposeHeader, proposeArgs));
    if (isVehicle(activePlan.prodId)) {
      // 會員查詢「網要」保單
      const applyHeader = {
        sortPage: {
          reqPage: inquiryState.applyPage,
          reqSize: inquiryState.pageSize
        }
      };
      const applyArgs = {
        productId: activePlan.prodId,
        bcType: InsureModeCodesEnum.Apply
      };
      reduxDispatch(fetchPolicyListAction(applyHeader, applyArgs));
    }
    // eslint-disable-next-line
  }, [authorization]);

  /**
   * @description 點擊手機版險種選擇器之外的區域
   * @param event event object
   */
  const handleClickOutside = (event: any) => {
    if (!mobileSelectRef.current) return;
    if (!mobileSelectRef.current.contains(event.target)) {
      const elemOpened = $('.sliding-tab-02__mobile.collapsed');
      if (elemOpened.length > 0) {
        $('.sliding-tab-02__mobile').removeClass('collapsed');
      }
    }
  };

  /**
   * @description 是否為汽、機車險
   * @param prodId 商品代碼
   */
  const isVehicle = (prodId: ProdIdEnum) => {
    if (prodId === ProdIdEnum.Auto || prodId === ProdIdEnum.Moto) {
      return true;
    }
    return false;
  };

  /**
   * @description 處理頁籤 onClick 執行的事件
   * @param planType 險種
   */
  const handleTabClick = (plan: PlanState) => {
    if (!authorization) return;
    reduxDispatch(resetPolicyListAction());
    // 查詢「網投」保單
    const proposeHeader = {
      sortPage: {
        reqPage: inquiryState.proposePage,
        reqSize: inquiryState.pageSize
      }
    };
    const proposeArgs = {
      productId: plan.prodId,
      bcType: InsureModeCodesEnum.Propose
    };
    reduxDispatch(fetchPolicyListAction(proposeHeader, proposeArgs));
    if (isVehicle(plan.prodId)) {
      // 查詢「網要」保單
      const applyHeader = {
        sortPage: {
          reqPage: inquiryState.applyPage,
          reqSize: inquiryState.pageSize
        }
      };
      const applyArgs = {
        productId: plan.prodId,
        bcType: InsureModeCodesEnum.Apply
      };
      reduxDispatch(fetchPolicyListAction(applyHeader, applyArgs));
    }
    const elem = $('.sliding-tab-02__mobile.collapsed');
    if (elem) elem.removeClass('collapsed');
    // 儲存查詢條件
    reduxDispatch(saveInquiryFilterAction({
      plan,
      proposePage: 1,
      applyPage: 1,
      pageSize: inquiryState.pageSize
    }));
  };

  /**
   * @description 處理網投保單 onChange 執行的事件
   * @param currentPage 當前頁面
   * @param perPageTotal 每頁比數
   */
  const handleProposeTableChange = (currentPage: number, perPageTotal: number) => {
    if (!authorization) return;
    const { plan, applyPage, pageSize } = inquiryState;
    const proposeHeader = {
      sortPage: {
        reqPage: currentPage,
        reqSize: perPageTotal
      }
    };
    const proposeArgs = {
      productId: plan.prodId,
      bcType: InsureModeCodesEnum.Propose
    };
    reduxDispatch(fetchPolicyListAction(proposeHeader, proposeArgs));
    // 儲存查詢條件
    reduxDispatch(saveInquiryFilterAction({
      plan,
      proposePage: currentPage,
      applyPage,
      pageSize
    }));
  };

  /**
   * @description 處理網要保單 onChange 執行的事件
   * @param currentPage 當前頁面
   * @param perPageTotal 每頁筆數
   */
  const handleApplyTableChange = (currentPage: number, perPageTotal: number) => {
    if (!authorization) return;
    const { plan, proposePage, pageSize } = inquiryState;
    // 汽、機車險才有網要
    if (plan.prodId === ProdIdEnum.Moto || plan.prodId === ProdIdEnum.Auto) {
      const applyHeader = {
        sortPage: {
          reqPage: currentPage,
          reqSize: perPageTotal
        }
      };
      const applyArgs = {
        productId: plan.prodId,
        bcType: InsureModeCodesEnum.Apply
      };
      reduxDispatch(fetchPolicyListAction(applyHeader, applyArgs));
    }
    // 儲存查詢條件
    reduxDispatch(saveInquiryFilterAction({
      plan,
      proposePage,
      applyPage: currentPage,
      pageSize
    }));
  };

  const getPlanType = (policy: Policy) => {
    if (policy.applyNo.includes('C')) return 'car';
    if (policy.applyNo.includes('M')) return 'moto';
    if (policy.applyNo.includes('T')) return 'travel';
    if (policy.applyNo.includes('P')) return 'pet';
    if (policy.applyNo.includes('F')) return 'fire';
    return '';
  };

  return (
    <div className="inside-page-01-layout__latter inside-page-01-layout__latter--typeA inside-page-01-layout__latter--result">
      <div className="result-layout-00">
        <div className="result-layout-00__content">
          {authorization ? (
            // 會員 => 區分網投、網要
            <div className="result-layout-00__block">
              <div className="inside-page-01-layout__sliding-tab sliding-tab-group-01">
                <div className="sliding-tab-group-01__sliding-tab sliding-tab-02">
                  {/* PC 版面 */}
                  <div className="sliding-tab-02__pc nxjq-sliding-tab-wrapper">
                    <div className="nxjq-sliding-tab-nav-shell">
                      <div className="sliding-tab-02__nav nxjq-sliding-tab-nav">
                        {planOptions.map((plan, index) => (
                          <div style={{ position: 'relative' }} key={`plan-type-${index}`} className={'nxjq-sliding-tab-nav__item' + (activePlan.planType === plan.planType ? ' nxjq-sliding-tab-nav__item--active' : '')} onClick={() => handleTabClick(plan)}>
                            <div className="textEffect">{plan.text}</div>
                            <div className={'selectedEffect' + (activePlan.planType === plan.planType ? ' active' : '')} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Mobile 版面 */}
                  <div ref={mobileSelectRef} className="sliding-tab-02__mobile">
                    <button className="select-header" onClick={() => {
                      const elemOpened = $('.sliding-tab-02__mobile.collapsed');
                      if (elemOpened.length > 0) {
                        elemOpened.removeClass('collapsed');
                      } else {
                        $('.sliding-tab-02__mobile').addClass('collapsed');
                      }
                    }}>{activePlan.text}</button>
                    <div className="select-option-list-wrapper">
                      <ul className="select-option-list">
                        {planOptions.map((plan, index) => (
                          <li key={`mobile-plan-${index}`} className="select-option-list__item" onClick={() => handleTabClick(plan)}>{plan.text}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="inside-page-01-layout__form form-layout-00">
                <div className="form-layout-00__title">網路投保</div>
                <div className="form-layout-00__body form-layout-00__body--type-3">
                  <div className="transposing-table-00">
                    {/* PC 版面 */}
                    <div className="transposing-table-00__pc">
                      <div className="transposing-table-00-pc">
                        {/* 表格 */}
                        <table className="transposing-table-00-pc__table transposing-table-00-pc--setF" style={{ width: '100%' }}>
                          <TableHead columns={['受理編號', '保險期間', '保單號碼', '備註']} prefix="propose-head" />
                          <TableBody
                            list={proposeState.policys}
                            prefix="propose-body"
                            planType={activePlan.planType}
                          />
                        </table>
                        {/* 分頁 */}
                        {proposeState.totalCount > 0 && (
                          <div className="transposing-table-00-pc__pagination">
                            <Pagination00 range={10} initialPage={inquiryState.proposePage} perPageTotal={inquiryState.pageSize} total={proposeState.totalCount} onChange={handleProposeTableChange} />
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Mobile 版面 */}
                    <div className="transposing-table-00__mobile">
                      <div className="transposing-table-00-mobile">
                        <div className="transposing-table-00-mobile__inner">
                          {proposeState.policys.map((policy, index) => (
                            <MobileCell key={`propose-${index}`} prodId={activePlan.prodId} policy={policy} />
                          ))}
                        </div>
                        {/* 分頁 */}
                        {proposeState.totalCount > 0 && (
                          <div className="transposing-table-00-mobile__pagination">
                            <Pagination00 range={10} initialPage={inquiryState.proposePage} perPageTotal={inquiryState.pageSize} total={proposeState.totalCount} onChange={handleProposeTableChange} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* 汽機車險才會有「網路要保」，其餘險種僅網路投保 */}
              {(activePlan.planType === 'car' || activePlan.planType === 'moto') && (
                <div className="inside-page-01-layout__form form-layout-00">
                  <div className="form-layout-00__title">網路要保</div>
                  <div className="form-layout-00__body form-layout-00__body--type-3">
                    <div className="transposing-table-00">
                      {/* PC 版面 */}
                      <div className="transposing-table-00__pc">
                        <div className="transposing-table-00-pc">
                          <table className="transposing-table-00-pc__table transposing-table-00-pc--setF" style={{ width: '100%' }}>
                            <TableHead columns={['受理編號', '保險期間', '保單號碼', '備註']} prefix="apply-head" />
                            <TableBody
                              list={applyState.policys}
                              prefix="apply-body"
                              planType={activePlan.planType}
                            />
                          </table>
                          {/* 分頁 */}
                          {applyState.totalCount > 0 && (
                            <div className="transposing-table-00-pc__pagination">
                              <Pagination00 range={10} initialPage={inquiryState.applyPage} perPageTotal={inquiryState.pageSize} total={applyState.totalCount} onChange={handleApplyTableChange} />
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Mobile 版面 */}
                      <div className="transposing-table-00__mobile">
                        <div className="transposing-table-00-mobile">
                          <div className="transposing-table-00-mobile__inner">
                            {applyState.policys.map((policy, index) => (
                              <MobileCell key={`apply-${index}`} prodId={activePlan.prodId} policy={policy} />
                            ))}
                          </div>
                          {/* 分頁 */}
                          {applyState.totalCount > 0 && (
                            <div className="transposing-table-00-mobile__pagination">
                              <Pagination00 range={10} initialPage={inquiryState.proposePage} perPageTotal={inquiryState.pageSize} total={applyState.totalCount} onChange={handleProposeTableChange} />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // 非會員 => 呈現至多單筆結果
            <div className="result-layout-00__block">
              <div className="inside-page-01-layout__form form-layout-00">
                <div className="form-layout-00__title">查詢結果</div>
                <div className="form-layout-00__body form-layout-00__body--type-3">
                  <div className="transposing-table-00">
                    <div className="transposing-table-00__pc">
                      <div className="transposing-table-00-pc">
                        <table className="transposing-table-00-pc__table transposing-table-00-pc--setF" style={{ width: '100%' }}>
                          <TableHead columns={['受理編號', '保險期間', '保單號碼', '備註']} prefix="apply-head" />
                          {singleState && (
                            <TableBody list={[singleState]} prefix="apply-body" planType={getPlanType(singleState)} id={routerLocation.state.id} />
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default List;
