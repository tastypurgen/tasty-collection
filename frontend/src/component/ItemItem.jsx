import React from 'react';

import './ItemItem.scss';
import { Card, Button } from 'react-bootstrap';
import ItemTags from './ItemTags';

export default function ItemItem({
  // eslint-disable-next-line no-unused-vars
  id, image, type, title, description, tags, creatorId,
}) {
  return (
    <Card>
      <Card.Img src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <ItemTags tags={tags} />
        <Button className="mt-1" variant="info" size="sm">Edit</Button>
        <Button className="mt-1" variant="danger" size="sm">Delete</Button>
      </Card.Body>
    </Card>
  );
}
