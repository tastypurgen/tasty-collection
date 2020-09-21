import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import ItemList from '../component/ItemList';
import { useHttpClient } from '../../shared/hooks/useHttpClient';

export default function UserItems() {
  const [loadedItems, setLoadedItems] = useState(null);
  const { isLoading, error, sendRequest } = useHttpClient();

  const { userId } = useParams();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/all`,
        );
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

  return (
    <ItemList
      isLoading={isLoading}
      items={loadedItems}
      error={error}
      deleteItem={deleteItem}
      commonList
    />
  );
}
