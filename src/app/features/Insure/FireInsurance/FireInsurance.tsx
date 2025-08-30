import React, { Suspense, useEffect } from 'react';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import InsidePage from 'app/common/layouts/InsidePage';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';
import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import { ROUTES } from 'app/core/router';
import { RouteMatchesStep, StepCodesEnum, StepTextEnum } from './types';
import useBeforeunload from 'app/core/hooks/useBeforeunload';
import commonService from 'app/core/services/commonService';
import { initProcessAction } from 'app/store/insure/fireInsurance/actions';
import { useDispatch } from 'react-redux';
import environment from 'environments';

import Calculation from './Calculation';
// const Calculation = React.lazy(() => import('./Calculation'));
import Choose from './Calculation/Choose';
// const Choose = React.lazy(() => import('./Calculation/Choose'));
import InsuranceInfo from './InsuranceInfo';
// const InsuranceInfo = React.lazy(() => import('./InsuranceInfo'));
import Clauses from './InsuranceInfo/Clauses';
// const Clauses = React.lazy(() => import('./InsuranceInfo/Clauses'));
import ConfirmInfo from './ConfirmInfo';
// const ConfirmInfo = React.lazy(() => import('./ConfirmInfo'));
import OTPAuth from './ConfirmInfo/OTPAuth';
// const OTPAuth = React.lazy(() => import('./ConfirmInfo/OTPAuth'));
import Payment from './Payment';
// const Payment = React.lazy(() => import('./Payment'));
import CreditCard from './Payment/CreditCard';
// const CreditCard = React.lazy(() => import('./Payment/CreditCard'));
import Transfer from './Payment/Transfer';
// const Transfer = React.lazy(() => import('./Payment/Transfer'));
import Complete from './Complete';
import { useInsureFireInsuranceGuard } from 'app/core/router/guards';

// const Complete = React.lazy(() => import('./Complete'));

const MOCK_SERVER_DELAY = 500;
declare const $: any;

const FireInsurance: React.FC = () => {
  const routerLocation = useLocation();
  const reduxDispatch = useDispatch();

  console.log('%cfire layer', 'background: blue; color: white; padding: 2px 4px;');
  const steps: {
    title: string;
    subTitles?: string[];
  }[] = [
      // { title: StepTextEnum.Calculation, subTitles: [StepTextEnum.Calculation, StepTextEnum.CalculationChoose] },
      { title: StepTextEnum.Calculation, subTitles: [StepTextEnum.Calculation] },
      { title: StepTextEnum.InsuranceInfo, subTitles: [StepTextEnum.InsuranceInfoPatch, StepTextEnum.InsuranceInfoClauses] },
      { title: StepTextEnum.ConfirmInfo, subTitles: [StepTextEnum.ConfirmInfo, StepTextEnum.ConfirmInfoOTPAuth] },
      { title: StepTextEnum.Payment, subTitles: [StepTextEnum.PaymentMode, StepTextEnum.Payment] },
      { title: StepTextEnum.Complete }
    ];
  const stepSnippets = RouteMatchesStep[routerLocation.pathname].split('-');
  const currentStep = stepSnippets[0];
  const currentSubStep = stepSnippets[1];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const elem = $('.stepbar-00');
      if (elem) {
        commonService.appendScriptResource('/js/stepbar-00.js');
        if (intervalId) clearInterval(intervalId);
      }
    }, 300);
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [routerLocation.pathname]);

  /**
   * @description 流程式功能，綁定 Beforeunload Hook，在離開頁面前發出提示訊息
   */
  useBeforeunload(RouteMatchesStep[routerLocation.pathname] !== StepCodesEnum.Complete);

  /**
   * @description 組件初始化後執行的 Effect
   */
  useEffect(() => {
    // 初始化流程 (初始取得相關資料)
    // 注意: mock server 尚未掛載，故加 500 毫秒緩衝
    // if (process.env.NODE_ENV === 'development') {
    if (environment.browser.useMsw) {
      setTimeout(() => {
        reduxDispatch(initProcessAction());
      }, MOCK_SERVER_DELAY);
    } else {
      reduxDispatch(initProcessAction());
    }
  }, [reduxDispatch]);

  return (
    <InsidePage>
      {/* 「投保完成」頁自帶 banner，故不用顯示 */}
      {+currentStep < steps.length && (
        <div className="inside-page-01-layout__former">
          <div className="inside-page-01-banner">
            <div className="inside-page-01-banner__inner">
              <div className="inside-page-01-banner__former">
                <div className="inside-page-01-banner__title inside-page-01-banner__title--main">住火險投保</div>
                <div className="inside-page-01-banner__title inside-page-01-banner__title--vice">網路投保</div>
              </div>
              <div className="inside-page-01-banner__latter">
                <div className="stepbar-00">
                  <div className="stepbar-00__inner">
                    {steps.map((it, index) => {
                      const mainStepNum = index + 1;
                      let showProgress = false;
                      // 若有子步驟，則顯示步驟進度。（僅一個子步驟，則不需顯示進度）
                      if (+currentStep === mainStepNum && it.subTitles && +currentSubStep <= it.subTitles.length && it.subTitles.length > 1) {
                        showProgress = true;
                      }
                      return (<div key={index} className="stepbar-00__cell">
                        <div
                          className={' stepbar-00-step ' + (+currentStep === mainStepNum ? ' stepbar-00-step--active' : '')}
                          data-step-progress-now={showProgress ? currentSubStep : null}
                          data-steps={showProgress ? JSON.stringify(it.subTitles) : null}
                        >
                          <div className="stepbar-00-step__number">
                            {mainStepNum}
                          </div>
                          <div className="stepbar-00-step__title">
                            {it.title}
                          </div>
                        </div>
                      </div>
                      );
                    })}
                  </div>
                  <div className="stepbar-00__progress stepbar-00-step-progress">
                    <div className="stepbar-00-step-progress__bar stepbar-00-step-progress-bar">
                      <div className="stepbar-00-step-progress-bar__inner"></div>
                    </div>
                    <div className="stepbar-00-step-progress__title">
                      <div className="stepbar-00-step-progress__text stepbar-00-step-progress__text--number" />
                      <div className="stepbar-00-step-progress__text stepbar-00-step-progress__text--title" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={<LoadingSpinner visible />}>
        <Switch>
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__CALCULATION}
            // React v16
            // component={React.lazy(() => import('./Calculation'))}
            // React v18 的 lazy loading 若未先宣告則會發生多重渲染的迴圈 (v16 似乎不會)
            component={Calculation}
            activate={[useInsureFireInsuranceGuard]}
          />
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__CALCULATION__CHOOSE}
            // component={React.lazy(() => import('./Calculation/Choose'))}
            component={Choose}
            activate={[useInsureFireInsuranceGuard]}
          />
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO}
            // component={React.lazy(() => import('./InsuranceInfo'))}
            component={InsuranceInfo}
            activate={[useInsureFireInsuranceGuard]}
          />
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__INSURANCE_INFO__CLAUSES}
            // component={React.lazy(() => import('./InsuranceInfo/Clauses'))}
            component={Clauses}
          />
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO}
            // component={React.lazy(() => import('./ConfirmInfo'))}
            component={ConfirmInfo}
          />
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__CONFIRM_INFO__OTP_AUTH}
            // component={React.lazy(() => import('./ConfirmInfo/OTPAuth'))}
            component={OTPAuth}
          />
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__PAYMENT}
            // component={React.lazy(() => import('./Payment'))}
            component={Payment}
          />
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__TRANSFER}
            // component={React.lazy(() => import('./Payment/Transfer'))}
            component={Transfer}
          />
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__PAYMENT__CREDIT_CARD}
            // component={React.lazy(() => import('./Payment/CreditCard'))}
            component={CreditCard}
          />
          <RouterRoute
            exact
            path={ROUTES.INSURE__FIRE_INSURANCE__COMPLETE}
            // component={React.lazy(() => import('./Complete'))}
            component={Complete}
          />
          {/* 此層路由均無對應，則返回主首頁 */}
          <Redirect to={ROUTES.HOME__MAIN} />
        </Switch>
      </Suspense>
    </InsidePage>
  );
};

export default FireInsurance;
