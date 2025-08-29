import React from 'react';
import { Readonly02Props } from './types';

const Readonly02: React.FC<Readonly02Props> = (props) => {
  return (
    <>
      <div className="form-layout-00__title-tag">{props.label}</div>
      <div style={{ wordBreak: 'break-all' }} className={'form-layout-00__value-text' + (props.highlight ? ' form-layout-00__value-text--highlight' : '') + (!props.content ? ' form-layout-00__value-text--null' : '')}>
        {props.content ? props.content : '無填寫'}
      </div>
      {props.subContent && (
        <div className="form-layout-00__descrp-text">{props.subContent}</div>
      )}
    </>
  );
};

export default Readonly02;
