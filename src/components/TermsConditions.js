// src/pages/TermsConditions.js
import React from 'react';
import './Policy.css';

const TermsConditions = () => {
  return (
    <div className="policy-container">
      <h1>Terms and Conditions</h1>
      <p>Effective Date: July 2025</p>

      <h2>Acceptance of Terms</h2>
      <p>By accessing or using this website, you agree to be bound by these terms and conditions.</p>

      <h2>Use of the Site</h2>
      <ul>
        <li>You agree to use this site only for lawful purposes.</li>
        <li>You must not attempt to harm, hack, or overload the site.</li>
      </ul>

      <h2>Account Responsibilities</h2>
      <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>

      <h2>Termination</h2>
      <p>We reserve the right to terminate or suspend access if these terms are violated.</p>

      <h2>Changes</h2>
      <p>We may update these terms periodically. Continued use constitutes acceptance of any changes.</p>

      <h2>Contact</h2>
      <p>If you have questions, contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>
    </div>
  );
};

export default TermsConditions;
