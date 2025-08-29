import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';
import { ROUTES } from 'app/core/router';
import useServiceQueryDetailGuard from 'app/core/router/guards/useServiceQueryDetailGuard';
import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';

const DetailRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner visible />}>
      <Switch>
        <RouterRoute
          path={ROUTES.SERVICE__QUERY_POLICY__DETAIL_FIRE}
          component={React.lazy(() => import('./Fire'))}
          activate={[useServiceQueryDetailGuard]}
        />
      </Switch>
    </Suspense>
  );
};

export default DetailRoutes;
