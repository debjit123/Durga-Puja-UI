import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const token = localStorage.getItem('authToken'); // Check if token exists
  const isAuthenticated = token && token.split('.').length === 3; 
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default PrivateRoute;