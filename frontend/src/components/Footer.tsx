import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Zap, Code, Globe, Mail, Copy, Check, ExternalLink, ShieldCheck } from 'lucide-react';
import { PREPROD_CONTRACT_ADDRESS } from '../config';
import ZkScholarLogo from './ui/ZkScholarLogo';
import GlowBadge from './ui/GlowBadge';

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    navigator.clipboard.writeText(PREPROD_CONTRACT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer
      className="mt-24 py-16 relative overflow-hidden border-t border-slate-800/80 bg-slate-950/90 backdrop-blur-xl"
    >
      {/* Background radial glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] pointer-events-none -z-0 opacity-40"
        style={{ background: 'radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">

        {/* Brand Column */}
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center">
            <ZkScholarLogo size="sm" showText={true} animated={true} />
          </Link>
          <p className="text-xs leading-relaxed text-slate-400">
            Privacy-preserving tech grant verification built on Midnight Network using Compact Zero-Knowledge circuits.
          </p>
          <div className="flex gap-2.5 mt-1">
            <a
              href="https://github.com/Aman-Raj-bat/zkScholar"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all"
              title="GitHub Repository"
            >
              <Code size={15} />
            </a>
            <a
              href="https://zkscholar-alpha.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all"
              title="Live Deployment"
            >
              <Globe size={15} />
            </a>
            <a
              href="https://x.com/zkscholarvi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 flex items-center justify-center transition-all"
              title="X / Twitter"
            >
              <Mail size={15} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2.5 font-mono text-xs">
          <h4 className="font-bold uppercase tracking-wider text-slate-200 mb-1">Navigation</h4>
          {[
            { to: '/', label: 'Home' },
            { to: '/verify', label: 'Verify Grant' },
            { to: '/dashboard', label: 'Proof Dashboard' },
            { to: '/about', label: 'Architecture Guide' },
            { to: '/admin', label: 'Admin Portal' },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-slate-400 hover:text-cyan-300 transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Resources */}
        <div className="flex flex-col gap-2.5 font-mono text-xs">
          <h4 className="font-bold uppercase tracking-wider text-slate-200 mb-1">Midnight Docs</h4>
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
              className="text-slate-400 hover:text-cyan-300 inline-flex items-center gap-1.5 transition-colors"
            >
              <span>{label}</span>
              <ExternalLink size={11} className="text-slate-500" />
            </a>
          ))}
        </div>

        {/* Status & Contract */}
        <div className="flex flex-col gap-3 font-mono text-xs">
          <h4 className="font-bold uppercase tracking-wider text-slate-200 mb-0.5">Network Status</h4>
          <div>
            <GlowBadge variant="cyan" pulse={true}>
              Midnight Preprod
            </GlowBadge>
          </div>
          <div className="mt-1">
            <div className="flex items-center justify-between text-[11px] mb-1 text-slate-400">
              <span>Contract Address:</span>
              <button
                onClick={copyAddress}
                className="inline-flex items-center gap-1 font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                title="Copy Address"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div
              className="text-[11px] font-mono p-2.5 rounded-xl truncate select-all cursor-pointer bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 transition-all"
              onClick={copyAddress}
              title={PREPROD_CONTRACT_ADDRESS}
            >
              {PREPROD_CONTRACT_ADDRESS}
            </div>
          </div>
        </div>
      </div>

      <div
        className="mt-12 pt-6 text-center relative z-10 px-4 border-t border-slate-800/60 font-mono text-xs text-slate-500"
      >
        <p>
          © {new Date().getFullYear()} zkScholar. Built for the Midnight New Moon to Full Hackathon. Zero-Knowledge Private by Default.
        </p>
      </div>
    </footer>
  );
}
