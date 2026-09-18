import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Code, Globe, Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { PREPROD_CONTRACT_ADDRESS } from '../config';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(PREPROD_CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      className="mt-24 py-16 relative overflow-hidden"
      style={{
        borderTop: '1px solid rgba(0,245,255,0.10)',
        background: 'rgba(4,5,14,0.95)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Glow accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #00f5ff, #3b82f6)', boxShadow: '0 0 12px rgba(0,245,255,0.35)' }}
            >
              <Zap size={16} style={{ color: '#02030a' }} />
            </div>
            <span
              className="font-extrabold text-xl tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              zkScholar
            </span>
          </Link>
          <p className="text-sm leading-relaxed" style={{ color: '#4a5880' }}>
            Privacy-preserving tech grant verification built on Midnight Network using Compact Zero-Knowledge circuits.
          </p>
          <div className="flex gap-3 mt-1">
            <a
              href="https://github.com/DeepSaha25/ScholarShield"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'rgba(13,18,36,0.8)', border: '1px solid rgba(0,245,255,0.12)', color: '#4a5880' }}
              title="GitHub Repository"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#00f5ff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.35)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4a5880'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.12)'; }}
            >
              <Code size={16} />
            </a>
            <a
              href="https://scholar-shield-ten.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'rgba(13,18,36,0.8)', border: '1px solid rgba(0,245,255,0.12)', color: '#4a5880' }}
              title="Live Deployment"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#00f5ff'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.35)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4a5880'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.12)'; }}
            >
              <Globe size={16} />
            </a>
            <a
              href="https://x.com/georgian_deep"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: 'rgba(13,18,36,0.8)', border: '1px solid rgba(0,245,255,0.12)', color: '#4a5880' }}
              title="X / Twitter"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#a855f7'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.35)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#4a5880'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,245,255,0.12)'; }}
            >
              <Mail size={16} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: '#e2e8f8' }}>Navigate</h4>
          {[
            { to: '/', label: 'Home' },
            { to: '/verify', label: 'Apply for Grant' },
            { to: '/dashboard', label: 'Proof Dashboard' },
            { to: '/about', label: 'How It Works' },
            { to: '/admin', label: 'Admin Portal' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-sm font-medium transition-colors"
              style={{ color: '#4a5880' }}
              onMouseEnter={e => (e.target as HTMLElement).style.color = '#00f5ff'}
              onMouseLeave={e => (e.target as HTMLElement).style.color = '#4a5880'}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: '#e2e8f8' }}>Midnight Docs</h4>
          {[
            { href: 'https://midnight.network/', label: 'Midnight Network' },
            { href: 'https://docs.midnight.network/', label: 'Developer Docs' },
            { href: 'https://github.com/midnight-ntwrk', label: 'Compact Toolchain' },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium inline-flex items-center gap-1.5 transition-colors"
              style={{ color: '#4a5880' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = '#00f5ff'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = '#4a5880'}
            >
              <span>{label}</span>
              <ExternalLink size={11} />
            </a>
          ))}
        </div>

        {/* Status & Contract */}
        <div className="flex flex-col gap-3">
          <h4 className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: '#e2e8f8' }}>Network Status</h4>
          <div className="pill pill-cyan w-fit">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Preprod Active
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs mb-1" style={{ color: '#4a5880' }}>
              <span>Contract Address:</span>
              <button
                onClick={copyAddress}
                className="inline-flex items-center gap-1 font-bold transition-colors"
                style={{ color: '#00f5ff' }}
                title="Copy Address"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div
              className="text-xs font-mono p-2.5 rounded-xl truncate select-all cursor-pointer transition-all"
              style={{
                background: 'rgba(13,18,36,0.9)',
                border: '1px solid rgba(0,245,255,0.12)',
                color: '#8b9dc3',
              }}
              onClick={copyAddress}
              title={PREPROD_CONTRACT_ADDRESS}
            >
              {PREPROD_CONTRACT_ADDRESS}
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-12 pt-6 text-center relative z-10 px-4"
        style={{ borderTop: '1px solid rgba(0,245,255,0.06)' }}
      >
        <p className="text-xs sm:text-sm" style={{ color: '#4a5880' }}>
          © {new Date().getFullYear()} zkScholar. Built for the Midnight New Moon to Full Hackathon by Deep Saha.
        </p>
      </div>
    </footer>
  );
}
