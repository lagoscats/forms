import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css'; // Make sure this file exists in the same folder

const Login = () => {
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

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
    }, 90);
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
    setLoading(true);

    const { username, password } = formData;

    try {
      const res = await axios.post(`${API_URL}/login/`, {
        username,
        password,
      });

      const { access, refresh } = res.data;

      localStorage.setItem('token', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('username', username);

      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="logo-area">
          <img
            src="/logo192.png"
            alt="Logo"
            className="logo"
            title="Welcome to our app"
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
          title="Enter your username"
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
            title="Enter your password"
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
