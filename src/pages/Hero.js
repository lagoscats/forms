import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserPlus, FaSignInAlt } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';
import './Hero.css';

const Hero = () => {
  return (
    <motion.section
      className="hero"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="hero-content">
        <motion.h2
          className="hero-title"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Typewriter
            words={[
              'Fullstack Developer',
              'React + Django Expert',
              'I Build Modern Web Apps',
              'NGO & Business Solutions'
            ]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={40}
            delaySpeed={2000}
          />
        </motion.h2>

        <motion.p
          className="hero-subtext"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          I build modern web applications using React and Django.
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Link to="/signup" className="btn btn-primary">
            <FaUserPlus className="btn-icon" />
            Sign Up
          </Link>
          <Link to="/login" className="btn btn-outline">
            <FaSignInAlt className="btn-icon" />
            Login
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
