import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner } from 'react-icons/fa';
import '../pages/Signup.css';

const Signup = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
  
    try {
      // Update the backend URL to the local IP address
      await axios.post(
        'http://192.168.43.234:8000/api/users/signup/',  // Use your local IP address
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      setLoading(false);
      setMessage('Signup successful! You can now login.');
  
      // Redirect to Login page after a short delay
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setError(err.response.data.error || 'Signup failed');
      } else {
        setError('Network error, please try again.');
      }
    }
  };  

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h1>Sign Up</h1>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

<button type="submit" disabled={loading} className="signup-button">
  Sign Up
  {loading && <FaSpinner className="spinner-icon slide-fade-in" />}
</button>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <div className="links-container">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="login-link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
