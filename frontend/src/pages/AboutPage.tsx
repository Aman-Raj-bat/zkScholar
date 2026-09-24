import React from 'react';
import { motion } from 'framer-motion';
import { Shield, BookOpen, Code, Terminal, Sparkles, ExternalLink, Cpu, Lock } from 'lucide-react';
import TiltCard3D from '../components/ui/TiltCard3D';
import ZkScholarLogo from '../components/ui/ZkScholarLogo';
import GlowBadge from '../components/ui/GlowBadge';

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <ZkScholarLogo size="lg" animated={true} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
            About zkScholar
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            Privacy-preserving eligibility verification built on Midnight Network using Compact Zero-Knowledge circuits.
          </p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <TiltCard3D className="p-8 bg-slate-900/80 border-slate-800 text-white">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <div className="p-2.5 bg-rose-950/80 text-rose-400 border border-rose-500/30 rounded-xl">
                  <BookOpen size={20} /> 
                </div>
                <span>The Problem with Traditional Grants</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm">
                Traditional scholarship and tech grant applications require applicants to submit highly sensitive 
                personal dossiers — academic transcripts, financial statements, and household tax returns. 
                These files are stored indefinitely on centralized university or corporate databases, creating enormous 
                privacy risks and targets for data breaches.
              </p>
            </TiltCard3D>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <TiltCard3D className="p-8 bg-slate-900/80 border-slate-800 text-white" glowColor="rgba(0, 245, 255, 0.15)">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <div className="p-2.5 bg-cyan-950/80 text-cyan-400 border border-cyan-500/30 rounded-xl">
                  <Lock size={20} /> 
                </div>
                <span>The Midnight Zero-Knowledge Inversion</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm mb-4">
                zkScholar utilizes Midnight's Zero-Knowledge (ZK) witness capabilities to invert this model. 
                Instead of sending your data to an authority, the authority's verification circuit compiles to local WASM 
                and runs directly on your device.
              </p>
              
              <ul className="space-y-3 text-slate-300 bg-slate-950/80 p-5 rounded-xl border border-slate-800 font-mono text-xs">
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>Your GPA and household income act as <strong className="text-cyan-300 font-bold">private witnesses</strong>.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>A local WASM circuit computes constraint satisfaction without revealing values.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>Only a cryptographic proof token is submitted to Midnight Preprod consensus.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>Your private witness never leaves browser memory.</span>
                </li>
              </ul>
            </TiltCard3D>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <TiltCard3D className="p-8 bg-slate-900/80 border-slate-800 text-white">
              <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
                <div className="p-2.5 bg-violet-950/80 text-violet-400 border border-violet-500/30 rounded-xl">
                  <Terminal size={20} /> 
                </div>
                <span>Midnight Hackathon & Open Source</span>
              </h2>
              <p className="text-slate-300 leading-relaxed text-sm mb-6">
                This project was created for the <strong className="text-white">Midnight New Moon to Full Hackathon</strong>. 
                The smart contract is written in Compact, and the frontend is powered by React, Vite, Three.js, and the Midnight.js SDK.
              </p>
              <a 
                href="https://github.com/Aman-Raj-bat/zkScholar" 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-950 hover:bg-slate-800 text-white font-mono text-xs font-bold rounded-xl border border-slate-800 transition-colors shadow-sm"
              >
                <Code size={16} className="text-cyan-400" />
                <span>View Source Code on GitHub</span>
                <ExternalLink size={14} className="text-slate-500" />
              </a>
            </TiltCard3D>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
