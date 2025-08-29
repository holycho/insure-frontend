import React from 'react';
import { HamburgerProps } from './types';

const Hamburger: React.FC<HamburgerProps> = (props) => {
  return (
    <button className={'header-hamburger nxjq-hamburger' + (props.isActive ? ' nxjq-hamburger--active' : '')} onClick={() => {
      if (props.onChange) props.onChange();
    }}>
      <span className="nxjq-hamburger__stroke" />
      <span className="nxjq-hamburger__stroke" />
      <span className="nxjq-hamburger__stroke" />
      <span className="nxjq-hamburger__stroke" />
    </button>
  );
};

export default Hamburger;
