import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import ItemTags from './ItemTags';

export default function ItemItem({
  // eslint-disable-next-line no-unused-vars
  id, image, type, title, description, tags, creatorId,
}) {
  const intl = useIntl().formatMessage;

  return (
    <Card>
      <Card.Img src={image} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <ItemTags tags={tags} />
        <Button className="mt-1" variant="info" size="sm">{intl({ id: 'ItemItem.Edit' })}</Button>
        <Button className="mt-1" variant="danger" size="sm">{intl({ id: 'ItemItem.Delete' })}</Button>
      </Card.Body>
    </Card>
  );
}
