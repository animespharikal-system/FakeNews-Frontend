import React from 'react';
import { 
  Terminal, 
  RefreshCw, 
  Activity
} from 'lucide-react';

interface ResultData {
  type: 'text' | 'url';
  content: string;
  score: number; // 0 - 100
  label: 'VERIFIED' | 'SUSPICIOUS' | 'CLICKBAIT' | 'FAKE NEWS';
  sensationalism: number; // percentage
  bias: 'LEFT' | 'CENTER' | 'RIGHT' | 'EXTREME';
  sourceTrust: number; // percentage
  aiProbability: number; // percentage
  summary: string;
}

interface ResultCardProps {
  result: ResultData;
  onClear: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onClear }) => {
  const getRatingColor = (label: string) => {
    switch (label) {
      case 'VERIFIED':
        return 'text-cyber-green border-cyber-green bg-cyber-green/10 shadow-[0_0_15px_rgba(16,185,129,0.25)]';
      case 'SUSPICIOUS':
        return 'text-cyber-yellow border-cyber-yellow bg-cyber-yellow/10 shadow-[0_0_15px_rgba(245,158,11,0.25)]';
      case 'CLICKBAIT':
        return 'text-cyber-pink border-cyber-pink bg-cyber-pink/10 shadow-[0_0_15px_rgba(236,72,153,0.25)]';
      case 'FAKE NEWS':
        return 'text-cyber-red border-cyber-red bg-cyber-red/10 shadow-[0_0_15px_rgba(239,68,68,0.25)]';
      default:
        return 'text-slate-400 border-slate-700 bg-slate-800/10';
    }
  };

  const getScoreCircleColor = (score: number) => {
    if (score >= 80) return 'var(--color-cyber-green)';
    if (score >= 50) return 'var(--color-cyber-yellow)';
    return 'var(--color-cyber-red)';
  };

  // SVG Gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius; // ~339.29
  const strokeDashoffset = circumference - (result.score / 100) * circumference;

  return (
    <div className="glassmorphism rounded-2xl p-6 glow-border-cyber relative overflow-hidden group">
      {/* Glow decorative beam behind dial */}
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-cyber-purple/10 blur-3xl opacity-60" />

      {/* Card Header */}
      <div className="flex items-center justify-between mb-6 border-b border-slate-900 pb-4 relative">
        <div className="flex items-center gap-2">
          <Terminal className="text-cyber-purple w-4.5 h-4.5 neon-text-purple" />
          <h3 className="font-display font-black text-slate-100 text-sm uppercase tracking-widest font-mono">SCAN TELEMETRY REPORT</h3>
        </div>
        
        {/* Reset Trigger */}
        <button
          onClick={onClear}
          className="p-2 border border-slate-800 hover:border-cyber-cyan/30 bg-slate-950/40 rounded-xl text-slate-400 hover:text-cyber-cyan transition-all flex items-center gap-1.5 cursor-pointer text-xs"
        >
          <RefreshCw size={12} className="hover:rotate-180 transition-transform duration-300" />
          <span className="font-mono">NEW SCAN</span>
        </button>
      </div>

      {/* Main Breakdown Section */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative">
        
        {/* Visual Gauge Dial (Spans 4 columns) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG circle track */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke="rgba(255, 255, 255, 0.02)"
                strokeWidth="10"
              />
              <circle
                cx="60"
                cy="60"
                r={radius}
                fill="transparent"
                stroke={getScoreCircleColor(result.score)}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: `drop-shadow(0 0 6px ${getScoreCircleColor(result.score)})`
                }}
              />
            </svg>

            {/* Inner text score */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold">Credibility</span>
              <span className="font-display font-black text-3xl text-white tracking-tighter my-0.5">{result.score}%</span>
              <span className="font-mono text-[8px] text-slate-400 font-bold uppercase">Confidence</span>
            </div>
          </div>

          <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs font-mono font-black tracking-widest uppercase text-center ${getRatingColor(result.label)}`}>
            {result.label}
          </div>
        </div>

        {/* Metrics sliders breakdown (Spans 8 columns) */}
        <div className="md:col-span-8 space-y-4 font-mono">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-900/60 pb-1.5 flex items-center gap-1.5 select-none">
            <Activity size={12} className="text-cyber-cyan" />
            <span>HEURISTIC BREAKDOWN</span>
          </h4>

          {/* Metric 1: Sensationalism Index */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Sensationalism / Hype Index</span>
              <span className={`font-bold ${result.sensationalism > 50 ? 'text-cyber-pink' : 'text-slate-300'}`}>{result.sensationalism}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <div 
                className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-pink rounded-full transition-all duration-1000"
                style={{ width: `${result.sensationalism}%` }}
              />
            </div>
          </div>

          {/* Metric 2: Political Bias */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Political Bias Spectrum</span>
              <span className="font-bold text-cyber-purple">{result.bias}</span>
            </div>
            {/* Custom visual horizontal spectrum bar */}
            <div className="grid grid-cols-4 gap-1">
              <div className={`h-1.5 rounded-full ${result.bias === 'LEFT' ? 'bg-cyber-blue shadow-[0_0_6px_rgba(59,130,246,0.5)]' : 'bg-slate-950 border border-slate-900'}`} />
              <div className={`h-1.5 rounded-full ${result.bias === 'CENTER' ? 'bg-cyber-green shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-slate-950 border border-slate-900'}`} />
              <div className={`h-1.5 rounded-full ${result.bias === 'RIGHT' ? 'bg-cyber-yellow shadow-[0_0_6px_rgba(245,158,11,0.5)]' : 'bg-slate-950 border border-slate-900'}`} />
              <div className={`h-1.5 rounded-full ${result.bias === 'EXTREME' ? 'bg-cyber-red shadow-[0_0_6px_rgba(239,68,68,0.5)]' : 'bg-slate-950 border border-slate-900'}`} />
            </div>
          </div>

          {/* Metric 3: Source Trustworthiness */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Source Credibility Rating</span>
              <span className={`font-bold ${result.sourceTrust >= 75 ? 'text-cyber-green' : 'text-cyber-yellow'}`}>{result.sourceTrust}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <div 
                className="h-full bg-gradient-to-r from-cyber-yellow to-cyber-green rounded-full transition-all duration-1000"
                style={{ width: `${result.sourceTrust}%` }}
              />
            </div>
          </div>

          {/* Metric 4: AI Probability */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">AI LLM-Generation Probability</span>
              <span className={`font-bold ${result.aiProbability > 50 ? 'text-cyber-cyan' : 'text-slate-300'}`}>{result.aiProbability}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-900">
              <div 
                className="h-full bg-gradient-to-r from-slate-900 to-cyber-cyan rounded-full transition-all duration-1000"
                style={{ width: `${result.aiProbability}%` }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Terminal Verdict Summary Description */}
      <div className="mt-8 bg-slate-950/80 border border-slate-900 rounded-xl p-4 relative font-mono text-xs overflow-hidden">
        {/* Terminal decorative controls */}
        <div className="flex items-center justify-between border-b border-slate-900 pb-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-red/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-yellow/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-cyber-green/60" />
            <span className="text-[10px] text-slate-500 font-bold ml-1.5 uppercase select-none">AI VERDICT ENGINE v1.2</span>
          </div>
          <span className="text-[9px] text-slate-600 select-none">SHA256: 7F8E8...B2</span>
        </div>

        <div className="space-y-2 text-slate-300 leading-relaxed">
          <div className="flex gap-2">
            <span className="text-cyber-cyan select-none font-black">&gt;</span>
            <p><span className="text-slate-400">Execution node:</span> semantic-analyzer-7a</p>
          </div>
          <div className="flex gap-2">
            <span className="text-cyber-cyan select-none font-black">&gt;</span>
            <p><span className="text-slate-400">Context check:</span> Cross-referencing against {result.type === 'url' ? 'linked metadata registers' : 'pasted syntactic telemetry'}...</p>
          </div>
          <div className="flex gap-2">
            <span className="text-cyber-cyan select-none font-black">&gt;</span>
            <p className="text-slate-100 font-medium">{result.summary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
