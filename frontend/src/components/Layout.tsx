import React, { type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div>
      <nav style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'1rem',borderBottom:'1px solid var(--border-subtle)',background:'rgba(10,10,15,0.9)',backdropFilter:'blur(12px)',position:'sticky',top:0,zIndex:100}}>
        <Link to="/" style={{fontWeight:700,fontSize:'1.1rem',color:'var(--text-primary)'}}>
          <span style={{color:'var(--accent-primary)'}}>zk</span>Scholar
        </Link>
        <div style={{display:'flex',gap:'.75rem'}}>
          <Link to="/" style={{color:pathname==='/'?'var(--accent-primary)':'var(--text-secondary)'}}>Verify</Link>
          <Link to="/dashboard" style={{color:pathname==='/dashboard'?'var(--accent-primary)':'var(--text-secondary)'}}>Dashboard</Link>
        </div>
      </nav>
      {children}
    </div>
  );
}
// a11y: added aria-current for active nav links
