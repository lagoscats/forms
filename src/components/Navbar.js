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

  const getActiveClass = ({ isActive }) => (isActive ? 'active-link' : '');

  return (
    <nav className="navbar">
      <div className="navbar-logo">EnuguCats</div>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <ul className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <li>
          <NavLink to="/" end className={getActiveClass} onClick={handleLinkClick}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={getActiveClass} onClick={handleLinkClick}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/services" className={getActiveClass} onClick={handleLinkClick}>
            Services
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={getActiveClass} onClick={handleLinkClick}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/admission-form" className={getActiveClass} onClick={handleLinkClick}>
            Admission
          </NavLink>
        </li>

        {!loggedIn ? (
          <>
            <li>
              <NavLink to="/login" className={getActiveClass} onClick={handleLinkClick}>
                Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signup" className={getActiveClass} onClick={handleLinkClick}>
                Sign Up
              </NavLink>
            </li>
          </>
        ) : (
          <li className="dropdown">
            <button onClick={() => setDropdownOpen(!dropdownOpen)}>
              Welcome, {username} ▼
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/profile" className={getActiveClass} onClick={handleLinkClick}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
