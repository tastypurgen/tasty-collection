import React from 'react'
import UserItem from './UserItem'
import './UserList.scss'

export default function UserList({ users }) {
  console.log(users)
  if (!users || users.length === 0) {
    return (
      <div className="center">
        <h2>No users found! (for now...)</h2>
      </div>
    )
  }
  return (
    <ul className="user-list">
      {users.map(user => {
        return <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          itemCount={user.items}
        />
      })}
    </ul>
  )
}
