import React from 'react';

import './Avatar.scss';
import { Image } from 'react-bootstrap';

export default function Avatar({ className, style, image, alt, width }) {
  return (
    <div className={`avatar ${className}`} style={style}>
      <Image
        roundedCircle
        src={image}
        alt={alt}
      // style={{ width: width, height: width }}
      />
    </div>
  );
};
