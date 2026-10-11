// src/router.tsx
import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './App';
import SearchScreen from './SearchScreen';
import DetailScreen from './DetailScreen';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/", 
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ), 
    children: [
      { 
        index: true, // 💡 Handles exact "/" path -> Renders SearchScreen
        element: <SearchScreen /> 
      },       
      { 
        path: "repo/:owner/:name", // Handles "/repo/abc/xyz" -> Renders DetailScreen
        element: <DetailScreen /> 
      },
      {
        path: "*", // 💡 Catch-all safety net: If URL path doesn't match, redirect back to root "/"
        element: <Navigate to="/" replace />
      }
    ]
  }
]);
