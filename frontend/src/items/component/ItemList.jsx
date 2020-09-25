import React from 'react';

import {
  Container, Row, Col, Button, Spinner, Jumbotron,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ItemItem from './ItemItem';

export default function ItemList({
  items, error, isLoading, deleteItem, commonList,
}) {
  if (isLoading) {
    return (
      <Container className="text-center">
        <Spinner
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(50%)',
          }}
          animation="grow"
        />
      </Container>
    );
  }

  if (!items || items.length === 0 || error) {
    return (
      <Container className="text-center">
        <Jumbotron>
          <h2>No items found</h2>
          <Link to="/items/add">
            <Button variant="info" type="button">Add item</Button>
          </Link>
        </Jumbotron>
      </Container>
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
              likes={item.likes}
              creatorId={item.creatorId}
              deleteItem={deleteItem}
              commonList={commonList}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
