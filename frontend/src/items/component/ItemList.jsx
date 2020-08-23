import React from 'react';

import {
  Container, Row, Col, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemItem from './ItemItem';

export default function ItemList({ items }) {
  if (!items || items.length === 0) {
    return (
      <div className="text-center">
        <h2>No items found</h2>
        <Link to="/items/add">
          <Button variant="info" type="button">Add item</Button>
        </Link>
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
