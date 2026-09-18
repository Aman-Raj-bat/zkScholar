import React, { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
type WalletState = { status: 'disconnected' } | { status: 'connecting' } | { status: 'connected'; address: string } | { status: 'error'; message: string };
type WalletContextValue = { wallet: WalletState; connect: () => Promise<void>; disconnect: () => void; };
const WalletContext = createContext<WalletContextValue | null>(null);
export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<WalletState>({ status: 'disconnected' });
  const connect = useCallback(async () => {
    setWallet({ status: 'connecting' });
    try {
      const api = (window as any).midnight?.enable?.();
      if (!api) throw new Error('1AM wallet not installed. Please install from midnight.network');
      const enabled = await api;
      const address = await enabled.getAddress?.() ?? 'unknown';
      setWallet({ status: 'connected', address });
    } catch (err: any) {
      setWallet({ status: 'error', message: err.message ?? 'Failed to connect wallet' });
    }
  }, []);
  const disconnect = useCallback(() => { setWallet({ status: 'disconnected' }); }, []);
  return <WalletContext.Provider value={{ wallet, connect, disconnect }}>{children}</WalletContext.Provider>;
}
export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be inside WalletProvider');
  return ctx;
}
