import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import WalletBanner from './WalletBanner';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/verify', label: 'Verify grant' },
  { path: '/dashboard', label: 'My proofs' },
  { path: '/about', label: 'Field guide' },
  { path: '/admin', label: 'Admin' },
];

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="world-header">
      <nav className="world-nav" aria-label="Primary navigation">
        <Link to="/" className="world-brand" onClick={() => setIsMobileMenuOpen(false)}>
          <img className="world-logo-image" src="/zk-scholar-mark.svg" alt="" aria-hidden="true" />
          <span className="world-brand-copy">
            <span className="world-brand-name"><strong>zk</strong>Scholar</span>
            <span className="world-brand-sub">Private proof protocol</span>
          </span>
        </Link>

        <div className="world-nav-links">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`world-nav-link ${isActive(link.path) ? 'is-active' : ''}`}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="world-nav-actions">
          <WalletBanner />
          <button
            type="button"
            className="world-menu-button"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="world-mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`world-mobile-link ${isActive(link.path) ? 'is-active' : ''}`}
                aria-current={isActive(link.path) ? 'page' : undefined}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                <ChevronRight size={15} aria-hidden="true" />
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
