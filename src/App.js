// src/App.js
import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'; // ✅ Use HashRouter
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Images from './images/assets/profile.jpg';
import Profile from './components/Profile';
import Missing from './components/Missing';
import Settings from './components/Settings';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/images" element={<Images />} />
          <Route path="*" element={<Missing />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
    }
  />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
