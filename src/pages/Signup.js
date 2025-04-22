import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../pages/Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);
  
    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill out all fields.');
      setLoading(false);
      return;
    }
  
    try {
      const response = await axios.post(`${API_URL}/signup/`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });
  
      const user = response.data;
      setMessage(`Welcome, ${user.username}! Redirecting...`);
  
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Sign Up</h1>
        {/* Form inputs */}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <label htmlFor="password">Password</label>
        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="password-toggle"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" disabled={loading} className="signup-button">
          {loading ? (
            <>
              Creating Account <FaSpinner className="spinner-icon spin" />
            </>
          ) : (
            'Sign Up'
          )}
        </button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="links-container">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Log In
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
