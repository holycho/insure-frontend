import React from 'react';
import MainLayout from 'app/common/layouts/MainLayout';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { routerHistory } from 'app/core/router/service';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store/store';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  console.log('%capp layer', 'background: blue; color: white; padding: 2px 4px;');
  return (
    <Provider store={store}>
      {/* 使用 redux 持久化套件，於重新整理時保存 store 狀態 */}
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={routerHistory}>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
