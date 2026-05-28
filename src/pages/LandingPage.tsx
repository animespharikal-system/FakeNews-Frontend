import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { 
  Sparkles, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  Globe, 
  Terminal, 
  Activity, 
  Compass, 
  Heart
} from 'lucide-react';

interface LandingPageProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleStart = () => {
    if (isLoggedIn) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const features = [
    {
      icon: Cpu,
      title: 'Neural Syntactic Deconstruction',
      desc: 'Our engine maps text patterns to high-dimensional vectors, evaluating syntactic sensationalism and semantic emotional contagion.',
      glow: 'glow-border-cyan'
    },
    {
      icon: ShieldCheck,
      title: 'Source Authority Indexing',
      desc: 'TruthLens aggregates domain reputation logs, public registration details, and historic accuracy reports to score the source trust factor.',
      glow: 'glow-border-purple'
    },
    {
      icon: Globe,
      title: 'Real-time Cross-Checking',
      desc: 'Instantly query global fact-checking registries and trusted news repositories to identify overlapping context matches or direct discrepancies.',
      glow: 'glow-border-cyber'
    }
  ];

  const steps = [
    {
      num: '01',
      title: 'INPUT TELEMETRY',
      desc: 'Paste text copy or provide the URL of the suspicious article.'
    },
    {
      num: '02',
      title: 'VECTOR MAPPING',
      desc: 'Our models parse syntactic complexity and context structures.'
    },
    {
      num: '03',
      title: 'CROSS VERIFICATION',
      desc: 'Cross-reference facts against domain trust repositories.'
    },
    {
      num: '04',
      title: 'TELEMETRY REPORT',
      desc: 'Get a clean overall credibility score with diagnostics.'
    }
  ];

  return (
    <div className="min-h-screen bg-cyber-black relative text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-cyber-cyan selection:text-black">
      
      {/* Sticky Global Navbar */}
      <Navbar isLoggedIn={isLoggedIn} onLogout={onLogout} />

      {/* Cyber Grid drifting background */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none z-0" />
      
      {/* Glowing Neon Spotlights */}
      <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-cyber-cyan/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-cyber-pulse" />
      <div className="absolute top-40 right-1/4 w-[500px] h-[500px] bg-cyber-purple/10 rounded-full blur-[140px] pointer-events-none -z-10 animate-float" />

      {/* 1. Hero Section */}
      <section className="relative z-10 pt-36 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Animated Feature Announcement Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/35 rounded-full text-[10px] font-mono text-cyber-cyan tracking-widest font-black uppercase mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)] animate-bounce select-none">
          <Sparkles size={11} className="animate-pulse" />
          <span>TRUTHLENS AI NEURAL ENG v1.2</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl leading-tight tracking-tight max-w-4xl text-white select-none">
          Expose the Noise. <br />
          <span className="bg-gradient-to-r from-cyber-cyan via-cyan-300 to-cyber-purple bg-clip-text text-transparent drop-shadow-[0_4px_15px_rgba(6,182,212,0.25)]">
            Decipher Context.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-slate-400 font-medium max-w-2xl leading-relaxed">
          TruthLens is a high-fidelity AI-powered telemetry scanner engineered to analyze syntax structures, calculate political bias ratings, and calculate semantic credibility ratios.
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center relative">
          <button
            onClick={handleStart}
            className="py-4 px-8 rounded-xl font-bold text-xs tracking-widest uppercase cyber-btn-cyan text-white flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(6,182,212,0.3)] w-full sm:w-auto"
          >
            <span>START NEURAL SCAN</span>
            <ArrowRight size={14} />
          </button>
          
          <a
            href="#features"
            className="py-4 px-8 rounded-xl font-bold text-xs tracking-widest uppercase glassmorphism border border-slate-850 hover:border-slate-700 text-slate-350 hover:text-white transition-colors w-full sm:w-auto text-center"
          >
            EXPLORE PROTOCOL
          </a>
        </div>

        {/* Futuristic Dashboard telemetry preview screen */}
        <div className="mt-20 w-full max-w-4xl glassmorphism rounded-2xl p-4 border border-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden group">
          
          {/* Neon border perimeter decoration */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-scanner-sweep opacity-30" />
          
          {/* Telemetry frame mockup header */}
          <div className="flex items-center justify-between border-b border-slate-900 pb-3 mb-4 select-none">
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-slate-500">
              <span className="w-2 h-2 rounded-full bg-cyber-red/50 animate-pulse" />
              <span>TELEMETRY MONITOR: active-node-us</span>
            </div>
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800" />
            </div>
          </div>

          {/* Dummy dashboard cards mockup */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-left text-xs mb-4">
            <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 relative">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Global Scan Count</span>
              <span className="text-xl font-bold text-white tracking-wide">12,492,042</span>
              <span className="text-[8px] text-cyber-green block mt-1 font-black">+14.2% (24H SPEED)</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 relative">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-1">NLP Model Accuracy</span>
              <span className="text-xl font-bold text-cyber-cyan tracking-wide">99.42%</span>
              <span className="text-[8px] text-slate-500 block mt-1 font-bold">SHA256 Classifier Sync</span>
            </div>
            <div className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 relative">
              <span className="text-[9px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Scan Latency Rate</span>
              <span className="text-xl font-bold text-cyber-purple tracking-wide">410 ms</span>
              <span className="text-[8px] text-cyber-purple block mt-1 font-black">EDGE CORES OPERATIONAL</span>
            </div>
          </div>

          <div className="h-40 rounded-xl border border-slate-900 bg-slate-950/90 p-4 font-mono text-[10px] text-left text-slate-500 leading-normal flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-cyber-cyan font-bold">&gt; truthlens-ai --initiate-radar-telemetry</p>
              <p className="text-slate-400">Loading neural classifier weights... Complete. [384,102 parameters mapped]</p>
              <p className="text-slate-400">Syncing active fact registers against Bloomberg, Reuters, AP News... Safe.</p>
              <p className="text-slate-200 animate-pulse">&gt; System console ready. Spawn analysis console to evaluate suspicious claims.</p>
            </div>
            <div className="flex justify-end">
              <span className="px-2 py-0.5 border border-slate-800 text-[8px] text-slate-600 rounded">EDGE-GATE: v1.2</span>
            </div>
          </div>
        </div>

      </section>

      {/* 2. Features Highlights Section */}
      <section id="features" className="relative z-10 py-24 px-6 max-w-7xl mx-auto space-y-16 border-t border-slate-900/60">
        
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-cyber-cyan">
            <Activity className="w-4 h-4 neon-text-cyan animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">CORE CAPABILITIES</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase leading-none">
            ENGINEERED FOR CREDIBILITY
          </h2>
          <p className="text-xs text-slate-500 font-mono max-w-md mx-auto">TruthLens deploys cutting-edge semantic parsing algorithms to evaluate truth ratios</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = feat.icon;

            return (
              <div 
                key={feat.title} 
                className={`glassmorphism rounded-2xl p-6 transition-all duration-300 hover:bg-slate-900/40 relative overflow-hidden group hover:-translate-y-1 ${feat.glow}`}
              >
                {/* Background light glow hover */}
                <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-cyber-cyan/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="p-3 w-fit bg-slate-900 border border-slate-800 rounded-xl text-cyber-cyan group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-cyber-cyan group-hover:to-cyber-purple transition-all duration-300 mb-6">
                  <Icon size={20} />
                </div>
                
                <h3 className="font-display font-bold text-slate-100 text-base mb-3 group-hover:text-cyber-cyan transition-colors">
                  {feat.title}
                </h3>
                
                <p className="text-xs text-slate-400 font-medium leading-relaxed font-sans">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Steps Workflow Section */}
      <section id="workflow" className="relative z-10 py-24 px-6 max-w-7xl mx-auto space-y-16 border-t border-slate-900/60 font-mono">
        
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-cyber-purple">
            <Compass className="w-4 h-4 neon-text-purple animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">ANALYSIS WORKFLOW</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white uppercase leading-none font-sans">
            HOW THE SCANNER DEPLOYS
          </h2>
          <p className="text-xs text-slate-500 font-mono max-w-md mx-auto">Four high-tech stages mapping raw words to verifiable reports</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((st) => (
            <div 
              key={st.num}
              className="p-6 rounded-2xl border border-slate-900 bg-slate-950/20 flex flex-col justify-between h-48 relative overflow-hidden group hover:border-slate-850 hover:bg-slate-950/40 transition-colors"
            >
              {/* Stepper Index Badge */}
              <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                <span className="text-2xl font-black text-cyber-cyan/35 group-hover:text-cyber-cyan transition-colors font-mono">{st.num}</span>
                <span className="text-[8px] text-slate-650 tracking-wider">STAGE GATE</span>
              </div>

              <div className="mt-4">
                <h4 className="font-display font-bold text-xs text-slate-200 tracking-wider group-hover:text-cyber-purple transition-colors mb-1.5 font-sans">
                  {st.title}
                </h4>
                <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Global Stats Section */}
      <section id="stats" className="relative z-10 py-24 px-6 max-w-7xl mx-auto border-t border-slate-900/60 font-mono text-center">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
          <div className="space-y-2">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold block">Telemetry Scans</span>
            <span className="text-4xl sm:text-5xl font-black text-white leading-none block font-display tracking-tight">142.9K+</span>
            <span className="text-[9px] text-cyber-cyan block font-bold">ACTIVE SCAN DATAPATHS</span>
          </div>
          <div className="space-y-2">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold block">NLP Classification Accuracy</span>
            <span className="text-4xl sm:text-5xl font-black text-cyber-cyan leading-none block font-display tracking-tight">99.4%</span>
            <span className="text-[9px] text-slate-500 block font-bold">SHA256 CLASSIFIER MATRIX</span>
          </div>
          <div className="space-y-2">
            <span className="text-xs text-slate-500 uppercase tracking-widest font-bold block">Avg Telemetry Latency</span>
            <span className="text-4xl sm:text-5xl font-black text-cyber-purple leading-none block font-display tracking-tight">&lt; 420ms</span>
            <span className="text-[9px] text-cyber-purple block font-black">EDGE NODES OPERATING</span>
          </div>
        </div>

        <div className="mt-16 max-w-md mx-auto bg-slate-950/60 border border-slate-900 rounded-2xl p-6 text-[11px] text-slate-500 leading-normal">
          <Terminal size={16} className="text-cyber-cyan mx-auto mb-3 animate-pulse" />
          <span>TruthLens AI edge clusters continuously sync credibility nodes across fact-checking agencies to guarantee microsecond telemetry refresh frequencies.</span>
        </div>
      </section>

      {/* 5. Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-955 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand/Signature */}
          <div className="flex items-center gap-3 select-none">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center neon-glow-cyan">
              <Cpu size={15} className="text-white" />
            </div>
            <span className="font-display font-black text-sm tracking-widest text-white">
              TRUTH<span className="text-cyber-cyan">LENS</span> AI
            </span>
          </div>

          {/* Navigation/Legal */}
          <div className="flex items-center gap-6 font-mono text-[10px] text-slate-500 select-none">
            <span className="hover:text-cyber-cyan transition-colors cursor-pointer">Security Ledger</span>
            <span>&bull;</span>
            <span className="hover:text-cyber-cyan transition-colors cursor-pointer">Telemetry Logs</span>
            <span>&bull;</span>
            <span className="hover:text-cyber-cyan transition-colors cursor-pointer">Privacy Gateway</span>
          </div>

          {/* Social / Credits */}
          <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500">
            <span className="flex items-center gap-1">
              <span>Made with</span>
              <Heart size={10} className="text-cyber-pink animate-pulse" />
              <span>by Antigravity</span>
            </span>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyber-cyan transition-colors"
            >
              <Terminal size={12} />
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
};
