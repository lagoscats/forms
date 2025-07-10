import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import Profile from '../images/assets/003.jpg'; // 🐾 Replace with your icon
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const fullText = 'Login to your account';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/login/`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const { access, refresh } = response.data;
      const decodedToken = JSON.parse(atob(access.split('.')[1]));
      const username = decodedToken.username || decodedToken.user_id;

      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('username', username);

      setMessage(`Welcome, ${username}! Redirecting...`);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form animated-card">
        <div className="logo-area">
          <img
            src={Profile}
            alt="EnuguCats Logo"
            className="logo"
            title="Welcome to EnuguCats"
          />
        </div>

        <h2 className="typewriter">{typedText}</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={loading}
          className="input-field"
        />

        <label>Password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            className="input-field"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-btn"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? (
            <>
              Logging in <FaSpinner className="spin" />
            </>
          ) : (
            'Login'
          )}
        </button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <p className="link-note">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
