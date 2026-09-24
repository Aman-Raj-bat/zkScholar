import React from 'react';
import { Link } from 'react-router-dom';

interface ShimmerButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  className?: string;
  shimmerColor?: string;
  shimmerDuration?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'cyan';
  disabled?: boolean;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  children,
  to,
  onClick,
  className = '',
  size = 'md',
  variant = 'primary',
  disabled = false,
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size];

  const variantStyles = {
    primary: {
      bg: 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(139,92,246,0.35)]',
      border: 'border-violet-400/40',
      shimmer: 'via-violet-300',
    },
    cyan: {
      bg: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold shadow-[0_0_30px_rgba(0,245,255,0.4)]',
      border: 'border-cyan-300/60',
      shimmer: 'via-cyan-200',
    },
    secondary: {
      bg: 'bg-slate-900/80 hover:bg-slate-800/90 text-slate-100 border border-slate-700/80 hover:border-slate-500/80 shadow-[0_4px_16px_rgba(0,0,0,0.3)]',
      border: 'border-white/10',
      shimmer: 'via-slate-400',
    },
  }[variant];

  const content = (
    <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-tight">
      {children}
    </span>
  );

  const baseClasses = `
    group relative inline-flex items-center justify-center overflow-hidden rounded-2xl
    font-medium transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none
    ${sizeClasses} ${variantStyles.bg} ${variantStyles.border} ${className}
  `;

  if (to) {
    return (
      <Link to={to} className={baseClasses}>
        {/* Shimmer sweep effect */}
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform ease-out pointer-events-none" />
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={baseClasses}>
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform ease-out pointer-events-none" />
      {content}
    </button>
  );
};

export default ShimmerButton;
