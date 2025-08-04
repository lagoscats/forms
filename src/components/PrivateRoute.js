import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001'
    : 'https://fidelis1981.pythonanywhere.com';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    let isMounted = true;

    axios.get(`${API_URL}/api/users/user/`, {
      withCredentials: true,
    })
    .then(res => {
      if (isMounted) setIsAuthenticated(true);
    })
    .catch(err => {
      console.error("Not authenticated:", err.response?.data || err.message);
      if (isMounted) setIsAuthenticated(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAuthenticated === null) return <p>Loading...</p>;
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
