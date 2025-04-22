import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import '../pages/Login.css'; // Make sure this path is correct

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    if (!formData.username.trim() || !formData.password.trim()) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/login/`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const data = response.data;

      // Save token and username
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username || formData.username); // fallback to input if API doesn't return username

      setMessage('Login successful!');
      setTimeout(() => navigate('/dashboard'), 1000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Invalid credentials');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h1>Login</h1>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoFocus
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

        <button type="submit" disabled={loading} className="login-button">
          {loading ? (
            <>
              Logging In <FaSpinner className="spinner-icon spin" />
            </>
          ) : (
            'Login'
          )}
        </button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="links-container">
          <p>
            Don’t have an account?{' '}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
