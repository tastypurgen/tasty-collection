import React from 'react';
import {
  Container, Row, Col, Spinner,
} from 'react-bootstrap';

import UserItem from './UserItem';
import './UserList.scss';

export default function UserList({ users, error }) {
  if (!users) {
    return (
      <Container>
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
  if (error) {
    return (
      <Container className="text-center">
        <h2>No users found</h2>
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
