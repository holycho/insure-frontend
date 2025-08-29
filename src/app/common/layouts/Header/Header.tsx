import React, { useEffect, useState } from 'react';
import Dropdown from 'app/common/layouts/Header/Dropdown';
import MemMenu from 'app/common/layouts/Header/MemMenu';
import Hamburger from './Hamburger';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogVisibleAction } from 'app/store/ui/actions';
import { ROUTES } from 'app/core/router';
import { RootState } from 'app/store/types';
import { logoutAction, setLoginRedirectUrl } from 'app/store/member/login/actions';
import MobileMenuCollapse from './MobileMenuCollapse';
import { LinkAuthenticationEnum, LinkTypesEnum } from 'app/bff/enums/linkUrl';
import { routerHistory as routerService } from 'app/core/router/service/routerService';
import { LinkInfo } from 'app/bff/models/linkUrl';
import useRWD from 'app/core/hooks/useRWD';
import { DeviceTypeEnum } from 'app/core/hooks/useRWD/types';
import { useHistory } from 'react-router-dom';
import { HomeFilled } from '@ant-design/icons';

// declare const $: any;
import $ from 'jquery';

const Header: React.FC = () => {
  const routerHistory = useHistory();
  const reduxDispatch = useDispatch();
  const authorizationState = useSelector((state: RootState) => state.system.member.authorization);
  const profileState = useSelector((state: RootState) => state.system.member.profile);
  const layoutHeaderState = useSelector((state: RootState) => state.layout.header);
  const officicialLinks = layoutHeaderState?.filter(it => it.type === LinkTypesEnum.Text);
  const buttonLinks = layoutHeaderState?.filter(it => it.type === LinkTypesEnum.Button);
  const featureNavs = layoutHeaderState?.filter(it => it.type === LinkTypesEnum.Directory && it.id !== 'memberCenter');
  const memCenterNavs = layoutHeaderState?.find((linkInfo) => linkInfo.id === 'memberCenter');
  const [isHamActive, setIsHamActive] = useState<boolean>(false);
  const deviceType = useRWD();
  // console.log('Header: ', authorizationState, profileState);
  // console.log('Header: ', layoutHeaderState);

  /**
   * @description 執行展開/收合手機版選單
   */
  useEffect(() => {
    // if (isHamActive) $('.mobile-menu').css('display', 'block');
    // else $('.mobile-menu').css('display', 'none');
    if (deviceType === DeviceTypeEnum.PC) {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'; // 還原 body 滾動條
      $('.mobile-menu').css('display', 'none');
      return;
    }
    if (isHamActive) {
      document.getElementsByTagName('body')[0].style.overflow = 'hidden'; // 鎖定 body 滾動條
      $('.mobile-menu').slideToggle();
    } else {
      document.getElementsByTagName('body')[0].style.overflow = 'auto'; // 開放 body 滾動條
      $('.mobile-menu').slideUp();
    }
  }, [isHamActive, deviceType]);

  /**
   * @description 螢幕大小變更
   */
  useEffect(() => {
    setIsHamActive(false);
  }, [deviceType]);

  /**
   * @description 處理登入按鈕 onClick 執行的事件
   */
  const handleLogin = () => {
    reduxDispatch(setDialogVisibleAction('loginDialog', true));
  };

  /**
   * @description 處理登出按鈕 onClick 執行的事件
   */
  const handleLogout = () => {
    reduxDispatch(logoutAction());
  };

  /**
   * @description 處理漢堡選單 onChange 執行的事件
   * @param isActive 漢堡選單狀態
   */
  const handleAcitveChange = () => {
    setIsHamActive((prevState) => !prevState);
  };

  /**
   * @description 處理連結選單 onClick 執行的事件
   * @param linkInfo 連結選單
   */
  const handleMenuClick = (linkInfo: LinkInfo) => {
    if (linkInfo.login === LinkAuthenticationEnum.Required && !authorizationState) {
      reduxDispatch(setDialogVisibleAction('loginDialog', true));
      // 暫存選單路由，待登入後跳轉
      if (linkInfo.link) {
        reduxDispatch(setLoginRedirectUrl(linkInfo.link as ROUTES));
      }
      return;
    }
    if (linkInfo.link) {
      if (linkInfo.link.includes('http://') || linkInfo.link.includes('https://')) {
        window.open(linkInfo.link, linkInfo.target === '1' ? '_blank' : '_self');
      } else {
        routerHistory.push(linkInfo.link);
      }
    }
  };

  return (
    <header className="header">
      <div className="header__head">
        <div className="header__inner header__inner--align-right">
          <div className="header__nav-content">
            <div className="header__links-nav-pc">
              {/* 社交連結 */}
              {officicialLinks && (
                officicialLinks.map((it) => (
                  <button key={it.id} className="header-text-link size-1" onClick={() => handleMenuClick(it)}>{it.text}</button>
                ))
              )}
              {/* 登入/登出 */}
              {!authorizationState ? (
                <button id="login" className="header-pc-login header-text-link" onClick={handleLogin}>登入/註冊</button>
              ) : (
                <div className="header-pc-acc">
                  <span id="memName" className="header-pc-acc__name">{authorizationState.member.name}</span>
                  <span className="header-pc-acc__devider" />
                  <button type="button" className="header-pc-acc__logout header-text-link" onClick={handleLogout}>登出</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="header__content">
        <div className="header__inner space-between">
          <div className="space-between__former">
            <div className="header__logo header-logo space-between__former">
              <img className="img header-logo__img header-logo__img--pc" src="/assets/img/Logo.svg" alt="" />
              <img className="img header-logo__img header-logo__img--mobile" src="/assets/img/Logo-mobile.svg" alt="" />
              <button style={{ display: 'flex' }} className="header-logo__text" onClick={() => {
                routerService.replace(ROUTES.HOME);
              }}>
                <HomeFilled style={{ fontSize: 24, color: '#f20c00', marginRight: 10 }} />
                首頁
              </button>
            </div>
          </div>
          <div className="space-between__latter h-100 dflex aic">
            <div className="header__nav-content h-100">
              <div className="header__menu-nav-pc">
                {featureNavs && featureNavs.map(it => (
                  it.child && it.child.length > 0 ? <Dropdown key={it.id} menuItem={it} /> : null
                ))}
              </div>
              <div className="header__links-nav-pc h-100 jcfe">
                {buttonLinks && buttonLinks.map(it => (
                  <a key={it.id} href={it.link} rel="noreferrer" target={it.target === '1' ? '_blank' : '_self'} className="header-btn-link btn-secondary size-1 btn-secondary--32h">{it.text}</a>
                ))}
                {memCenterNavs && (
                  <MemMenu menuItem={memCenterNavs} />
                )}
              </div>
            </div>
            <div className="header__mobile-content">
              {!authorizationState ? (
                <button className="header-mobile-login" onClick={handleLogin}>登入/註冊</button>
              ) : (
                <div className="header-mobile-acc">
                  <span className="header-mobile-acc__name">{authorizationState.member.name}</span>
                  <span className="header-mobile-acc__devider" />
                  <button type="button" className="header-mobile-acc__logout header-text-link" onClick={handleLogout}>登出</button>
                </div>
              )}
              <Hamburger onChange={handleAcitveChange} isActive={isHamActive} />
            </div>
          </div>
        </div>
      </div>
      <div className="header__mobile-menu mobile-menu">
        <div className="mobile-menu__suffix">
          {officicialLinks && (officicialLinks.map(it => (
            <button key={`${it.id}-mobile`} className="mobile-menu__social-media" onClick={() => handleMenuClick(it)}>
              <img alt={it.text} className="img" src={it.icon} />
            </button>
          )))}
        </div>
        <div className="mobile-menu__collapse-group">
          {featureNavs && (
            featureNavs.map(it => (
              <MobileMenuCollapse key={`${it.id}-mobile`} menuItem={it} />
            ))
          )}
          <div className="mobile-menu__link-group">
            {buttonLinks && buttonLinks.map(it => (
              <button key={`${it.id}-mobile`} className="mobile-menu-link" onClick={() => {
                setIsHamActive(false);
                handleMenuClick(it);
              }}>{it.text}</button>
            ))}
            {memCenterNavs && memCenterNavs.child && memCenterNavs.child.map(it => (
              <button key={`${it.id}-mobile`} className="mobile-menu-link" onClick={() => {
                setIsHamActive(false);
                handleMenuClick(it);
              }}>{it.text}</button>
            ))}
          </div>

          {/* <div className="mobile-menu-collapse collapse">
            <div className="mobile-menu-collapse__title collapse__title">線上投保</div>
            <div className="mobile-menu-collapse__content collapse__content">
              <div className="mobile-menu-collapse-descendant-collapse__title collapse__title"></div>
              <div className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
                <a href="http://10.20.30.235:30002/auto-insurance" className="mobile-menu-collapse__link">汽車保險</a>
              </div>
              <div className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
                <a href="http://10.20.30.235:30002/moto-insurance" className="mobile-menu-collapse__link">機車保險</a>
              </div>
              <div className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
                <div className="mobile-menu-collapse__descendant-collapse mobile-menu-collapse-descendant-collapse collapse">
                  <div className="mobile-menu-collapse-descendant-collapse__title collapse__title">旅遊專區</div>
                  <div className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
                    <div className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
                      <a href="http://10.20.30.235:30002/travel-insurance" className="mobile-menu-collapse__link">旅行平安保險</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
