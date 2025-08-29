import React from 'react';
import { CheckboxInnerProps } from './types';

const CheckboxInner: React.FC<CheckboxInnerProps> = ({ children, ...props }) => {
  return (
    <>
      {/* <input type="checkbox" id={props.id} name={props.name} /> */}
      <input type="checkbox" {...props} />
      <label htmlFor={props.id}>
        <span />
        <div className="text">{children}</div>
      </label>
    </>
  );
};

export default CheckboxInner;
