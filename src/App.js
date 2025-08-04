// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import About from './components/About';
import Contact from './components/Contact';
import Services from './components/Services';
import Footer from './components/Footer';
import VideoGallery from './components/VideoGallery';
import Profile from './components/Profile';
import Missing from './components/Missing';
import Settings from './components/Settings';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsConditions from './components/TermsConditions';
import AdmissionForm from './pages/AdmissionForm';
import Hero from './pages/Hero';
import Portfolio from './components/Portfolio';
import VideoUpload from './components/VideoUpload';
import Dashboard from './components/Dashboard';
import Layout from './components/Layout';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Routes>

        {/* ✅ Public Pages */}
        <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/hero" element={<><Navbar /><Hero /><Footer /></>} />
        <Route path="/signup" element={<><Navbar /><Signup /><Footer /></>} />
        <Route path="/login" element={<><Navbar /><Login /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
        <Route path="/portfolio" element={<><Navbar /><Portfolio /><Footer /></>} />
        <Route path="/videos" element={<><Navbar /><VideoGallery /><Footer /></>} />
        <Route path="/landing" element={<><Navbar /><LandingPage /><Footer /></>} />
        <Route path="/privacy" element={<><Navbar /><PrivacyPolicy /><Footer /></>} />
        <Route path="/terms" element={<><Navbar /><TermsConditions /><Footer /></>} />
        <Route path="/upload-video" element={<><Navbar /><VideoUpload /><Footer /></>} />
        <Route path="/admission" element={<><Navbar /><AdmissionForm /><Footer /></>} />

        {/* ✅ Protected Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Layout>
                <Profile />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <PrivateRoute>
              <Layout>
                <Settings />
              </Layout>
            </PrivateRoute>
          }
        />
        <Route
          path="/admission-form"
          element={
            <PrivateRoute>
              <Layout>
                <AdmissionForm />
              </Layout>
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<Missing />} />
      </Routes>
    </Router>
  );
};

export default App;
