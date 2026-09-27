import { useState } from 'react';
import { Check, Code2, Copy, ExternalLink, Globe2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PREPROD_CONTRACT_ADDRESS } from '../config';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/verify', label: 'Verify grant' },
  { to: '/dashboard', label: 'My proofs' },
  { to: '/about', label: 'Field guide' },
];

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(PREPROD_CONTRACT_ADDRESS);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <footer className="world-footer">
      <div className="world-footer-grid">
        <div className="world-footer-brand">
          <Link to="/" className="world-brand">
            <img className="world-logo-image" src="/zk-scholar-mark.svg" alt="" aria-hidden="true" />
            <span className="world-brand-copy">
              <span className="world-brand-name"><strong>zk</strong>Scholar</span>
              <span className="world-brand-sub">Private proof protocol</span>
            </span>
          </Link>
          <p>A quiet, verifiable way to prove scholarship eligibility on Midnight without turning a student’s private life into public infrastructure.</p>
        </div>

        <div>
          <span className="world-footer-heading">Navigate</span>
          <div className="world-footer-links">
            {navLinks.map((link) => <Link key={link.to} to={link.to}>{link.label}</Link>)}
          </div>
        </div>

        <div>
          <span className="world-footer-heading">Find the archive</span>
          <div className="world-footer-links">
            <a href="https://github.com/Aman-Raj-bat/zkScholar" target="_blank" rel="noreferrer">Source code <ExternalLink size={11} aria-hidden="true" /></a>
            <a href="https://midnight.network/" target="_blank" rel="noreferrer">Midnight Network <ExternalLink size={11} aria-hidden="true" /></a>
            <a href="https://docs.midnight.network/" target="_blank" rel="noreferrer">Developer docs <ExternalLink size={11} aria-hidden="true" /></a>
          </div>
        </div>

        <div>
          <span className="world-footer-heading">Network signal</span>
          <div className="world-footer-links">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--world-lime)' }}><span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--world-lime)' }} /> Midnight / Preprod</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Globe2 size={12} aria-hidden="true" /> Public ledger, private witness</span>
          </div>
          <div className="world-footer-contract">
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{PREPROD_CONTRACT_ADDRESS}</span>
            <button type="button" onClick={copyAddress} aria-label="Copy contract address">
              {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>

      <div className="world-footer-bottom">
        <span>© {new Date().getFullYear()} zkScholar / Built for the Midnight New Moon to Full Hackathon</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Code2 size={12} aria-hidden="true" /> Privacy is a feature</span>
      </div>
    </footer>
  );
}
