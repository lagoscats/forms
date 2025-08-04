import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdmissionForm.css';

const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001'
    : 'https://fidelis1981.pythonanywhere.com';

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    image: null,
  });

  const [previewURL, setPreviewURL] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    // 🔐 Check if user is authenticated
    axios
      .get(`${API_BASE_URL}/api/user/`, { withCredentials: true })
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData((prev) => ({ ...prev, image: file }));
      setPreviewURL(URL.createObjectURL(file));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    payload.append('full_name', formData.full_name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('address', formData.address);
    payload.append('dob', formData.dob);
    payload.append('image', formData.image);

    try {
      setLoading(true);
      setError('');
      const res = await axios.post(`${API_BASE_URL}/api/admissions/apply/`, payload, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(res.data?.message || 'Application submitted!');
      setSuccess('🎉 Application submitted successfully!');
      setSubmitted(true);
    } catch (err) {
      console.error('Submission Error:', err.response?.data || err.message);
      setError(
        err.response?.data?.detail ||
          'Submission failed. Please fill all required fields and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (previewURL) {
        URL.revokeObjectURL(previewURL);
      }
    };
  }, [previewURL]);

  if (isAuthenticated === false) {
    return (
      <div className="admission-form-container">
        <h2 className="form-error">
          🚫 You must be <a href="/login">logged in</a> to access the admission page.
        </h2>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="admission-form-container">
        <h2 className="success-message">{success}</h2>
      </div>
    );
  }

  if (isAuthenticated === null) {
    return (
      <div className="admission-form-container">
        <p>Loading admission form...</p>
      </div>
    );
  }

  return (
    <div className="admission-form-container">
      <h2 className="form-title">Admission Application</h2>

      <form onSubmit={handleSubmit} className="admission-form">
        <label>
          Full Name:
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
        </label>

        <label>
          Email Address:
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>

        <label>
          Phone Number:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </label>

        <label>
          Address:
          <textarea name="address" value={formData.address} onChange={handleChange} required />
        </label>

        <label>
          Date of Birth:
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
        </label>

        <label>
          Upload Passport Photograph:
          <input type="file" name="image" accept="image/*" onChange={handleChange} required />
        </label>

        {previewURL && (
          <div className="file-preview">
            <img src={previewURL} alt="preview" className="doc-preview" />
          </div>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>

        {error && <div className="form-error">{error}</div>}
      </form>
    </div>
  );
};

export default AdmissionForm;
