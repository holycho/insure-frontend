import React, { Suspense } from 'react';
import LoadingSpinner from './common/compoments/Spinner/LoadingSpinner';
import { Switch } from 'react-router-dom';
import RouterRoute from './common/compoments/Router/RouterRoute';
import { ROUTES } from './core/router';

const AppRoutes: React.FC = () => (
  <Suspense fallback={<LoadingSpinner visible />}>
    <Switch>
      {/* 投保流程 */}
      <RouterRoute
        path={ROUTES.INSURE}
        component={React.lazy(() => import('app/features/Insure'))}
      />
      {/* 投保服務 */}
      <RouterRoute
        path={ROUTES.SERVICE}
        component={React.lazy(() => import('app/features/Service'))}
      />
      {/* 會員中心 */}
      <RouterRoute
        path={ROUTES.MEMBER}
        component={React.lazy(() => import('app/features/Member'))}
      />
      {/* 活動訊息 */}
      <RouterRoute
        path={ROUTES.ACTIVITY}
        component={React.lazy(() => import('app/features/Activity'))}
      />
      {/* 首頁 */}
      <RouterRoute
        path={ROUTES.HOME}
        component={React.lazy(() => import('app/features/Home'))}
      />
    </Switch>
  </Suspense>
);

export default AppRoutes;
