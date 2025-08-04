// src/components/VideoGallery.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './VideoGallery.css';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001'
    : 'https://fidelis1981.pythonanywhere.com';

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/videos/`)
      .then((res) => {
        setVideos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching videos:', err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading videos...</div>;

  if (error || videos.length === 0) {
    return (
      <div className="no-videos">
        <h2>No Videos Found</h2>
        <p>Please upload videos from the Django Admin.</p>
      </div>
    );
  }

  return (
    <div className="video-gallery">
      <h2 className="gallery-title">Video Gallery</h2>
      <div className="video-grid">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <video controls width="100%">
              <source src={`${BASE_URL}${video.video_file}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <h4>{video.title}</h4>
            <p>{video.description}</p>
          </div>
        ))}
      </div>

      {/* Video preview CTA button */}
      <motion.div
        className="video-preview-cta"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <a href="/videos" className="btn">View All Videos</a>
      </motion.div>
    </div>
  );
};

export default VideoGallery;
