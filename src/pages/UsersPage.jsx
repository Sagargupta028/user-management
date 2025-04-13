import React, { useEffect } from 'react';
import UserList from '../components/users/UserList';
import { useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../utils/auth';

const UsersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#121212', // Dark gradient background
        color: '#f5f5f5', // Light text
        padding: '20px',
      }}
    >
      <div
        className="navbar"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px 20px',
          backgroundColor: '#1e1e2f', // Navbar background
          borderRadius: '8px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.5)',
          marginBottom: '20px',
        }}
      >
        <h3
          style={{
            margin: 0,
            color: '#87CEEB', // Changed to sky blue
            fontWeight: 'bold',
          }}
        >
          Reqres User Management
        </h3>
        <button
          className="btn btn-danger"
          onClick={handleLogout}
          style={{
            backgroundColor: '#87CEEB', // Changed to sky blue
            color: '#fff',
            padding: '8px 12px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#6CA6CD')} // Slightly darker sky blue on hover
          onMouseOut={(e) => (e.target.style.backgroundColor = '#87CEEB')} // Revert to sky blue
        >
          Logout
        </button>
      </div>
      <UserList />
    </div>
  );
};

export default UsersPage;