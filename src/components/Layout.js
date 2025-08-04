// src/components/Layout.js
import React from 'react';
import Sidebar from '../components/SideBar';
import Footer from './Footer';
import Navbar from './Navbar';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Navbar />
      <Sidebar />
      <main className="main-content">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default Layout;
