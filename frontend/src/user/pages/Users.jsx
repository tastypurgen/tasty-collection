import React, { useEffect, useState } from 'react';
import UserList from '../components/UserList';
import axios from 'axios';
import { Spinner, Container } from 'react-bootstrap';

export default function Users() {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [loadedUsers, setLoadedUsers] = useState(false)

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)

      try {
        const response = await axios.get('http://localhost:5501/api/users/')
        setLoadedUsers(response.data.users)
        console.log('response.data.users: ', response.data.users);

        if (!response.ok) throw new Error(response)
      } catch (error) {
        setIsError(error.message)
      }

      setIsLoading(false)
    }
    sendRequest()
  }, [])


  if (isLoading) {
    return (
      <Container>
        <Spinner style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(50%)"
        }} animation="grow" />
      </Container>
    )
  }
  return (
    <UserList users={loadedUsers} error={isError} />
  );
}
