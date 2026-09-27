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
    : size === 'xs' ? 28
    : size === 'sm' ? 36
    : size === 'md' ? 52
    : size === 'lg' ? 68
    : 84;

  return (
    <div className={`zk-logo ${animated ? 'zk-logo-animated' : ''} ${className}`}>
      <span
        className={`zk-logo-mark ${glow ? 'zk-logo-glow' : ''}`}
        style={{ width: pixelSize, height: pixelSize }}
      >
        <img src="/zk-scholar-mark.svg" alt={showText ? '' : 'zkScholar logo'} aria-hidden={showText} />
      </span>
      {showText && (
        <span className="zk-logo-wordmark">
          <span className="zk-logo-name"><strong>zk</strong>Scholar</span>
          <span className="zk-logo-subtitle">Private proof protocol</span>
        </span>
      )}
    </div>
  );
};

export default ZkScholarLogo;
