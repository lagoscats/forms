import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      {/* Animated Heading */}
      <motion.h1
        className="about-title"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        About Us
      </motion.h1>

      {/* Animated Description */}
      <motion.p
        className="about-description"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        We are a passionate team dedicated to providing top-notch services to our clients. 
        Our mission is to deliver excellence and innovation in everything we do.
      </motion.p>

      {/* Image Section */}
      <motion.div
        className="about-image-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <img
          src="https://source.unsplash.com/1200x800/?team,work"
          alt="Teamwork"
          className="about-image"
        />
      </motion.div>

      {/* Our Values Section */}
      <motion.section
        className="about-values"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <h2 className="section-title">Our Core Values</h2>
        <ul className="values-list">
          <li>Integrity - We maintain the highest ethical standards in everything we do.</li>
          <li>Innovation - We embrace creative solutions to meet our clients' needs.</li>
          <li>Collaboration - We believe in the power of working together to achieve greatness.</li>
        </ul>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        className="cta-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <h2 className="cta-title">Ready to take the next step?</h2>
        <p>Get in touch with us today and let's create something amazing together.</p>
        <a href="/contact" className="cta-button">Contact Us</a>
      </motion.div>

      <p className="back-to-home">
        Check Out My <a href="/">Home</a> Page.
      </p>
    </div>
  );
};

export default About;
