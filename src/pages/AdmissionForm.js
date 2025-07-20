import React, { useState } from 'react';
import axios from 'axios';
import './AdmissionForm.css';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    course_applied: '',
    profile_picture: null,
  });

  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);

  const API_BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001'
      : 'https://chinedu2026.pythonanywhere.com';

  // 🔐 Get token from localStorage or use cookies if that's your setup
  const token = localStorage.getItem('access'); // or get from cookie if using HttpOnly cookies

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedValue = files ? files[0] : value;

    setFormData((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    if (name === 'profile_picture' && files && files[0]) {
      setPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    try {
      await axios.post(`${API_BASE_URL}/api/admissions/apply/`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: token ? `Bearer ${token}` : undefined,
        },
      });
      setMessage('✅ Application submitted successfully!');
    } catch (error) {
      console.error('❌ Error submitting form:', error);
      setMessage('❌ Submission failed. Please ensure you are logged in or try again later.');
    }
  };

  return (
    <div className="admission-form-container">
      <h2>Apply for Admission</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="full_name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} required />
        <input type="date" name="date_of_birth" onChange={handleChange} required />
        <input type="text" name="course_applied" placeholder="Course Applied" onChange={handleChange} required />
        <input type="file" name="profile_picture" onChange={handleChange} accept="image/*" />
        
        {preview && (
          <div className="image-preview">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <button type="submit">Submit Application</button>
      </form>

      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default AdmissionForm;
