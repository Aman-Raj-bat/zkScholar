import React from 'react';

interface ZkScholarLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
  className?: string;
  showText?: boolean;
  animated?: boolean;
  glow?: boolean;
}

export const ZkScholarLogo: React.FC<ZkScholarLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  animated = true,
  glow = true,
}) => {
  const pixelSize = typeof size === 'number' 
    ? size 
    : size === 'xs' ? 24 
    : size === 'sm' ? 32 
    : size === 'md' ? 42 
    : size === 'lg' ? 56 
    : 72;

  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div 
        className="relative flex items-center justify-center shrink-0" 
        style={{ width: pixelSize, height: pixelSize }}
      >
        {/* Ambient Halo Glow */}
        {glow && (
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500/30 via-violet-600/30 to-fuchsia-500/30 blur-md pointer-events-none ${
              animated ? 'animate-pulse-slow' : ''
            }`}
          />
        )}

        {/* SVG Icon */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-[0_4px_12px_rgba(0,245,255,0.25)] transition-transform duration-300 hover:scale-105"
        >
          <defs>
            {/* Primary Neon Gradient */}
            <linearGradient id={`zkGradPrimary-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f5ff" />
              <stop offset="45%" stopColor="#6366f1" />
              <stop offset="85%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            {/* Inner Shield Gradient */}
            <linearGradient id={`zkGradInner-${uniqueId}`} x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#090d1f" stopOpacity="0.98" />
            </linearGradient>

            {/* Accent Gold/Cyan Gradient for Scholar Cap */}
            <linearGradient id={`zkGradAccent-${uniqueId}`} x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#00f5ff" />
              <stop offset="100%" stopColor="#c084fc" />
            </linearGradient>

            {/* Filter Glow */}
            <filter id={`zkGlow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer Cryptographic Hex-Shield Outline */}
          <path
            d="M50 4 L86 22 L86 60 C86 78 50 96 50 96 C50 96 14 78 14 60 L14 22 Z"
            fill={`url(#zkGradInner-${uniqueId})`}
            stroke={`url(#zkGradPrimary-${uniqueId})`}
            strokeWidth="3.5"
            strokeLinejoin="round"
          />

          {/* Midnight Crescent Moon Arc (Embracing the left flank) */}
          <path
            d="M32 26 C22 36 22 62 34 74 C26 66 25 42 32 26 Z"
            fill="url(#zkGradPrimary)"
            fillOpacity="0.8"
          />
          <path
            d="M32 26 C22 36 22 62 34 74 C26 66 25 42 32 26 Z"
            fill={`url(#zkGradAccent-${uniqueId})`}
          />

          {/* Academic Scholar Mortarboard (Top Crest) */}
          <g transform="translate(0, 2)">
            {/* Cap Diamond */}
            <path
              d="M50 21 L74 32 L50 43 L26 32 Z"
              fill={`url(#zkGradAccent-${uniqueId})`}
              fillOpacity="0.25"
              stroke={`url(#zkGradPrimary-${uniqueId})`}
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {/* Cap Under-Band */}
            <path
              d="M36 37 L36 47 C36 51 64 51 64 47 L64 37"
              fill="none"
              stroke={`url(#zkGradAccent-${uniqueId})`}
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Tassel & Cord */}
            <path
              d="M50 32 Q72 34 74 46"
              fill="none"
              stroke="#00f5ff"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <circle cx="74" cy="48" r="2.2" fill="#00f5ff" />
          </g>

          {/* Zero-Knowledge Polynomial Nexus (Center Diamond & Light Rays) */}
          <g transform="translate(0, 10)">
            {/* Geometric ZK Diamond Core */}
            <polygon
              points="50,46 62,56 50,66 38,56"
              fill={`url(#zkGradPrimary-${uniqueId})`}
              className={animated ? 'animate-pulse' : ''}
              style={{ animationDuration: '3s' }}
            />

            {/* Inner Core Light Point */}
            <circle cx="50" cy="56" r="3" fill="#ffffff" filter={`url(#zkGlow-${uniqueId})`} />

            {/* Verification Circuit Traces */}
            <path
              d="M50 66 L50 78"
              stroke="#00f5ff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="2 3"
            />
            <path
              d="M38 56 L24 56"
              stroke="#6366f1"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path
              d="M62 56 L76 56"
              stroke="#a855f7"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Small Circuit Nodes */}
            <circle cx="50" cy="78" r="2" fill="#00f5ff" />
            <circle cx="24" cy="56" r="2" fill="#6366f1" />
            <circle cx="76" cy="56" r="2" fill="#a855f7" />
          </g>
        </svg>
      </div>

      {/* Typography Wordmark */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline tracking-tight font-extrabold text-xl sm:text-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              zk
            </span>
            <span className="text-white ml-0.5 tracking-tight drop-shadow-sm">
              Scholar
            </span>
            <span className="ml-1.5 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider bg-violet-500/20 text-cyan-300 border border-cyan-500/30">
              MIDNIGHT
            </span>
          </div>
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-0.5">
            Zero-Knowledge Verifier
          </span>
        </div>
      )}
    </div>
  );
};

export default ZkScholarLogo;
