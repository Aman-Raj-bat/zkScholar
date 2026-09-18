import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
type ProofRecord = { ts: number; eligible: boolean; txHash?: string };
function loadHistory(): ProofRecord[] { try { return JSON.parse(localStorage.getItem('zkscholar_history') ?? '[]'); } catch { return []; } }
export default function DashboardPage() {
  const history = useMemo(loadHistory, []);
  const total = history.length, eligible = history.filter(r=>r.eligible).length, ineligible = total - eligible;
  const maxCount = Math.max(eligible, ineligible, 1);
  const barH = (n: number) => Math.round((n / maxCount) * 120);
  return (
    <main style={{maxWidth:'720px',margin:'0 auto',padding:'2rem 1rem'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'2rem'}}>
        <h1 style={{fontSize:'1.6rem',fontWeight:700}}>Analytics Dashboard</h1>
        <Link to="/" style={{color:'var(--text-secondary)',fontSize:'.9rem'}}>Back to Verify</Link>
      </div>
      <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',marginBottom:'1.5rem'}}>
        {[['Total Proofs',total,'var(--accent-primary)'],['Eligible',eligible,'var(--accent-success)'],['Ineligible',ineligible,'var(--accent-danger)']].map(([l,v,c])=>(
          <div key={String(l)} className="card" style={{textAlign:'center'}}>
            <div style={{fontSize:'2rem',fontWeight:700,color:String(c)}}>{String(v)}</div>
            <div style={{fontSize:'.8rem',color:'var(--text-muted)'}}>{String(l)}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <h2 style={{fontSize:'.9rem',color:'var(--text-secondary)',marginBottom:'1rem'}}>Pass / Fail Ratio</h2>
        <svg viewBox="0 0 200 150" width="100%" style={{maxWidth:300}}>
          <rect x="40" y={130-barH(eligible)} width="60" height={barH(eligible)} fill="var(--accent-success)" rx="4" />
          <rect x="110" y={130-barH(ineligible)} width="60" height={barH(ineligible)} fill="var(--accent-danger)" rx="4" />
          <text x="70" y="145" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Eligible</text>
          <text x="140" y="145" fill="var(--text-muted)" fontSize="10" textAnchor="middle">Ineligible</text>
        </svg>
      </div>
      {history.length === 0 && <p style={{color:'var(--text-muted)',textAlign:'center',marginTop:'1rem'}}>No proof history yet. <Link to="/">Submit your first proof.</Link></p>}
    </main>
  );
}
