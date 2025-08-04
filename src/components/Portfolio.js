import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Portfolio.css';

const projects = [
  {
    id: 1,
    title: 'React Dashboard',
    description: 'Modern admin UI',
    image: 'https://cdn.example.com/images/react.jpg',
    link: 'https://github.com/yourusername/react-dashboard',
    tech: ['React', 'Framer Motion', 'CSS'],
  },
  {
    id: 2,
    title: 'Django API',
    description: 'Secure token-based API',
    image: 'https://cdn.example.com/images/django.jpg',
    link: 'https://github.com/yourusername/django-api',
    tech: ['Django', 'DRF', 'JWT'],
  },
  {
    id: 3,
    title: 'Fullstack App',
    description: 'React frontend + Django backend',
    image: 'https://cdn.example.com/images/fullstack.jpg',
    link: 'https://github.com/yourusername/fullstack-app',
    tech: ['React', 'Django', 'PostgreSQL'],
  },
];

const Portfolio = () => {
  const [selected, setSelected] = useState(null);

  const handlePreview = (project) => setSelected(project);
  const closeModal = () => setSelected(null);

  return (
    <div className="portfolio-container">
      <motion.h1
        className="portfolio-title"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Projects
      </motion.h1>

      <div className="portfolio-grid">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="portfolio-card"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handlePreview(project)}
          >
            <img src={project.image} alt={project.title} className="portfolio-img" />
            <div className="portfolio-info">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="portfolio-tags">
                {project.tech.map((tag, idx) => (
                  <span key={idx} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal preview */}
      {selected && (
        <div className="portfolio-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeModal}>×</button>
            <h2>{selected.title}</h2>
            <img src={selected.image} alt={selected.title} className="modal-img" />
            <p>{selected.description}</p>
            <div className="portfolio-tags">
              {selected.tech.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
            <a href={selected.link} target="_blank" rel="noopener noreferrer" className="btn preview-btn">
              View on GitHub 🔗
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
