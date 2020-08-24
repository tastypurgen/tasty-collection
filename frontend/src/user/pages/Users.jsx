import React from 'react';
import UserList from '../components/UserList';

export default function Users() {
  const USERS = [
    {
      id: 'u1',
      name: 'Tasty Purgen',
      image: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Pocket_Mortys.png',
      items: 3,
      isAdmin: true,
    },
    {
      id: 'u2',
      name: 'Andy Kaufman',
      image: 'https://i.pinimg.com/originals/08/7a/59/087a5944d37373f62af0cb272195f63f.jpg',
      items: 1,
      isAdmin: false,
    },
  ];

  return (
    <UserList users={USERS} />
  );
}
