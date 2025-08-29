import React from 'react';
import { TextCollectionSectionProps } from './types';

const TextCollectionSection: React.FC<TextCollectionSectionProps> = (props) => {
  return (
    <>
      <div className="text-collection__title">{props.title}</div>
      <ul className="text-collection__ul text-collection__description">
        {props.content.map((it, index) => (
          <li key={`section-${props.order}-${index}`} className="text-collection__li text-collection__description text-collection__description--m">{it}</li>
        ))}
      </ul>
    </>
  );
};

export default TextCollectionSection;