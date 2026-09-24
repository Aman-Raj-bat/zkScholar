import React from 'react';

interface GlowBadgeProps {
  children: React.ReactNode;
  variant?: 'cyan' | 'violet' | 'emerald' | 'amber';
  pulse?: boolean;
  className?: string;
}

export const GlowBadge: React.FC<GlowBadgeProps> = ({
  children,
  variant = 'cyan',
  pulse = true,
  className = '',
}) => {
  const styles = {
    cyan: {
      bg: 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30 shadow-[0_0_12px_rgba(0,245,255,0.2)]',
      dot: 'bg-cyan-400',
    },
    violet: {
      bg: 'bg-violet-950/60 text-violet-300 border-violet-500/30 shadow-[0_0_12px_rgba(139,92,246,0.2)]',
      dot: 'bg-violet-400',
    },
    emerald: {
      bg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]',
      dot: 'bg-emerald-400',
    },
    amber: {
      bg: 'bg-amber-950/60 text-amber-300 border-amber-500/30 shadow-[0_0_12px_rgba(245,158,11,0.2)]',
      dot: 'bg-amber-400',
    },
  }[variant];

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-semibold tracking-wide backdrop-blur-md transition-all ${styles.bg} ${className}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${styles.dot}`}
          />
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${styles.dot}`}
          />
        </span>
      )}
      <span>{children}</span>
    </div>
  );
};

export default GlowBadge;
