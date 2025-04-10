import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Profile from '../images/assets/mystic-landscape.jpg';
import Footer from '../components/Footer';
import './Home.css';

import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Hero Section */}
      <motion.section
        className="hero-section"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h1>Welcome to Our Website!</h1>

        <div className="button-container">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/signup">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login">
              <button className="login-btn">Log In</button>
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* 🔥 Ads Banner Section */}
      <motion.section
        className="ads-banner"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="ads-content">
          <h2>🚀 Special Offer: Launch Your Brand with 30% Off!</h2>
          <p>Join thousands of entrepreneurs growing their online presence with our tools and support. Limited time only!</p>
          <Link to="/services">
            <button className="ads-btn">Explore Services</button>
          </Link>
        </div>
      </motion.section>

      {/* Side-by-Side CTA Section */}
      <motion.section
        className="side-by-side-section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="side-text">
          <h2>Ready to Build Your Brand?</h2>
          <p>Our tools and team help you launch fast. Join today and grow with us.</p>
          <Link to="/contact">
            <button className="cta-btn">Contact Us</button>
          </Link>
        </div>

        <div className="side-image">
          <img src={Profile} alt="CTA Visual" />
        </div>
      </motion.section>

      {/* Other Sections */}
      <motion.section
        className="section about-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <About />
      </motion.section>

      <motion.section
        className="section services-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Services />
      </motion.section>

      <motion.section
        className="section contact-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Contact />
      </motion.section>

      <motion.section
        className="section contact-section"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Footer />
      </motion.section>
    </motion.div>
  );
};

export default Home;
