import React, { Suspense } from 'react';
// import { Routes } from 'react-router-dom';
import RouterRoute from 'app/common/compoments/Router/RouterRoute';
import { ROUTES } from 'app/core/router';
import { Redirect, Switch } from 'react-router-dom';
import LoadingSpinner from 'app/common/compoments/Spinner/LoadingSpinner';

const mainModule = React.lazy(() => import('./Main'));

const Home: React.FC = () => {
  // react v18 => 「延遲載入」會造成不正常渲染的問題，需移到外面
  // connected-react-router v6 不支援 react-router-dom v6 => 故 react-router-dom 退回 v5
  console.log('%chome layer', 'background: blue; color: white; padding: 2px 4px;');
  return (
    <Suspense fallback={<LoadingSpinner visible />}>
      <Switch>
        {/* 主首頁內容 */}
        <RouterRoute
          exact
          path={ROUTES.HOME__MAIN}
          // 說明: react v16 + react-router-dom v5: 此寫法沒問題
          // component={React.lazy(() => import('./Main'))}
          // 說明: react v18 + react-router-dom v5: 此寫法則不會造成多次渲染
          component={mainModule}
        />
        {/* 此層路由均無對應，則返回主首頁 */}
        <Redirect to={ROUTES.HOME__MAIN} />
      </Switch>
    </Suspense>
  );
};

export default Home;
