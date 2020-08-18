import React from 'react';

import './Card.scss';

export default function Card({ className, style, children }) {

  return (
    <div className={`card ${className}`} style={style}>
      {children}
    </div>
  );
};
