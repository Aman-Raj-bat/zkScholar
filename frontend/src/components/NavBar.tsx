import { useState } from "react";
import WalletBanner from "./WalletBanner";
import { Zap, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/verify", label: "Apply" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "Docs" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full pt-3 px-4 sm:px-6">
        <nav
          className="max-w-6xl mx-auto h-16 rounded-2xl flex items-center justify-between px-5 transition-all"
          style={{
            background: 'rgba(6, 8, 24, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(0, 245, 255, 0.12)',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,245,255,0.06)',
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all group-hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #00f5ff 0%, #3b82f6 100%)',
                boxShadow: '0 0 16px rgba(0,245,255,0.45)',
              }}
            >
              <Zap size={18} className="text-black" />
            </div>
            <span
              className="text-lg font-extrabold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              zkScholar
            </span>

            {/* Network Pill */}
            <div className="hidden sm:flex items-center gap-1.5 pill pill-cyan ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              <span>Preprod</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="hidden md:flex items-center gap-1 p-1 rounded-xl"
              style={{ background: 'rgba(13,18,36,0.7)', border: '1px solid rgba(0,245,255,0.08)' }}
            >
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={
                    isActive(to)
                      ? {
                          background: 'rgba(0,245,255,0.10)',
                          color: '#00f5ff',
                          boxShadow: 'inset 0 0 12px rgba(0,245,255,0.08)',
                        }
                      : { color: '#8b9dc3' }
                  }
                  onMouseEnter={e => {
                    if (!isActive(to)) (e.target as HTMLElement).style.color = '#e2e8f8';
                  }}
                  onMouseLeave={e => {
                    if (!isActive(to)) (e.target as HTMLElement).style.color = '#8b9dc3';
                  }}
                >
                  {label}
                </Link>
              ))}
            </div>

            <WalletBanner />

            {/* Mobile Toggle */}
            <button
              aria-label="Toggle mobile menu"
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl transition-all"
              style={{ background: 'rgba(13,18,36,0.7)', border: '1px solid rgba(0,245,255,0.10)', color: '#8b9dc3' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-24 z-40 rounded-2xl md:hidden overflow-hidden p-4"
            style={{
              background: 'rgba(6, 8, 24, 0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,245,255,0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            <div className="flex flex-col space-y-1">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-bold px-4 py-3 rounded-xl transition-all"
                  style={{ color: isActive(to) ? '#00f5ff' : '#8b9dc3' }}
                >
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
