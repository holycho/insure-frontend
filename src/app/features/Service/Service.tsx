import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';
import { ROUTES } from 'app/core/router';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

const paymentModule = React.lazy(() => import('./Payment'));
const queryPolicyModule = React.lazy(() => import('./QueryPolicy'));

const Service: React.FC = () => (
  <Suspense fallback={<LoadingSpinner visible />}>
    <Switch>
      <RouterRoute
        path={ROUTES.SERVICE__PAYMENT}
        component={paymentModule}
      />
      <RouterRoute
        path={ROUTES.SERVICE__QUERY_POLICY}
        component={queryPolicyModule}
      />
      <Redirect to={ROUTES.HOME__MAIN} />
    </Switch>
  </Suspense>
);

export default Service;
