import React from 'react';
import { BasicHeaderProps } from './types';

const BasicHeader: React.FC<BasicHeaderProps> = (props) => (
  <div className="inside-page-01-layout__former">
    <div className="inside-page-01-banner">
      <div className="inside-page-01-banner__inner">
        <div className={'inside-page-01-banner__former ' + (props.className ?? '')}>
          <div className="inside-page-01-banner__title inside-page-01-banner__title--main">{props.title}</div>
          <div className="inside-page-01-banner__title inside-page-01-banner__title--vice">{props.subTitle}</div>
        </div>
      </div>
    </div>
  </div>
);

export default BasicHeader;