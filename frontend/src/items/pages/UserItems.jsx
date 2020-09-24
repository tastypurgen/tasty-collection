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

let allItems;

export default function UserItems() {
  const [loadedItems, setLoadedItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const { isLoading, error, sendRequest } = useHttpClient();

  const { userId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/user/${userId}`,
        );
        allItems = responseData.items;
        // setFilteredItems(responseData.items);
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

  const sortItems = (type) => {
    console.log('allItems: ', allItems);
    console.log('setLoadedItems: ', loadedItems);
    if (type === 'all') {
      setFilteredItems(loadedItems);
    } else {
      setFilteredItems(loadedItems.filter((item) => item.type === type));
    }
  };

  console.log(loadedItems);

  if (!loadedItems) {
    return (
      <h1>loading...</h1>
    );
  }

  return (
    <>
      <h2 className="text-center">My collection</h2>
      <div className="type-panel text-center" style={{}}>
        <img className="active" src={allImg} alt="" onClick={sortItems('all')} />
        <img src={bookImg} alt="" onClick={sortItems('book')} />
        <img src={filmImg} alt="" onClick={sortItems('film')} />
        <img src={foodImg} alt="" onClick={sortItems('food')} />
        <img src={gameImg} alt="" onClick={sortItems('game')} />
      </div>
      <ItemList
        isLoading={isLoading}
        items={loadedItems}
        error={error}
        deleteItem={deleteItem}
      />
    </>
  );
}
