import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  const API_URL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8001'
      : 'https://fidelis1981.pythonanywhere.com';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/contact/submit/`, formData, {
        withCredentials: true,
      });

      setSuccess('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Submission Error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess('');
      setError('');
    }, 3000);
    return () => clearTimeout(timer);
  }, [success, error]);

  return (
    <motion.section
      id="contact"
      className="contact-section"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="contact-container">
        {/* Contact Info */}
        <motion.div
          className="contact-info"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2>Contact Me</h2>
          <p>Email: <a href="mailto:chinedufidelis321@gmail.com">chinedufidelis321@gmail.com</a></p>
          <p>WhatsApp: <a href="https://wa.me/2347053065463" target="_blank" rel="noreferrer">+234 801 234 5678</a></p>
          <p>Location: Nigeria</p>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          className="contact-form"
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Send a Message</h3>
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
              placeholder="Your Message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              disabled={loading}
            ></textarea>

            <button type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>

            {success && <p className="success-text">{success}</p>}
            {error && <p className="error-text">{error}</p>}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
