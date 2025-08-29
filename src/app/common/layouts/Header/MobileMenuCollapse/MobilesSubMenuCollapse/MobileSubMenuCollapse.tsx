import React, { useEffect, useState } from 'react';
import { MobileSubMenuCollapseProps } from './types';

// declare const $: any;
import $ from 'jquery';

const MobileSubMenuCollapse: React.FC<MobileSubMenuCollapseProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  /**
   * @description 預設展開子選單
   */
  useEffect(() => {
    $(`#${props.subMenuItem.id}`).css('display', 'block');
  }, [props.subMenuItem.id]);

  /**
   * @description 執行展開/收合子選單
   */
  useEffect(() => {
    // if (isActive) $(`#${props.subMenuItem.id}`).css('display', 'block');
    // else $(`#${props.subMenuItem.id}`).css('display', 'none');
    if (isActive) $(`#${props.subMenuItem.id}`).slideDown();
    else $(`#${props.subMenuItem.id}`).slideUp();
  }, [isActive, props.subMenuItem.id]);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="mobile-menu-collapse__descendant-collapse mobile-menu-collapse-descendant-collapse collapse">
      <div className={'mobile-menu-collapse-descendant-collapse__title collapse__title' + (isActive ? ' active' : '')} onClick={handleClick}>{props.subMenuItem.text}</div>
      <div id={props.subMenuItem.id} className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
        {props.subMenuItem.child && props.subMenuItem.child.map((child, index) => (
          <div key={`${child.id}-${index}`} className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
            <a href={child.link} rel="noreferrer" target={child.target === '1' ? '_blank' : '_self'} className="mobile-menu-collapse__link">{child.text}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSubMenuCollapse;
