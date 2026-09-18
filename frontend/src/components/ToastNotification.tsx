import React, { useEffect } from 'react';
type ToastProps = { message: string; type: 'success' | 'error' | 'info'; onClose: () => void; };
export default function ToastNotification({ message, type, onClose }: ToastProps) {
  useEffect(() => { const t = setTimeout(onClose, 5000); return () => clearTimeout(t); }, [onClose]);
  const colors = { success: 'var(--accent-success)', error: 'var(--accent-danger)', info: 'var(--accent-secondary)' };
  return (
    <div role="status" aria-live="polite" style={{position:'fixed',bottom:'1.5rem',right:'1.5rem',background:'var(--bg-secondary)',border:`1px solid ${colors[type]}`,borderRadius:'var(--radius-md)',padding:'1rem 1.25rem',maxWidth:'360px',color:colors[type],boxShadow:'var(--shadow-card)',zIndex:1000,display:'flex',justifyContent:'space-between',alignItems:'center',gap:'1rem'}}>
      <span>{message}</span>
      <button onClick={onClose} style={{color:'var(--text-secondary)',background:'none',border:'none',cursor:'pointer',fontSize:'1.1rem'}}>x</button>
    </div>
  );
}
