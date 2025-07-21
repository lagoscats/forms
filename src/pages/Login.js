import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaSpinner, FaEye, FaEyeSlash } from 'react-icons/fa';
import Profile from '../images/assets/003.jpg';
import { jwtDecode } from 'jwt-decode';  // <-- named import
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001'
    : 'https://Fidelis1981.pythonanywhere.com';

  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [typedText, setTypedText] = useState('');
  const fullText = 'Loogin to your account';

  useEffect(() => {
  let index = 0;
  const interval = setInterval(() => {
    setTypedText((prev) => prev + fullText.charAt(index));
    index++;
    if (index >= fullText.length) clearInterval(interval);
  }, 80);

  return () => clearInterval(interval); // Cleanup on unmount
}, [fullText]);

  const togglePasswordVisibility = () => setShowPassword(prev => !prev);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/api/token/`, {
       username: formData.username,
        password: formData.password,
      }, {
        headers: { 'Content-Type': 'application/json' }
      });


      const { access, refresh } = response.data;
      

      localStorage.setItem('access', access);   // ← Fix key name
      localStorage.setItem('refresh', refresh);
      
      const decoded = jwtDecode(access);
      console.log('Decoded token:', decoded);

      localStorage.setItem('username', decoded.username || formData.username);

      setMessage('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      setError(error.response?.data?.error || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="login-wrapper">
    <form onSubmit={handleSubmit} className="login-form animated-card">
      <div className="logo-area">
        <img src={Profile} alt="EnuguCats Logo" className="logo" title="Welcome to EnuguCats" />
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
          tabIndex={-1}
          aria-label="Toggle password visibility"
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

