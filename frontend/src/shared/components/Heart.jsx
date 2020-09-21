/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useState, useEffect } from 'react';

import './Heart.scss';
import { useHttpClient } from '../hooks/useHttpClient';
import { AuthContext } from '../context/AuthContext';

export default function Heart({ likes, itemId, zoom }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(likes.length);

  const auth = useContext(AuthContext);

  useEffect(() => {
    setIsLiked(likes.indexOf(auth.userId) !== -1);
  }, [likes, auth.userId]);

  const { sendRequest } = useHttpClient();

  const handleClick = async () => {
    setLikesNumber((prev) => {
      if (isLiked) return prev - 1;
      return prev + 1;
    });
    setIsLiked(!isLiked);
    await sendRequest(
      `${process.env.REACT_APP_BACKEND_URL}/items/${itemId}/like`,
      'PATCH',
      JSON.stringify({
        userId: auth.userId,
        itemId,
      }),
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.currentToken}`,
      },
    );
  };

  return (
    <div className="heart">
      <div
        onClick={handleClick}
        className={isLiked ? 'HeartAnimation animate' : 'HeartAnimation'}
        style={zoom && { marginLeft: '44%', backgroundSize: '2900%', transform: 'scale(1.5)' }}
      />
      <div
        className="number"
        style={zoom && { marginLeft: '48%', transform: 'scale(1.5)' }}
      >{likesNumber}
      </div>
    </div>
  );
}
