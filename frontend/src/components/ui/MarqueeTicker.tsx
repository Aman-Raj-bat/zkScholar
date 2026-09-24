import React from 'react';
import { ShieldCheck, Cpu, Database, Activity, Lock, Sparkles, Terminal } from 'lucide-react';
import { PREPROD_CONTRACT_ADDRESS } from '../../config';

interface TickerItem {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge?: string;
  badgeColor?: string;
}

export function MarqueeTicker() {
  const items: TickerItem[] = [
    {
      icon: <Activity size={14} className="text-cyan-400" />,
      label: 'Settlement Network',
      value: 'Midnight Preprod Testnet',
      badge: 'Live',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    },
    {
      icon: <Lock size={14} className="text-violet-400" />,
      label: 'Privacy Engine',
      value: 'Zero-Knowledge Compact Circuits',
      badge: '100% Private',
      badgeColor: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
    },
    {
      icon: <Cpu size={14} className="text-emerald-400" />,
      label: 'Client Prover',
      value: 'In-Browser WASM Synthesizer',
      badge: '< 190ms',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    {
      icon: <Database size={14} className="text-sky-400" />,
      label: 'Active Contract',
      value: `${PREPROD_CONTRACT_ADDRESS.slice(0, 8)}...${PREPROD_CONTRACT_ADDRESS.slice(-6)}`,
      badge: 'Preprod',
      badgeColor: 'bg-sky-500/20 text-sky-300 border border-sky-500/30',
    },
    {
      icon: <ShieldCheck size={14} className="text-amber-400" />,
      label: 'Double-Claim Prevention',
      value: 'Nullifier Sybil Shielding',
      badge: 'Active',
      badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    },
    {
      icon: <Terminal size={14} className="text-fuchsia-400" />,
      label: 'WASM Runtime',
      value: 'V8 Compact Protocol v4.1.1',
    },
  ];

  const displayItems = [...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-slate-800/80 bg-slate-950/70 backdrop-blur-md py-3 my-6">
      {/* Edge gradient masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-28 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <div className="animate-marquee flex items-center gap-6">
        {displayItems.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-slate-800/90 text-xs text-slate-300 whitespace-nowrap shadow-sm hover:border-cyan-500/50 hover:bg-slate-850 transition-all font-mono"
          >
            {item.icon}
            <span className="text-slate-400 font-sans text-xs">{item.label}:</span>
            <span className="font-semibold text-white tracking-tight">{item.value}</span>
            {item.badge && (
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                {item.badge}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarqueeTicker;
