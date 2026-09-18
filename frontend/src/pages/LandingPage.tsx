import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, type Variants } from 'framer-motion';
import {
  Zap,
  LockKeyhole,
  ShieldCheck,
  ChevronRight,
  Code2,
  Cpu,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Terminal,
  Binary,
  Globe,
  CheckCircle2,
} from 'lucide-react';

// Animated background grid with neon nodes
function CyberGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Large radial glow blobs */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.07) 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)', animationDelay: '3s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full animate-pulse-slow"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', animationDelay: '1.5s' }}
      />
    </div>
  );
}

// Animated ZK Proof terminal simulation
function ZkTerminal() {
  const lines = [
    { delay: 0,    text: '$ zkscholar init --network preprod',  color: '#8b9dc3' },
    { delay: 0.5,  text: '▶ Loading circuit: apply_for_grant()', color: '#00f5ff' },
    { delay: 1.2,  text: '▶ Reading private witness: cs_score=920, coding_hours=2400...', color: '#00f5ff' },
    { delay: 2.2,  text: '✓ Generating zero-knowledge proof...', color: '#a855f7' },
    { delay: 3.4,  text: '✓ Proof synthesized in 2.3s', color: '#10ffb0' },
    { delay: 4.2,  text: '✓ Nullifier recorded on Midnight Preprod', color: '#10ffb0' },
    { delay: 5.0,  text: '🎓 Grant eligibility verified. No data exposed.', color: '#00f5ff', bold: true },
  ];

  return (
    <div className="terminal-box w-full max-w-2xl mx-auto">
      <div className="terminal-header">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full" style={{ background: '#ff5f56' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#ffbd2e' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#27c93f' }} />
        </div>
        <span className="font-mono" style={{ color: '#00f5ff', fontSize: '0.7rem' }}>zkScholar — proof-engine</span>
        <Terminal size={12} style={{ color: '#4a5880' }} />
      </div>
      <div className="p-5 space-y-2 min-h-[200px]">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: line.delay, duration: 0.4 }}
            className="flex items-start gap-2 text-xs leading-relaxed"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: line.color, fontWeight: line.bold ? 700 : 400 }}
          >
            {line.text}
          </motion.div>
        ))}
        <motion.span
          className="inline-block w-2 h-4 ml-0.5"
          style={{ background: '#00f5ff' }}
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    </div>
  );
}

const featureCards = [
  {
    icon: <EyeOff size={26} />,
    title: 'Private Witnesses',
    body: 'Your CS score, coding hours, and family income are sealed as private witnesses, computed purely in your local browser — never transmitted.',
    accent: 'cyan',
  },
  {
    icon: <ShieldCheck size={26} />,
    title: 'On-Chain Verifier',
    body: 'The Midnight Preprod ledger checks ZK proof validity against immutable smart contract criteria. No humans, no bias, no data exposure.',
    accent: 'purple',
  },
  {
    icon: <Binary size={26} />,
    title: 'Nullifier Protection',
    body: 'A cryptographic nullifier derived from your private ID prevents any double-claiming without ever revealing who you are.',
    accent: 'blue',
  },
];

const howItWorks = [
  { step: '01', icon: <Code2 size={22} />, title: 'Enter Credentials', body: 'Input your CS aptitude score, yearly coding hours, and family income in browser memory. Nothing leaves your device.' },
  { step: '02', icon: <Cpu size={22} />, title: 'ZK Proof Generated', body: 'Midnight Compact circuit executes locally, synthesizing a zero-knowledge proof that you meet all grant eligibility thresholds.' },
  { step: '03', icon: <Globe size={22} />, title: 'On-Chain Attestation', body: 'Only the cryptographic proof is submitted to Midnight Preprod. The ledger records a verifiable nullifier — no personal data.' },
];

const stats = [
  { value: '100%', label: 'Client-Side Privacy', sub: 'Data never touches servers' },
  { value: '<3s', label: 'Proof Generation', sub: 'Compact circuit speed' },
  { value: '0', label: 'Information Leaked', sub: 'ZK-SNARK guarantee' },
];

export default function LandingPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.10 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 20 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="flex flex-col gap-16 pb-24 relative overflow-hidden"
    >
      <CyberGrid />

      {/* ── HERO ── */}
      <section className="relative pt-12 md:pt-20 pb-6 text-center max-w-4xl mx-auto flex flex-col items-center px-4 z-10">

        {/* Network status pill */}
        <motion.div variants={itemVariants} className="pill pill-cyan mb-8 cursor-default">
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Midnight Network Preprod
          <span style={{ color: 'rgba(0,245,255,0.4)' }}>|</span>
          <span style={{ color: '#8b9dc3', fontWeight: 500 }}>Zero-Knowledge Grants</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.05]"
          style={{ color: '#e2e8f8' }}
        >
          Prove You Qualify.{' '}
          <br className="hidden sm:block" />
          <span
            style={{
              background: 'linear-gradient(135deg, #00f5ff 0%, #a855f7 60%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Reveal Nothing.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mb-10 max-w-2xl leading-relaxed text-lg md:text-xl px-2 font-normal"
          style={{ color: '#8b9dc3' }}
        >
          zkScholar uses zero-knowledge proofs on the Midnight blockchain so tech applicants can{' '}
          <span style={{ color: '#00f5ff', fontWeight: 600 }}>prove grant eligibility</span> without ever exposing
          their CS score, coding hours, or family income.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-20">
          <Link to="/verify" className="btn-primary text-base">
            <Zap size={18} />
            <span>Apply for Grant</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/about" className="btn-secondary text-base">
            How It Works
          </Link>
        </motion.div>
      </section>

      {/* ── ZK TERMINAL ── */}
      <motion.section variants={itemVariants} className="w-full max-w-2xl mx-auto px-4 z-10">
        <ZkTerminal />
      </motion.section>

      {/* ── STATS BAR ── */}
      <motion.section variants={itemVariants} className="w-full flex justify-center px-4 z-10">
        <div
          className="glass-card flex flex-col md:flex-row items-center justify-around w-full max-w-4xl p-8 md:p-10 gap-8 md:gap-0"
        >
          {stats.map((s, i) => (
            <React.Fragment key={s.label}>
              <div className="text-center px-4">
                <p
                  className="text-4xl md:text-5xl font-extrabold mb-1 tracking-tight"
                  style={{
                    background: i === 1
                      ? 'linear-gradient(135deg, #00f5ff, #3b82f6)'
                      : i === 2
                        ? 'linear-gradient(135deg, #a855f7, #ec4899)'
                        : 'linear-gradient(135deg, #e2e8f8, #8b9dc3)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {s.value}
                </p>
                <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#8b9dc3' }}>{s.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#4a5880' }}>{s.sub}</p>
              </div>
              {i < stats.length - 1 && (
                <div className="hidden md:block w-px h-14" style={{ background: 'rgba(0,245,255,0.12)' }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.section>

      {/* ── FEATURE CARDS ── */}
      <section className="w-full max-w-5xl mx-auto px-4 z-10">
        <div className="text-center mb-12">
          <span className="pill pill-purple mb-4 inline-block">Privacy Architecture</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ color: '#e2e8f8' }}>
            Built for Uncompromising Privacy
          </h2>
          <p className="max-w-xl mx-auto text-base" style={{ color: '#8b9dc3' }}>
            Traditional grant platforms leak transcripts and tax documents. zkScholar inverts this model completely.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featureCards.map((card) => {
            const accentMap: Record<string, string> = {
              cyan: '#00f5ff',
              purple: '#a855f7',
              blue: '#3b82f6',
            };
            const accent = accentMap[card.accent];
            return (
              <motion.div
                key={card.title}
                variants={itemVariants}
                className="glass-card p-7 flex flex-col"
                style={{ cursor: 'default' }}
              >
                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 shrink-0"
                  style={{
                    width: 52,
                    height: 52,
                    background: `rgba(${accent === '#00f5ff' ? '0,245,255' : accent === '#a855f7' ? '168,85,247' : '59,130,246'}, 0.10)`,
                    border: `1px solid ${accent}30`,
                    color: accent,
                  }}
                >
                  {card.icon}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#e2e8f8' }}>{card.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8b9dc3' }}>{card.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <motion.section variants={itemVariants} className="max-w-4xl mx-auto px-4 w-full z-10">
        <div className="text-center mb-12">
          <span className="pill pill-cyan mb-4 inline-block">Cryptographic Pipeline</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: '#e2e8f8' }}>
            How zkScholar Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {howItWorks.map((step, idx) => (
            <motion.div
              key={step.step}
              variants={itemVariants}
              className="glass-card p-7 flex flex-col items-start"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 mb-5 font-mono font-bold text-lg"
                style={{
                  background: idx === 1
                    ? 'linear-gradient(135deg, #00f5ff 0%, #3b82f6 100%)'
                    : 'rgba(13,18,36,0.9)',
                  border: idx !== 1 ? '1px solid rgba(0,245,255,0.20)' : 'none',
                  color: idx === 1 ? '#02030a' : '#00f5ff',
                  boxShadow: idx === 1 ? '0 0 16px rgba(0,245,255,0.35)' : 'none',
                }}
              >
                {step.step}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: '#e2e8f8' }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#8b9dc3' }}>{step.body}</p>
              <div className="mt-4 pt-3 w-full" style={{ borderTop: '1px solid rgba(0,245,255,0.08)' }}>
                <span className="text-xs font-mono" style={{ color: '#4a5880' }}>
                  {idx === 0 ? '[Device-Only Memory]' : idx === 1 ? '[ZK-SNARK Circuit]' : '[Preprod Blockchain]'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── PRIVACY TABLE ── */}
      <motion.section variants={itemVariants} className="max-w-4xl mx-auto px-4 w-full z-10">
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(6,8,24,0.8)',
            border: '1px solid rgba(168,85,247,0.20)',
            boxShadow: '0 0 40px rgba(168,85,247,0.06)',
          }}
        >
          <h3 className="text-xl font-bold mb-6" style={{ color: '#e2e8f8' }}>
            <span style={{ color: '#a855f7' }}>Privacy Model</span> — What observers can and cannot see
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#10ffb0' }}>✓ Publicly Visible On-Chain</p>
              {['Proof validity (boolean)', 'Total grant count', 'Nullifier hash (opaque)', 'Grant deadline & cap', 'Contract address'].map(item => (
                <div key={item} className="flex items-center gap-2 mb-2">
                  <CheckCircle2 size={14} style={{ color: '#10ffb0', flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: '#8b9dc3' }}>{item}</span>
                </div>
              ))}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#ec4899' }}>✗ Forever Private (In Witness Only)</p>
              {['CS aptitude score', 'Yearly coding hours', 'Family income figure', 'Applicant identity', 'Private key / secret'].map(item => (
                <div key={item} className="flex items-center gap-2 mb-2">
                  <Eye size={14} style={{ color: '#ec4899', flexShrink: 0 }} />
                  <span className="text-sm line-through" style={{ color: '#4a5880' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── BOTTOM CTA ── */}
      <motion.section variants={itemVariants} className="max-w-4xl mx-auto px-4 w-full z-10">
        <div
          className="rounded-3xl p-8 md:p-14 text-center relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #060818 0%, #0d1224 40%, #160c2a 100%)',
            border: '1px solid rgba(0,245,255,0.15)',
            boxShadow: '0 0 60px rgba(168,85,247,0.10)',
          }}
        >
          {/* Decorative glow */}
          <div
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)' }}
          />
          <div
            className="absolute -top-20 -left-20 w-72 h-72 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.08) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              style={{ background: 'rgba(0,245,255,0.10)', border: '1px solid rgba(0,245,255,0.25)', color: '#00f5ff' }}
            >
              <Sparkles size={26} />
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight" style={{ color: '#e2e8f8' }}>
              Ready to apply with{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #00f5ff, #a855f7)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                full privacy?
              </span>
            </h3>
            <p className="mb-8 leading-relaxed text-base" style={{ color: '#8b9dc3' }}>
              Connect your 1AM wallet and generate a ZK proof in under three minutes. No data exposed — ever.
            </p>
            <Link to="/verify" className="btn-primary text-base">
              <span>Launch zkScholar Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </motion.section>

    </motion.div>
  );
}
