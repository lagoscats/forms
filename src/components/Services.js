import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';
import { FaLaptopCode, FaHandsHelping, FaCogs, FaMoneyCheckAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      icon: <FaLaptopCode />,
      title: 'Website Design & Development',
      desc: 'Modern, fast, and responsive websites built with React & Django.',
    },
    {
      icon: <FaHandsHelping />,
      title: 'Charity & NGO Websites',
      desc: 'Professional sites for non-profits with donation support and CMS.',
    },
    {
      icon: <FaCogs />,
      title: 'Fullstack App Development',
      desc: 'React frontends + Django backends integrated with databases & APIs.',
    },
    {
      icon: <FaMoneyCheckAlt />,
      title: 'Payment Integration',
      desc: 'Secure Paystack or Stripe integration for donations or e-commerce.',
    },
  ];

  return (
    <>
      {/* Services Section */}
      <motion.section
        id="services"
        className="services-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.2 }}
      >
        <h2>Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              className="service-card"
              key={index}
              variants={cardVariants}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>

        <button className="cta-button" onClick={() => navigate('/contact')}>
          Hire Me
        </button>
      </motion.section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>What Clients Say</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p>"Working with Chinedu was a game-changer for our charity site. Fast, professional, and reliable!"</p>
            <strong>- NGO Director</strong>
          </div>
          <div className="testimonial-card">
            <p>"Our new dashboard is stunning. It runs smoothly and looks modern. Highly recommend!"</p>
            <strong>- Business Owner</strong>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <h2>Pricing Plans</h2>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>Starter</h3>
            <p className="price">₦70,000</p>
            <ul>
              <li>1 Page Site</li>
              <li>Basic Design</li>
              <li>Contact Form</li>
            </ul>
          </div>
          <div className="pricing-card">
            <h3>Professional</h3>
            <p className="price">₦150,000</p>
            <ul>
              <li>Up to 5 Pages</li>
              <li>Custom Design</li>
              <li>Admin Panel</li>
              <li>Payment Integration</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
