import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WalletConnect from '../components/WalletConnect';
import ToastNotification from '../components/ToastNotification';
import { useVerifySubmit } from '../hooks/useVerifySubmit';
import { useEligibilityPrecheck } from '../hooks/useEligibilityPrecheck';
import { useLiveCriteria } from '../hooks/useLiveCriteria';
import { useWallet } from '../contexts/WalletContext';
import { CONTRACT_ADDRESS, EXPLORER_BASE } from '../constants';
export default function VerifyPage() {
  const [cs, setCs] = useState(''), [hours, setHours] = useState(''), [income, setIncome] = useState('');
  const [toast, setToast] = useState<{msg:string;type:'success'|'error'|'info'}|null>(null);
  const { wallet } = useWallet();
  const { proof, loading, submit } = useVerifySubmit();
  const { criteria } = useLiveCriteria();
  const precheck = useEligibilityPrecheck(cs, hours, income, criteria.minCsScore, criteria.minCodingHours, criteria.maxFamilyIncome);
  const handleSubmit = async (e: React.FormEvent) => { e.preventDefault(); await submit(cs, hours, income); };
  return (
    <main style={{maxWidth:'680px',margin:'0 auto',padding:'2rem 1rem'}}>
      <header style={{marginBottom:'2rem'}}>
        <h1 style={{fontSize:'1.8rem',fontWeight:700}}>zkScholar <span style={{color:'var(--accent-primary)'}}>Grant Verifier</span></h1>
        <p style={{color:'var(--text-secondary)'}}>Prove your eligibility without revealing your credentials.</p>
      </header>
      <section style={{marginBottom:'1.5rem'}}><WalletConnect /></section>
      <section className="card" style={{marginBottom:'1.5rem'}}>
        <h2 style={{fontSize:'1rem',marginBottom:'1rem',color:'var(--text-secondary)'}}>Live Grant Criteria</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'1rem',textAlign:'center'}}>
          {[['Min CS Score', criteria.minCsScore],['Min Coding Hours', criteria.minCodingHours],['Max Income','$'+criteria.maxFamilyIncome.toLocaleString()]].map(([l,v])=>(
            <div key={String(l)}><div style={{fontSize:'1.4rem',fontWeight:700,color:'var(--accent-primary)'}}>{String(v)}</div><div style={{fontSize:'.75rem',color:'var(--text-muted)'}}>{String(l)}</div></div>
          ))}
        </div>
      </section>
      <form className="card" onSubmit={handleSubmit}>
        <h2 style={{fontSize:'1rem',marginBottom:'1.25rem',display:'flex',justifyContent:'space-between'}}>
          Your Private Credentials
          {cs&&hours&&income&&<span className={'badge badge-'+(precheck==='likely_eligible'?'success':'danger')}>{precheck==='likely_eligible'?'Likely Eligible':'Likely Ineligible'}</span>}
        </h2>
        <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
          <label><span style={{fontSize:'.85rem',color:'var(--text-secondary)'}}>CS Aptitude Score (0-1000)</span><input id="input-cs-score" type="number" min="0" max="1000" value={cs} onChange={e=>setCs(e.target.value)} placeholder="e.g. 850" required /></label>
          <label><span style={{fontSize:'.85rem',color:'var(--text-secondary)'}}>Coding Hours / Year</span><input id="input-coding-hours" type="number" min="0" value={hours} onChange={e=>setHours(e.target.value)} placeholder="e.g. 2000" required /></label>
          <label><span style={{fontSize:'.85rem',color:'var(--text-secondary)'}}>Annual Family Income (USD)</span><input id="input-family-income" type="number" min="0" value={income} onChange={e=>setIncome(e.target.value)} placeholder="e.g. 80000" required /></label>
        </div>
        <p style={{fontSize:'.78rem',color:'var(--text-muted)',margin:'1rem 0'}}>These values are used locally and never transmitted.</p>
        <button id="btn-submit-proof" type="submit" className="btn-primary" disabled={loading||wallet.status!=='connected'} style={{width:'100%'}}>
          {loading?'Generating Proof...':'Prove Eligibility'}
        </button>
        {proof.status==='submitted'&&<div className="badge badge-success" style={{marginTop:'1rem'}}>Proof submitted</div>}
        {proof.status==='error'&&<div className="badge badge-danger" style={{marginTop:'1rem'}}>{proof.message}</div>}
      </form>
      <footer style={{marginTop:'2rem',textAlign:'center',fontSize:'.8rem',color:'var(--text-muted)'}}>
        Contract: <span style={{fontFamily:'monospace',color:'var(--accent-secondary)'}}>{CONTRACT_ADDRESS.slice(0,16)}...</span>
        <span style={{margin:'0 .75rem'}}>.</span><Link to="/dashboard">Dashboard</Link>
      </footer>
      {toast&&<ToastNotification message={toast.msg} type={toast.type} onClose={()=>setToast(null)} />}
    </main>
  );
}
