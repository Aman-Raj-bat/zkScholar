import React from 'react';
import { useWallet } from '../contexts/WalletContext';
export default function WalletConnect() {
  const { wallet, connect, disconnect } = useWallet();
  if (wallet.status === 'connected') {
    return (
      <div className="card" style={{display:'flex',alignItems:'center',gap:'1rem',flexWrap:'wrap'}}>
        <span className="badge badge-success">Connected</span>
        <span style={{fontSize:'.8rem',color:'var(--text-secondary)',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{wallet.address}</span>
        <button className="btn-secondary" onClick={disconnect}>Disconnect</button>
      </div>
    );
  }
  return (
    <button id="btn-connect-wallet" className="btn-primary" onClick={connect} disabled={wallet.status === 'connecting'}>
      {wallet.status === 'connecting' ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
}
