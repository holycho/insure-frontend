import React, { Suspense } from 'react';
import { Redirect, Switch } from 'react-router-dom';
import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import { ROUTES } from 'app/core/router';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';

const fireInsuModule = React.lazy(() => import('./FireInsurance'));

const Insure: React.FC = () => {
  console.log('%cinsure layer', 'background: blue; color: white; padding: 2px 4px;');
  return (
    <Suspense fallback={<LoadingSpinner visible />}>
      <Switch>
        {/* 住火險投保流程 */}
        <RouterRoute
          path={ROUTES.INSURE__FIRE_INSURANCE}
          // component={React.lazy(() => import('./FireInsurance'))}
          component={fireInsuModule}
        />
        {/* 此層路由均無對應，則返回主首頁 */}
        <Redirect to={ROUTES.HOME__MAIN} />
      </Switch>
    </Suspense>
  );
};

export default Insure;
