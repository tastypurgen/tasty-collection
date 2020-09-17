import React, { useEffect, useState } from 'react';

import UserList from '../components/UserList';
import { useHttpClient } from '../../shared/hooks/useHttpClient';

export default function Users() {
  const {
    error, sendRequest,
  } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users/`);

        setLoadedUsers(responseData.users);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err.message);
      }
    };
    fetchUsers();
  }, [sendRequest]);

  return (
    <UserList users={loadedUsers} error={error} />
  );
}
