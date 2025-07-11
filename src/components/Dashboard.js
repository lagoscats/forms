import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { Menu, X } from 'lucide-react';

const Dashboard = () => {
  const [username, setUsername] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1));
    } else {
      // Optionally redirect to login if no username
      navigate('/login');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token'); // If you're storing a token
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* Hamburger Button */}
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="profile-section">
          <img
            src="https://i.pravatar.cc/100?img=8"
            alt="Profile"
            className="avatar"
          />
          <h3>{username || 'Guest'}</h3>
        </div>
        <nav className="sidebar-nav">
          <Link to="/dashboard" onClick={toggleSidebar}>Dashboard</Link>
          <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
          <Link to="/posts" onClick={toggleSidebar}>Posts</Link>
          <Link to="/settings" onClick={toggleSidebar}>Settings</Link>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="dashboard-container">
        <motion.h1
          className="dashboard-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome, {username || 'there'}!
        </motion.h1>

        <div className="dashboard-grid">
          {[
            { title: 'Profile', desc: 'Quick overview of your activity', link: '/profile' },
            { title: 'Your Posts', desc: 'View and manage your posts', link: '/posts' },
            { title: 'Settings', desc: 'Adjust your preferences', link: '/settings' },
          ].map((card, index) => (
            <motion.div
              key={card.title}
              className="dashboard-card"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
              <Link to={card.link}>Go to {card.title}</Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
