import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';
import { ROUTES } from 'app/core/router';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

const memSetingsModule = React.lazy(() => import('./Settings'));
const memRegisterModule = React.lazy(() => import('./Register'));

const Member: React.FC = () => (
  <Suspense fallback={<LoadingSpinner visible />}>
    <Switch>
      <RouterRoute
        path={ROUTES.MEMBER__REGISTER}
        component={memRegisterModule}
      />
      <RouterRoute
        path={ROUTES.MEMBER__SETTINGS}
        component={memSetingsModule}
      />
      <Redirect to={ROUTES.HOME__MAIN} />
    </Switch>
  </Suspense>
);

export default Member;
