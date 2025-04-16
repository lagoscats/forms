// Settings.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('settingsData', JSON.stringify(formData));
    alert('Settings saved!');
  };

  return (
    <motion.div
      className="settings-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Settings</h1>
      <form onSubmit={handleSave}>
        <label>
          <input
            type="checkbox"
            name="notifications"
            checked={formData.notifications}
            onChange={handleChange}
          />
          Enable Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="darkMode"
            checked={formData.darkMode}
            onChange={handleChange}
          />
          Enable Dark Mode
        </label>
        <button type="submit">Save Settings</button>
      </form>
    </motion.div>
  );
};

export default Settings;
