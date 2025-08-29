import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';
import InsidePage from 'app/common/layouts/InsidePage';
import { ROUTES } from 'app/core/router';
import useMemberRegisterGuard from 'app/core/router/guards/useMemberRegisterGuard';
import { initProcessAction } from 'app/store/member/register/actions';
import React, { Suspense, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Switch, useLocation } from 'react-router-dom';
import { RegisterRouteMatchesStep, RegisterStepsTextEnum } from './types';

const personalInfo = React.lazy(() => import('./PersonalInfo'));
const confirmInfo = React.lazy(() => import('./ConfirmInfo'));
const confirmAuthInfo = React.lazy(() => import('./ConfirmInfo/OTPAuth'));
const complete = React.lazy(() => import('./Complete'));

const Register: React.FC = () => {
  const reduxDispatch = useDispatch();
  const routerLocation = useLocation();

  const steps: {
    title: string;
    subTitles?: string[];
  }[] = [
      { title: RegisterStepsTextEnum.PersonalInfo },
      { title: RegisterStepsTextEnum.ConfirmInfo, subTitles: [RegisterStepsTextEnum.ConfirmInfo, RegisterStepsTextEnum.OTPAuth] },
      { title: RegisterStepsTextEnum.Complete }
    ];
  // 處理當前步驟
  const stepSnippets = RegisterRouteMatchesStep[routerLocation.pathname].split('-');
  const currentStep = stepSnippets[0];
  const currentSubStep = stepSnippets[1];

  /**
   * @description 頁面初始
   */
  useEffect(() => {
    reduxDispatch(initProcessAction());
  }, [reduxDispatch]);

  return (
    <InsidePage>
      {+currentStep < steps.length && (
        <div className="inside-page-01-layout__former">
          <div className="inside-page-01-banner">
            <div className="inside-page-01-banner__inner">
              <div className="inside-page-01-banner__former">
                <div className="inside-page-01-banner__title inside-page-01-banner__title--main">會員註冊</div>
                <div className="inside-page-01-banner__title inside-page-01-banner__title--vice">成為蓮花會員，享更多優惠</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={<LoadingSpinner visible />}>
        <Switch>
          <RouterRoute
            exact
            path={ROUTES.MEMBER__REGISTER__PERSIONAL_INFO}
            component={personalInfo}
            activate={[useMemberRegisterGuard]}
          />
          <RouterRoute
            exact
            path={ROUTES.MEMBER__REGISTER__CONFIRM_INFO}
            component={confirmInfo}
            activate={[useMemberRegisterGuard]}
          />
          <RouterRoute
            exact
            path={ROUTES.MEMBER__REGISTER__CONFIRM_INFO__OTP_AUTH}
            component={confirmAuthInfo}
            activate={[useMemberRegisterGuard]}
          />
          <RouterRoute
            exact
            path={ROUTES.MEMBER__REGISTER__COMPLETE}
            component={complete}
            activate={[useMemberRegisterGuard]}
          />
          <Redirect to={ROUTES.HOME__MAIN} />
        </Switch>
      </Suspense>
    </InsidePage>
  );
};

export default Register;
