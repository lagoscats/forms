import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="project-grid">
        <div className="project-card">
          <h3>Charity Website</h3>
          <p>React + Django + Paystack Integration</p>
        </div>
        <div className="project-card">
          <h3>School Admission Portal</h3>
          <p>React + Django Admin + File Upload</p>
        </div>
        <div className="project-card">
          <h3>Business Dashboard</h3>
          <p>Responsive React + Chart.js</p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
