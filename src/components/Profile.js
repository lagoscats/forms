// Profile.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(formData));
    alert('Profile updated!');
  };

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Profile</h1>
      <form onSubmit={handleSave}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </motion.div>
  );
};

export default Profile;
