import React, { useState, useEffect } from 'react';
import { Cpu, Network } from 'lucide-react';

export const LoadingScanner: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const scanSteps = [
    'ESTABLISHING ENCRYPTED DATAPATH...',
    'EXTRACTING META HEADERS & SYNTACTIC BLOCKS...',
    'COMPUTING HIGHER-ORDER SEMANTIC EMBEDDING VECTORS...',
    'RUNNING STYLOMETRIC SENTIMENT COGNITION LOOPS...',
    'EVALUATING CROSS-REFERENCED BLACKLIST DATABASES...',
    'RESOLVING DISINFORMATION SCORE METRICS...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < scanSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glassmorphism rounded-2xl p-8 glow-border-cyber relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] text-center font-mono">
      {/* Heavy glowing background ambient circle */}
      <div className="absolute inset-0 bg-cyber-dark/40 z-0" />
      
      {/* Sweeping laser scanner overlay line */}
      <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan/80 to-transparent animate-scanner-sweep shadow-[0_0_15px_#06b6d4] z-10" />
      
      {/* Cyber Grid Base for Tech Vibe */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />

      {/* Holographic CPU/Globe Core Sphere */}
      <div className="relative w-28 h-28 flex items-center justify-center z-10 mb-8">
        {/* Outer glowing pulsing orbit circle */}
        <div className="absolute inset-0 rounded-full border border-cyber-cyan/35 animate-cyber-pulse" />
        {/* Middle spinning gradient circle */}
        <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyber-purple/50 animate-glow-spin" />
        {/* Inner glow backdrop */}
        <div className="absolute inset-4 rounded-full bg-gradient-to-br from-cyber-cyan/10 to-cyber-purple/10 blur-md" />
        {/* Core Icon */}
        <div className="relative z-10 p-4 rounded-xl bg-slate-900 border border-slate-800 text-cyber-cyan shadow-[0_0_20px_rgba(6,182,212,0.3)] animate-bounce duration-1000">
          <Cpu size={28} className="animate-spin duration-3000" />
        </div>
      </div>

      {/* Title */}
      <div className="z-10 mb-6">
        <h3 className="font-display font-black text-white text-base tracking-widest uppercase flex items-center justify-center gap-2">
          <Network size={16} className="text-cyber-cyan animate-pulse" />
          <span>DEEP NEURAL COGNITION IN PROGRESS</span>
        </h3>
        <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-1">SYSTEM CORES OPERATING AT PEAK CAPACITY</p>
      </div>

      {/* Progress Telemetry Console Log */}
      <div className="w-full max-w-md bg-slate-950/90 border border-slate-900/80 rounded-xl p-4 text-[10px] text-left text-slate-400 space-y-2.5 relative z-10">
        <div className="flex items-center justify-between border-b border-slate-900 pb-1.5 mb-2 select-none text-[8px] text-slate-600 font-bold">
          <span>AI SCAFFOLD LOG TELEMETRY</span>
          <span className="animate-pulse text-cyber-cyan">SYNC ACTIVE</span>
        </div>

        {scanSteps.map((step, idx) => {
          const isDone = idx < activeStep;
          const isActive = idx === activeStep;
          
          return (
            <div 
              key={step} 
              className={`flex items-start gap-2.5 transition-all duration-300
                ${isDone ? 'text-cyber-green' : isActive ? 'text-cyber-cyan' : 'text-slate-650 opacity-40'}
              `}
            >
              <span className="font-bold flex-shrink-0">
                {isDone ? '[OK]' : isActive ? '[>>]' : '[..]'}
              </span>
              <p className={isActive ? 'font-black tracking-wide' : ''}>{step}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
