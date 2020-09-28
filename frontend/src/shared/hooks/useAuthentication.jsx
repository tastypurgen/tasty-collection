import { useState, useCallback, useEffect } from 'react';

export default function useAuthentication() {
  const [currentToken, setCurrentToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback((uid, admin, token, expireTime) => {
    const tokenExpire = expireTime || new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
    setCurrentToken(token);
    setUserId(uid);
    setIsAdmin(admin);
    localStorage.USER_DATA = JSON.stringify({
      id: uid,
      admin,
      token,
      expire: tokenExpire.toISOString(),
    });
  }, []);

  const logout = useCallback(() => {
    setCurrentToken(null);
    setUserId(null);
    setIsAdmin(false);
    localStorage.USER_DATA = null;
  }, []);

  useEffect(() => {
    let storedData;
    if (localStorage.USER_DATA) storedData = JSON.parse(localStorage.USER_DATA);
    if (storedData && storedData.token && new Date(storedData.expire) > new Date()) {
      login(storedData.id, storedData.admin, storedData.token, new Date(storedData.expire));
    } else {
      localStorage.USER_DATA = null;
    }
  }, [login]);

  return {
    userId, isAdmin, currentToken, login, logout,
  };
}
