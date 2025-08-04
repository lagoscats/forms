// src/components/Notices.js
import React from 'react';
import { motion } from 'framer-motion';
import './Notices.css';

const Notices = ({ notices }) => {
  return (
    <motion.div
      className="dashboard-card notice-card"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
    >
      <h3>📢 Latest School Notices</h3>
      {notices && notices.length > 0 ? (
        <ul className="notice-list">
          {notices.map((notice, index) => (
            <motion.li
              key={index}
              className="notice-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="notice-icon">🗒️</span>
              <div className="notice-content">
                <h4>{notice.title}</h4>
                {notice.date && <p className="notice-date">{notice.date}</p>}
              </div>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p>No current announcements.</p>
      )}
    </motion.div>
  );
};

export default Notices;
