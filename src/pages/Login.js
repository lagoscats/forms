// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const API_BASE_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:8001'
  : 'https://chinedu2026.pythonanywhere.com';

const getPasswordStrength = (password) => {
  if (password.length < 6) return 'Weak';
  if (password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}/)) return 'Strong';
  return 'Medium';
};

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    if (name === 'password') setStrength(getPasswordStrength(value));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/login/`, credentials, {
        withCredentials: true,
      });
      navigate('/dashboard');
    } catch (err) {
      setError('❌ Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>🔐 Secure Login</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          required
        />

        <div className="password-field">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        {credentials.password && (
          <p className={`strength ${strength.toLowerCase()}`}>
            Password strength: {strength}
          </p>
        )}

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? <div className="spinner" /> : 'Login'}
        </button>

        <p className="redirect-link">
          Don’t have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
