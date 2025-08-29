import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  text: string;
  withInputField?: string;
  disabledInput?: boolean;
}
