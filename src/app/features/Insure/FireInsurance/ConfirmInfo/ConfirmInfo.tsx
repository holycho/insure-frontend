import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
// import CollapseTable00Block from 'app/common/compoments/Collapse/CollapseTable00Block';
import commonService from 'app/core/services/commonService';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import CollapseTable00 from 'app/common/compoments/Collapse/CollapseTable00';
import { useDispatch } from 'react-redux';
import apiService from 'app/bff/services/apiService';
import { OtpSendReq } from 'app/bff/models/otp/otpSend';
import { sendOtpDoneAction, setAccessiableStepAction } from 'app/store/insure/fireInsurance/actions';
import { StepCodesEnum } from '../types';

const ConfirmInfo: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const staticState = useSelector((state: RootState) => state.insure.fireInsurance.static);
  const processState = useSelector((state: RootState) => state.insure.fireInsurance.process);
  const cityAreaState = useSelector((state: RootState) => state.insure.fireInsurance.static.cityArea);
  const calculationState = processState.calculation;
  const insuranceInfoState = processState.insuranceInfo;
  const campaign = calculationState.data?.campaigns.find(it => it.campaignId === calculationState.data?.campaignId);

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  const handlePrevClick = () => {
    routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO__CLAUSES);
  };

  const handleNextClick = async () => {
    if (!insuranceInfoState.data || !insuranceInfoState.data.insured) return;
    const { insured } = insuranceInfoState.data;
    const args: OtpSendReq = {
      action: '4',
      memberId: insured.id, // 應為登入會員身份證
      mobile: insured.mobile,
      email: insured.email
    };
    const response = await apiService.postOtpSend(args);
    if (response) {
      // 緩存 OTP 資料
      reduxDispatch(sendOtpDoneAction(response));
      // 啟用下一步權限
      reduxDispatch(setAccessiableStepAction(StepCodesEnum.ConfirmInfoOTPAuth));
      // 跳轉至下一步
      routerHistory.push(ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO__OTP_AUTH);
    }
  };

  /**
   * @description 轉換「聯絡地址」為完整地址
   */
  const convertFullAddress = () => {
    if (!insuranceInfoState.data) return;
    const { insured } = insuranceInfoState.data;
    if (!insured) return;
    let fullAddress = '';
    const city = cityAreaState.find(it => it.cityId === insured.cityId);
    if (city) {
      fullAddress += city.cityName;
      const area = city.area.find(it => it.areaId === insured.areaId);
      if (area) {
        fullAddress += area.areaName;
      }
    }
    fullAddress += insured.address;
    return fullAddress;
  };

  /**
   * @description 轉換「標的物地址」為完整地址
   */
  const convertBuildingFullAddress = () => {
    if (!insuranceInfoState.data) return;
    const { building } = insuranceInfoState.data;
    if (!building) return;
    let fullAddress = '';
    const city = cityAreaState.find(it => it.cityId === building.cityId);
    if (city) {
      fullAddress += city.cityName;
      const area = city.area.find(it => it.areaId === building.areaId);
      if (area) {
        fullAddress += area.areaName;
      }
    }
    fullAddress += building.address;
    return fullAddress;
  };

  /**
   * @description 轉換「抵押權人銀行地址」為完整地址
   */
  const convertBankFullAddress = () => {
    if (!insuranceInfoState.data) return;
    const { building } = insuranceInfoState.data;
    if (!building || !building.mortgage) return;
    let fullAddress = '';
    const city = cityAreaState.find(it => it.cityId === building.mortgage.contactCityId);
    if (city) {
      fullAddress += city.cityName;
      const area = city.area.find(it => it.areaId === building.mortgage.contactAreaId);
      if (area) {
        fullAddress += area.areaName;
      }
    }
    fullAddress += building.mortgage.contactAddress;
    return fullAddress;
  };

  /**
   * @description 呈現所在地區
   */
  const displayCity = () => {
    const { city } = staticState;
    let cityName = '';
    if (calculationState.data) {
      const { building } = calculationState.data;
      const findC = city.find(it => it.paramValue === building.cityId);
      if (findC) {
        cityName = findC.paramText;
      }
    }
    return cityName;
  };

  /**
   * @description 呈現建築構造
   */
  const displayBuildingStruc = () => {
    const { material, roof } = staticState;
    let struc = '';
    if (calculationState.data) {
      const { building } = calculationState.data;
      const findM = material.find(it => it.paramValue === building.material);
      if (findM) {
        struc += (findM.paramText + '/');
      }
      const findR = roof.find(it => it.paramValue === building.roof);
      if (findR) {
        struc += findR.paramText;
      }
    }
    return struc;
  };

  /**
   * @description 呈現優惠保費
   */
  const displayTotalPremium = () => {
    if (calculationState.data) {
      const { premiums, campaignId } = calculationState.data;
      const find = premiums.find(it => it.campaignId === campaignId);
      if (find) {
        return find.premium.discount.total.toString();
      }
    }
    return '0';
  };

  return (
    <div className="inside-page-01-layout__latter">
      <div className="inside-page-01-layout__form form-layout-00">
        <div className="form-layout-00__title">
          要保人資料
        </div>
        <div className="form-layout-00__body">
          <div className="form-layout-00__row form-layout-00__row--f-wrap">
            <div className="form-layout-00__cell ">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">姓名</div>
                <div className="form-layout-00__value-text">{insuranceInfoState.data?.insured.name}</div>
              </div>
            </div>
            <div className="form-layout-00__cell ">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">身分證字號</div>
                <div className="form-layout-00__value-text">{insuranceInfoState.data?.insured.id}</div>
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">出生年月日</div>
                <div className="form-layout-00__value-text">{commonService.displayTWDate(insuranceInfoState.data?.insured.birthday)}</div>
              </div>
            </div>
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">行動電話</div>
                <div className="form-layout-00__value-text">{insuranceInfoState.data?.insured.mobile}</div>
              </div>
            </div>
            <div className="form-layout-00__cell ">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">聯絡電話</div>
                <div className="form-layout-00__value-text form-layout-00__value-text--null">{commonService.displayTelephone(insuranceInfoState.data?.insured.telAreaNo, insuranceInfoState.data?.insured.telNo, insuranceInfoState.data?.insured.telExtNo)}</div>
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">聯絡地址</div>
                <div className="form-layout-00__value-text">{convertFullAddress()}</div>
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">電子郵件</div>
                <div className="form-layout-00__value-text">{insuranceInfoState.data?.insured.email}</div>
              </div>
            </div>
            {insuranceInfoState.data?.building.mortgage.hasMortgage === 'Y' ? (
              <>
                <div className="form-layout-00__cell ">
                  <div className="form-layout-00__section">
                    <div className="form-layout-00__title-tag">抵押權人</div>
                    <div className="form-layout-00__value-text">{convertBankFullAddress()}</div>
                  </div>
                </div>
                <div className="form-layout-00__cell ">
                  <div className="form-layout-00__section">
                    <div className="form-layout-00__title-tag">保單是否寄送銀行</div>
                    <div className="form-layout-00__value-text">{insuranceInfoState.data?.building.mortgage.isSentToBank === 'Y' ? '是' : '否'}</div>
                  </div>
                </div>
              </>
            ) : (
              <div className="form-layout-00__cell ">
                <div className="form-layout-00__section">
                  <div className="form-layout-00__title-tag">抵押權人</div>
                  <div className="form-layout-00__value-text">無抵押人</div>
                </div>
              </div>
            )}
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">被保險人之職業</div>
                <div className="form-layout-00__value-text">{insuranceInfoState.data?.insured.occDomain}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      <div className="inside-page-01-layout__form form-layout-00">
        <div className="form-layout-00__title">
          投保標的物資料
        </div>
        <div className="form-layout-00__body">
          <div className="form-layout-00__row form-layout-00__row--limited form-layout-00__row--f-wrap">
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">保險期間</div>
                <div className="form-layout-00__value-text">
                  {commonService.displayTWDate2(calculationState.data?.building.effDate)}中午12時 起1年
                </div>
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">標的物地址</div>
                <div className="form-layout-00__value-text">{convertBuildingFullAddress()}</div>
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">標的物建造年份</div>
                <div className="form-layout-00__value-text">{commonService.displayTWYear(insuranceInfoState.data?.building.buildingYear)}</div>
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">使用面積</div>
                <div className="form-layout-00__value-text">{calculationState.data?.building.area}坪（約{commonService.convertToM2(calculationState.data?.building.area ?? '')}平方公尺）</div>
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--full form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">建築樓高</div>
                <div className="form-layout-00__value-text">地上自一樓起共{calculationState.data?.building.storeyTotal}樓（同棟建物物{calculationState.data?.building.businessFlag ? '有' : '無'}營業行為）</div>
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00--full form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">建築構造</div>
                <div className="form-layout-00__value-text">{displayBuildingStruc()}</div>
              </div>
            </div>
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">所在地區</div>
                <div className="form-layout-00__value-text">{displayCity()}</div>
              </div>
            </div>
            <div className="form-layout-00__cell">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">裝潢成本</div>
                <div className="form-layout-00__value-text">每坪{commonService.thousandFormat(calculationState.data?.building.decorationCost ?? '0')}元</div>
              </div>
            </div>
            <div className="form-layout-00__cell form-layout-00__cell--mobile-full">
              <div className="form-layout-00__section">
                <div className="form-layout-00__title-tag">是否向其他保險公司投保</div>
                <div className="form-layout-00__value-text">{insuranceInfoState.data?.building.isInsuredWithOtherCompanies === 'Y' ? '是' : '否'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="inside-page-01-layout__collapse-table-group collapse-table-group-00">
        {/* 標題 */}
        <div className="collapse-table-group-00__head space-between">
          <div className="space-between__former space-between__former--fit">
            <div className="collapse-table-group-00__tag">點擊保險商品查看保險內容</div>
          </div>
          <div className="space-between__latter">
            <div className="collapse-table-group-00__tag">保費</div>
          </div>
        </div>
        {/* 商品內容 */}
        <div className="collapse-table-group-00__list">
          <div className="collapse-table-group-00__item collapse-table-00">
            {campaign && (
              <CollapseTable00 fireAmt={calculationState.data?.insuAmt.fireAmt ?? '0'} movablePropertyAmt={calculationState.data?.insuAmt.movablePropertyFlag ? calculationState.data?.insuAmt.movablePropertyAmt : '0'} campaign={campaign} premium={calculationState.data?.premiums ?? []} />
            )}
          </div>
          <div className="collapse-table-group-00__item result-table-00 inside-page-01-layout__collapse-table-group">
            <div className="result-table-00__inner">
              <div className="result-table-00__head space-between">
                <div className="space-between__former space-between__former--fit">
                  <div className="result-table-00__title">
                    <div className="result-table-00__text">
                      合計
                    </div>
                  </div>
                </div>
                <div className="space-between__latter">
                  <div
                    className="result-table-00__text result-table-00__text--highlight  result-table-00__text--prefixed"
                    data-prefix="NT$">
                    {displayTotalPremium()}
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="inside-page-01-layout__btn-wrapper inside-page-01-layout-extend-btn-wrapper">
            <button className="inside-page-01-layout-extend-btn-wrapper__left-btn btn-text" onClick={handlePrevClick}>
              返回上一步
            </button>
            <button className="inside-page-01-layout__btn btn-primary" onClick={handleNextClick}>
              下一步
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmInfo;
