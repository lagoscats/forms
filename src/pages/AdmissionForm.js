import React, { useState } from 'react';
import axios from 'axios';
import './AdmissionForm.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    date_of_birth: '',
    course_applied: '',
    profile_picture: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001'
      : 'https://chinedu2026.pythonanywhere.com';

  const token = localStorage.getItem('access');

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
    setLoading(true);

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

      toast.success('🎉 Application submitted successfully!');
      setTimeout(() => navigate('/dashboard'), 2500); // ⏱️ redirect after 2.5 seconds
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('❌ Submission failed. Please log in and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admission-form-container">
      <ToastContainer />
      <h2 className="form-heading">Apply for Admission</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="animated-form">
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

        <button type="submit" disabled={loading}>
          {loading ? <span className="spinner" /> : 'Submit Application'}
        </button>
      </form>
    </div>
  );
};

export default AdmissionForm;
