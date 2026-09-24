import React from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import { 
  ShieldCheck, 
  LockKeyhole, 
  Zap, 
  ChevronRight, 
  Cpu, 
  Database, 
  Sparkles, 
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import BackgroundPaths from '../components/ui/BackgroundPaths';
import MarqueeTicker from '../components/ui/MarqueeTicker';
import ZkSimulator from '../components/ui/ZkSimulator';
import BentoGrid21st from '../components/ui/BentoGrid21st';
import ZkCryptographicCore3D from '../components/3d/ZkCryptographicCore3D';
import TiltCard3D from '../components/ui/TiltCard3D';
import ShimmerButton from '../components/ui/ShimmerButton';
import GlowBadge from '../components/ui/GlowBadge';
import ZkScholarLogo from '../components/ui/ZkScholarLogo';
import { PREPROD_CONTRACT_ADDRESS } from '../config';

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 24 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="flex flex-col gap-14 pb-20 relative overflow-hidden"
    >
      {/* Background Animated Paths & Glows */}
      <BackgroundPaths />

      {/* Hero Section: 2-Column with Interactive 3D Cryptographic Core */}
      <section className="relative pt-6 md:pt-14 pb-4 px-2 sm:px-4 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Headline, Copy, Action Buttons */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* 21st.dev Animated Network Badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-lg shadow-cyan-950/40 text-xs font-mono mb-6 backdrop-blur-md">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="text-cyan-300 font-bold">Midnight Network Preprod</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">Zero-Knowledge Verifier</span>
            </div>

            {/* Hero Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 text-white leading-[1.08]">
              Verify Tech Grants <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                Without Exposing Your Privacy
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-400 mb-8 max-w-xl text-base sm:text-lg leading-relaxed font-normal">
              Prove your academic merit and financial eligibility on the Midnight blockchain 
              without ever leaking your GPA, exam grades, or household income tax slips. 
              Powered by local WASM zero-knowledge circuits.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <ShimmerButton to="/verify" variant="cyan" size="lg" className="sm:w-auto">
                <span>Verify Eligibility</span>
                <ChevronRight size={18} />
              </ShimmerButton>

              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-mono text-sm transition-all shadow-sm hover:border-slate-500"
              >
                <span>Architecture Guide</span>
                <ExternalLink size={15} className="text-slate-400" />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 w-full flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-emerald-400" />
                <span>Client-Side Witness</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-cyan-400" />
                <span>Zero Server Telemetry</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className="text-violet-400" />
                <span>Non-Custodial</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Interactive 3D Three.js Cryptographic Core */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full max-w-[420px] relative">
              {/* 3D WebGL Canvas */}
              <ZkCryptographicCore3D interactive={true} />

              {/* Floating 21st.dev Metric Tag */}
              <div className="absolute top-4 right-0 p-3 rounded-xl bg-slate-950/80 border border-slate-800 backdrop-blur-md font-mono text-[11px] shadow-xl pointer-events-none hidden sm:block">
                <span className="text-slate-500 block text-[9px] uppercase">CIRCUIT PERFORMANCE</span>
                <span className="text-cyan-300 font-bold">&lt; 190ms Synthesis</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Infinite Marquee Ticker */}
      <motion.div variants={itemVariants} className="w-full">
        <MarqueeTicker />
      </motion.div>

      {/* Performance Metrics Trio */}
      <motion.section variants={itemVariants} className="w-full px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <TiltCard3D 
            className="p-7 text-center bg-slate-900/70 border-slate-800"
            glowColor="rgba(0, 245, 255, 0.12)"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-1.5 tracking-tight font-mono">
              100%
            </div>
            <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1">
              Client Witness Isolation
            </div>
            <p className="text-xs text-slate-400">
              GPA & income never leave local device browser RAM
            </p>
          </TiltCard3D>

          <TiltCard3D 
            className="p-7 text-center bg-slate-900/70 border-slate-800"
            glowColor="rgba(168, 85, 247, 0.15)"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 mb-1.5 tracking-tight font-mono">
              &lt; 190ms
            </div>
            <div className="text-xs font-mono font-bold text-violet-400 uppercase tracking-widest mb-1">
              WASM Proof Latency
            </div>
            <p className="text-xs text-slate-400">
              Optimized Midnight Compact zero-knowledge execution
            </p>
          </TiltCard3D>

          <TiltCard3D 
            className="p-7 text-center bg-slate-900/70 border-slate-800"
            glowColor="rgba(16, 185, 129, 0.12)"
          >
            <div className="text-4xl md:text-5xl font-extrabold text-white mb-1.5 tracking-tight font-mono">
              ZERO
            </div>
            <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest mb-1">
              Information Leakage
            </div>
            <p className="text-xs text-slate-400">
              Public ledger records only valid cryptographic truth
            </p>
          </TiltCard3D>
        </div>
      </motion.section>

      {/* 21st.dev Style Bento Grid */}
      <BentoGrid21st />

      {/* Interactive ZK Circuit Simulator Section */}
      <motion.section variants={itemVariants} className="w-full max-w-5xl mx-auto px-2 mt-4">
        <ZkSimulator />
      </motion.section>

      {/* 3-Stage Cryptographic Pipeline (How It Works) */}
      <motion.section variants={itemVariants} className="max-w-5xl mx-auto px-2 mt-10 w-full">
        <div className="text-center mb-10">
          <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase mb-2 block">
            CRYPTOGRAPHIC WORKFLOW
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            How zkScholar Works
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <TiltCard3D className="p-7 bg-slate-900/70 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mb-5 font-mono font-bold text-base shadow-inner">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Input Private Witness</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Enter your GPA and household income into the browser. Raw numbers are held temporarily in local memory and are never transmitted over HTTP.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-cyan-400/80 font-mono">
              [Device-Only Memory]
            </div>
          </TiltCard3D>

          {/* Card 2 */}
          <TiltCard3D className="p-7 bg-slate-900/70 border-slate-800" glowColor="rgba(168, 85, 247, 0.2)">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white flex items-center justify-center mb-5 font-mono font-bold text-base shadow-lg shadow-violet-950">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">WASM Proof Synthesis</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Midnight Compact circuit executes inside your browser. It synthesizes a cryptographic proof that you satisfy the grant thresholds.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-violet-400 font-mono">
              [ZK-SNARK Polynomial]
            </div>
          </TiltCard3D>

          {/* Card 3 */}
          <TiltCard3D className="p-7 bg-slate-900/70 border-slate-800">
            <div className="w-12 h-12 rounded-xl bg-slate-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-5 font-mono font-bold text-base shadow-inner">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">On-Chain Attestation</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Only the succinct proof token is broadcast to Midnight Preprod. The ledger records your qualified status with zero identity leaks.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-emerald-400/80 font-mono">
              [Preprod Blockchain]
            </div>
          </TiltCard3D>
        </div>
      </motion.section>

      {/* Observer Privacy Matrix: What Is Hidden vs What Is Visible */}
      <motion.section variants={itemVariants} className="max-w-4xl mx-auto px-2 mt-10 w-full">
        <TiltCard3D className="p-8 bg-slate-900/80 border-slate-800" glowColor="rgba(0, 245, 255, 0.1)">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">Zero-Knowledge Observer Matrix</h3>
            <p className="text-slate-400 text-xs font-mono">WHAT AN ON-CHAIN OBSERVER CAN & CANNOT LEARN</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4 font-bold">Data Item</th>
                  <th className="py-3 px-4 font-bold">Visibility Status</th>
                  <th className="py-3 px-4 font-bold">Storage Domain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr>
                  <td className="py-3 px-4 text-white font-semibold">Student Exact GPA</td>
                  <td className="py-3 px-4 text-emerald-400 flex items-center gap-1.5 font-bold">
                    <EyeOff size={14} />
                    <span>PERMANENTLY HIDDEN</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">Client Memory (WASM)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white font-semibold">Family Household Income</td>
                  <td className="py-3 px-4 text-emerald-400 flex items-center gap-1.5 font-bold">
                    <EyeOff size={14} />
                    <span>PERMANENTLY HIDDEN</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">Client Memory (WASM)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white font-semibold">Eligibility Verification Result</td>
                  <td className="py-3 px-4 text-cyan-300 flex items-center gap-1.5 font-bold">
                    <Eye size={14} />
                    <span>PUBLIC ON-CHAIN</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">Midnight Preprod Ledger</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-white font-semibold">Grant Min Thresholds</td>
                  <td className="py-3 px-4 text-cyan-300 flex items-center gap-1.5 font-bold">
                    <Eye size={14} />
                    <span>PUBLIC ON-CHAIN</span>
                  </td>
                  <td className="py-3 px-4 text-slate-400">Midnight Smart Contract</td>
                </tr>
              </tbody>
            </table>
          </div>
        </TiltCard3D>
      </motion.section>

      {/* Bottom CTA Banner */}
      <motion.section variants={itemVariants} className="max-w-4xl mx-auto px-2 mt-8 w-full">
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/80 p-8 sm:p-12 text-center text-white relative overflow-hidden shadow-2xl border border-slate-800">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
            
            <div className="mb-4">
              <ZkScholarLogo size="lg" animated={true} />
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold mb-3 tracking-tight">
              Ready to verify without sacrificing privacy?
            </h3>
            
            <p className="text-slate-400 text-sm sm:text-base mb-8 leading-relaxed">
              Connect your Lace wallet on Midnight Preprod and generate your cryptographic eligibility credential in under 2 minutes.
            </p>
            
            <ShimmerButton to="/verify" variant="cyan" size="lg">
              <span>Launch Verifier Now</span>
              <ArrowRight size={18} />
            </ShimmerButton>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}
