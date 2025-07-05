import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    try {
      await axios.post(`${API_URL}/contact/`, formData);  // ✅ correct
      console.log('Submitting:', formData);
      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-hide messages after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess('');
      setError('');
    }, 3000);

    return () => clearTimeout(timer);
  }, [success, error]);

  return (
    <motion.div
      className="contact-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="contact-text"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Get in Touch</h1>
        <p>
          We’d love to hear from you! Fill out the form and we’ll get back to you as soon as possible.
        </p>
        <a href="/about" className="cta-button">Learn More About Us</a>
      </motion.div>

      <motion.div
        className="contact-form"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h2>Send a Message</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
          <textarea
            name="message"
            rows="5"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={loading}
          ></textarea>

          <button type="submit" disabled={loading}>
            {loading ? <span className="spinner"></span> : 'Send Message'}
          </button>

          {success && <p className="success-text">{success}</p>}
          {error && <p className="error-text">{error}</p>}
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
