// src/pages/Home.js
import React from 'react';
import { motion } from 'framer-motion';
import Hero from './Hero';
import About from '../components/About';
import Services from '../components/Services';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import VideoGallery from '../components/VideoGallery';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />

      <motion.section
        className="animated-video-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <VideoGallery preview />
      </motion.section>

      <Contact />
      <Footer />
    </>
  );
};

export default Home;
