import axios from '../utils/axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem('token'));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    const currentDate = new Date();

    if (!token || jwt_decode(token).exp * 1000 < currentDate.getTime()) {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
      return;
    }

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('token', token);
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
