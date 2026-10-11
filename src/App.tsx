// src/App.tsx
import React from 'react';
import { Outlet } from 'react-router-dom'; // 👈 Make sure this import is present

export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', background: '#fff' }}>
      <h1>My App Layout</h1> {/* Temporary text to see if anything renders at all */}
      
      {/* 💡 Without this, your SearchScreen and DetailScreen will be completely invisible */}
      <Outlet /> 
    </div>
  );
}
