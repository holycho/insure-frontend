import React from 'react';
import { Readonly01Props } from './types';

const Readonly01: React.FC<Readonly01Props> = (props) => (
  <>
    <div className="form-layout-00__title-tag">{props.label}</div>
    <div className="form-layout-00__row">
      <div className={['form-layout-00__cell form-layout-00__cell--mobile-response', props.cellClassName].filter(c => c).join(' ')}>
        <div className={'form-layout-00__value-text' + (props.content && props.highlight ? ' form-layout-00__value-text--highlight' : '') + (!props.content ? ' form-layout-00__value-text--null' : '')}>
          {props.content ? props.content : '無填寫'}
        </div>
      </div>
    </div>
    {/* 提示標籤 */}
    {props.hintTags?.map((tag, index) => (
      <div className="form-layout-00__hint-tag hint-tag" key={index}>{tag}</div>
    ))}
    {/* 說明小字 */}
    {props.subContent && (
      <div className="form-layout-00__descrp-text">{props.subContent}</div>
    )}
  </>
);

export default Readonly01;
