import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import "./About.css";

const About = () => {
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({
    submitting: false,
    success: "",
    error: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true, success: "", error: "" });

    try {
      const res = await axios.post(`${API_URL}/contact/`, formData, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.status === 201) {
        setStatus({
          submitting: false,
          success: "✅ Message sent successfully!",
          error: ""
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (err) {
      let errorMsg = "❌ Failed to send message. Please try again.";
      if (err.response?.data) {
        const data = err.response.data;
        if (data.name) errorMsg = `Name: ${data.name[0]}`;
        else if (data.email) errorMsg = `Email: ${data.email[0]}`;
        else if (data.message) errorMsg = `Message: ${data.message[0]}`;
      }

      setStatus({ submitting: false, success: "", error: errorMsg });
    }
  };

  // Auto-hide status messages
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus(prev => ({ ...prev, success: "", error: "" }));
    }, 4000);
    return () => clearTimeout(timer);
  }, [status.success, status.error]);

  return (
    <div className="about-background">
      <div className="about-container">
        <div className="about-text">
          <h1>About Us</h1>
          <p>We are a leading company dedicated to providing the best services for our clients.</p>
          <a href="/register" className="cta-button">Join Us</a>
        </div>

        <div className="about-form">
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-icon">
              <FaUser />
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                disabled={status.submitting}
              />
            </div>
            <div className="input-icon">
              <FaEnvelope />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                disabled={status.submitting}
              />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows="4"
              disabled={status.submitting}
            ></textarea>

            <button type="submit" disabled={status.submitting}>
              <FaPaperPlane />
              {status.submitting ? "Sending..." : "Send Message"}
            </button>

            {status.success && <p className="success-text">{status.success}</p>}
            {status.error && <p className="error-text">{status.error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default About;
