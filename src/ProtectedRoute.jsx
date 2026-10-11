// src/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    // 💡 If not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If logged in, render the requested page layout
  return children;
}

export default ProtectedRoute;
