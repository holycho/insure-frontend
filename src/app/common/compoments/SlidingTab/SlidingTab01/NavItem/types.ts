import React from 'react';

export interface NavItemProps {
  name: string;
  style: React.CSSProperties;
  onClick: () => void;
}
