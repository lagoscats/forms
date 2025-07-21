import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

// Move API_URL outside the component to avoid useEffect dependency warning
const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001'
    : 'https://fidelis1981.pythonanywhere.com';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const accessToken = localStorage.getItem('access');
      if (!accessToken) {
        setError('Access token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/api/user/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch user data:', err.response || err.message);
        setError('Failed to load user data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []); // ✅ No more ESLint warning since API_URL is no longer a dependency

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-card animated-card">
        <h2>Welcome to Your Dashboard</h2>
        {loading && <p>Loading user data...</p>}
        {error && <p className="error">{error}</p>}
        {user && (
          <div className="user-info">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user.id}</p>
          </div>
        )}

        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
