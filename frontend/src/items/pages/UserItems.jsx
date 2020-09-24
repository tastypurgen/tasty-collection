/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ItemList from '../component/ItemList';
import { useHttpClient } from '../../shared/hooks/useHttpClient';
import './UserItems.scss';
import allImg from './all.svg';
import bookImg from '../component/images/book.svg';
import filmImg from '../component/images/film.svg';
import foodImg from '../component/images/food.svg';
import gameImg from '../component/images/game.svg';

const mapping = {
  all: allImg,
  film: filmImg,
  book: bookImg,
  game: gameImg,
  food: foodImg,
};

export default function UserItems() {
  const [loadedItems, setLoadedItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const { isLoading, error, sendRequest } = useHttpClient();

  const { userId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/user/${userId}`,
        );
        setFilteredItems(responseData.items);
        setLoadedItems(responseData.items);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message);
      }
    };
    fetchItems();
  }, [sendRequest, userId]);

  const deleteItem = (deleteId) => {
    setLoadedItems((prev) => prev.filter((item) => item.id !== deleteId));
  };

  const filterItems = (type) => {
    if (type === 'all') {
      setFilteredItems(loadedItems);
      setActiveFilter('all');
    } else {
      setActiveFilter(type);
      setFilteredItems(loadedItems.filter((item) => item.type === type));
    }
  };

  console.log(loadedItems);

  if (!loadedItems) {
    return (
      <h1>loading...</h1>
    );
  }

  const types = ['all', 'book', 'film', 'food', 'game'];

  return (
    <>
      <h2 className="text-center">My collection</h2>

      <div className="type-panel text-center" style={{}}>
        {types.map((type) => (
          <img
            key={type}
            className={activeFilter === type ? 'active' : ''}
            src={mapping[type]}
            alt={type}
            onClick={() => filterItems(type)}
          />
        ))}
      </div>

      <ItemList
        isLoading={isLoading}
        items={filteredItems}
        error={error}
        deleteItem={deleteItem}
      />
    </>
  );
}
