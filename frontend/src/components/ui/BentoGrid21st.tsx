import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  LockKeyhole, 
  Cpu, 
  Database, 
  KeyRound, 
  Fingerprint, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import TiltCard3D from './TiltCard3D';

export const BentoGrid21st: React.FC = () => {
  const [revealedProver, setRevealedProver] = useState(false);
  const [nullifierCount, setNullifierCount] = useState(1);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4">
          <Sparkles size={13} className="text-cyan-400" />
          <span>ZERO-KNOWLEDGE ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Absolute Privacy</span>
        </h2>
        <p className="text-slate-400 text-base leading-relaxed">
          Traditional platforms store tax slips and transcripts on centralized servers. 
          zkScholar inverts this paradigm with Midnight's Compact witness architecture.
        </p>
      </div>

      {/* Bento Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Bento Item 1: Wide 2-Column Card (Interactive Witness Isolation Chamber) */}
        <TiltCard3D 
          className="md:col-span-2 p-7 bg-slate-900/70 border-slate-800 hover:border-cyan-500/40"
          glowColor="rgba(0, 245, 255, 0.12)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-inner">
                    <LockKeyhole size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Client-Side Private Witness Chamber</h3>
                    <p className="text-xs font-mono text-cyan-400/80">MEMORY ISOLATION RUNTIME</p>
                  </div>
                </div>

                {/* Observer / Prover Switcher */}
                <button
                  onClick={() => setRevealedProver(!revealedProver)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-mono text-slate-300 transition-colors"
                >
                  {revealedProver ? (
                    <>
                      <EyeOff size={14} className="text-violet-400" />
                      <span>View as Public Observer</span>
                    </>
                  ) : (
                    <>
                      <Eye size={14} className="text-cyan-400" />
                      <span>View Prover Witness</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Raw academic credentials and household income are never transmitted over HTTP or stored on a blockchain ledger.
                They execute exclusively inside local WASM memory buffers.
              </p>
            </div>

            {/* Interactive Data State Simulation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-950/80 rounded-xl p-4 border border-slate-800 font-mono text-xs">
              <div className="space-y-2">
                <div className="text-slate-500 uppercase tracking-widest text-[10px] flex items-center gap-1">
                  <span>Student CS Aptitude Score</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-between">
                  <span>cs_score:</span>
                  <span className={revealedProver ? 'text-cyan-400 font-bold' : 'text-slate-500 filter blur-xs select-none'}>
                    {revealedProver ? '880 / 1000' : '0x7f4a...9b2e'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-slate-500 uppercase tracking-widest text-[10px] flex items-center gap-1">
                  <span>Annual Household Income</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 flex items-center justify-between">
                  <span>family_income:</span>
                  <span className={revealedProver ? 'text-violet-400 font-bold' : 'text-slate-500 filter blur-xs select-none'}>
                    {revealedProver ? '$38,500 USD' : '0xd12c...44a1'}
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 size={14} />
                  <span>On-Chain Visibility: <strong className="text-white">NULL (Permanently Zero)</strong></span>
                </div>
                <span className="text-slate-500 text-[10px]">Midnight Compact Witness Model</span>
              </div>
            </div>
          </div>
        </TiltCard3D>

        {/* Bento Item 2: WASM Prover Speed */}
        <TiltCard3D 
          className="p-7 bg-slate-900/70 border-slate-800 hover:border-violet-500/40"
          glowColor="rgba(168, 85, 247, 0.15)"
        >
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 flex items-center justify-center shadow-inner">
              <Cpu size={20} />
            </div>

            <div>
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 tracking-tight">
                  &lt; 190ms
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">LIGHTNING FAST</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">High-Speed Local Proving</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Midnight's Compact compiler compiles circuit constraints to optimized WebAssembly. Proof generation happens entirely in-browser in under a fraction of a second.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-[11px] text-slate-400 space-y-1">
              <div className="flex justify-between">
                <span>WASM Binary Size:</span>
                <span className="text-slate-200">1.39 MB (Compressed)</span>
              </div>
              <div className="flex justify-between">
                <span>Proof Type:</span>
                <span className="text-cyan-400">Succinct ZK-SNARK</span>
              </div>
            </div>
          </div>
        </TiltCard3D>

        {/* Bento Item 3: Cryptographic Nullifier */}
        <TiltCard3D 
          className="p-7 bg-slate-900/70 border-slate-800 hover:border-amber-500/40"
          glowColor="rgba(245, 158, 11, 0.12)"
        >
          <div className="flex flex-col h-full justify-between gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-inner">
              <Fingerprint size={20} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Nullifier Sybil Shield</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Deterministic nullifier hashes prevent students from claiming grants multiple times while ensuring identity anonymity.
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px]">
                <div className="text-slate-500 text-[10px] mb-1">DETERMINISTIC NULLIFIER</div>
                <div className="text-amber-400 truncate">
                  0x9f8c...3e1a_{nullifierCount}
                </div>
              </div>
            </div>

            <button
              onClick={() => setNullifierCount(c => c + 1)}
              className="w-full py-2 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold transition-colors"
            >
              Generate Unique Nullifier
            </button>
          </div>
        </TiltCard3D>

        {/* Bento Item 4: Wide 2-Column Card (Decentralized Midnight Consensus) */}
        <TiltCard3D 
          className="md:col-span-2 p-7 bg-slate-900/70 border-slate-800 hover:border-cyan-500/40"
          glowColor="rgba(56, 189, 248, 0.12)"
        >
          <div className="flex flex-col h-full justify-between gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center shadow-inner">
                  <Database size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Midnight Preprod Ledger Attestation</h3>
                  <p className="text-xs font-mono text-sky-400/80">CHAIN STATE VERIFIABLE</p>
                </div>
              </div>

              <a
                href="https://preprod.midnight.network"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors"
              >
                <span>Preprod Explorer</span>
                <ArrowUpRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Contract State</span>
                <span className="text-lg font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Active & Funded
                </span>
                <span className="text-[11px] text-slate-400 mt-1 block">Live on Midnight Preprod</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Verification Cost</span>
                <span className="text-lg font-bold text-cyan-300">~0.001 DUST</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Ultra-low network fee</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block mb-1">Proof Portability</span>
                <span className="text-lg font-bold text-violet-400">JSON & QR</span>
                <span className="text-[11px] text-slate-400 mt-1 block">Exportable credential</span>
              </div>
            </div>
          </div>
        </TiltCard3D>

      </div>
    </section>
  );
};

export default BentoGrid21st;
