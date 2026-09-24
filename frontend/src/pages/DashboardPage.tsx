import React, { useEffect, useState } from 'react';
import { BarChart3, CheckCircle, XCircle, FileText, ExternalLink, Trash2, Activity, ShieldCheck } from 'lucide-react';
import { getStats, getProofHistory, clearProofHistory } from '../lib/proofHistory';
import type { ProofRecord } from '../lib/proofHistory';
import { explorerTxUrl } from '../constants';
import { ProofExport } from '../components/ProofExport';
import { useLiveCriteria } from '../hooks/useLiveCriteria';
import { motion } from 'framer-motion';
import TiltCard3D from '../components/ui/TiltCard3D';
import GlowBadge from '../components/ui/GlowBadge';
import ZkScholarLogo from '../components/ui/ZkScholarLogo';

export default function DashboardPage() {
  const [stats, setStats] = useState({ total: 0, passed: 0, failed: 0 });
  const [history, setHistory] = useState<ProofRecord[]>([]);
  
  const { deadline, maxClaims, totalClaims, isActive } = useLiveCriteria();

  useEffect(() => {
    setStats(getStats());
    setHistory(getProofHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear your local proof history?')) {
      clearProofHistory();
      setStats({ total: 0, passed: 0, failed: 0 });
      setHistory([]);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-5xl mx-auto py-8 px-4"
    >
      {/* Page Header */}
      <div className="mb-10 text-center">
        <div className="flex justify-center mb-4">
          <ZkScholarLogo size="md" animated={true} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2 tracking-tight">
          Proof Analytics & History
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
          View local verification records and Midnight smart contract telemetry.
        </p>
      </div>

      {/* Stats Counter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TiltCard3D 
          className="p-6 text-center bg-slate-900/80 border-slate-800"
          glowColor="rgba(0, 245, 255, 0.12)"
        >
          <FileText size={28} className="text-slate-400 mx-auto mb-2" />
          <div className="text-4xl font-extrabold text-white font-mono">{stats.total}</div>
          <div className="text-slate-400 text-xs font-mono font-bold uppercase tracking-widest mt-1">Total Proofs</div>
        </TiltCard3D>

        <TiltCard3D 
          className="p-6 text-center bg-slate-900/80 border-slate-800"
          glowColor="rgba(16, 185, 129, 0.15)"
        >
          <CheckCircle size={28} className="text-emerald-400 mx-auto mb-2" />
          <div className="text-4xl font-extrabold text-emerald-400 font-mono">{stats.passed}</div>
          <div className="text-emerald-300/80 text-xs font-mono font-bold uppercase tracking-widest mt-1">Verified Eligible</div>
        </TiltCard3D>

        <TiltCard3D 
          className="p-6 text-center bg-slate-900/80 border-slate-800"
          glowColor="rgba(244, 63, 94, 0.12)"
        >
          <XCircle size={28} className="text-rose-400 mx-auto mb-2" />
          <div className="text-4xl font-extrabold text-rose-400 font-mono">{stats.failed}</div>
          <div className="text-rose-300/80 text-xs font-mono font-bold uppercase tracking-widest mt-1">Ineligible</div>
        </TiltCard3D>
      </div>

      {/* Contract Live Status */}
      <TiltCard3D className="p-7 mb-8 bg-slate-900/80 border-slate-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity size={20} className="text-cyan-400" />
            <span>Preprod Contract Telemetry</span>
          </h2>
          <GlowBadge variant="cyan" pulse={true} className="text-[11px]">
            Live on Preprod
          </GlowBadge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5">Circuit Gate Status</div>
            <div className={`text-xl font-bold font-mono ${isActive ? 'text-emerald-400' : 'text-rose-400'}`}>
              {isActive ? 'Active (Open)' : 'Paused'}
            </div>
            <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">Accepting proof transactions</span>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5">Application Deadline</div>
            <div className="text-xl font-bold text-white font-mono">
              {new Date(deadline * 1000).toLocaleDateString()}
            </div>
            <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">Preprod timestamp epoch</span>
          </div>

          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80">
            <div className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-1.5">Grant Slots Remaining</div>
            <div className="text-xl font-extrabold text-white font-mono">
              {Math.max(0, maxClaims - totalClaims)} <span className="text-slate-500 text-sm">/ {maxClaims}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-mono mt-0.5 block">Available allocations</span>
          </div>
        </div>
      </TiltCard3D>

      {/* Pass/Fail Ratio Bar */}
      {stats.total > 0 && (
        <TiltCard3D className="p-7 mb-8 bg-slate-900/80 border-slate-800">
          <h2 className="text-lg font-bold text-white mb-4">Pass / Fail Verification Ratio</h2>
          <div className="w-full h-8 flex rounded-full overflow-hidden shadow-inner bg-slate-950 border border-slate-800 p-1">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-l-full transition-all duration-1000 ease-out"
              style={{ width: `${(stats.passed / stats.total) * 100}%` }} 
              title={`Passed: ${stats.passed}`}
            />
            <div 
              className="bg-gradient-to-r from-rose-500 to-amber-500 rounded-r-full transition-all duration-1000 ease-out"
              style={{ width: `${(stats.failed / stats.total) * 100}%` }} 
              title={`Failed: ${stats.failed}`}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs font-mono font-bold">
            <span className="text-emerald-400">{Math.round((stats.passed / stats.total) * 100)}% Verified Eligible</span>
            <span className="text-rose-400">{Math.round((stats.failed / stats.total) * 100)}% Ineligible</span>
          </div>
        </TiltCard3D>
      )}

      {/* Proof History Table */}
      <TiltCard3D className="p-7 bg-slate-900/80 border-slate-800">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Local Proof History</h2>
            <p className="text-slate-400 text-xs font-mono">Stored in browser localStorage for privacy</p>
          </div>
          {history.length > 0 && (
            <button 
              onClick={handleClear}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30 rounded-lg text-xs font-mono transition-colors"
            >
              <Trash2 size={14} /> Clear History
            </button>
          )}
        </div>

        {history.length === 0 ? (
          <div className="text-center py-12 bg-slate-950/60 rounded-xl border border-slate-800/80 border-dashed">
            <FileText size={40} className="mx-auto text-slate-600 mb-3" />
            <p className="text-slate-400 font-mono text-sm">No proofs recorded on this device yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-3 px-4 font-bold uppercase">Timestamp</th>
                  <th className="py-3 px-4 font-bold uppercase">GPA Range</th>
                  <th className="py-3 px-4 font-bold uppercase">Income Range</th>
                  <th className="py-3 px-4 font-bold uppercase">Evaluation</th>
                  <th className="py-3 px-4 font-bold uppercase">Transaction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {history.map((record) => (
                  <tr key={record.id} className="hover:bg-slate-850/50 transition-colors">
                    <td className="py-3 px-4 text-slate-300">{new Date(record.timestamp).toLocaleString()}</td>
                    <td className="py-3 px-4 text-slate-300">{record.gpaRange}</td>
                    <td className="py-3 px-4 text-slate-300">{record.incomeRange}</td>
                    <td className="py-3 px-4">
                      {record.result === 'eligible' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                          <CheckCircle size={12} /> Eligible
                        </span>
                      ) : record.result === 'ineligible' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-300 border border-rose-500/30 text-[11px] font-bold">
                          <XCircle size={12} /> Ineligible
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-500/30 text-[11px] font-bold">Error</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {record.txId ? (
                        <div className="flex gap-3 items-center">
                          <a 
                            href={explorerTxUrl(record.txId)} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 transition-colors"
                          >
                            <span>Receipt</span>
                            <ExternalLink size={12} />
                          </a>
                          <ProofExport proofId={record.id} txHash={record.txId} timestamp={record.timestamp} />
                        </div>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TiltCard3D>
    </motion.div>
  );
}
