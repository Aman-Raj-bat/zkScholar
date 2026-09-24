import React, { useState, useCallback } from 'react';
import { CompiledContract } from '@midnight-ntwrk/compact-js';
import { createUnprovenDeployTx, submitTxAsync } from '@midnight-ntwrk/midnight-js-contracts';
import { sampleSigningKey } from '@midnight-ntwrk/compact-runtime';
import { Contract } from '../managed/contract/index.js';
import { useWallet } from '../contexts/WalletContext';
import { Settings, Loader2, CheckCircle, AlertCircle, Copy, ExternalLink, ShieldAlert, Cpu } from 'lucide-react';
import { MIN_GPA_THRESHOLD, MAX_INCOME_THRESHOLD } from '../config';
import { motion } from 'framer-motion';
import TiltCard3D from '../components/ui/TiltCard3D';
import ZkScholarLogo from '../components/ui/ZkScholarLogo';
import GlowBadge from '../components/ui/GlowBadge';

function getCompiledContract() {
  return CompiledContract.make('ScholarshipContract', Contract).pipe(
    CompiledContract.withVacantWitnesses,
    CompiledContract.withCompiledFileAssets(new URL('/managed', window.location.origin).toString()),
  ) as any;
}

export default function AdminPage() {
  const { session, isConnected, connect } = useWallet();
  const [status, setStatus] = useState<'idle' | 'deploying' | 'deployed' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deployedAddress, setDeployedAddress] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isLocal = session?.config?.indexerUri?.includes('localhost') || session?.config?.indexerUri?.includes('127.0.0.1');

  const handleDeploy = useCallback(async () => {
    if (!session || !isConnected) return;
    setStatus('deploying');
    setErrorMsg(null);

    try {
      const compiledContract = getCompiledContract();
      const initialPrivateState = {};

      const deployTxData = await createUnprovenDeployTx(session.providers as any, {
        compiledContract,
        args: [BigInt(MIN_GPA_THRESHOLD), BigInt(MAX_INCOME_THRESHOLD)],
        privateStateId: 'DeployerState',
        initialPrivateState,
        signingKey: sampleSigningKey(),
      });

      const contractAddress = deployTxData.public.contractAddress;
      
      await submitTxAsync(session.providers as any, {
        unprovenTx: deployTxData.private.unprovenTx,
      });

      setDeployedAddress(contractAddress);
      localStorage.setItem('PREPROD_CONTRACT_ADDRESS', contractAddress);
      setStatus('deployed');
      
    } catch (e: any) {
      setStatus('error');
      setErrorMsg(e?.message ?? String(e));
    }
  }, [session, isConnected]);

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] px-4">
        <TiltCard3D className="max-w-md w-full p-8 text-center bg-slate-900/90 border-slate-800 text-white">
          <div className="w-16 h-16 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-5 text-slate-400">
            <Settings size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Admin Portal</h2>
          <p className="text-slate-400 text-sm mb-6">Please connect your Midnight wallet to access the deployer interface.</p>
          <button
            onClick={() => connect('preprod')}
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-mono font-bold text-xs shadow-md transition-all"
          >
            Connect Wallet
          </button>
        </TiltCard3D>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-3xl mx-auto py-8 px-4"
    >
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1 tracking-tight">Admin & Deployment</h1>
          <p className="text-slate-400 text-sm font-mono">Deploy zkScholar contract to Midnight Preprod testnet</p>
        </div>
        <GlowBadge variant="cyan" pulse={true}>
          Admin Mode
        </GlowBadge>
      </div>

      <TiltCard3D className="p-7 sm:p-9 bg-slate-900/85 border-slate-800 text-white" glowColor="rgba(0, 245, 255, 0.15)">
        <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2.5">
          <div className="p-2 bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded-xl">
            <Settings size={20} />
          </div>
          <span>Contract Initializer</span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mb-6 leading-relaxed">
          Deploy the scholarship circuit contract to the Preprod network. The contract will be initialized with the criteria defined in the application config.
        </p>

        {isLocal && (
          <div className="mb-6 p-4 bg-amber-950/60 border border-amber-500/30 rounded-xl text-amber-200 flex gap-3 items-start text-xs font-mono">
            <ShieldAlert size={20} className="text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold mb-0.5">Warning: Local Network Detected</div>
              <div className="text-slate-400">
                Your wallet appears to be connected to a local network. Deployments on local nodes will not be accessible to Preprod users.
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Initial GPA Threshold</div>
            <div className="text-2xl font-extrabold text-cyan-300">8.00 <span className="text-xs text-slate-500 font-normal">/ 10.0</span></div>
            <span className="text-[10px] text-slate-500 mt-1 block">Scaled ×100 on ledger (800)</span>
          </div>
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 font-mono">
            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Initial Income Threshold</div>
            <div className="text-2xl font-extrabold text-violet-300">$250,000</div>
            <span className="text-[10px] text-slate-500 mt-1 block">Max annual household income</span>
          </div>
        </div>

        <div aria-live="polite" aria-atomic="true">
          {status === 'idle' || status === 'error' ? (
            <button 
              className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-slate-950 font-mono font-bold text-sm tracking-tight shadow-[0_0_20px_rgba(0,245,255,0.3)] transition-all"
              onClick={handleDeploy}
            >
              Deploy Contract to Preprod
            </button>
          ) : status === 'deploying' ? (
            <button className="w-full py-4 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-mono font-bold text-sm flex items-center justify-center gap-3 cursor-wait" disabled>
              <Loader2 className="animate-spin text-cyan-400" size={20} />
              <span>Deploying... Confirm transaction in wallet</span>
            </button>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-6 bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-xl font-mono text-xs"
            >
              <div className="flex items-center gap-2 mb-3 text-cyan-400 font-bold text-sm">
                <CheckCircle size={20} />
                <span>Successfully Deployed to Preprod!</span>
              </div>
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 flex items-center justify-between gap-4">
                <span className="text-cyan-300 truncate">{deployedAddress}</span>
                <button 
                  onClick={() => {
                    if (deployedAddress) {
                      navigator.clipboard.writeText(deployedAddress);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }
                  }}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${copied ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                >
                  <Copy size={14} />
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="mt-4">
                <a
                  href={`https://preprod.midnightexplorer.com/contracts/${deployedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                >
                  <span>View on Midnight Explorer</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          )}

          {status === 'error' && errorMsg && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-4 bg-rose-950/60 border border-rose-500/40 rounded-xl text-rose-200 text-xs font-mono"
            >
              <div className="flex items-center gap-2 font-bold text-rose-300 mb-1">
                <AlertCircle size={16} />
                <span>Deployment Failed</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded border border-rose-900/50 break-words mt-2">{errorMsg}</div>
            </motion.div>
          )}
        </div>
      </TiltCard3D>
    </motion.div>
  );
}
