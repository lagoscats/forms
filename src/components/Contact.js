import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Validation
  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      return "All fields are required.";
    }
    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    // Validate form before submitting
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/contact/", formData);
      setSuccessMessage(response.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setErrorMessage("Failed to send message. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="contact-container">
      <motion.h1
        className="contact-title"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Contact Us
      </motion.h1>

      {successMessage && <motion.p className="success-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{successMessage}</motion.p>}
      {errorMessage && <motion.p className="error-message" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{errorMessage}</motion.p>}

      <motion.form
        className="contact-form"
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-label="Your Name"
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-label="Your Email"
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
          aria-label="Your Message"
          whileFocus={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;
