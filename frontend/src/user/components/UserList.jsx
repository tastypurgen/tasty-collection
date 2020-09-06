import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import UserItem from './UserItem';
import './UserList.scss';

export default function UserList({ users, error }) {
  if (!users || users.length === 0) {
    return (
      <Container className="text-center">
        {error ?
          <h3>{error}</h3> :
          <h2>No users found :(</h2>}
      </Container>
    );
  }


  return (
    <Container>
      <Row>
        {users.map((user) => (
          <Col sm={6} md={4} key={user.id}>
            <UserItem
              id={user.id}
              image={user.image}
              name={user.name}
              itemCount={user.items.length}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
