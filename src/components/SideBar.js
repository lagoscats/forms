import React from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css'; // Make sure this file exists with the proper styles

const Sidebar = ({ onLogout }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/settings">Settings</Link>
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
