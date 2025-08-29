import React from 'react';
import { Route } from 'react-router-dom';
import { RouterRouteProps } from './types';

const RouterRoute: React.FC<RouterRouteProps> = ({ activate = [], ...props }) => {
  // 每筆結果皆回傳 true，則啟用此路由
  const isActivated = activate.map((guardFunc) => guardFunc()).every(it => it);
  return isActivated ? <Route {...props} /> : null;
};

export default RouterRoute;
