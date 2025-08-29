
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { ROUTES } from 'app/core/router';
import { useServiceQueryListGuard, useUnauthorizationGuard } from 'app/core/router/guards';
import { RootState } from 'app/store/types';
import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import InsidePage from 'app/common/layouts/InsidePage';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';

const LazyAuth = React.lazy(() => import('./Auth'));
const LazyList = React.lazy(() => import('./List'));
const LazyDetail = React.lazy(() => import('./Detail'));

const QueryPolicy: React.FC = () => {
  const authorization = useSelector((state: RootState) => state.system.member.authorization);
  return (
    <InsidePage>
      <InsidePage.BasicHeader
        title="保險服務"
        subTitle="保單查詢"
        className="inside-page-01-banner__former--center"
      />
      <Suspense fallback={<LoadingSpinner visible />}>
        <Switch>
          <RouterRoute
            exact
            path={ROUTES.SERVICE__QUERY_POLICY__AUTH}
            component={LazyAuth}
            // eslint-disable-next-line
            activate={[() => useUnauthorizationGuard(ROUTES.SERVICE__QUERY_POLICY__AUTH)]}
          />
          <RouterRoute
            exact
            path={ROUTES.SERVICE__QUERY_POLICY__LIST}
            component={LazyList}
            activate={[useServiceQueryListGuard]}
          />
          <RouterRoute
            path={ROUTES.SERVICE__QUERY_POLICY__DETAIL}
            component={LazyDetail}
          />
          <Redirect to={authorization ? ROUTES.SERVICE__QUERY_POLICY__LIST : ROUTES.SERVICE__QUERY_POLICY__AUTH} />
        </Switch>
      </Suspense>
    </InsidePage>
  );
};

export default QueryPolicy;
