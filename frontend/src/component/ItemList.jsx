import React from 'react';

import './ItemList.scss';
import { Container, Row, Col } from 'react-bootstrap';
import ItemItem from './ItemItem';

export default function ItemList({ items }) {
  if (!items || items.length === 0) {
    return (
      <div>
        <h2>No items found</h2>
        <button type="button">Add item</button>
      </div>
    );
  }
  return (
    <Container>
      <Row>
        {items.map((item) => (
          <Col sm={6} md={4} key={item.id}>
            <ItemItem
              key={item.id}
              id={item.id}
              image={item.image}
              type={item.type}
              title={item.title}
              description={item.description}
              tags={item.tags}
              creatorId={item.creatorId}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
