// src/pages/Logout.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Logout.css';

const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8001'
  : 'https://chinedu2026.pythonanywhere.com';

const Logout = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState('logging-out'); // 'logging-out', 'success', 'error'

  useEffect(() => {
    const logout = async () => {
      try {
        await axios.post(`${API_BASE_URL}/api/logout/`, {}, { withCredentials: true });
        setStatus('success');
        setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
        console.error('Logout failed:', err);
        setStatus('error');
        setTimeout(() => navigate('/login'), 2000);
      }
    };

    logout();
  }, [navigate]);

  return (
    <div className="logout-container">
      {status === 'logging-out' && (
        <>
          <p className="logout-text">Logging you out...</p>
          <div className="spinner"></div>
        </>
      )}
      {status === 'success' && (
        <div className="success-message">
          <div className="checkmark">✔</div>
          <p>You’ve been logged out.</p>
        </div>
      )}
      {status === 'error' && (
        <div className="error-message">
          <p>⚠ Logout failed. Redirecting...</p>
        </div>
      )}
    </div>
  );
};

export default Logout;
