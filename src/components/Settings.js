import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Settings.css';

const Settings = () => {
  const [formData, setFormData] = useState({
    notifications: true,
    darkMode: false,
    language: 'English',
    privacy: 'Public',
    emailNotifications: 'Instant',
    twoFactorAuth: false,
    profileVisibility: 'Everyone',
    themeColor: 'blue'
  });

  // Load saved settings from localStorage if available
  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('settingsData'));
    if (savedSettings) {
      setFormData(savedSettings);
      if (savedSettings.darkMode) {
        document.body.classList.add('dark-mode');
      }
    }
  }, []);

  // Handle changes in form fields
  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Save settings to localStorage and apply dark mode
  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('settingsData', JSON.stringify(formData));

    // Apply Dark Mode dynamically
    if (formData.darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

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
        {/* Account Section */}
        <div className="settings-section">
          <h2>Account Settings</h2>
          <label className="settings-option">
            <input
              type="checkbox"
              name="notifications"
              checked={formData.notifications}
              onChange={handleChange}
            />
            Enable Notifications
          </label>
          <label className="settings-option">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={formData.twoFactorAuth}
              onChange={handleChange}
            />
            Enable Two-Factor Authentication
            <span className="tooltip">Secure your account with an extra layer of protection</span>
          </label>
        </div>

        {/* Privacy Section */}
        <div className="settings-section">
          <h2>Privacy & Security</h2>
          <label className="settings-option">
            Profile Visibility
            <select
              name="profileVisibility"
              value={formData.profileVisibility}
              onChange={handleChange}
            >
              <option value="Everyone">Everyone</option>
              <option value="Friends">Friends Only</option>
              <option value="Private">Private</option>
            </select>
            <span className="tooltip">Who can see your profile?</span>
          </label>
        </div>

        {/* Appearance Section */}
        <div className="settings-section">
          <h2>Appearance</h2>
          <label className="settings-option">
            Theme Color
            <select
              name="themeColor"
              value={formData.themeColor}
              onChange={handleChange}
            >
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="red">Red</option>
              <option value="purple">Purple</option>
            </select>
            <span className="tooltip">Choose a primary color for the interface</span>
          </label>

          <label className="settings-option">
            <input
              type="checkbox"
              name="darkMode"
              checked={formData.darkMode}
              onChange={handleChange}
            />
            Enable Dark Mode
            <span className="tooltip">Switch to a darker theme</span>
          </label>
        </div>

        {/* Notification Section */}
        <div className="settings-section">
          <h2>Notifications</h2>
          <label className="settings-option">
            Email Notifications
            <select
              name="emailNotifications"
              value={formData.emailNotifications}
              onChange={handleChange}
            >
              <option value="Instant">Instant</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
            </select>
            <span className="tooltip">How often do you want to receive email notifications?</span>
          </label>
        </div>

        <button type="submit" className="save-btn">Save Settings</button>
      </form>
    </motion.div>
  );
};

export default Settings;
