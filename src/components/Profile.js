import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    phone: '',
    bio: '',
    profilePicture: '',
    coverPhoto: ''
  });
  const [preview, setPreview] = useState('');
  const [coverPreview, setCoverPreview] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (storedData) {
      setFormData(storedData);
      if (storedData.profilePicture) setPreview(storedData.profilePicture);
      if (storedData.coverPhoto) setCoverPreview(storedData.coverPhoto);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, profilePicture: reader.result }));
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, coverPhoto: reader.result }));
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(formData));
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <motion.div
      className="profile-container"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="profile-header">
        <div className="cover-photo-section">
          {coverPreview ? (
            <img src={coverPreview} alt="Cover" className="cover-photo" />
          ) : (
            <div className="cover-photo" />
          )}
          <label htmlFor="cover-photo-upload" className="cover-photo-upload-btn">
            Edit Cover Photo
          </label>
          <input
            type="file"
            accept="image/*"
            id="cover-photo-upload"
            onChange={handleCoverChange}
            style={{ display: 'none' }}
          />
        </div>
        {preview ? (
          <img src={preview} alt="Avatar" className="profile-preview" />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
        <h1>{formData.username}'s Profile</h1>
        <p>Manage your personal information</p>
      </div>

      {success && (
        <motion.div
          className="success-message"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          ✅ Profile updated successfully!
        </motion.div>
      )}

      <form onSubmit={handleSave}>
        <div className="profile-picture-section">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            id="avatar-upload"
            style={{ display: 'none' }}
          />
          <label htmlFor="avatar-upload">
            <button type="button" className="edit-avatar-btn">Edit Avatar</button>
          </label>
        </div>

        <label htmlFor="username">Username *</label>
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email *</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          value={formData.phone}
          onChange={handleChange}
        />

        <label htmlFor="bio">Bio</label>
        <textarea
          name="bio"
          id="bio"
          value={formData.bio}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit" className="save-btn">Save Changes</button>
      </form>
    </motion.div>
  );
};

export default Profile;
