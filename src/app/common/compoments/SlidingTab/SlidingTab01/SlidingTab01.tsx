import React from 'react';
import { SlidingTab01ChildComponent, SlidingTab01Props } from './types';
import NavItem from './NavItem';

const SlidingTab01: React.FC<SlidingTab01Props> & SlidingTab01ChildComponent = (props) => {
  return (
    <div className={'sliding-tab-01 ' + (props.className ?? '')}>
      <div className="sliding-tab-01__inner nxjq-sliding-tab-wrapper">
        {props.children}
      </div>
    </div>
  );
};

SlidingTab01.NavItem = NavItem;

export default SlidingTab01;
