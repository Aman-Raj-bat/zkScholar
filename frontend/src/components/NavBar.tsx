import { useState, useEffect } from "react";
import WalletBanner from "./WalletBanner";
import { Menu, X, Moon, Sun, Sparkles, Shield, ChevronRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ZkScholarLogo from "./ui/ZkScholarLogo";
import GlowBadge from "./ui/GlowBadge";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark') || true;
    }
    return true;
  });

  useEffect(() => {
    // Default to dark mode for cyber-lunar aesthetic
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/verify', label: 'Verify Grant' },
    { path: '/dashboard', label: 'Analytics' },
    { path: '/about', label: 'Architecture' },
    { path: '/admin', label: 'Admin' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full pt-4 px-4 sm:px-6">
        <nav className="max-w-6xl mx-auto h-16 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex items-center justify-between px-4 sm:px-6 transition-all">
          
          {/* Logo & Network Status Badge */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link to="/" className="flex items-center group shrink-0">
              <ZkScholarLogo size="sm" showText={true} animated={true} />
            </Link>

            <div className="hidden lg:flex items-center">
              <GlowBadge variant="cyan" pulse={true} className="py-0.5 text-[11px]">
                Preprod
              </GlowBadge>
            </div>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800/80 text-xs font-mono">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-1.5 rounded-lg transition-all ${
                    active
                      ? "text-cyan-300 font-bold shadow-sm"
                      : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-cyan-500/15 border border-cyan-500/30 rounded-lg -z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Action: Wallet Connect & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <WalletBanner />
            
            {/* Mobile Menu Hamburger */}
            <button 
              aria-label="Toggle mobile menu"
              className="md:hidden flex items-center justify-center w-10 h-10 text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 rounded-xl transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-24 z-40 bg-slate-950/95 backdrop-blur-2xl border border-slate-800 rounded-2xl shadow-2xl md:hidden overflow-hidden p-5"
          >
            <div className="flex flex-col space-y-2">
              <div className="pb-3 mb-2 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Navigation</span>
                <GlowBadge variant="cyan" pulse={true} className="py-0.5 text-[10px]">
                  Midnight Preprod
                </GlowBadge>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl font-mono text-sm transition-all ${
                    isActive(link.path)
                      ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-bold"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight size={16} className="text-slate-500" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
