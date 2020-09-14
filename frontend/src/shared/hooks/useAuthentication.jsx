import { useState, useCallback, useEffect } from 'react';

export default function useAuthentication() {
  const [currentToken, setCurrentToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((uid, token, expireTime) => {
    const tokenExpire = expireTime || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    setCurrentToken(token);
    localStorage.USER_DATA = JSON.stringify({
      id: uid,
      token,
      expire: tokenExpire.toISOString(),
    });
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setCurrentToken(null);
    localStorage.USER_DATA = null;
    setUserId(null);
  }, []);

  useEffect(() => {
    let storedData;
    if (localStorage.USER_DATA) storedData = JSON.parse(localStorage.USER_DATA);
    if (storedData && storedData.token && new Date(storedData.expire) > new Date()) {
      login(storedData.id, storedData.token, new Date(storedData.expire));
    } else {
      localStorage.USER_DATA = null;
    }
  }, [login]);

  return {
    userId, currentToken, login, logout,
  };
}
