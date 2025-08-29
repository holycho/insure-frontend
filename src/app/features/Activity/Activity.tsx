import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';
import { ROUTES } from 'app/core/router';
import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';

const Activity: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner visible />}>
      <Switch>
        {/* 最新消息-列表頁 */}
        <RouterRoute
          exact
          path={ROUTES.ACTIVITY__NEWS}
          component={React.lazy(() => import('./News'))}
        />
        {/* 最新消息-明細頁 */}
        <RouterRoute
          exact
          path={ROUTES.ACTIVITY__NEWS__DETAIL}
          component={React.lazy(() => import('./News/Detail'))}
        />
        {/* 熱門活動-列表頁 */}
        <RouterRoute
          exact
          path={ROUTES.ACTIVITY__PROMO}
          component={React.lazy(() => import('./Promo'))}
        />
        {/* 熱門活動-明細頁 */}
        <RouterRoute
          exact
          path={ROUTES.ACTIVITY__PROMO__DETAIL}
          component={React.lazy(() => import('./Promo/Detail'))}
        />
        <Redirect to={ROUTES.HOME__MAIN} />
      </Switch>
    </Suspense>
  );
};

export default Activity;
