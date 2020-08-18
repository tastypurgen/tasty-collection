import React from 'react'
import UserItem from './UserItem'
import './UserList.scss'
import { Container, Row, Col } from 'react-bootstrap'

export default function UserList({ users }) {
  console.log(users)
  if (!users || users.length === 0) {
    return (
      <div className="center">
        <h2>No users found! (for now...)</h2>
      </div>
    )
  }
  return (
    <Container>
      <Row>
        {users.map(user => {
          return (
            <Col sm={6} md={4} text-center>
              <UserItem
                key={user.id}
                id={user.id}
                image={user.image}
                name={user.name}
                itemCount={user.items}
              />
            </Col>
          )
        })}
      </Row>
    </Container >
  )
}
