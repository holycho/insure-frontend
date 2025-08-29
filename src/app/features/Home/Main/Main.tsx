import React, { useEffect } from 'react';
import IndexShowcase from 'app/common/layouts/features/Home/Main/IndexShowcase';
import InsureStepGuide from 'app/common/layouts/features/Home/Main/InsureStepGuide';
import commonService from 'app/core/services/commonService';
import Bulletins from 'app/common/layouts/features/Home/Main/Bulletins';
import { useDispatch } from 'react-redux';
import { initialHomeMainAction } from 'app/store/home/actions';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';

const Main: React.FC = () => {
  const reduxDispatch = useDispatch();
  const mainState = useSelector((state: RootState) => state.home.main);
  console.log('main:', mainState);
  console.log('%cmain layer', 'background: blue; color: white; padding: 2px 4px;');

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 初始頁面
   */
  useEffect(() => {
    reduxDispatch(initialHomeMainAction());
  }, [reduxDispatch]);

  return (
    <>
      {/* 主視覺 Section */}
      <IndexShowcase />
      {/* 網路投保真方便 Section */}
      <InsureStepGuide />
      {/* 訊息中心 */}
      <Bulletins />
    </>
  );
};

export default Main;
