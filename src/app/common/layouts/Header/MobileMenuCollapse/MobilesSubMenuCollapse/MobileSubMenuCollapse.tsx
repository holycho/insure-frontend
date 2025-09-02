import React, { useEffect, useState } from 'react';
import { MobileSubMenuCollapseProps } from './types';
import { LinkInfo } from 'app/bff/models/linkUrl';
import alertService from 'app/core/services/alertService';
import { routerHistory as routerService } from 'app/core/router/service/routerService';

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
    if (props.onHamburgerClose) props.onHamburgerClose();
  };

  return (
    <div className="mobile-menu-collapse__descendant-collapse mobile-menu-collapse-descendant-collapse collapse">
      <div className={'mobile-menu-collapse-descendant-collapse__title collapse__title' + (isActive ? ' active' : '')} onClick={handleClick}>{props.subMenuItem.text}</div>
      <div id={props.subMenuItem.id} className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
        {props.subMenuItem.child && props.subMenuItem.child.map((child, index) => (
          <div key={`${child.id}-${index}`} className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
            {/* <a href={child.link} rel="noreferrer" target={child.target === '1' ? '_blank' : '_self'} className="mobile-menu-collapse__link">{child.text}</a> */}
            <div className="mobile-menu-collapse__link" onClick={() => handleLinkClick(child)}>{child.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileSubMenuCollapse;
