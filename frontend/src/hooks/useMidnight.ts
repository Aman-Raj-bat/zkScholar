import { useState, useCallback } from 'react';
import { useWallet } from '../contexts/WalletContext';
type ProofState = {status:'idle'} | {status:'proving'} | {status:'submitted';txHash:string} | {status:'error';message:string};
export function useMidnight() {
  const { wallet } = useWallet();
  const [proof, setProof] = useState<ProofState>({ status: 'idle' });
  const applyForGrant = useCallback(async (csScore: number, codingHours: number, familyIncome: number) => {
    if (wallet.status !== 'connected') { setProof({ status: 'error', message: 'Wallet not connected' }); return; }
    setProof({ status: 'proving' });
    try {
      const api = (window as any).midnight;
      const result = await api.submitTransaction({ circuit: 'apply_for_grant', privateInputs: { cs_score: BigInt(csScore), coding_hours: BigInt(codingHours), family_income: BigInt(familyIncome) } });
      setProof({ status: 'submitted', txHash: result.txHash });
    } catch (err: any) { setProof({ status: 'error', message: err.message ?? 'Proof generation failed' }); }
  }, [wallet]);
  return { proof, applyForGrant };
}
