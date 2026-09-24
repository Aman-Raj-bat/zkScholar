import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

export default function WalletBanner() {
  const { address, isConnected, walletType, walletStatus, isConnecting, connectionError, connect, disconnect } = useWallet();

  if (walletStatus === 'checking') {
    return (
      <div className="flex items-center gap-2 px-3.5 py-1.5 bg-slate-900 border border-slate-800 text-slate-400 rounded-xl text-xs font-mono">
        <Loader2 className="animate-spin text-cyan-400" size={14} />
        <span>Detecting wallet...</span>
      </div>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-900/90 border border-cyan-500/30 rounded-xl shadow-lg shadow-cyan-950/30 backdrop-blur-md">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
            {walletType === '1am' ? '1AM' : 'Lace'}
          </span>
        </div>
        <div className="w-px h-3.5 bg-slate-700" />
        <span className="text-xs font-mono font-semibold text-slate-200">
          {address.slice(0, 6)}…{address.slice(-4)}
        </span>
        <button 
          onClick={disconnect} 
          className="ml-1 p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
          title="Disconnect Wallet"
        >
          <LogOut size={14} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col items-end">
      <button
        onClick={() => connect('preprod')}
        disabled={isConnecting || walletStatus === 'not-found'}
        className="group relative inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:via-sky-300 hover:to-indigo-400 text-slate-950 text-xs font-mono font-bold tracking-tight shadow-[0_0_20px_rgba(0,245,255,0.3)] hover:shadow-[0_0_28px_rgba(0,245,255,0.5)] transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
      >
        {isConnecting ? (
          <>
            <Loader2 className="animate-spin text-slate-950" size={14} />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <Wallet size={14} className="text-slate-950" />
            <span>Connect Lace</span>
          </>
        )}
      </button>
      {connectionError && (
        <div className="absolute top-full mt-2 right-0 w-64 p-3 bg-rose-950/90 border border-rose-500/40 rounded-xl shadow-xl z-50 text-xs text-rose-200 font-mono break-words leading-relaxed backdrop-blur-md">
          {connectionError}
        </div>
      )}
    </div>
  );
}
