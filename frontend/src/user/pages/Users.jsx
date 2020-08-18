import React from 'react';
import UserList from '../components/UserList';



export default function Users() {
  const USERS = [
    {
      id: 'ul',
      name: 'Tasty Purgen',
      image: 'https://upload.wikimedia.org/wikipedia/en/d/dc/Pocket_Mortys.png',
      items: 3
    }
  ]

  return (
    <UserList users={USERS} />
  )
};

