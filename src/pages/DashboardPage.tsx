import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { DashboardCharts } from '../components/DashboardCharts';
import { 
  Compass, 
  ShieldCheck, 
  AlertTriangle, 
  Activity, 
  Cpu, 
  ExternalLink,
  PlusCircle,
  Clock,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardPageProps {
  onLogout: () => void;
  userEmail?: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onLogout, userEmail }) => {
  const navigate = useNavigate();

  // Mock list of recent scans for the cybersecurity telemetry table
  const recentScans = [
    {
      id: 'sc-902',
      title: 'Quantum supercomputing node claims entropy violation core activation',
      source: 'techfuture-telemetry.org',
      score: 18,
      label: 'FAKE NEWS',
      time: '14 minutes ago',
    },
    {
      id: 'sc-899',
      title: 'Deep sea hydrothermal vents host carbon-silicon hybrid crystalline lifeforms',
      source: 'oceanographic-bulletin.net',
      score: 52,
      label: 'SUSPICIOUS',
      time: '2 hours ago',
    },
    {
      id: 'sc-891',
      title: 'Global tech alliance agrees on centralized cryptographic AI registry standards',
      source: 'reuters.com',
      score: 94,
      label: 'VERIFIED',
      time: '5 hours ago',
    },
    {
      id: 'sc-882',
      title: 'NASA receives repeating narrow-band radio signals from Kepler-186f sector',
      source: 'cosmictelemetry-hub.com',
      score: 38,
      label: 'CLICKBAIT',
      time: '1 day ago',
    },
    {
      id: 'sc-875',
      title: 'Federal bank introduces quantum-encrypted treasury bond ledger network',
      source: 'bloomberg.com',
      score: 91,
      label: 'VERIFIED',
      time: '3 days ago',
    },
  ];

  const getLabelStyle = (label: string) => {
    switch (label) {
      case 'VERIFIED':
        return 'text-cyber-green bg-cyber-green/5 border-cyber-green/20';
      case 'SUSPICIOUS':
        return 'text-cyber-yellow bg-cyber-yellow/5 border-cyber-yellow/20';
      case 'CLICKBAIT':
        return 'text-cyber-pink bg-cyber-pink/5 border-cyber-pink/20';
      case 'FAKE NEWS':
        return 'text-cyber-red bg-cyber-red/5 border-cyber-red/20';
      default:
        return 'text-slate-400 bg-slate-900 border-slate-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-cyber-green';
    if (score >= 50) return 'text-cyber-yellow';
    if (score >= 35) return 'text-cyber-pink';
    return 'text-cyber-red';
  };

  return (
    <div className="min-h-screen bg-cyber-black flex relative overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-cyber-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-64 w-96 h-96 rounded-full bg-cyber-purple/5 blur-3xl pointer-events-none" />

      {/* Navigation Sidebar Layout */}
      <Sidebar onLogout={onLogout} userEmail={userEmail} />

      {/* Main Panel Content Area */}
      <main className="flex-1 lg:pl-64 min-w-0 transition-all duration-300">
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 pt-20 lg:pt-10">
          
          {/* Header Action Dashboard Title */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-cyber-cyan">
                <Compass className="w-5 h-5 neon-text-cyan" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">OPERATIONS CENTER</span>
              </div>
              <h1 className="font-display font-black text-3xl text-white mt-1 leading-none">
                SECURITY WORKSPACE
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-2">Active telemetry terminal for disinformation mitigation</p>
            </div>

            {/* Quick Action Initiate Scan */}
            <button
              onClick={() => navigate('/analyze')}
              className="py-3 px-6 rounded-xl font-bold text-xs tracking-wider uppercase cyber-btn-cyan text-white flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            >
              <PlusCircle size={15} />
              <span>NEW ANALYSIS INSTANCE</span>
            </button>
          </div>

          {/* Quick Overview Stats Panels Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
            {/* Stat Item 1: Total Scans */}
            <div className="glassmorphism rounded-2xl p-5 border border-slate-900 flex items-center justify-between hover:border-slate-800 transition-colors group">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Scans Processed</p>
                <p className="text-2xl font-black text-white group-hover:text-cyber-cyan transition-colors">1,429</p>
                <p className="text-[9px] text-cyber-green font-bold">+18.4% this week</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-cyber-cyan group-hover:bg-cyber-cyan/10 transition-colors">
                <Activity size={18} />
              </div>
            </div>

            {/* Stat Item 2: Average Credibility */}
            <div className="glassmorphism rounded-2xl p-5 border border-slate-900 flex items-center justify-between hover:border-slate-800 transition-colors group">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Avg Credibility Index</p>
                <p className="text-2xl font-black text-white group-hover:text-cyber-purple transition-colors">74.2%</p>
                <p className="text-[9px] text-slate-500 font-bold">Domain threshold: 65%</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-cyber-purple group-hover:bg-cyber-purple/10 transition-colors">
                <ShieldCheck size={18} />
              </div>
            </div>

            {/* Stat Item 3: Safe Ratio */}
            <div className="glassmorphism rounded-2xl p-5 border border-slate-900 flex items-center justify-between hover:border-slate-800 transition-colors group">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Clean Scan Rate</p>
                <p className="text-2xl font-black text-white group-hover:text-cyber-green transition-colors">65.8%</p>
                <p className="text-[9px] text-cyber-green font-bold">Unflagged content ratio</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-cyber-green group-hover:bg-cyber-green/10 transition-colors">
                <ShieldCheck size={18} className="text-cyber-green" />
              </div>
            </div>

            {/* Stat Item 4: Flagged alerts */}
            <div className="glassmorphism rounded-2xl p-5 border border-slate-900 flex items-center justify-between hover:border-slate-800 transition-colors group">
              <div className="space-y-1">
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">High Risk Alerts</p>
                <p className="text-2xl font-black text-white group-hover:text-cyber-red transition-colors">15</p>
                <p className="text-[9px] text-cyber-red font-bold animate-pulse">Critical intervention required</p>
              </div>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-cyber-red group-hover:bg-cyber-red/10 transition-colors">
                <AlertTriangle size={18} />
              </div>
            </div>
          </div>

          {/* Interactive Custom SVG Analytics charts container */}
          <DashboardCharts />

          {/* Table: Cyber Telemetry Scans Log Database */}
          <div className="glassmorphism rounded-2xl border border-slate-900 overflow-hidden relative">
            
            {/* Header info */}
            <div className="p-6 border-b border-slate-900 flex items-center justify-between bg-slate-950/20">
              <div>
                <h3 className="font-display font-bold text-slate-200 text-sm tracking-wide uppercase flex items-center gap-2 select-none">
                  <Cpu size={16} className="text-cyber-cyan" />
                  <span>ANALYSIS TELEMETRY ARCHIVE</span>
                </h3>
                <p className="text-[10px] text-slate-500 font-mono mt-1">Registry of previously scanned syntactic articles</p>
              </div>
              <span className="px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-400 font-mono text-[9px] rounded-lg">
                Showing last 5 nodes
              </span>
            </div>

            {/* Responsive Table layout */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-900 font-mono text-[10px] uppercase text-slate-500 tracking-wider bg-slate-950/40 select-none">
                    <th className="py-4 px-6">Scanned Article Title</th>
                    <th className="py-4 px-6">Domain Origin</th>
                    <th className="py-4 px-6 text-center">Score</th>
                    <th className="py-4 px-6">Security Rating</th>
                    <th className="py-4 px-6">Telemetry Scan Age</th>
                    <th className="py-4 px-6 text-right">Gate Link</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 font-sans text-xs text-slate-355">
                  {recentScans.map((scan) => (
                    <tr 
                      key={scan.id}
                      className="hover:bg-slate-900/25 transition-colors cursor-pointer group"
                      onClick={() => navigate('/analyze', { state: { scanData: scan } })}
                    >
                      {/* Title */}
                      <td className="py-4 px-6 font-medium text-slate-200 max-w-sm truncate group-hover:text-cyber-cyan transition-colors">
                        {scan.title}
                      </td>
                      {/* Origin Domain */}
                      <td className="py-4 px-6 font-mono text-[11px] text-slate-400">
                        {scan.source}
                      </td>
                      {/* Credibility Score */}
                      <td className="py-4 px-6 text-center font-mono text-xs font-black">
                        <span className={getScoreColor(scan.score)}>{scan.score}%</span>
                      </td>
                      {/* Status Tag Badge */}
                      <td className="py-4 px-6">
                        <span className={`inline-block px-3 py-1 rounded-full border text-[9px] font-mono font-bold tracking-wider ${getLabelStyle(scan.label)}`}>
                          {scan.label}
                        </span>
                      </td>
                      {/* Relative time */}
                      <td className="py-4 px-6 font-mono text-[10px] text-slate-500 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          <span>{scan.time}</span>
                        </div>
                      </td>
                      {/* Actions detail link */}
                      <td className="py-4 px-6 text-right">
                        <button className="p-1.5 rounded-lg border border-slate-900 hover:border-cyber-cyan/30 text-slate-500 hover:text-cyber-cyan bg-slate-950/20 group-hover:bg-cyber-cyan/5 transition-all">
                          <ExternalLink size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty dummy action footer */}
            <div className="p-4 bg-slate-950/40 border-t border-slate-900 flex justify-center text-center font-mono text-[10px]">
              <span 
                className="text-cyber-purple hover:text-cyber-cyan cursor-pointer transition-colors flex items-center gap-1.5 select-none font-bold"
                onClick={() => navigate('/analyze')}
              >
                <Sparkles size={11} className="animate-pulse" />
                <span>SPAWN SECURE MULTI-THREAD VERIFICATION NODE</span>
              </span>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};
