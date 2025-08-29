import React from 'react';
import { LoadingSpinnerProps } from './types';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const LoadingSpinner: React.FC<LoadingSpinnerProps> = (props) => {
  return props.visible ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} fullscreen />
  ) : null;
};

export default LoadingSpinner;