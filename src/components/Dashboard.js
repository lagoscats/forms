import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Dashboard.css';
import Notices from '../components/Notices';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001'
    : 'https://fidelis1981.pythonanywhere.com';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardInfo = async () => {
      try {
        const [userRes, statusRes, noticeRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/users/me/`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}/api/admissions/check/`, { withCredentials: true }),
          axios.get(`${API_BASE_URL}/api/notices/`, { withCredentials: true }),
        ]);

        setUserInfo(userRes.data);
        setHasApplied(statusRes.data?.has_applied);
        setNotices(noticeRes.data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard info:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchDashboardInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(`${API_BASE_URL}/api/users/logout/`, {}, { withCredentials: true });
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const fullName = userInfo?.full_name
    ?.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ') || 'User';

  if (loading) {
    return <div className="dashboard-loading">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-error">❌ Failed to load dashboard. Please try again later.</div>;
  }

  return (
    <div className="dashboard-container">
      <motion.h2
        className="dashboard-heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Welcome, {fullName}!
      </motion.h2>

      <motion.div
        className="dashboard-profile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <img
          src="/default-avatar.png"
          alt="Profile"
          className="profile-picture"
        />
        <div className="profile-info">
          <p><strong>Username:</strong> {userInfo?.username}</p>
          <p><strong>Email:</strong> {userInfo?.email}</p>
          <button className="btn settings-link" onClick={() => navigate('/settings')}>
            ⚙️ Settings
          </button>
        </div>
      </motion.div>

      <motion.div
        className={`dashboard-status ${hasApplied ? 'submitted' : 'pending'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {hasApplied ? (
          <p>✅ You have already submitted your admission application.</p>
        ) : (
          <p>🚀 You haven’t applied yet. Click below to begin your application.</p>
        )}
      </motion.div>

      <motion.div
        className="dashboard-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {!hasApplied && (
          <motion.button
            className="btn apply-btn"
            onClick={() => navigate('/admission')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Apply Now
          </motion.button>
        )}
        <motion.button
          className="btn logout-btn"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </motion.div>

      {/* Recent Activity/Notices Section */}
      <motion.div
        className="dashboard-notices"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Notices notices={notices} />
      </motion.div>
    </div>
  );
};

export default Dashboard;
