import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import Profile from '../images/assets/003.jpg';
import './Signup.css';

const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001/api'
    : 'https://fidelis1981.pythonanywhere.com/api';

const Signup = () => {
  const navigate = useNavigate();

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

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/signup/`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setMessage(response.data.message || 'Signup successful!');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      console.error('Signup failed:', err.response?.data || err.message);
      setError(
        err.response?.data?.error ||
          'Signup failed. Try a different username or email.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form animated-card">
        <div className="logo-area">
          <img src={Profile} alt="Logo" className="logo" />
        </div>

        <h2 className="typewriter">{typedText}</h2>

        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          className="input-field"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
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
            className="input-field"
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

        <button type="submit" disabled={loading} className="login-btn">
          {loading ? (
            <>
              Signing up <FaSpinner className="spin" />
            </>
          ) : (
            'Signup'
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
