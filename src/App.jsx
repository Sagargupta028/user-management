import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { isAuthenticated, initAuth } from './utils/auth';

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  useEffect(() => {
    initAuth();
    setIsInitialized(true);
  }, []);

  if (!isInitialized) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        color: '#333'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '20px' }}>Loading...</div>
        <div style={{ marginTop: '10px' }}>
          <span style={{ color: '#FF9933', marginRight: '5px', fontSize: '24px' }}>●</span>
          <span style={{ color: '#FFFFFF', marginRight: '5px', fontSize: '24px' }}>●</span>
          <span style={{ color: '#138808', fontSize: '24px' }}>●</span>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route 
          path="/login" 
          element={isAuthenticated() ? <Navigate to="/users" /> : <LoginPage />} 
        />
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <UsersPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App; 