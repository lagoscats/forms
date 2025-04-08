import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/api/token/', formData);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);
      alert('Logged in successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input
            className="login-input"
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
            required
            disabled={loading}
          />

          <label htmlFor="password">Password</label>
          <input
            className="login-input"
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            disabled={loading}
          />

          <motion.button
            className="login-button"
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>
        </form>

        {loading && (
          <div className="login-loader">
            <div className="bouncing-loader">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        )}

        <div className="footer">
          <p>
            Don't have an account?{' '}
            <Link to="/signup" className="link">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
