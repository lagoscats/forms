import React from 'react';
import Hero from '../pages/Hero';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <>
      <Hero />
      <section style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Why Choose Us?</h2>
        <p>We build fast, scalable, and secure web apps using React and Django.</p>
        <button className="cta-btn">Get Started</button>
      </section>
      <Contact />
      <Footer />
    </>
  );
};

export default LandingPage;
