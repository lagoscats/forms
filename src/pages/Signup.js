import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaHome } from 'react-icons/fa'; 
import './Signup.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);  // For loading state
  const navigate = useNavigate();

  // Validate form fields
  const validateForm = () => {
    if (!firstName || !lastName || !email || !username || !password || !dob || !gradeLevel || !parentName || !parentPhone) {
      setErrorMessage("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous error and success messages
    setErrorMessage('');
    setSuccessMessage('');

    // Validate the form
    if (!validateForm()) {
      return;
    }

    setLoading(true);  // Set loading to true when submitting the form

    try {
      // Sending form data to backend API
      await axios.post('http://localhost:8000/api/signup/', { 
        firstName, 
        lastName, 
        email, 
        username, 
        password, 
        dob, 
        gradeLevel, 
        parentName, 
        parentPhone 
      });

      setSuccessMessage('Signup successful!');
      navigate('/login');  // Redirect to login after successful signup
    } catch (error) {
      // Check if error.response exists and display it
      setErrorMessage(error.response?.data?.detail || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);  // Reset loading state after API call is completed
    }
  };

  return (
    <div className="signup-container">
      <h2>Admission Form</h2>
      
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="First Name" 
          value={firstName} 
          onChange={(e) => setFirstName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Last Name" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <input 
          type="date" 
          placeholder="Date of Birth" 
          value={dob} 
          onChange={(e) => setDob(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Grade Level" 
          value={gradeLevel} 
          onChange={(e) => setGradeLevel(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Parent's Name" 
          value={parentName} 
          onChange={(e) => setParentName(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Parent's Phone" 
          value={parentPhone} 
          onChange={(e) => setParentPhone(e.target.value)} 
        />
        
        <button type="submit" disabled={loading}>
          {loading ? (
            <div className="spinner"></div> // Displaying spinner while loading
          ) : (
            'Sign Up'
          )}
        </button>
      </form>

      <div className="signup-footer">
        <p>Already have an account? 
          <Link to="/login" className="login-link">Login</Link>
        </p>
        <p><Link to="/" className="link"><FaHome className="home-icon" />Home</Link></p>
      </div>
    </div>
  );
};

export default Signup;
