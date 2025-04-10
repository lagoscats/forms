// src/components/About.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './About.css';

const teamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO & Founder',
    image: 'https://via.placeholder.com/150',
    description: 'John is the visionary behind our company, guiding us with his strategic thinking and leadership.'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Lead Developer',
    image: 'https://via.placeholder.com/150',
    description: 'Jane leads our development team, ensuring the highest quality in every project we tackle.'
  },
  {
    id: 3,
    name: 'Sara Lee',
    role: 'Marketing Manager',
    image: 'https://via.placeholder.com/150',
    description: 'Sara manages all of our marketing strategies, driving brand awareness and customer engagement.'
  }
];

const About = () => {
  return (
    <div className="about-container">
      <motion.div 
        className="about-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          We are a passionate team dedicated to helping businesses grow through innovative solutions.
          Our focus is on providing high-quality services that exceed client expectations.
        </p>
        {/* Wrap the button with Link */}
        <Link to="/" className="about-link">
          <motion.button 
            className="about-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </Link>
      </motion.div>

      {/* Team Members Section */}
      <motion.div 
        className="team-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h3 className="team-title">Meet Our Team</h3>
        <div className="team-members">
          {teamMembers.map(member => (
            <div className="team-member" key={member.id}>
              <img src={member.image} alt={member.name} className="team-member-img" />
              <h4 className="team-member-name">{member.name}</h4>
              <p className="team-member-role">{member.role}</p>
              <p className="team-member-description">{member.description}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default About;
