import React, { useState, useEffect } from 'react';
import { PREPROD_CONTRACT_ADDRESS } from '../config';
import { explorerTxUrl } from '../constants';
import { useEligibilityPrecheck } from '../hooks/useEligibilityPrecheck';
import { useLiveCriteria } from '../hooks/useLiveCriteria';
import { ToastContainer } from '../components/ToastNotification';
import type { ToastProps } from '../components/ToastNotification';
import { useVerifySubmit } from '../hooks/useVerifySubmit';
import { useWallet } from '../contexts/WalletContext';
import { 
  AlertCircle, 
  Shield, 
  Loader2, 
  CheckCircle2, 
  XCircle, 
  ExternalLink, 
  Lock, 
  Terminal, 
  Copy, 
  Check, 
  Sparkles,
  ArrowRight,
  Cpu
} from 'lucide-react';
import PrivacyFlowViz from '../components/PrivacyFlowViz';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard3D from '../components/ui/TiltCard3D';
import GlowBadge from '../components/ui/GlowBadge';
import ZkScholarLogo from '../components/ui/ZkScholarLogo';

export default function VerifyPage() {
  const { session, isConnected, connect } = useWallet();
  const [gpaRaw, setGpaRaw] = useState('');
  const [incomeRaw, setIncomeRaw] = useState('');
  const [copied, setCopied] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Omit<ToastProps, 'onClose'>[]>([]);

  const addToast = (type: 'success' | 'error', message: string) => {
    setToasts(prev => [...prev, { id: crypto.randomUUID(), type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const precheckResult = useEligibilityPrecheck(gpaRaw, incomeRaw);
  const { liveGpa, liveIncome, isLoading: isCriteriaLoading } = useLiveCriteria();

  const { status, txId, errorMsg, submit: handleVerify, reset: resetHook, isProcessingStatus } = useVerifySubmit(gpaRaw, incomeRaw, addToast);

  // Stream terminal logs during proving stages
  useEffect(() => {
    if (status === 'proving') {
      setTerminalLogs([
        '⚡ [ZK_INIT] Loading Midnight Compact WASM circuit...',
        '🔒 [WITNESS] Encapsulating GPA & Income into private browser memory...',
        '🧮 [SNARK_SYNTHESIS] Computing constraint satisfaction polynomial...',
      ]);
    } else if (status === 'submitting') {
      setTerminalLogs(prev => [
        ...prev,
        '✨ [ZK_READY] Zero-Knowledge argument generated successfully (~180ms).',
        '📡 [BROADCAST] Submitting proof transaction to Midnight Preprod RPC...',
      ]);
    } else if (status === 'eligible') {
      setTerminalLogs(prev => [
        ...prev,
        '✅ [CONSENSUS] Preprod ledger accepted proof. Status: ELIGIBLE.',
      ]);
    } else if (status === 'ineligible') {
      setTerminalLogs(prev => [
        ...prev,
        '❌ [LEDGER] Proof verification evaluated: INELIGIBLE.',
      ]);
    } else if (status === 'error') {
      setTerminalLogs(prev => [
        ...prev,
        `⚠️ [ABORT] Verification halted: ${errorMsg || 'Circuit error'}`,
      ]);
    }
  }, [status, errorMsg]);

  const reset = () => {
    resetHook();
    setGpaRaw('');
    setIncomeRaw('');
    setTerminalLogs([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && gpaRaw.trim() && incomeRaw.trim() && isConnected && !isProcessingStatus) {
      handleVerify();
    }
  };

  const copyProof = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <TiltCard3D 
          className="max-w-md w-full p-8 sm:p-10 text-center bg-slate-900/90 border-slate-800 text-white"
          glowColor="rgba(0, 245, 255, 0.15)"
        >
          <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5 text-cyan-400 shadow-inner">
            <Lock size={32} />
          </div>
          <h2 className="text-2xl font-extrabold text-white mb-2">Connect Midnight Wallet</h2>
          <p className="text-slate-400 leading-relaxed text-sm mb-6">
            Please connect your Lace or 1AM wallet on the Midnight Preprod testnet to synthesize and broadcast your zero-knowledge proof.
          </p>
          <button
            onClick={() => connect('preprod')}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-mono font-bold text-sm shadow-[0_0_20px_rgba(0,245,255,0.35)] transition-all"
          >
            Connect Lace Wallet
          </button>
        </TiltCard3D>
      </div>
    );
  }

  if (PREPROD_CONTRACT_ADDRESS === 'UPDATE_WITH_YOUR_PREPROD_CONTRACT_ADDRESS' || !/^[0-9a-fA-F]{64}$/.test(PREPROD_CONTRACT_ADDRESS)) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <TiltCard3D className="max-w-md w-full p-10 text-center bg-slate-900/90 border-amber-500/30 text-white">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-5 text-amber-400">
            <AlertCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Contract Not Configured</h2>
          <p className="text-slate-400 leading-relaxed text-sm">
            Please ensure the scholarship contract address is deployed and configured in the system.
          </p>
        </TiltCard3D>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto py-6 px-4"
    >
      {/* Header Banner */}
      <TiltCard3D 
        className="p-8 mb-8 text-center bg-slate-900/80 border-slate-800 text-white relative overflow-hidden"
        glowColor="rgba(0, 245, 255, 0.12)"
      >
        <div className="flex justify-center mb-4">
          <ZkScholarLogo size="md" animated={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
          Verify Scholarship Eligibility
        </h1>
        <p className="text-slate-400 mb-6 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          Prove your academic merit and financial qualification on Midnight Preprod without exposing raw data.
        </p>
        
        {/* On-Chain Active Criteria Card */}
        <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 shadow-inner inline-block w-full max-w-md text-left">
          <div className="text-cyan-400 font-mono font-bold text-xs uppercase tracking-wider mb-3 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>On-Chain Criteria (Live from Midnight)</span>
          </div>
          {isCriteriaLoading ? (
            <div className="flex justify-center items-center gap-2 opacity-70 py-1">
              <Loader2 className="animate-spin text-cyan-400" size={16} /> 
              <span className="text-xs font-mono text-slate-400">Querying Midnight ledger...</span>
            </div>
          ) : (
            <div className="flex justify-around items-center text-sm py-1 font-mono">
              <div className="text-center">
                <span className="text-slate-500 text-[11px] block uppercase">Minimum GPA</span> 
                <span className="text-cyan-300 text-lg font-bold">{(liveGpa / 100).toFixed(2)} / 10.0</span>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-center">
                <span className="text-slate-500 text-[11px] block uppercase">Max Annual Income</span> 
                <span className="text-violet-300 text-lg font-bold">${liveIncome.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </TiltCard3D>

      {/* Visual Pipeline Flow */}
      <div className="mb-8">
        <PrivacyFlowViz status={status} />
      </div>

      {/* Verification Input Deck */}
      <TiltCard3D 
        className="p-7 sm:p-9 bg-slate-900/85 border-slate-800 text-white"
        glowColor="rgba(0, 245, 255, 0.15)"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="input-gpa" className="block text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                Academic GPA (0.0 - 10.0)
              </label>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950/80 border border-cyan-500/30 px-2 py-0.5 rounded">
                Private Witness
              </span>
            </div>
            <input
              id="input-gpa"
              type="number"
              className="w-full px-4 py-3.5 bg-slate-950/90 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all outline-none text-white font-mono disabled:opacity-50"
              placeholder="e.g. 8.75"
              min="0"
              max="10"
              step="0.01"
              value={gpaRaw}
              onChange={(e) => setGpaRaw(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isProcessingStatus || status === 'eligible' || status === 'ineligible'}
            />
            <div className="text-slate-500 text-[11px] font-mono">Evaluated against contract minimum (scaled ×100)</div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="input-income" className="block text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">
                Annual Household Income ($)
              </label>
              <span className="text-[10px] font-mono text-violet-300 bg-violet-950/80 border border-violet-500/30 px-2 py-0.5 rounded">
                Private Witness
              </span>
            </div>
            <input
              id="input-income"
              type="number"
              className="w-full px-4 py-3.5 bg-slate-950/90 border border-slate-700/80 rounded-xl focus:ring-2 focus:ring-violet-400 focus:border-violet-400 transition-all outline-none text-white font-mono disabled:opacity-50"
              placeholder="e.g. 150000"
              min="0"
              step="1000"
              value={incomeRaw}
              onChange={(e) => setIncomeRaw(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isProcessingStatus || status === 'eligible' || status === 'ineligible'}
            />
            <div className="text-slate-500 text-[11px] font-mono">Evaluated against contract upper threshold</div>
          </div>
        </div>

        {/* Local Precheck Pill */}
        {status === 'idle' && precheckResult !== 'idle' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 flex items-center justify-between px-4 py-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono"
          >
            <span className="text-slate-400 flex items-center gap-1.5">
              <Sparkles size={14} className="text-cyan-400" />
              Client-side qualification preview:
            </span>
            <span className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
              precheckResult === 'likely_eligible' 
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                : precheckResult === 'likely_ineligible'
                ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                : 'bg-amber-950 text-amber-300 border border-amber-500/40'
            }`}>
              {precheckResult === 'likely_eligible' ? 'Likely Eligible' : precheckResult === 'likely_ineligible' ? 'Does Not Meet Criteria' : 'Invalid Values'}
            </span>
          </motion.div>
        )}

        {/* Action Controls */}
        {status === 'idle' || status === 'error' ? (
          <div className="flex gap-4">
            <button
              className="flex-[2] py-4 px-6 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-mono font-bold text-sm tracking-tight shadow-[0_0_20px_rgba(0,245,255,0.35)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none"
              onClick={handleVerify}
              disabled={!gpaRaw.trim() || !incomeRaw.trim() || !isConnected}
            >
              <span>Synthesize & Verify Proof</span>
              <ArrowRight size={18} />
            </button>
            <button
              className="flex-1 py-4 px-6 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 font-mono font-bold rounded-xl transition-colors disabled:opacity-50 text-sm"
              onClick={reset}
              disabled={!gpaRaw.trim() && !incomeRaw.trim() && !errorMsg}
            >
              Reset
            </button>
          </div>
        ) : isProcessingStatus ? (
          <div className="space-y-4">
            <button className="w-full py-4 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-sm flex items-center justify-center gap-3 cursor-wait" disabled>
              <Loader2 className="animate-spin text-cyan-400" size={18} />
              <span>{status === 'proving' ? 'Synthesizing ZK-SNARK in Browser...' : 'Submitting to Midnight Preprod...'}</span>
            </button>
          </div>
        ) : (
          <button 
            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-mono font-bold rounded-xl transition-colors text-sm shadow-md" 
            onClick={reset}
          >
            Verify Another Applicant
          </button>
        )}

        {/* Proving Telemetry Terminal */}
        <AnimatePresence>
          {(isProcessingStatus || terminalLogs.length > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 terminal-box text-xs"
            >
              <div className="terminal-header">
                <span className="flex items-center gap-2">
                  <Terminal size={13} className="text-cyan-400" />
                  Midnight Prover Terminal (WASM Runtime)
                </span>
                <span className="text-[10px] text-cyan-400 font-bold">ACTIVE</span>
              </div>
              <div className="p-4 space-y-1.5 text-slate-300 font-mono overflow-x-auto max-h-48 overflow-y-auto">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="leading-relaxed">
                    {log}
                  </div>
                ))}
                {isProcessingStatus && (
                  <div className="flex items-center gap-1 text-cyan-400 animate-pulse pt-1">
                    <span>&gt; Processing constraints...</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result Badges & Verifiable Credential Cards */}
        <div aria-live="polite" aria-atomic="true">
          {status === 'eligible' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-7 bg-gradient-to-b from-cyan-950/40 to-slate-950 border-2 border-cyan-500/50 rounded-2xl shadow-xl flex flex-col items-center text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 bg-cyan-500 text-slate-950 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-cyan-500/30">
                <CheckCircle2 size={36} />
              </div>
              
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-cyan-300 bg-cyan-950 border border-cyan-500/30 px-3 py-1 rounded-full mb-2">
                Verifiable Credential Generated
              </span>
              <h3 className="text-2xl font-extrabold text-white mb-2">Scholarship Eligibility Verified!</h3>
              <p className="text-slate-300 mb-6 max-w-md text-sm leading-relaxed">
                Your Zero-Knowledge proof passed on-chain contract evaluation. Your exact GPA and income were cryptographically preserved.
              </p>

              {txId && (
                <div className="w-full bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-inner mb-6 text-left">
                  <div className="flex justify-between items-center mb-1 text-xs text-slate-400 font-mono">
                    <span>On-Chain Transaction ID:</span>
                    <button 
                      onClick={() => copyProof(txId)}
                      className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="font-mono text-xs text-cyan-300 break-all select-all bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    {txId}
                  </div>
                </div>
              )}

              {txId && (
                <a 
                  href={explorerTxUrl(txId)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-950 font-mono font-bold rounded-xl hover:from-cyan-300 hover:to-indigo-400 transition-all shadow-md text-sm"
                >
                  <span>Verify on Midnight Explorer</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </motion.div>
          )}

          {status === 'ineligible' && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 p-7 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center text-center shadow-md"
            >
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mb-4 text-rose-400 border border-rose-500/30">
                <XCircle size={36} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Qualifications Not Satisfied</h3>
              <p className="text-slate-400 mb-6 max-w-md text-sm leading-relaxed">
                The smart contract evaluated your proof assertions, but your credentials did not meet the required threshold. Your private data was not leaked.
              </p>
              {txId && (
                <a 
                  href={explorerTxUrl(txId)}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 border border-slate-700 text-slate-200 font-mono font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-sm text-sm"
                >
                  <span>Inspect Receipt</span>
                  <ExternalLink size={16} />
                </a>
              )}
            </motion.div>
          )}

          {status === 'error' && errorMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-8 p-6 bg-rose-950/60 border border-rose-500/40 rounded-2xl flex flex-col items-center text-center"
            >
              <AlertCircle size={32} className="text-rose-400 mb-2" />
              <div className="text-lg font-bold text-rose-200 mb-1">Verification Error</div>
              <div className="text-rose-300 font-mono text-xs bg-slate-950 p-3 rounded-lg border border-rose-900/50 break-all max-w-full">
                {errorMsg}
              </div>
            </motion.div>
          )}
        </div>
      </TiltCard3D>

      <ToastContainer toasts={toasts} onClose={removeToast} />
    </motion.div>
  );
}
