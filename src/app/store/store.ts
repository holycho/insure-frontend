import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { routerHistory } from 'app/core/router/service';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // 預設儲存至 localStorage

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['UI'] // UI 為即時狀態，不適用於批次緩存
};

// Create Middleware
const reduxSagaMiddleware = createSagaMiddleware();
const reduxRouterMiddleware = routerMiddleware(routerHistory);
const appReduxMiddlewares = applyMiddleware(reduxSagaMiddleware, reduxRouterMiddleware);

// Create rootMiddleware based on environment
let rootMiddleware;
if (process.env.NODE_ENV !== 'production') {
  // non-prod env
  const { composeWithDevTools } = require('redux-devtools-extension');
  rootMiddleware = composeWithDevTools(appReduxMiddlewares);
} else {
  // prod env
  rootMiddleware = appReduxMiddlewares;
}

const persistReducerInstance = persistReducer(persistConfig, rootReducer);

// Create store
// const store = createStore(rootReducer, rootMiddleware);
const store = createStore(persistReducerInstance, rootMiddleware);
const persistor = persistStore(store);

// Run saga
reduxSagaMiddleware.run(rootSaga);

export {
  store,
  persistor
};
