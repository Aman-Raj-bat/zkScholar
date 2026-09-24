import React from 'react';
import { motion } from 'framer-motion';

interface BackgroundPathsProps {
  className?: string;
}

export function BackgroundPaths({ className = '' }: BackgroundPathsProps) {
  // Generate elegant cryptographic flowing curves inspired by polynomial commitments
  const paths = Array.from({ length: 20 }, (_, i) => {
    const yStart = 40 + i * 36;
    const yOffset = ((i % 2 === 0 ? 1 : -1) * (i * 14)) + 60;
    const color = i % 3 === 0 ? '#00f5ff' : i % 3 === 1 ? '#8b5cf6' : '#38bdf8';
    return {
      id: i,
      d: `M -100 ${yStart} C 320 ${yStart + yOffset}, 700 ${yStart - yOffset}, 1400 ${yStart + yOffset / 2}`,
      strokeWidth: (i % 4 === 0 ? 1.4 : 0.8),
      opacity: 0.10 + (i % 4) * 0.05,
      duration: 20 + (i % 5) * 4,
      delay: (i % 5) * 0.6,
      color,
    };
  });

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Deep Cyber Ambient Radial Glows */}
      <div className="absolute top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-cyan-500/12 via-violet-600/12 to-fuchsia-600/10 blur-[130px] rounded-full -z-10" />
      <div className="absolute top-2/3 right-10 w-[500px] h-[350px] bg-gradient-to-bl from-blue-600/10 via-cyan-500/10 to-transparent blur-[120px] rounded-full -z-10" />

      {/* Subtle Dot Matrix Grid */}
      <div 
        className="absolute inset-0 opacity-[0.18] -z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(0, 245, 255, 0.4) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Polynomial Circuit Flow Lines */}
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1300 850"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {paths.map((p) => (
          <motion.path
            key={p.id}
            d={p.d}
            stroke={p.color}
            strokeWidth={p.strokeWidth}
            strokeOpacity={p.opacity}
            strokeDasharray="8 12"
            initial={{ pathOffset: 0 }}
            animate={{ pathOffset: [0, 1] }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default BackgroundPaths;
