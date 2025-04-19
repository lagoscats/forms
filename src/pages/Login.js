import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import '../pages/Login.css'; // Adjust this path if needed

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/login/`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      // Assuming Django sends back a JWT token or session info
      const data = response.data;

      setMessage('Login successful!');
      localStorage.setItem('token', data.token); // Optional: store JWT token
      setTimeout(() => navigate('/dashboard'), 1000); // redirect to protected page
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
