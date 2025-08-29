import React from 'react';
import { NavItemProps } from './types';

const NavItem: React.FC<NavItemProps> = (props) => {
  /**
   * @description 處理 onClick 執行的事件
   */
  const handleClick = () => {
    if (props.onClick) props.onClick();
  };

  return (
    <div style={{ padding: 0 }} className="sliding-tab-01__nav-item nxjq-sliding-tab-nav__item">
      <div style={props.style} onClick={handleClick}>{props.name}</div>
    </div>
  );
};

export default NavItem;
