import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import Footer from 'app/common/layouts/Footer';
import Header from 'app/common/layouts/Header';
import { MainLayoutProps } from './types';
import LoginDialog from 'app/common/compoments/Dialog/LoginDialog';
import { useDispatch } from 'react-redux';
import { fetchMemberProfileAction } from 'app/store/system/actions';
import { initialHeaderAndFooterAction } from 'app/store/layout/actions';
import environment from 'environments';

// 1. 等待 msw 完全啟動完成，不然呼叫 API 會炸掉
const MOCK_SERVER_DELAY = 3000;

const MainLayout: React.FC<MainLayoutProps> = (props) => {
  const reduxDispatch = useDispatch();
  const dialogsState = useSelector((state: RootState) => state.UI.dialogs);
  const authorizationState = useSelector((state: RootState) => state.system.member.authorization);

  useEffect(() => {
    // if (process.env.NODE_ENV === 'development') {
    if (environment.browser.useMsw) {
      setTimeout(() => {
        reduxDispatch(initialHeaderAndFooterAction());
      }, MOCK_SERVER_DELAY);
    } else {
      reduxDispatch(initialHeaderAndFooterAction());
    }
  }, [reduxDispatch]);

  useEffect(() => {
    if (dialogsState.loginDialogVisible) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'; // 鎖定 body 滾動條
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'; // 開啟 body 滾動條
    }
  }, [dialogsState.loginDialogVisible]);

  /**
   * @description 取得會員資料
   */
  useEffect(() => {
    if (authorizationState && authorizationState.member) {
      // 注意: mock server 尚未掛載，故加 500 毫秒緩衝
      // if (process.env.NODE_ENV === 'development') {
      if (environment.browser.useMsw) {
        setTimeout(() => {
          reduxDispatch(fetchMemberProfileAction({ sn: authorizationState.member.sn }));
        }, MOCK_SERVER_DELAY);
      } else {
        reduxDispatch(fetchMemberProfileAction({ sn: authorizationState.member.sn }));
      }
    }
  }, [authorizationState, reduxDispatch]);

  return (
    <>
      <div className="site">
        <div className="site__header">
          <Header />
        </div>
        <main className="site__content">
          {props.children}
        </main>
        <div className="site__footer">
          <Footer />
        </div>
      </div>
      {dialogsState.loginDialogVisible && (
        <LoginDialog visible={dialogsState.loginDialogVisible} />
      )}
    </>
  );
};

export default MainLayout;
