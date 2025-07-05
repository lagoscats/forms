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
      const response = await axios.post(`${API_URL}/signup/`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      const user = response.data;
      setMessage(`Welcome, ${user.username}! Redirecting...`);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.log(err.response?.data);
      if (err.response?.data?.username) {
        setError(`Username: ${err.response.data.username[0]}`);
      } else if (err.response?.data?.email) {
        setError(`Email: ${err.response.data.email[0]}`);
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
        <img
          src="/images/logo.png" // Replace with your actual logo path
          alt="App Logo"
          className="logo"
        />
        <h2 className="typewriter">{typedText}</h2>

        <label title="Pick a unique username">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="Enter username"
        />

        <label title="Use a valid email address">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
          placeholder="you@example.com"
        />

        <label title="Password must be at least 8 characters">Password</label>
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
            aria-label="Toggle password visibility"
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
