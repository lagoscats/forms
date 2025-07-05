import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-links">
        <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        <Link to="/profile" className="sidebar-link">Profile</Link>
        <Link to="/settings" className="sidebar-link">Settings</Link>
      </div>
      
      {/* Logout button at the bottom of the sidebar */}
      <div className="sidebar-logout">
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
