import React, { useState } from 'react';
import { TrendingUp, Activity, CheckCircle } from 'lucide-react';

export const DashboardCharts: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  // Line Chart Data: Scan Volume over past 7 days
  const lineChartData = [
    { day: 'Mon', scans: 14, label: '14 articles scanned' },
    { day: 'Tue', scans: 28, label: '28 articles scanned' },
    { day: 'Wed', scans: 22, label: '22 articles scanned' },
    { day: 'Thu', scans: 45, label: '45 articles scanned' },
    { day: 'Fri', scans: 35, label: '35 articles scanned' },
    { day: 'Sat', scans: 55, label: '55 articles scanned' },
    { day: 'Sun', scans: 48, label: '48 articles scanned' },
  ];

  // SVG Coordinates calculation for the line chart (width: 500, height: 200)
  // X ranges from 40 to 460. Y ranges from 160 to 20.
  const getX = (index: number) => 40 + (index * 420) / 6;
  const getY = (scans: number) => 160 - (scans * 130) / 60; // Max scans is ~60

  const points = lineChartData.map((d, i) => `${getX(i)},${getY(d.scans)}`).join(' ');
  const areaPoints = `${getX(0)},160 ` + lineChartData.map((d, i) => `${getX(i)},${getY(d.scans)}`).join(' ') + ` ${getX(6)},160`;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      {/* Scan Activity Line Chart (Spans 2 columns on xl) */}
      <div className="xl:col-span-2 glassmorphism rounded-2xl p-6 glow-border-cyan relative overflow-hidden group">
        {/* Glow backdrop decorative light */}
        <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-cyber-cyan/5 blur-3xl group-hover:bg-cyber-cyan/8 transition-all" />
        
        <div className="flex items-center justify-between mb-6 relative">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="text-cyber-cyan w-4 h-4 neon-text-cyan" />
              <h3 className="font-display font-bold text-slate-100 text-base">SCAN ENGINE ACTIVITY</h3>
            </div>
            <p className="text-xs text-slate-500 font-mono mt-1">Weekly volume breakdown & AI telemetry</p>
          </div>
          <div className="flex items-center gap-1.5 bg-cyber-cyan/10 border border-cyber-cyan/20 px-3 py-1 rounded-full text-[10px] font-mono text-cyber-cyan">
            <TrendingUp size={11} />
            <span>+24.5% ACCURACY GAIN</span>
          </div>
        </div>

        {/* Custom SVG Line Chart */}
        <div className="w-full relative h-[220px]">
          <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
            <defs>
              {/* Background gradient for line fill */}
              <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
              </linearGradient>
              {/* Stroke gradient for line */}
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              {/* Grid pattern */}
              <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.015)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Grid Pattern Background */}
            <rect width="100%" height="160" fill="url(#grid)" />

            {/* Y Axis Gridlines */}
            {[0, 20, 40, 60].map((val) => (
              <line 
                key={val}
                x1="40" 
                y1={getY(val)} 
                x2="460" 
                y2={getY(val)} 
                stroke="rgba(255, 255, 255, 0.03)" 
                strokeWidth="1"
                strokeDasharray="4 4"
              />
            ))}

            {/* Area Path */}
            <polygon points={areaPoints} fill="url(#areaGrad)" />

            {/* Line Path */}
            <polyline 
              fill="none" 
              stroke="url(#lineGrad)" 
              strokeWidth="2.5" 
              points={points} 
              className="drop-shadow-[0_4px_10px_rgba(6,182,212,0.3)]"
            />

            {/* Data Interaction Points */}
            {lineChartData.map((d, i) => (
              <g key={i} className="cursor-pointer group/node" onMouseEnter={() => setActiveTooltip(i)} onMouseLeave={() => setActiveTooltip(null)}>
                {/* Active larger glow ring */}
                {activeTooltip === i && (
                  <circle 
                    cx={getX(i)} 
                    cy={getY(d.scans)} 
                    r="8" 
                    fill="rgba(6, 182, 212, 0.2)" 
                    stroke="rgba(6, 182, 212, 0.4)"
                    strokeWidth="1"
                  />
                )}
                {/* Center node */}
                <circle 
                  cx={getX(i)} 
                  cy={getY(d.scans)} 
                  r="4" 
                  fill={activeTooltip === i ? '#a855f7' : '#06b6d4'} 
                  stroke="#0b0f19" 
                  strokeWidth="1.5"
                  className="transition-colors duration-200"
                />
              </g>
            ))}

            {/* X-Axis labels */}
            {lineChartData.map((d, i) => (
              <text 
                key={i} 
                x={getX(i)} 
                y="180" 
                fill="#64748b" 
                fontSize="10" 
                textAnchor="middle"
                className="font-mono"
              >
                {d.day}
              </text>
            ))}

            {/* Y-Axis scale */}
            {[0, 20, 40, 60].map((val) => (
              <text 
                key={val} 
                x="25" 
                y={getY(val) + 3} 
                fill="#475569" 
                fontSize="9" 
                textAnchor="end"
                className="font-mono"
              >
                {val}
              </text>
            ))}
          </svg>

          {/* Glowing HTML Tooltip */}
          {activeTooltip !== null && (
            <div 
              className="absolute pointer-events-none bg-slate-950/95 border border-cyber-cyan/50 text-white rounded-lg p-2 text-xs font-mono neon-glow-cyan z-10 transition-all duration-150"
              style={{
                left: `${(getX(activeTooltip) / 500) * 100}%`,
                top: `${(getY(lineChartData[activeTooltip].scans) / 200) * 100 - 22}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] text-slate-400 font-bold">{lineChartData[activeTooltip].day} Scans</span>
                <span className="text-cyber-cyan text-sm font-black mt-0.5">{lineChartData[activeTooltip].scans} Items</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Distribution Doughnut Chart (1 column) */}
      <div className="glassmorphism rounded-2xl p-6 glow-border-purple relative overflow-hidden group">
        <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-cyber-purple/5 blur-3xl group-hover:bg-cyber-purple/8 transition-all" />

        <div className="flex items-center gap-2 mb-6">
          <CheckCircle className="text-cyber-purple w-4 h-4 neon-text-purple" />
          <h3 className="font-display font-bold text-slate-100 text-base">SCAN CREDIBILITY INDEX</h3>
        </div>

        {/* Circular Donut Diagram */}
        <div className="flex flex-col items-center justify-center my-2 relative">
          <div className="relative w-40 h-40 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="36" 
                fill="transparent" 
                stroke="rgba(255, 255, 255, 0.02)" 
                strokeWidth="10" 
              />
              {/* Verified Segment (65%) -> strokeDasharray="arc length, full perimeter"
                  Perimeter = 2 * PI * r = 2 * 3.1415 * 36 = 226.2
                  65% = 147.0. Offset = 0
              */}
              <circle 
                cx="50" 
                cy="50" 
                r="36" 
                fill="transparent" 
                stroke="var(--color-cyber-green)" 
                strokeWidth="10" 
                strokeDasharray="147.0 226.2"
                strokeDashoffset="0"
                className="drop-shadow-[0_0_6px_rgba(16,185,129,0.3)] hover:opacity-90 cursor-pointer transition-opacity"
              />
              {/* Suspicious Segment (20%) -> 20% = 45.24. Offset = -147.0 */}
              <circle 
                cx="50" 
                cy="50" 
                r="36" 
                fill="transparent" 
                stroke="var(--color-cyber-yellow)" 
                strokeWidth="10" 
                strokeDasharray="45.2 226.2"
                strokeDashoffset="-147.0"
                className="drop-shadow-[0_0_6px_rgba(245,158,11,0.3)] hover:opacity-90 cursor-pointer transition-opacity"
              />
              {/* Fake Segment (15%) -> 15% = 33.9. Offset = -192.2 */}
              <circle 
                cx="50" 
                cy="50" 
                r="36" 
                fill="transparent" 
                stroke="var(--color-cyber-red)" 
                strokeWidth="10" 
                strokeDasharray="34.0 226.2"
                strokeDashoffset="-192.2"
                className="drop-shadow-[0_0_6px_rgba(239,68,68,0.3)] hover:opacity-90 cursor-pointer transition-opacity"
              />
            </svg>
            
            {/* Center label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="font-mono text-[10px] text-slate-500 uppercase tracking-widest font-bold">Overall Rating</span>
              <span className="font-display font-black text-2xl text-cyber-green mt-1 drop-shadow-[0_0_10px_rgba(16,185,129,0.4)]">SAFE</span>
              <span className="font-mono text-[9px] text-slate-400 mt-0.5">Ratio: 2.4 : 1</span>
            </div>
          </div>
        </div>

        {/* Legend Indicators */}
        <div className="mt-6 space-y-3 font-mono">
          <div className="flex items-center justify-between text-xs p-2 rounded-lg border border-slate-900 bg-slate-950/20 hover:border-slate-800/60 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-green shadow-[0_0_6px_#10b981]" />
              <span className="text-slate-300">Verified Authentic</span>
            </div>
            <span className="font-bold text-emerald-400">65%</span>
          </div>

          <div className="flex items-center justify-between text-xs p-2 rounded-lg border border-slate-900 bg-slate-950/20 hover:border-slate-800/60 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-yellow shadow-[0_0_6px_#f59e0b]" />
              <span className="text-slate-300">Suspicious / Clickbait</span>
            </div>
            <span className="font-bold text-amber-400">20%</span>
          </div>

          <div className="flex items-center justify-between text-xs p-2 rounded-lg border border-slate-900 bg-slate-950/20 hover:border-slate-800/60 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-cyber-red shadow-[0_0_6px_#ef4444]" />
              <span className="text-slate-300">Disinformation / Fake</span>
            </div>
            <span className="font-bold text-rose-400">15%</span>
          </div>
        </div>
      </div>

    </div>
  );
};
