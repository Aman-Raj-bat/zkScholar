import React, { useState } from 'react';
import { ShieldCheck, Lock, Sparkles, ArrowRight, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import TiltCard3D from './TiltCard3D';

export function ZkSimulator() {
  const [gpa, setGpa] = useState<number>(8.5);
  const [income, setIncome] = useState<number>(65000);
  const [viewMode, setViewMode] = useState<'prover' | 'observer'>('observer');

  const minGpa = 8.0; // Scaled to 800
  const maxIncome = 250000;
  const isEligible = gpa >= minGpa && income <= maxIncome;

  // Cryptographic deterministic commitment simulator
  const commitmentHash = `0x${((Math.floor(gpa * 100) * 8191) ^ (income * 131)).toString(16).padStart(8, '0')}${Math.abs((income * 97) ^ 0x4f89ac).toString(16).slice(0, 8)}...8a2f`;

  return (
    <TiltCard3D 
      className="w-full p-6 md:p-8 bg-slate-900/90 border-slate-800 shadow-2xl relative overflow-hidden text-slate-100"
      glowColor="rgba(0, 245, 255, 0.15)"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with View Toggle */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-1.5">
            <Sparkles size={12} className="text-cyan-400" />
            <span>INTERACTIVE ZK CIRCUIT SIMULATOR</span>
          </div>
          <h4 className="text-xl font-extrabold text-white tracking-tight">
            See Zero-Knowledge Privacy in Action
          </h4>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setViewMode('observer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'observer'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <EyeOff size={13} />
            <span>Observer View</span>
          </button>
          <button
            onClick={() => setViewMode('prover')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'prover'
                ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40 font-bold shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye size={13} />
            <span>Prover View</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Step 1: Client Private Inputs */}
        <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Lock size={13} /> 1. Client Witness Buffer
            </span>
            <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-500/30 px-2 py-0.5 rounded">
              Local RAM Only
            </span>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-slate-300 font-medium">Academic Score / GPA:</span>
              <span className="font-mono text-cyan-300 font-bold">{gpa.toFixed(1)} / 10.0</span>
            </div>
            <input
              type="range"
              min="5.0"
              max="10.0"
              step="0.1"
              value={gpa}
              onChange={(e) => setGpa(parseFloat(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Min Required: {minGpa.toFixed(1)}</span>
              <span className={gpa >= minGpa ? 'text-emerald-400' : 'text-rose-400'}>
                {gpa >= minGpa ? 'Satisfies Constraint' : 'Below Minimum'}
              </span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-slate-300 font-medium">Annual Household Income:</span>
              <span className="font-mono text-violet-300 font-bold">${income.toLocaleString()} USD</span>
            </div>
            <input
              type="range"
              min="20000"
              max="350000"
              step="5000"
              value={income}
              onChange={(e) => setIncome(parseInt(e.target.value, 10))}
              className="w-full accent-violet-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>Max Ceiling: ${maxIncome.toLocaleString()}</span>
              <span className={income <= maxIncome ? 'text-emerald-400' : 'text-rose-400'}>
                {income <= maxIncome ? 'Satisfies Need Gate' : 'Exceeds Ceiling'}
              </span>
            </div>
          </div>
        </div>

        {/* Center: WASM Synthesis Indicator */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-slate-500 py-2">
          <div className="hidden lg:flex flex-col items-center gap-2">
            <span className="text-[10px] font-mono text-cyan-400/80 uppercase tracking-widest text-center">
              WASM Synthesis
            </span>
            <div className="w-11 h-11 rounded-xl bg-slate-950 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-950/40">
              <ArrowRight size={20} className="animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-slate-500">~180ms</span>
          </div>
          <div className="flex lg:hidden items-center justify-center gap-2 text-slate-400 text-xs font-mono">
            <span>Midnight WASM Synthesis</span>
            <ArrowRight size={14} />
          </div>
        </div>

        {/* Step 2: What On-Chain Ledger & Public Observers See */}
        <div className="lg:col-span-5 bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-violet-400 font-bold">
              <ShieldCheck size={14} /> 2. Public On-Chain Ledger
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
              Midnight Preprod
            </span>
          </div>

          <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800 font-mono text-xs">
            <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Cryptographic Commitment:</span>
              <span className="text-cyan-400 text-[9px]">COMPACT ZK PROOF</span>
            </div>
            <div className="text-cyan-300 font-semibold truncate select-all">{commitmentHash}</div>
          </div>

          {/* Observer View vs Prover View Representation */}
          <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs font-mono space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Ledger Visible GPA:</span>
              <span className={viewMode === 'prover' ? 'text-cyan-300 font-bold' : 'text-slate-500'}>
                {viewMode === 'prover' ? `${gpa.toFixed(1)} (Prover Only)` : 'NULL [Hidden]'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Ledger Visible Income:</span>
              <span className={viewMode === 'prover' ? 'text-violet-300 font-bold' : 'text-slate-500'}>
                {viewMode === 'prover' ? `$${income.toLocaleString()} (Prover Only)` : 'NULL [Hidden]'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-400 font-mono">Evaluation Verdict:</span>
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono ${
                isEligible
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-950/40'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
              }`}
            >
              {isEligible ? (
                <>
                  <CheckCircle2 size={13} className="text-emerald-400" />
                  <span>ELIGIBLE (VERIFIED TRUE)</span>
                </>
              ) : (
                <>
                  <XCircle size={13} className="text-rose-400" />
                  <span>INELIGIBLE (FAILED CRITERIA)</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </TiltCard3D>
  );
}

export default ZkSimulator;
