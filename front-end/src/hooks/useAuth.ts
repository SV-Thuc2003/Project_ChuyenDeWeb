import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) setUsername(storedUser);
  }, []);

  const login = (username: string) => {
    localStorage.setItem('username', username);
    setUsername(username);
  };

  const logout = () => {
    localStorage.removeItem('username');
    setUsername(null);
  };

  return {
    username,
    isLoggedIn: !!username,
    login,
    logout
  };
};
