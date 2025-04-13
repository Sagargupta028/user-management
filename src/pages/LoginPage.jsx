import React, { useEffect } from 'react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  useEffect(() => {
    // Set the body and html background to a dark gradient
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = '#121212'; // Dark gradient background
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.background = '#121212';

    return () => {
      // Cleanup styles when the component unmounts
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.background = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.background = '';
    };
  }, []);

  return (
    <div
      className="container"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', // Ensure full width
        maxWidth: '1200px', // Limit the maximum width
        margin: '0 auto', // Center the container horizontally
        backgroundColor: '#121212', // Dark container background
        color: '#f5f5f5', // Light text
        padding: '20px',
        borderRadius: '12px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          marginBottom: '20px',
          color: '#5DADE2', // Changed to a related color (soft blue)
          fontWeight: 'bold',
        }}
      >
        User Management <span style={{ color: 'white' }}>System</span>
      </h1>

      <div
        style={{
          textAlign: 'center',
          marginBottom: '30px',
          fontSize: '16px',
          color: '#aaa', // Subtle text color
        }}
      >
        A simple and powerful way to manage users.
      </div>

      <LoginForm />

      <footer
        style={{
          textAlign: 'center',
          marginTop: '40px',
          padding: '20px',
          fontSize: '14px',
          color: '#888', // Footer text color
        }}
      >
        <div>Built with React and Reqres API</div>
        <div style={{ marginTop: '10px' }}>
          <span style={{ color: '#FF9933', marginRight: '5px' }}>●</span>
          <span style={{ color: '#FFFFFF', marginRight: '5px' }}>●</span>
          <span style={{ color: '#138808' }}>●</span>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;