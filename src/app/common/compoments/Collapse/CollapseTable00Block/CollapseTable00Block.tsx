import React, { useRef, useState } from 'react';
import { CollapseTable00BlockProps } from './types';

const duration = 300;
declare const $: any;

const CollapseTable00Block: React.FC<CollapseTable00BlockProps> = (props) => {
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
      <div
        className={'collapse-table-00__head space-between' + (props.tagName ? ' color-tag-container' : '') + (isHide ? ' collapse-table-00__head--collapsed' : '')}
        onClick={handleTitleClick}
      >
        {props.tagName && (
          <div className="color-tag color-tag--purple margin-right-8">
            <div className="color-tag__text">{props.tagName}</div>
          </div>
        )}
        <div className="space-between__former space-between__former--fit">
          <div className="collapse-table-00__collapse-title collapse-table-00__collapse-title--highlight">
            {props.planShowName}
          </div>
        </div>
        <div className="space-between__latter">
          <div data-prefix="NT$" className="collapse-table-00__text collapse-table-00__text--highlight collapse-table-00__text--prefixed">{props.premium}</div>
        </div>
      </div>
      <div id={`content-${props.id}`} className="collapse-table-00__content">
        {props.children}
      </div>
    </>
  );
};

export default CollapseTable00Block;