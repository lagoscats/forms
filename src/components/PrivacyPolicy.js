// src/pages/PrivacyPolicy.js
import React from 'react';
import './Policy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <h1>Privacy Policy</h1>
      <p>Effective Date: July 2025</p>

      <p>
        We value your privacy. This policy explains how we collect, use, and protect your personal information when you use our website or services.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Personal identification info (e.g. name, email)</li>
        <li>Contact details submitted through forms</li>
        <li>Usage data (e.g. browser type, device, IP)</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To respond to your inquiries</li>
        <li>To improve our services and user experience</li>
        <li>To send updates or promotional content (if subscribed)</li>
      </ul>

      <h2>Data Protection</h2>
      <p>We implement appropriate measures to protect your data against unauthorized access or disclosure.</p>

      <h2>Third-party Sharing</h2>
      <p>We do not sell or rent your data. We may share information with trusted service providers only to operate our platform.</p>

      <h2>Contact</h2>
      <p>If you have questions, contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
    </div>
  );
};

export default PrivacyPolicy;
