import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import UserItem from './UserItem';
import './UserList.scss';

export default function UserList({ users }) {
  if (!users || users.length === 0) {
    return (
      <div className="center">
        <h2>No users found! (for now...)</h2>
      </div>
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
              itemCount={user.items}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
