import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

import './UserItem.scss';

export default function UserItem({
  id, name, image, itemCount,
}) {
  return (
    <Card className="text-center user-item">
      <Card.Img src={image} alt={name} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Link to={`/${id}/items`}>
          <Button variant="info">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
