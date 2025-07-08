import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Signup.css';

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
  const [typedText, setTypedText] = useState('');
  const fullText = 'Create your account';

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
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
    // Signup
    const response = await axios.post(`${API_URL}/signup/`, formData, {
      headers: { 'Content-Type': 'application/json' },
    });

    const user = response.data;
    setMessage(`Welcome, ${user.username}! Logging you in...`);

    // Auto login
    const loginRes = await axios.post(`${API_URL}/login/`, {
      username: formData.username,
      password: formData.password,
    });

    const { access, refresh } = loginRes.data;
    if (access && refresh) {
      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('username', formData.username);

      // Redirect
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setError('Login failed: Token not received.');
    }
  } catch (err) {
    console.error('Signup error:', err.response?.data);
    if (err.response?.data?.username) {
      setError(`Username: ${err.response.data.username[0]}`);
    } else if (err.response?.data?.email) {
      setError(`Email: ${err.response.data.email[0]}`);
    } else if (err.response?.data?.password) {
      setError(`Password: ${err.response.data.password[0]}`);
    } else if (err.response?.data?.detail) {
      setError(err.response.data.detail);
    } else {
      setError('Something went wrong. Please try again.');
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="signup-wrapper">
      <form onSubmit={handleSubmit} className="signup-form">
        <img src="/images/logo.png" alt="App Logo" className="logo" />
        <h2 className="typewriter">{typedText}</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="Enter username"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="you@example.com"
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
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-btn"
            title={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? (
            <>
              Signing Up <FaSpinner className="spin" />
            </>
          ) : (
            'Sign Up'
          )}
        </button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

        <p className="link-note">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
