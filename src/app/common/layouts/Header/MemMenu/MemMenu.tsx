import React, { useState } from 'react';
import useOutsideClick from 'app/core/hooks/useOutsideClick';
import { MemMenuProps } from './types';
import { LinkInfo } from 'app/bff/models/linkUrl';
import { routerHistory as routerService } from 'app/core/router/service/routerService';
import { RootState } from 'app/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { setDialogVisibleAction } from 'app/store/ui/actions';
import { setLoginRedirectUrl } from 'app/store/member/login/actions';
import { ROUTES } from 'app/core/router';
import { LinkAuthenticationEnum } from 'app/bff/enums/linkUrl';
import alertService from 'app/core/services/alertService';

const MemMenu: React.FC<MemMenuProps> = (props) => {
  const reduxDispatch = useDispatch();
  const authorizationState = useSelector((state: RootState) => state.system.member.authorization);
  const [isActive, setIsActive] = useState<boolean>(false);
  const ref = useOutsideClick(() => {
    setIsActive(false);
  });

  /**
   * @description 處理會員中心選單 onClick 執行的事件
   * @param linkInfo 連結選單
   */
  const handleMemMenuClick = (linkInfo: LinkInfo) => {
    if (linkInfo.login === LinkAuthenticationEnum.Required && !authorizationState) {
      reduxDispatch(setDialogVisibleAction('loginDialog', true));
      // 暫存選單路由，待登入後跳轉
      if (linkInfo.link) {
        reduxDispatch(setLoginRedirectUrl(linkInfo.link as ROUTES));
      }
      return;
    }
    if (linkInfo.disabled && linkInfo.message) {
      alertService.base('系統提示', linkInfo.message);
      return;
    }
    if (linkInfo.link) {
      if (linkInfo.link.includes('http://') || linkInfo.link.includes('https://')) {
        window.open(linkInfo.link, linkInfo.target === '1' ? '_blank' : '_self');
      } else {
        routerService.push(linkInfo.link);
      }
    }
    setIsActive(false);
  };

  return (
    <div ref={ref} className={'header-dropdown header-dropdown--special h-100' + (isActive ? ' header-dropdown--active' : '')} onClick={() => setIsActive(!isActive)}>
      <div id="center" className="header-dropdown__head dflex jcc aic h-100">{props.menuItem.text}</div>
      <div className="header-dropdown__menu">
        {props.menuItem.child && props.menuItem.child.map(it => (
          <button key={`${it.id}`} className="header-dropdown__link" onClick={() => handleMemMenuClick(it)}>
            <span className="header-dropdown__text">{it.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MemMenu;