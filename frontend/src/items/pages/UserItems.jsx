import React from 'react';
import { useParams } from 'react-router-dom';
import ItemList from '../component/ItemList';

const ITEMS = [
  {
    id: 'i1',
    type: 'book',
    title: '1984',
    description: 'Exciting book!',
    image: 'https://images-na.ssl-images-amazon.com/images/I/91SZSW8qSsL.jpg',
    tags: ['interesting', 'book', 'dystopia'],
    likes: 3,
    creatorId: 'u1',
  },
  {
    id: 'i2',
    type: 'book',
    title: 'Flowers for Algernon',
    description: 'My favorite book',
    image: 'https://images-na.ssl-images-amazon.com/images/I/41eDhPsmjbL._SX323_BO1,204,203,200_.jpg',
    tags: ['book', 'fiction'],
    likes: 10,
    creatorId: 'u2',
  },
  {
    id: 'i3',
    type: 'film',
    title: 'The Shawshank Redemption',
    description: 'The Shawshank Redemption is a 1994 American drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51zUbui%2BgbL.jpg',
    tags: ['drama', 'interesting', 'film', 'fiction'],
    likes: 6,
    creatorId: 'u1',
  },
];

export default function UserItems() {
  const { userId } = useParams();
  const userItems = ITEMS.filter((item) => userId === item.creatorId);
  return (
    <ItemList items={userItems} />
  );
}
