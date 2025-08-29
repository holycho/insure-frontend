import React from 'react';
import { Input00Props } from './types';

const Input00: React.FC<Input00Props> = (props) => (
  <div className="input-00">
    <input type="text" placeholder={!props.disabled ? '請輸入' : ''} {...props} />
  </div>
);

export default Input00;
