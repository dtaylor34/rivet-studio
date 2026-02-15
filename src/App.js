import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import AIExamplesPage from './pages/AIExamplesPage';
import ClientExamplesPage from './pages/ClientExamplesPage';
import AboutUsPage from './pages/AboutUsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ai-examples" element={<AIExamplesPage />} />
          <Route path="/client-examples" element={<ClientExamplesPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
