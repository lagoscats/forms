import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom'; // ✅ make sure useNavigate is from here

const Signup = () => {
  const navigate = useNavigate(); // ✅ get the navigation function

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:8000/api/register/', formData);
      alert('Signup successful! Redirecting to login...');
      navigate('/login'); // ✅ redirect after signup
    } catch (err) {
      console.error(err);
      alert('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <motion.div
        className="signup-card"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2>Create an Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="signup-input"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            className="signup-input"
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            className="signup-input"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <motion.button
            className="signup-button"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </motion.button>
        </form>
        <p className="signup-login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </motion.div>

      {loading && (
        <div className="signup-loader">
          <div className="bouncing-loader">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
