import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Services.css";

const servicesData = [
  {
    title: "Web Development",
    description: "We build modern, mobile-first websites with smooth UX and clean code.",
    icon: "🌐",
  },
  {
    title: "SEO Optimization",
    description: "Boost your visibility and rank higher on search engines like Google.",
    icon: "🚀",
  },
  {
    title: "Digital Marketing",
    description: "Enhance your brand's reach and grow your audience with effective strategies.",
    icon: "📈",
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleDropdown = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="services-container">
      <motion.h1
        className="services-title"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Our Services
      </motion.h1>

      <div className="services-list">
        {servicesData.map((service, index) => (
          <motion.div
            key={index}
            className={`service-card ${activeIndex === index ? "active" : ""}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            onClick={() => toggleDropdown(index)}
          >
            <div className="service-header">
              <span className="service-icon">{service.icon}</span>
              <h2>{service.title}</h2>
              <span className="dropdown-arrow">{activeIndex === index ? "▲" : "▼"}</span>
            </div>

            <AnimatePresence>
              {activeIndex === index && (
                <motion.div
                  className="service-description"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{service.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
