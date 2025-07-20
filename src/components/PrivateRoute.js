import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('access');

  if (!token) {
    console.warn("No token found");
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      console.warn("Token expired");
      localStorage.clear();
      return <Navigate to="/login" replace />;
    }

    return children;

  } catch (error) {
    console.error("Invalid token format:", error.message);
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
