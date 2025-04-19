import React from 'react';
import './About.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const About = () => {
  return (
    <motion.section
      className="about-container"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="about-content">
        <h2>About Us</h2>
        <p className="about-intro">
          We are passionate about building tools that empower individuals and businesses. Since our launch, we've helped hundreds of creators turn ideas into reality.
        </p>

        <div className="about-block">
          <h3>🎯 Our Mission</h3>
          <p>
            To simplify digital innovation by offering intuitive, reliable, and scalable solutions for creators and brands of all sizes.
          </p>
        </div>

        <div className="about-block">
          <h3>🌍 Our Vision</h3>
          <p>
            To be a global platform where ideas thrive, and innovation is accessible to everyone.
          </p>
        </div>

        <div className="about-block team-section">
          <h3>👥 Meet the Team</h3>
          <div className="team-grid">
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Doe" />
              <p>John Doe</p>
              <span>Founder & CEO</span>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jane Smith" />
              <p>Jane Smith</p>
              <span>Head of Design</span>
            </div>
            <div className="team-member">
              <img src="https://randomuser.me/api/portraits/men/76.jpg" alt="Mike Johnson" />
              <p>Mike Johnson</p>
              <span>Lead Engineer</span>
            </div>
          </div>
        </div>

        <div className="about-block values">
          <h3>💎 Our Core Values</h3>
          <ul>
            <li>Innovation through simplicity</li>
            <li>User-first design</li>
            <li>Transparency & integrity</li>
            <li>Community-driven growth</li>
          </ul>
        </div>

        <div className="about-cta">
          <h4>Ready to join our journey?</h4>
          <Link to="/contact" className="about-btn">Let’s Connect</Link>
        </div>

      </div>
    </motion.section>
  );
};

export default About;
