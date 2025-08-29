import React, { Suspense } from 'react';
import { Redirect, Switch, useRouteMatch } from 'react-router-dom';
import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';
import { ROUTES } from 'app/core/router';
import InsidePage from 'app/common/layouts/InsidePage';
import useMemberSettingsGuard from 'app/core/router/guards/useMemberSettingsGuard';

const personalInfo = React.lazy(() => import('./PersonalInfo'));
const otpAuth = React.lazy(() => import('./OTPAuth'));

const Settings: React.FC = () => {
  const routerRouteMatch = useRouteMatch();

  return (
    <InsidePage>
      <InsidePage.BasicHeader
        title="會員中心"
        subTitle="資料修改"
        className="inside-page-01-banner__former--center"
      />
      <Suspense fallback={<LoadingSpinner visible />}>
        <Switch>
          <RouterRoute
            exact
            path={routerRouteMatch.path}
            component={personalInfo}
            activate={[useMemberSettingsGuard]}
          />
          <RouterRoute
            exact
            path={ROUTES.MEMBER__SETTINGS__OTP_AUTH}
            component={otpAuth}
            activate={[useMemberSettingsGuard]}
          />
          <Redirect to={ROUTES.HOME__MAIN} />
        </Switch>
      </Suspense>
    </InsidePage>
  );
};

export default Settings;
