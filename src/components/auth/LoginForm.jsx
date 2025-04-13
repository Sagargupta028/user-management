import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../services/api';
import { setToken, removeToken } from '../../utils/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = await login({ email, password });

      if (data && data.token) {
        setToken(data.token);
        toast.success('Login successful!');
        setTimeout(() => {
          navigate('/users');
        }, 300);
      } else {
        toast.error('Authentication failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#f5f5f5',
        padding: '20px',
      }}
    >
      <div
        className="auth-form"
        style={{
          backgroundColor: '#1e1e2f',
          color: '#f5f5f5',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8)',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <h2
            style={{
              color: '#87CEEB', // Changed to sky blue
              marginBottom: '10px',
              fontWeight: 'bold',
            }}
          >
            User Management System
          </h2>
          <div style={{ fontSize: '14px', color: '#aaa' }}>
            Please log in to access your account
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #444',
                backgroundColor: '#1e1e2f',
                color: '#f5f5f5',
              }}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '6px',
                border: '1px solid #444',
                backgroundColor: '#1e1e2f',
                color: '#f5f5f5',
              }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              backgroundColor: '#87CEEB', // Changed to sky blue
              color: '#000',
              padding: '12px',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#6CA6CD')} // Changed hover to darker sky blue
            onMouseOut={(e) => (e.target.style.backgroundColor = '#87CEEB')} // Changed back to sky blue
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div
          className="helper-text"
          style={{
            marginTop: '20px',
            fontSize: '14px',
            padding: '10px',
            backgroundColor: '#1e1e2f',
            borderRadius: '6px',
            border: '1px solid #444',
            color: '#bbb',
          }}
        >
          <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Use these credentials:</p>
          <p style={{ margin: '0 0 5px 0' }}>Email: eve.holt@reqres.in</p>
          <p style={{ margin: '0' }}>Password: cityslicka</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;