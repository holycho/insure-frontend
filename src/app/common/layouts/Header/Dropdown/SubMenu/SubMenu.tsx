import React, { useState } from 'react';
import { SubMenuProps } from './types';

const SubMenu: React.FC<SubMenuProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className="header-dropdown__link header-dropdown__link--hasDescendant">
      <span className={'header-dropdown__text collapse__title' + (isActive ? ' active' : '')} onClick={() => setIsActive(!isActive)}>{props.subMenuItem.text}</span>
      <div className={'header-dropdown__descendant-menu' + (isActive ? ' show' : '')}>
        {props.subMenuItem.child && props.subMenuItem.child.map(it => (
          <div key={it.id} className="header-dropdown__link">{it.text}</div>
        ))}
      </div>
    </div>
  );
};

export default SubMenu;