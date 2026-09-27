import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WalletProvider } from './contexts/WalletContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import VerifyPage from './pages/VerifyPage';
import AdminPage from './pages/AdminPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <Router>
      <div className="world-shell selection:bg-[#d9f27c]/30 selection:text-[#f6f0e5]">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <NavBar />
        
        <main id="main-content" className="world-main">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/verify" element={<VerifyPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export function AppWithProviders() {
  return (
    <WalletProvider>
      <App />
    </WalletProvider>
  );
}
