/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import './Heart.scss';

export default function Heart({ likes }) {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  const currentClass = isLiked
    ? 'HeartAnimation animate'
    : 'HeartAnimation';

  return (
    <div className="heart">
      <div
        onClick={handleClick}
        className={currentClass}
      />
      <div className="number">{likes}</div>
    </div>
  );
}
