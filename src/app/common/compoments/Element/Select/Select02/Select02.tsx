import React, { useState } from 'react';
import useOutsideClick from '../../../../../core/hooks/useOutsideClick';
import { Select02Props } from './types';

const Select02: React.FC<Select02Props> = (props) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');
  const ref = useOutsideClick(() => {
    setIsActive(false);
  });

  const handleClick = (id: string) => {
    setSelected(id);
  };

  return (
    <div ref={ref} className={'select-02' + (selected ? ' init' : '') + (isActive ? ' collapsed' : '')} onClick={() => setIsActive(!isActive)}>
      <button className="select-header" role="button" type="button">{props.options.find(it => it.id === selected)?.text ?? ''}</button>
      <div className="select-option-list-wrapper">
        <ul className="select-option-list">
          {props.options.map(it => (
            <li key={it.id} className="select-option-list__item" tabIndex={0} role="button" onClick={() => handleClick(it.id)} >{it.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Select02;
