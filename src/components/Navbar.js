import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Navbar.css";
import profile from "../images/assets/profile.jpg";

const Navbar = () => {
  const [dropdown, setDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="navbar-left">
        <Link to="/" className="logo">
          MyWebsite
        </Link>

        <div className="hamburger" onClick={toggleMenu}>
          &#9776; {/* Hamburger icon */}
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
            className="dropdown-parent"
          >
            <span>Services</span>
            {dropdown && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/services/web">Web Development</Link>
                </li>
                <li>
                  <Link to="/services/design">Design</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/pricing">Pricing</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-right">
        <Link to="/login" className="auth-button">
          Login
        </Link>
        <Link to="/signup" className="auth-button signup">
          Sign Up
        </Link>
        <img src={profile} alt="Profile" className="profile-photo" />
      </div>
    </motion.nav>
  );
};

export default Navbar;
