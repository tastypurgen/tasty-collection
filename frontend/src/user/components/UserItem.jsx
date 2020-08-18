import React from 'react'
import { Link } from 'react-router-dom'

import './UserItem.scss'
import Avatar from '../../shared/components/UIElements/Avatar'
import Card from '../../shared/components/UIElements/Card'


export default function UserItem({ id, alt, name, image, itemCount }) {
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/items`}>
          <div className="user-item__image">
            <Avatar
              image={image}
              alt={alt}
            />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</h3>
          </div>
        </Link>
      </Card>
    </li>
  )
}
