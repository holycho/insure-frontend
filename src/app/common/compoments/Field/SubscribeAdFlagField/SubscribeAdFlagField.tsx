import React from 'react';
import { SubscribeAdFlagFieldProps } from './types';
import { useField } from 'formik';
import Checkbox01 from '../../Element/Checkbox/Checkbox01';

const SubscribeAdFlagField: React.FC<SubscribeAdFlagFieldProps> = (props) => {
  const [field] = useField(props.name);

  return (
    <Checkbox01 {...field} {...props} checked={field.value} >
      訂閱電子廣告郵件
    </Checkbox01>
  );
};

export default SubscribeAdFlagField;