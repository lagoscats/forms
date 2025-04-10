import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "./Contact.css";

const ads = [
  {
    id: 1,
    img: "./images/assets/003.jpg",
    alt: "Ad Banner 1",
    title: "Get 50% Off!",
    description: "On all web development services this month only.",
    link: "https://yourservice.com/offer",
  },
  {
    id: 2,
    img: "https://via.placeholder.com/300x250.png?text=Ad+Banner+2",
    alt: "Ad Banner 2",
    title: "Free Resources",
    description: "Download free React templates and tools.",
    link: "https://yourresource.com/freebies",
  },
  {
    id: 3,
    img: "https://via.placeholder.com/300x250.png?text=Ad+Banner+3",
    alt: "Ad Banner 3",
    title: "Join Our Webinar",
    description: "Learn how to scale your startup with Django + React.",
    link: "https://yourwebinar.com/signup",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  // Auto switch ad every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentAdIndex((prev) => (prev + 1) % ads.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    if (!name || !email || !message) return "All fields are required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

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
    <div className="contact-page-wrapper">
      <motion.h1
        className="contact-title"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Contact Us
      </motion.h1>

      <div className="contact-content">
        {/* Left: Form */}
        <motion.form
          className="contact-form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {successMessage && <p className="success-message">{successMessage}</p>}
          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </motion.form>

        {/* Right: Ad Carousel */}
        <div className="contact-carousel">
  <p className="sponsored-label">— Sponsored —</p>
  <div className="carousel-wrapper">
    <AnimatePresence mode="wait">
      <motion.div
        key={ads[currentAdIndex].id}
        className="carousel-ad"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={ads[currentAdIndex].img}
          alt={ads[currentAdIndex].alt}
          className="carousel-image"
        />
        <div className="ad-text">
          <h3>{ads[currentAdIndex].title}</h3>
          <p>{ads[currentAdIndex].description}</p>
          <a
            href={ads[currentAdIndex].link}
            target="_blank"
            rel="noopener noreferrer"
            className="ad-button"
          >
            Learn More
          </a>
        </div>
      </motion.div>
    </AnimatePresence>
  </div>
</div>

      </div>
    </div>
  );
};

export default Contact;
