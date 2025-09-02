import React, { useState } from 'react';
import { SubMenuProps } from './types';
import { LinkInfo } from 'app/bff/models/linkUrl';
import alertService from 'app/core/services/alertService';
import { routerHistory as routerService } from 'app/core/router/service/routerService';

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false); // 顯示子目錄選單

  /**
   * @description 執行 onClick 事件
   * @param linkInfo 連結
   */
  const handleLinkClick = (linkInfo: LinkInfo) => {
    if (linkInfo.disabled && linkInfo.message) {
      alertService.base('系統提醒', linkInfo.message);
      return;
    }
    if (linkInfo.link) {
      if (linkInfo.link.includes('http://') || linkInfo.link.includes('https://')) {
        window.open(linkInfo.link, linkInfo.target === '1' ? '_blank' : '_self');
      } else {
        routerService.push(linkInfo.link);
      }
    }
    if (props.onDropDownClose) props.onDropDownClose();
  };

  return (
    <div className="header-dropdown__link header-dropdown__link--hasDescendant">
      <span className={'header-dropdown__text collapse__title' + (isActive ? ' active' : '')} onClick={() => setIsActive(!isActive)}>{props.subMenuItem.text}</span>
      <div className={'header-dropdown__descendant-menu' + (isActive ? ' show' : '')}>
        {props.subMenuItem.child && props.subMenuItem.child.map(it => (
          <div key={it.id} className="header-dropdown__link" onClick={() => handleLinkClick(it)}>{it.text}</div>
        ))}
      </div>
    </div>
  );
};

export default SubMenu;