import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css'; // Create or adjust for styling

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001'
      : 'https://fidelis1981.pythonanywhere.com';

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
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        console.error('Failed to fetch user data:', err);
        setError('Failed to fetch user data. You may need to log in again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [API_URL]);

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
      </div>
    </div>
  );
};

export default Dashboard;
