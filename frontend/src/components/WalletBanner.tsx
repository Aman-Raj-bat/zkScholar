import { Loader2, LogOut, Wallet } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

export default function WalletBanner() {
  const { address, isConnected, walletType, walletStatus, isConnecting, connectionError, connect, disconnect } = useWallet();

  if (walletStatus === 'checking') {
    return (
      <div className="world-wallet-connected" aria-live="polite">
        <Loader2 className="animate-spin" size={14} aria-hidden="true" />
        <span>Detecting...</span>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className="world-wallet-connected">
        <span aria-hidden="true" style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--world-lime)', boxShadow: '0 0 10px var(--world-lime)' }} />
        <span>{walletType === '1am' ? '1AM' : 'Lace'} · {address.slice(0, 6)}…{address.slice(-4)}</span>
        <button type="button" onClick={disconnect} aria-label="Disconnect wallet" title="Disconnect wallet">
          <LogOut size={13} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => connect('preprod')}
        disabled={isConnecting || walletStatus === 'not-found'}
        className="world-wallet-button"
        aria-label={isConnecting ? 'Connecting wallet' : 'Connect Lace wallet'}
      >
        {isConnecting ? <Loader2 className="animate-spin" size={14} aria-hidden="true" /> : <Wallet size={14} aria-hidden="true" />}
        <span>{isConnecting ? 'Connecting…' : 'Connect wallet'}</span>
      </button>
      {connectionError && <div className="world-wallet-error" role="alert">{connectionError}</div>}
    </div>
  );
}
