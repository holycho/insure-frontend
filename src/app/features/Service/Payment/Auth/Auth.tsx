
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'app/store/types';
import { fetchLoginCaptchaAction, resetLoginCacheAction } from 'app/store/member/login/actions';
import { resetNonMemberLoginCacheAction } from 'app/store/service/payment/actions';
import { LoginStepCodesEnum } from 'app/common/compoments/Dialog/LoginDialog/types';
import commonService from 'app/core/services/commonService';
import SlidingTab01 from 'app/common/compoments/SlidingTab/SlidingTab01';
import MemLogin from './Member';
import MemOTPAuth from './Member/OTPAuth';
import NonMemLogin from './NonMemer';
import NonMemInquiry from './NonMemer/Forget/Inquiry';
import NonMemAuth from './NonMemer/Forget/Auth';
import { AuthTypeEnum, ForgetStepCodesEnum } from './types';

const styles: { [key: string]: React.CSSProperties } = {
  item: {
    padding: 0
  },
  common: {
    margin: 6,
    padding: 8,
    width: '100%',
    backgroundColor: 'transparent',
    color: 'white',
    borderRadius: '5px'
  },
  active: {
    margin: 6,
    padding: 8,
    width: '100%',
    backgroundColor: 'white',
    color: '#9D0246',
    borderRadius: '5px'
  }
};

const authOptions = [
  {
    text: '會員',
    authType: AuthTypeEnum.Member
  },
  {
    text: '非會員與公司戶',
    authType: AuthTypeEnum.NonMember
  }
];

const Auth: React.FC = () => {
  const reduxDispatch = useDispatch();
  // 登入狀態
  const loginState = useSelector((state: RootState) => state.member.login);
  // 繳費狀態
  const paymentState = useSelector((state: RootState) => state.service.payment);
  const [isTabActive, setIsActive] = useState<string>(AuthTypeEnum.Member);

  useEffect(() => {
    commonService.windowScrollToTop();
  }, []);

  /**
   * @description 處理 Tab 頁籤 onClick 執行的事件
   * @param tab Tab 頁籤
   */
  const handleTabClick = (tab: string) => {
    setIsActive(tab);
    if (tab === AuthTypeEnum.Member) {
      reduxDispatch(fetchLoginCaptchaAction());
      reduxDispatch(resetNonMemberLoginCacheAction());
    }
    if (tab === AuthTypeEnum.NonMember) {
      reduxDispatch(resetLoginCacheAction());
    }
  };

  return (
    <div className="inside-page-01-layout__latter inside-page-01-layout__latter--typeA inside-page-01-layout__latter--result">
      <div className="result-layout-00">
        <div className="result-layout-00__content">
          <div className="result-layout-00__block">
            <SlidingTab01 className="result-layout-00__sliding-tab sliding-tab-01--type-3">
              <div className="nxjq-sliding-tab-nav-shell">
                <div className="sliding-tab-01__nav nxjq-sliding-tab-nav">
                  {/* <SlidingTab01.NavItem
                    name="會員"
                    style={isTabActive === AuthTypeEnum.Member ? styles.active : styles.common}
                    onClick={() => handleTabClick(AuthTypeEnum.Member)}
                  />
                  <SlidingTab01.NavItem
                    name="非會員與公司戶"
                    style={isTabActive === AuthTypeEnum.NonMember ? styles.active : styles.common}
                    onClick={() => handleTabClick(AuthTypeEnum.NonMember)}
                  /> */}
                  {authOptions.map((auth, index) => (
                    <div style={{ position: 'relative' }} key={`auth-${index}`} className={'nxjq-sliding-tab-nav__item' + (isTabActive === auth.authType ? ' nxjq-sliding-tab-nav__item--active' : '')} onClick={() => handleTabClick(auth.authType)}>
                      <div className="textEffect">{auth.text}</div>
                      <div className={'selectedEffect' + (auth.authType === isTabActive ? ' active' : '')} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="sliding-tab-01__pane-container nxjq-sliding-tab-container">
                <div className={'sliding-tab-01__pane nxjq-sliding-tab-container__pane' + (isTabActive === AuthTypeEnum.Member ? '--active' : '')}>
                  {loginState.serviceStep === LoginStepCodesEnum.Authentication && (
                    <MemLogin desc="請先登入有助於您的繳費查詢" />
                  )}
                  {loginState.serviceStep === LoginStepCodesEnum.OTP && (
                    <MemOTPAuth />
                  )}
                </div>
                <div className={'sliding-tab-01__pane nxjq-sliding-tab-container__pane' + (isTabActive === AuthTypeEnum.NonMember ? '--active' : '')}>
                  {/* 非「忘記受理編號？」流程 */}
                  {/* 根據目前步驟切換元件 */}
                  {!paymentState.authentication.nonMember.login.forget.currentStep && (
                    <NonMemLogin />
                  )}
                  {paymentState.authentication.nonMember.login.forget.currentStep === ForgetStepCodesEnum.Inquiry && (
                    <NonMemInquiry />
                  )}
                  {paymentState.authentication.nonMember.login.forget.currentStep === ForgetStepCodesEnum.Auth && (
                    <NonMemAuth />
                  )}
                </div>
              </div>
            </SlidingTab01>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
