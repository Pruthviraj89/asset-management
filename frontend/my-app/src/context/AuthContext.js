import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setAuth({
        isAuthenticated: true,
        user,
        role: user.role,
      });
    }
  }, []);

  const login = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({
      isAuthenticated: true,
      user,
      role: user.role,
    });
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuth({
      isAuthenticated: false,
      user: null,
      role: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};