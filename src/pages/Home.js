import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Profile from '../images/assets/waterfall.jpg';

import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const adMessages = [
    {
      text: "💡 Boost your business with our Pro Tools —",
      link: "/services",
      linkText: "Check it out"
    },
    {
      text: "🎯 Want more leads? Use our smart marketing toolkit —",
      link: "/contact",
      linkText: "Let’s talk"
    },
    {
      text: "🔥 30% off for new users —",
      link: "/signup",
      linkText: "Sign up now"
    }
  ];

  const [currentAd, setCurrentAd] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAd((prev) => (prev + 1) % adMessages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [adMessages.length]);

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Section */}
      <section className="hero-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentAd}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="ad-snippet"
          >
            <p className="ad-message">
              {adMessages[currentAd].text}{' '}
              <Link to={adMessages[currentAd].link} className="ad-link">
                {adMessages[currentAd].linkText}
              </Link>
            </p>
          </motion.div>
        </AnimatePresence>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="hero-title"
        >
          Empower Your Vision. Grow with Confidence.
        </motion.h1>

        <motion.p
          className="hero-subtext"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          We equip modern creators and businesses with the tools to thrive. Join us today and experience the difference.
        </motion.p>

        <div className="hero-buttons">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/signup" className="btn btn-primary">
              Sign Up Free
            </Link>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/login" className="btn btn-outline">
              Log In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Split CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-text"
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Ready to Build Your Brand?</h2>
          <p>
            Join thousands of creators and entrepreneurs who trust us to bring their ideas to life.
          </p>
          <Link to="/contact" className="btn btn-accent">
            Get In Touch
          </Link>
        </motion.div>

        <motion.div
          className="cta-image"
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src={Profile} alt="Inspiration landscape" />
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Home;
