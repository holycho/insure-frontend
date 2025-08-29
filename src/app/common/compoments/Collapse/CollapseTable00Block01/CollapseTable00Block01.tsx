import React, { useRef, useState } from 'react';
import { CollapseTable00Block01Props } from './types';

const duration = 300;
declare const $: any;

const CollapseTable00Block01: React.FC<CollapseTable00Block01Props> = (props) => {
  const elemIdRef = useRef(`content-${props.id}`);
  const [isHide, setIsHide] = useState<boolean>(false);

  const handleTitleClick = () => {
    const contentElem = $(`#${elemIdRef.current}`);
    if (!contentElem) return;
    if (isHide) contentElem.slideDown(duration);
    else contentElem.slideUp(duration);
    setIsHide(!isHide);
  };

  return (
    <>
      <div className={'collapse-table-00__head' + (isHide ? ' collapse-table-00__head--collapsed' : '')}>
        <div className="collapse-table-00__collapse-title collapse-table-00__collapse-title--center  collapse-table-00__collapse-title--highlight" onClick={handleTitleClick}>
          {props.tagName && (
            <div className="color-tag color-tag--green margin-right-8 color-tag--full">
              <div className="color-tag__text">{props.tagName}</div>
            </div>
          )}
          {props.planShowName}
        </div>
      </div>
      <div id={`content-${props.id}`} className="collapse-table-00__content">
        {props.children}
      </div>
    </>
  );
};

export default CollapseTable00Block01;
