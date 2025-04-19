import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import '../pages/Signup.css';

const Signup = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  console.log("API_URL from .env:", API_URL);  // Check if this logs the correct value



  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/signup/`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      setMessage('Signup successful! Redirecting to login...');
      setFormData({ username: '', email: '', password: '' });

      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Signup failed');
      } else {
        setError('Network error, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Create Account</h1>

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
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading} className="signup-button">
          {loading ? (
            <>
              Signing Up <FaSpinner className="spinner-icon spin" />
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
            <Link to="/login" className="login-link">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
