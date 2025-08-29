import React, { useState } from 'react';
import { InsidePageChildComponents, InsidePageProps } from './types';
import BasicHeader from './BasicHeader';

const InsidePage: React.FC<InsidePageProps> & InsidePageChildComponents = (props) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <div className={'inside-page-01-layout' + (isLogin ? ' login' : '')}>
      {props.children}
    </div>
  );
};

InsidePage.BasicHeader = BasicHeader;

export default InsidePage;
