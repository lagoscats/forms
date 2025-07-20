import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Dashboard.css';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001/api'
    : 'https://chinedu2026.pythonanywhere.com/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError('');
      try {
        const access = localStorage.getItem('access');
        if (!access) {
          handleLogout();
          return;
        }
        const response = await axios.get(`${API_URL}/user/`, {
          headers: { Authorization: `Bearer ${access}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (error.response?.status === 401) {
          setError('Session expired. Logging out...');
          setTimeout(() => {
            handleLogout();
          }, 3000);
        } else {
          setError('Failed to load user data. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [handleLogout]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const formatName = (name) => {
    if (!name) return 'User';
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  };

  return (
    <main className="dashboard-container">
      <motion.section
        className="dashboard-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {loading ? (
          <div className="loading-spinner-container">
            <div className="spinner"></div>
            <p className="loading-text">Loading your dashboard...</p>
          </div>
        ) : error ? (
          <motion.div
            className="error-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p>{error}</p>
          </motion.div>
        ) : user ? (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {getGreeting()}, <span>{formatName(user.username)}</span> 👋
            </motion.h1>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Member since:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>

            {/* Dashboard cards */}
            <motion.div
              className="stats-grid"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delayChildren: 0.3,
                    staggerChildren: 0.15,
                  },
                },
              }}
            >
              <motion.div className="stat-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <h3>Forms Submitted</h3>
                <p>12</p>
              </motion.div>

              <motion.div className="stat-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <h3>Notifications</h3>
                <p>3</p>
              </motion.div>

              <motion.div className="stat-card" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                <h3>Recent Logins</h3>
                <p>7</p>
              </motion.div>
            </motion.div>
          </>
        ) : (
          <p>No user data available.</p>
        )}

        <motion.button
          onClick={handleLogout}
          className="logout-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </motion.section>
    </main>
  );
};

export default Dashboard;
