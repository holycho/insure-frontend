import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Switch } from 'react-router-dom';
import { RootState } from 'app/store/types';
import { ROUTES } from 'app/core/router';
import { useServicePaymentListGuard, useUnauthorizationGuard } from 'app/core/router/guards';
import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';
import InsidePage from 'app/common/layouts/InsidePage';

const LazyAuth = React.lazy(() => import('./Auth'));
const LazyList = React.lazy(() => import('./List'));

const Payment: React.FC = () => {
  const authorization = useSelector((state: RootState) => state.system.member.authorization);
  return (
    <InsidePage>
      <InsidePage.BasicHeader
        title="保險服務"
        subTitle="我要繳費"
        className="inside-page-01-banner__former--center"
      />
      <Suspense fallback={<LoadingSpinner visible />}>
        <Switch>
          <RouterRoute
            exact
            path={ROUTES.SERVICE__PAYMENT__AUTH}
            component={LazyAuth}
            // eslint-disable-next-line
            activate={[() => useUnauthorizationGuard(ROUTES.SERVICE__PAYMENT__AUTH)]}
          />
          <RouterRoute
            exact
            path={ROUTES.SERVICE__PAYMENT__LIST}
            component={LazyList}
            // eslint-disable-next-line
            activate={[useServicePaymentListGuard]}
          />
          {/* 若未登入，則轉跳認證頁 */}
          <Redirect to={authorization ? ROUTES.SERVICE__PAYMENT__LIST : ROUTES.SERVICE__PAYMENT__AUTH} />
        </Switch>
      </Suspense>
    </InsidePage>
  );
};

export default Payment;