import React from 'react';
import { Checkbox01Props } from './types';

const Checkbox01: React.FC<Checkbox01Props> = ({ children, ...props }) => (
  <div className="checkbox-01">
    {/* <input type="checkbox" id={props.id} name={props.name} /> */}
    <input type="checkbox" {...props} />
    <label htmlFor={props.id}>
      <span />
      <div className="text">{children}</div>
    </label>
  </div>
);

export default Checkbox01;
