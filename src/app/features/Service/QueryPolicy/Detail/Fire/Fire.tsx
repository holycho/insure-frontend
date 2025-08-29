import { Product } from 'app/bff/models/service/policyDetailFire/policyDetailFireResp';
import Readonly01 from 'app/common/compoments/Form/Readonly';
import Readonly02 from 'app/common/compoments/Form/Readonly02/Readonly02';
import { ROUTES } from 'app/core/router';
import commonService from 'app/core/services/commonService';
import { RootState } from 'app/store/types';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

// 說明：客製需求，非視覺團隊提供的樣式，故加在此處
const styles: { [key: string]: React.CSSProperties } = {
  displayNoContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  displayNoBlock: {
    width: '50%',
    minWidth: '320px',
    marginTop: 0,
    marginBottom: 20
  },
  groupLabelContainer: {
    display: 'flex',
    flexWrap: 'wrap'
  }
};

const Fire: React.FC = () => {
  const routerHistory = useHistory();
  const systemState = useSelector((state: RootState) => state.system);
  const memberState = systemState.member;
  const authorizationState = memberState.authorization;
  const memberIdState = memberState.profile?.id;
  const detailState = useSelector((state: RootState) => state.service.queryPolicy.detail.fire);

  const handleInsuCertPrint = () => {
  };

  const hasMortageBank = () => {
    if (detailState?.policyInsured.mortgageBankName ||
      detailState?.policyInsured.mortgageBranchName ||
      detailState?.policyInsured.bankContact ||
      detailState?.policyInsured.contactZipCode ||
      detailState?.policyInsured.contactZipName ||
      detailState?.policyInsured.contactDistrict ||
      detailState?.policyInsured.contactFullAddress) {
      return true;
    }
    return false;
  };

  /**
   * @description 顯示勾選方案的「住宅地震基本保險」優惠保費
   */
  const displayEarthquakePreferentialPremium = () => {
    if (!detailState || !detailState.policyInfo || !detailState.policyInfo.products) return '0';
    const plan = detailState.policyInfo.products.find(it => it.planCode === 'R0');
    if (!plan) return '0';
    const profit = plan.productProfits.find(it => it.profitId === 'BWMPD');
    if (!profit) return 0;
    return commonService.thousandFormat(profit.discount);
  };

  /**
   * @description 渲染主約內容
   * @param plan 險種
   */
  const renderMainPlan = (plan: Product) => {
    return (
      <div className="form-layout-01-cell__content">
        {plan.productProfits.map((profit) => {
          return (
            <div key={uuid()} className="form-layout-01-cell__data form-layout-01-cell__data--align-start space-between space-between--mobile-wrap">
              <div className="space-between__former ">
                <div className="form-layout-01-cell__text">
                  {profit.profitDescZhTw}
                </div>
              </div>
              <div className="space-between__latter ">
                <div className="form-layout-01-cell__text">
                  {profit.displayAmt}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /**
   * @description 渲染描述說明
   * @param plan 險種
   */
  const renderBriefDesc = (plan: Product) => {
    return (
      <>
        <div className="form-layout-01-cell__head">
          <div className="form-layout-01-cell__morph-row form-layout-01-cell__morph-row--align-center">
            <div
              className="form-layout-01-cell__mimic-title form-layout-01-cell__mimic-title--bold"
            >{plan.planShowName}
            </div>
          </div>
        </div>
        <div className="form-layout-01-cell__content">
          <div key={uuid()} className="form-layout-01-cell__data form-layout-01-cell__data--align-start space-between space-between--mobile-wrap">
            <div className="form-layout-01-cell__text" dangerouslySetInnerHTML={{ __html: plan.planBriefDesc }} />
          </div>
        </div>
      </>
    );
  };

  /**
   * @description 處理「保單型式」Sub content 資料顯示
   * @param type 當前的保單形式
   */
  const displayPolicyTypeSubContent = (type: string) => {
    if (!detailState) return '';
    switch (type) {
      case '電子保單': {
        if (!detailState.policyDelivery) return '';
        return detailState.policyDelivery.email ?? '';
      }
      case '紙本保單': {
        if (!detailState.policyInsured) return '';
        return `${detailState.policyInsured.cityName ?? ''}${detailState.policyInsured.areaName ?? ''}${detailState.policyInsured.address ?? ''}`;
      }
      default:
        return '';
    }
  };

  /**
   * @description 處理「上一步」執行的事件
   */
  const handlePrevStep = () => {
    routerHistory.goBack();
  };

  return detailState && (
    <div className="inside-page-01-layout__latter inside-page-01-layout__latter--result">
      <div className="result-layout-00">
        <div className="result-layout-00__head medium-screen-2-margin-top-minus-100">
          {detailState.policyInfo.isInsuCertPrint === 'Y' && (
            <div className="inside-page-01-layout__form form-layout-00">
              <div className="form-layout-00__body form-layout-00__body--shadowed">
                <div style={{ justifyContent: 'center' }} className="form-layout-00__row">
                  <div style={{ marginTop: 0 }} className="share-block-01__btn-wrapper">
                    <button type="button" className="share-block-01__btn btn-primary" onClick={handleInsuCertPrint}>列印投保證明</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="inside-page-01-layout__form form-layout-00">
            <div className="form-layout-00__body form-layout-00__body--shadowed">
              <div className="form-layout-00__row">
                <div style={styles.displayNoContainer} className="form-layout-00__cell form-layout-00__cell--auto form-layout-00__cell--mobile-auto">
                  <div style={styles.displayNoBlock} className="form-layout-00__section">
                    <div className="form-layout-00__title-tag">受理編號</div>
                    <div className="form-layout-00__value-text form-layout-00__value-text--has-tag">
                      {detailState.policyInfo.applyNo}
                      {/* 保單狀態 */}
                      <div className={'form-layout-00__color-tag color-tag' + (detailState.policyInfo.isInsuFailure === 'Y' ? ' color-tag--red' : ' color-tag--green')}>
                        <div className="color-tag__text">{detailState.policyInfo.policyStatus}</div>
                      </div>
                    </div>
                  </div>
                  <div style={styles.displayNoBlock} className="form-layout-00__section">
                    <div className="form-layout-00__title-tag">保單號碼</div>
                    <div className="form-layout-00__value-text form-layout-00__value-text--has-tag">
                      {detailState.policyInfo.policyNo}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="margin-bottom-56 margin-top-80 smaller-than-medium-screen-2-margin-bottom-48 smaller-than-medium-screen-2-margin-top-40">
          <div className="result-layout-00__block">
            <div className="result-layout-00__label-text">您的保單資訊如下</div>
          </div>
        </div>
      </div>
      {/* 要保人資料 */}
      <div className="inside-page-01-layout__form form-layout-00">
        <div className="form-layout-00__title">要保人資料</div>
        <div className="form-layout-00__body">
          <div className="form-layout-00__row form-layout-00__row--f-wrap">
            <div className="form-layout-00__cell ">
              <div className="form-layout-00__section">
                <Readonly01 label="姓名" content={detailState.policyInsured.name} />
              </div>
            </div>
            <div className="form-layout-00__cell ">
              <div className="form-layout-00__section">
                <Readonly01 label="身分證字號" content={detailState.policyInsured.id} />
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly01 label="出生年月日" content={detailState.policyInsured.birthday} />
              </div>
            </div>
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <Readonly01 label="行動電話" content={detailState.policyInsured.mobile} />
              </div>
            </div>
            <div className="form-layout-00__cell ">
              <div className="form-layout-00__section">
                <Readonly01 label="聯絡電話" content={`${detailState.policyInsured.telAreaNo}${detailState.policyInsured.telNo}${detailState.policyInsured.telExtNo}`} />
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly01 label="聯絡地址" content={`${detailState.policyInsured.cityName}${detailState.policyInsured.areaName}${detailState.policyInsured.address}`} />
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--full form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly02 label="電子郵件" content={detailState.policyInsured.email} />
              </div>
            </div>
            {hasMortageBank() ? (
              <>
                <div className="form-layout-00__cell ">
                  <div className="form-layout-00__section">
                    <Readonly01 label="抵押權人" content={detailState.policyInsured.mortgageName} />
                  </div>
                </div>
                <div className="form-layout-00__cell ">
                  <div className="form-layout-00__section">
                    <Readonly01 label="保單是否寄送銀行" content={detailState.policyInsured.isSendToBank} />
                  </div>
                </div>
                {detailState.policyInsured.isSendToBank === '是' ? (
                  <>
                    <div className="form-layout-00__cell">
                      <div className="form-layout-00__section">
                        <Readonly01 label="收件人" content={detailState.policyInsured.bankContact ? detailState.policyInsured.bankContact : ''} />
                      </div>
                    </div>
                    <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
                      <div className="form-layout-00__section">
                        <Readonly01 label="寄送地址" content={`${detailState.policyInsured.contactZipName}${detailState.policyInsured.contactDistrict}${detailState.policyInsured.contactFullAddress ?? ''}`} />
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <div className="form-layout-00__cell ">
                <div className="form-layout-00__section">
                  <Readonly01 label="抵押權人" content="無抵押權人" />
                </div>
              </div>
            )}
            <div className="form-layout-00__cell ">
              <div className="form-layout-00__section">
                <Readonly01 label="要保人之職業" content={detailState.policyInsured.occupationName} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 被保險人資料 */}
      <div className="inside-page-01-layout__form form-layout-00">
        <div className="form-layout-00__title">
          被保險人資料
        </div>
        <div className="form-layout-00__body">
          <div className="form-layout-00__centered-information">
            被保險人同要保人。
          </div>
        </div>
      </div>
      {/* 投保標的物資料 */}
      <div className="inside-page-01-layout__form form-layout-00">
        <div className="form-layout-00__title">
          投保標的物資料
        </div>
        <div className="form-layout-00__body">
          <div className="form-layout-00__row form-layout-00__row--limited form-layout-00__row--f-wrap">
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly01 label="保險期間" content={`${commonService.displayTWDate2(detailState.buildingInfo.startTime ?? '')}中午12時 起1年`} />
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly01 label="標的物地址" content={`${detailState.buildingInfo.buildingFullAddress}`} />
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly01 label="標的物建造年份" content={detailState.buildingInfo.buildingYear ? `民國${+detailState.buildingInfo.buildingYear}年` : ''} />
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly01 label="使用面積" content={`${detailState.buildingInfo.buildingArea}坪（${detailState.buildingInfo.buildingAreaM}平方公尺）`} />
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly01 label="建築樓高" content={`地上自一樓起共${detailState.buildingInfo.storeyAbove}樓（同棟建築物${detailState.buildingInfo.businessFlag === 'Y' ? '有' : '無'}營業行為）`} />
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly01 label="建築構造" content={`${detailState.buildingInfo.buildingMaterial}/${detailState.buildingInfo.buildingRoof}`} />
              </div>
            </div>
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <Readonly01 label="所在地區" content={detailState.buildingInfo.buildingCityName} />
              </div>
            </div>
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <Readonly01 label="裝潢成本" content={`每坪${commonService.thousandFormat(detailState.buildingInfo.decorationCost)}元`} />
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <Readonly01 label="是否向其他保險公司投保" content={detailState.policyInfo.isDualInsu === 'Y' ? '是' : '否'} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 商品列表 */}
      <div className="inside-page-01-layout__collapse-table-group">
        <div className="form-layout-01">
          {/*  第一版塊 start  */}
          <div className="form-layout-01__group">
            {/*  第一單位 start  */}
            <div className="form-layout-01__cell form-layout-01-cell form-layout-01-cell--bordered">
              <div className="form-layout-01-cell__tag form-layout-01-cell-tag">
                <div className="form-layout-01-cell-tag__head">
                  <div className="form-layout-01-cell-tag__title">保費</div>
                </div>
                <div className="form-layout-01-cell-tag__content">
                  <div
                    className="form-layout-01-cell-tag__prefixed-tag form-layout-01-cell-tag__prefixed-tag--denied"
                    data-prefix="NT$"
                  >{commonService.thousandFormat(detailState.policyInfo.totalFeeOriginal)}
                  </div>
                  <div className="form-layout-01-cell-tag__arrow" />
                  <div className="form-layout-01-cell-tag__prefixed-tag" data-prefix="NT$">{commonService.thousandFormat(detailState.policyInfo.totalFeeDiscount)}</div>
                </div>
              </div>
              <div className="form-layout-01-cell__head">
                <div className="form-layout-01-cell__morph-row  form-layout-01-cell__morph-row--align-center">
                  <div className="radio-group-00-item radio-group-00-item--bold  radio-group-00-item--fluid radio-group-00-item--m-basis-175 radio-group-00-item--align-start">
                    <label style={styles.groupLabelContainer} className="radio-group-00-item__label">
                      {/* 主約名稱 */}
                      <div className="radio-group-00-item__text text">{detailState.policyInfo.products[0].planShowName}
                      </div>
                      {/* 方案名稱 */}
                      <div className="radio-group-00-item__tag color-tag  color-tag--green color-tag--no-width">
                        <div className="color-tag__text">{detailState.policyInfo.products[0].campaignName}</div>
                      </div>
                    </label>
                    <div className="form-layout-01-cell__prefixed-text" data-prefix="NT$">{commonService.thousandFormat(detailState.policyInfo.products[0].feeAfterDiscount)}</div>
                  </div>
                </div>
              </div>
              {detailState.policyInfo.products.map((plan, index) => {
                if (plan.planCode === 'A1' || plan.planCode === 'A2') return renderMainPlan(plan);
                if (plan.planCode === 'C1' || plan.planCode === 'E2') return renderBriefDesc(plan);
                return (
                  <>
                    <div className="form-layout-01-cell__head">
                      <div className="form-layout-01-cell__morph-row form-layout-01-cell__morph-row--align-center">
                        <div
                          className={'form-layout-01-cell__mimic-title form-layout-01-cell__mimic-title--bold' + (plan.planCode === 'R0' ? ' price' : '')}
                        >{plan.planShowName}
                        </div>
                        {/* 額外顯示「住宅地震基本保險」(R0)之優惠保費 */}
                        {plan.planCode === 'R0' ? (
                          <div className="form-layout-01-cell__prefixed-text" data-prefix="NT$">{displayEarthquakePreferentialPremium()}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="form-layout-01-cell__content">
                      {/* 補上「住宅颱風及洪水災害補償保險」(E1)之前綴文字 */}
                      {plan.planCode === 'E1' ? (
                        <div className="form-layout-01-cell__data form-layout-01-cell__data--align-start space-between space-between--mobile-wrap">
                          <div className="form-layout-01-cell__text">各地區限額如下</div>
                        </div>
                      ) : null}
                      {plan.productProfits.map((profit) => {
                        return (
                          <div key={uuid()} className="form-layout-01-cell__data form-layout-01-cell__data--align-start space-between space-between--mobile-wrap">
                            <div className="space-between__former ">
                              <div className="form-layout-01-cell__text">
                                {profit.profitDescZhTw}
                              </div>
                            </div>
                            <div className="space-between__latter ">
                              <div className="form-layout-01-cell__text">
                                {profit.displayAmt}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                );
              })}
            </div>
            {/*  第一單位 end  */}
          </div>
          {/*  第一版塊 end  */}
          {/*  結尾板塊 start  */}
          <div className="form-layout-01__group">
            <div className="result-table-00">
              <div className="result-table-00__inner">
                <div className="result-table-00__head space-between">
                  <div className="space-between__former space-between__former--fit">
                    <div className="result-table-00__title">
                      <div className="result-table-00__text">合計</div>
                    </div>
                  </div>
                  <div className="space-between__latter">
                    <div className="result-table-00__text result-table-00__text--highlight result-table-00__text--prefixed" data-prefix="NT$">
                      {commonService.thousandFormat(detailState.policyInfo.totalFeeDiscount)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*  結尾板塊 end  */}
        </div>
      </div>
      {/* 保單寄送方式 */}
      <div className="inside-page-01-layout__form form-layout-00">
        <div className="form-layout-00__title">保單寄送方式</div>
        <div className="form-layout-00__body">
          <div className="form-layout-00__row">
            {detailState.policyDelivery && (
              <div className="form-layout-00__cell form-layout-00__cell--full">
                <div className="form-layout-00__section">
                  <Readonly01
                    label="保單型式"
                    content={detailState.policyDelivery.deliveryName}
                    subContent={displayPolicyTypeSubContent(detailState.policyDelivery.deliveryName)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* 轉跳按鈕 */}
      <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
        {authorizationState && memberIdState && (
          <button type="button" className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevStep}>
            返回上一步
          </button>
        )}
        <Link to={ROUTES.HOME__MAIN} className="inside-page-01-layout__btn btn-primary">
          回網路投保首頁
        </Link>
      </div>
    </div>
  );
};

export default Fire;