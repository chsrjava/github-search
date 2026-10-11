// src/main.tsx (or src/index.tsx)
import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router'; // Make sure this path matches your router file

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    {/* 💡 This MUST be RouterProvider, NOT <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
