// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
import { FaTachometerAlt, FaUser, FaCog, FaWpforms, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Dashboard</div>
      <ul className="sidebar-links">
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaTachometerAlt /> <span>Overview</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaUser /> <span>Profile</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaCog /> <span>Settings</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/admission-form" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaWpforms /> <span>Admission</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
            <FaSignOutAlt /> <span>Logout</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
