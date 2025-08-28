import { useState, useEffect } from 'react';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('userToken') || 'null');
    setUser(savedUser);
    setLoading(false);
  }, []);

  const login = (userData) => {
    localStorage.setItem('userToken', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return { user, login, logout, loading };
};

export default useAuth;