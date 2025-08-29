import React, { useState } from 'react';
import SubMenu from './SubMenu';
import { DropdownProps } from './types';
import useOutsideClick from 'app/core/hooks/useOutsideClick';
import { LinkTypesEnum } from 'app/bff/enums/linkUrl';

const Dropdown: React.FC<DropdownProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const ref = useOutsideClick(() => {
    setIsActive(false);
  });

  const handleItemClick = () => {
    setIsActive(false);
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
                <a href={it.link} key={it.id} className="header-dropdown__link" onClick={handleItemClick}>
                  <span className="header-dropdown__text">{it.text}</span>
                </a>
              );
            }
            // 顯示目錄選單
            if (it.type === LinkTypesEnum.Directory) {
              return (
                <SubMenu key={it.id} subMenuItem={it} />
              );
            }
          })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
