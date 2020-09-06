import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Spinner, Container } from 'react-bootstrap';

import UserList from '../components/UserList';
import { useHttpClient } from '../../shared/hooks/useHttpClient';

export default function Users() {
  const {
    isLoading, error, sendRequest,
  } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await axios.get('http://localhost:5501/api/users/');

        setLoadedUsers(responseData.data.users);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  if (isLoading) {
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
  return (
    <UserList users={loadedUsers} error={error} />
  );
}
