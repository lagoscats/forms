import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import './About.css';
import AboutImage from '../images/assets/waterfall.jpg';

const About = () => {
  return (
    <motion.section
      id="about"
      className="about-section"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="about-container">
        <div className="about-text">
          <h2 className="typewriter-title">
            <Typewriter
              words={['Hi, I’m Chinedu Okechukwu', 'Fullstack Developer', 'React & Django Expert']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </h2>

          <p>
            I’m a fullstack developer passionate about crafting modern, responsive, and secure web
            solutions for businesses, non-profits, and educational platforms.
          </p>
          <p>
            With a solid foundation in <strong>React</strong> and <strong>Django</strong>, I build
            user-first solutions that are fast, clean, and intuitive.
          </p>

          <div className="about-contact">
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:chinedufidelis321@gmail.com">chinedufidelis321@gmail.com</a>
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a
                href="https://enugucats-forms.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                enugucats-forms.netlify.app
              </a>
            </p>
          </div>
        </div>

        <div className="about-image">
          <img src={AboutImage} alt="Chinedu Okechukwu" />
        </div>
      </div>
    </motion.section>
  );
};

export default About;
