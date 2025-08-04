// src/components/VideoUpload.js
import React, { useState } from 'react';
import axios from 'axios';
import './VideoUpload.css';

const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8001'
    : 'https://fidelis1981.pythonanywhere.com';

const VideoUpload = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!videoFile) {
      setMessage('Please select a video file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('video_file', videoFile);

    try {
      const response = await axios.post(`${BASE_URL}/api/videos/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // For cookie-based JWT auth
      });
      console.log('Uploaded:', response.data.title); // Use the response

      setMessage('✅ Video uploaded successfully!');
      setTitle('');
      setDescription('');
      setVideoFile(null);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('❌ Error uploading video.');
    }
  };

  return (
    <div className="video-upload-container">
      <h2>Upload New Video</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="text"
          placeholder="Video Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Video Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="file"
          accept="video/mp4,video/x-m4v,video/*"
          onChange={(e) => setVideoFile(e.target.files[0])}
          required
        />

        <button type="submit">Upload</button>
        {message && <p className="upload-message">{message}</p>}
      </form>
    </div>
  );
};

export default VideoUpload;
