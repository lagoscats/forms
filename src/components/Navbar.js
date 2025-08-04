import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isLoggedIn, getUsername } from '../utils/auth';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const loggedIn = isLoggedIn();
  const username = getUsername();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setMenuOpen(false);
    navigate('/login');
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="navbar-logo">EnuguCats</div>
        <div className="navbar-tagline">Fullstack | I build modern web applications using React and Django.</div>
      </div>

      <button
        className={`hamburger ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li><NavLink to="/" end onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Home</NavLink></li>
        <li><NavLink to="/about" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>About</NavLink></li>
        <li><NavLink to="/services" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Services</NavLink></li>
        <li><NavLink to="/contact" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Contact</NavLink></li>
        <li><NavLink to="/admission-form" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Admission</NavLink></li>
        <li><NavLink to="/portfolio" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Portfolio</NavLink></li>

        {loggedIn ? (
          <>
            <li className="dropdown">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                Welcome, {username} ▼
              </button>
              {dropdownOpen && (
                <ul className="dropdown-menu">
                  <li><NavLink to="/dashboard" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink></li>
                  <li><NavLink to="/profile" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>Profile</NavLink></li>
                  <li><NavLink to="/settings" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'active-link' : ''}>Settings</NavLink></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              )}
            </li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Login</NavLink></li>
            <li><NavLink to="/signup" onClick={handleLinkClick} className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Sign Up</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
