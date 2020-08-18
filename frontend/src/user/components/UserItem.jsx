import React from 'react'
import { Link } from 'react-router-dom'


import './UserItem.scss'
import { Card, Button } from 'react-bootstrap'


export default function UserItem({ id, alt, name, image, itemCount }) {
  return (
    <Card className="text-center user-item">
      <Card.Img src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Link to={`/${id}/items`}>
          <Button variant="primary">{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
