import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom"; // ← import Link
import Profile from "../images/assets/profile.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">MySite</Link>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
      <li><Link to="/" onClick={closeMenu}>Home</Link></li>
        <li><Link to="/about" onClick={closeMenu}>About</Link></li>
        <li><Link to="/services" onClick={closeMenu}>Services</Link></li>
        <li><Link to="/contact" onClick={closeMenu}>Contact</Link></li>
      </ul>

      <div className="navbar-right">
        <Link to="/login" className="auth-button">Login</Link>
        <Link to="/signup" className="auth-button signup">Sign Up</Link>
        <img src={ Profile } alt="Profile" className="profile-photo" />
      </div>
      <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Navbar;