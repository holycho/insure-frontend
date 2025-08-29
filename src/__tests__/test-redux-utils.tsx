import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import layoutReducer from 'app/store/layout/reducer';
import systemReducer from 'app/store/system/reducer';

// 建立測試用的 store
const createTestStore = (initialState?: any) => {
  return configureStore({
    reducer: combineReducers({
      system: systemReducer,
      layout: layoutReducer
    }),
    preloadedState: initialState,
  });
};

// 渲染 Provider 後回傳
const renderWithRedux = (
  child: React.ReactElement,
  initialState: any
) => {
  const store = createTestStore(initialState);
  return {
    ...render(<Provider store={store}>{child}</Provider>),
    store,
  };
};

export { renderWithRedux };