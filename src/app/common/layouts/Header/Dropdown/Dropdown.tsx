import React, { useState } from 'react';
import SubMenu from './SubMenu';
import { DropdownProps } from './types';
import useOutsideClick from 'app/core/hooks/useOutsideClick';
import { LinkTypesEnum } from 'app/bff/enums/linkUrl';
import { LinkInfo } from 'app/bff/models/linkUrl';
import alertService from 'app/core/services/alertService';
import { routerHistory as routerService } from 'app/core/router/service/routerService';

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false); // 是否顯示下拉式選單
  const ref = useOutsideClick(() => {
    setIsActive(false);
  });

  const handleItemClick = () => {
    setIsActive(false);
  };

  /**
   * @description 執行 onClick 事件
   * @param linkInfo 連結
   */
  const handleLinkClick = (linkInfo: LinkInfo) => {
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
    setIsActive(false); // 關閉下拉式選單
  };

  return (
    <div ref={ref} className={'header-dropdown' + (isActive ? ' header-dropdown--active' : '')}>
      <div className={'header-dropdown__head' + (isActive ? ' header-dropdown__head--active' : '')} onClick={() => setIsActive(!isActive)}>{props.menuItem.text}</div>
      {/* 處理子選單 */}
      {props.menuItem.child && (
        <div className="header-dropdown__menu">
          {props.menuItem.child.length > 0 && props.menuItem.child.map(it => {
            // 顯示文字連結
            if (it.type === LinkTypesEnum.Text) {
              return (
                // <a href={it.link} key={it.id} className="header-dropdown__link" onClick={handleItemClick}>
                //   <span className="header-dropdown__text">{it.text}</span>
                // </a>
                <div key={it.id} className="header-dropdown__link" onClick={() => handleLinkClick(it)}>
                  <span className="header-dropdown__text">{it.text}</span>
                </div>
              );
            }
            // 顯示目錄選單
            if (it.type === LinkTypesEnum.Directory) {
              return (
                <SubMenu key={it.id} subMenuItem={it} onDropDownClose={() => {
                  setIsActive(false);
                }} />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
