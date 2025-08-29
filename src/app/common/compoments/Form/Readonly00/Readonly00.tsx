import React from 'react';
import { Readonly00Props } from './types';

const Readonly00: React.FC<Readonly00Props> = (props) => {
  return (
    <>
      <div className="form-layout-00__title-tag">{props.label}</div>
      <div className={'form-layout-00__value-text' + (props.highlight ? ' form-layout-00__value-text--highlight' : '') + (!props.content ? ' form-layout-00__value-text--null' : '')}>
        {props.content ? props.content : '無填寫'}
      </div>
      {props.subContent && (
        <div className="form-layout-00__descrp-text">{props.subContent}</div>
      )}
    </>
  );
};

export default Readonly00;
