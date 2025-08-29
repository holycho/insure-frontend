import React from 'react';
import { RadioGroup00FieldProps } from './types';
import Radio from './Radio/Radio';
import { useField } from 'formik';

const RadioGroup00Field: React.FC<RadioGroup00FieldProps> = (props) => {
  const [field, ] = useField(props.name);

  return (
    <div className={['radio-group-00', props.groupClassName].join(' ')}>
      {props.options.map((option, index) => (
        <Radio
          {...field}
          checked={option.value === field.value}
          key={`${props.name}.${index}`}
          id={`${props.name}.${index}`}
          text={option.text}
          value={option.value}
          withInputField={option.withInputField}
          disabledInput={(field.value && option.value !== field.value) || !field.value}
        />
      ))}
    </div>
  );
};

export default RadioGroup00Field;
