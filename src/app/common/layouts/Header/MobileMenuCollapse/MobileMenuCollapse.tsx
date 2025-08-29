import React, { useEffect, useState } from 'react';
import { MobileMenuCollapseProps } from './types';
import MobileSubMenuCollapse from './MobilesSubMenuCollapse';
import { LinkTypesEnum } from 'app/bff/enums/linkUrl';

// declare const $: any;
import $ from 'jquery';

const MobileMenuCollapse: React.FC<MobileMenuCollapseProps> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(true);

  /**
   * @description 預設展開目錄型選單
   */
  useEffect(() => {
    $(`#${props.menuItem.id}`).css('display', 'block');
  }, [props.menuItem.id]);

  /**
   * @description 執行展開/收合目錄型選單
   */
  useEffect(() => {
    // if (isActive) $(`#${props.menuItem.id}`).css('display', 'block');
    // else $(`#${props.menuItem.id}`).css('display', 'none');
    if (isActive) $(`#${props.menuItem.id}`).slideDown();
    else $(`#${props.menuItem.id}`).slideUp();
  }, [isActive, props.menuItem.id]);

  /**
   * @description 處理 onClick 執行的事件
   */
  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="mobile-menu-collapse collapse">
      <div className={'mobile-menu-collapse__title collapse__title' + (isActive ? ' active' : '')} onClick={handleClick}>{props.menuItem.text}</div>
      <div id={props.menuItem.id} className="mobile-menu-collapse__content collapse__content">
        <div className="mobile-menu-collapse-descendant-collapse__title collapse__title"></div>
        {props.menuItem.child && props.menuItem.child.map((child, index) => {
          if (child.type === LinkTypesEnum.Directory) {
            return (
              <div key={`${props.menuItem.id}-${index}`} className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
                <MobileSubMenuCollapse subMenuItem={child} />
                {/* <div className="mobile-menu-collapse__descendant-collapse mobile-menu-collapse-descendant-collapse collapse">
                  <div className="mobile-menu-collapse-descendant-collapse__title collapse__title">{child.text}</div>
                  <div className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
                    {child.child.map((sub, subIndex) => (
                      <div key={`${sub.id}-${subIndex}`} className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
                        <a href={sub.link} className="mobile-menu-collapse__link">{sub.text}</a>
                      </div>
                    ))}
                  </div>
                </div> */}
              </div>
            );
          }
          // type 為 text (文字連結)
          return (
            <div key={`${props.menuItem.id}-${index}`} className="mobile-menu-collapse-descendant-collapse__menu collapse__content">
              <a href={child.link} rel="noreferrer" target={child.target === '1' ? '_blank' : '_self'} className="mobile-menu-collapse__link">{child.text}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileMenuCollapse;
