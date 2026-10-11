// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Hardcoded credentials check
    if (username === 'admin' && password === 'admin') {
      setError('');
      // Save authentication status to localStorage
      localStorage.setItem('isAuthenticated', 'true'); 
      // Redirect to the default application page ("/")
      navigate('/'); 
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <input 
              type="text" 
              placeholder="Username" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

// Basic inline styling for a clean, centered layout
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'sans-serif'
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '320px',
    textAlign: 'center'
  },
  title: {
    marginBottom: '20px',
    color: '#333333'
  },
  inputGroup: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    borderRadius: '4px',
    border: '1px solid #cccccc',
    fontSize: '14px'
  },
  error: {
    color: '#e74c3c',
    fontSize: '14px',
    margin: '10px 0'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#3498db',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Login;
