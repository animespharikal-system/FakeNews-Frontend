import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { InputCard } from '../components/InputCard';
import { ResultCard } from '../components/ResultCard';
import { LoadingScanner } from '../components/LoadingScanner';
import { Cpu, Terminal, Sparkles } from 'lucide-react';

interface AnalyzePageProps {
  onLogout: () => void;
  userEmail?: string;
}

interface ResultData {
  type: 'text' | 'url';
  content: string;
  score: number;
  label: 'VERIFIED' | 'SUSPICIOUS' | 'CLICKBAIT' | 'FAKE NEWS';
  sensationalism: number;
  bias: 'LEFT' | 'CENTER' | 'RIGHT' | 'EXTREME';
  sourceTrust: number;
  aiProbability: number;
  summary: string;
}

export const AnalyzePage: React.FC<AnalyzePageProps> = ({ onLogout, userEmail }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ResultData | null>(null);
  const location = useLocation();

  // Load results immediately if triggered from Dashboard row selection
  useEffect(() => {
    const state = location.state as { scanData?: any } | null;
    if (state?.scanData) {
      const { scanData } = state;
      setIsAnalyzing(false);
      setResult({
        type: 'text',
        content: scanData.title,
        score: scanData.score,
        label: scanData.label,
        sensationalism: scanData.score < 40 ? 82 : scanData.score < 70 ? 55 : 12,
        bias: scanData.score < 40 ? 'EXTREME' : scanData.score < 75 ? 'LEFT' : 'CENTER',
        sourceTrust: scanData.score,
        aiProbability: scanData.score < 40 ? 94 : scanData.score < 70 ? 45 : 8,
        summary: `Imported scan record ${scanData.id}. Origin domain verified as [${scanData.source}]. Telemetry indices match previous archival checks. Rating: ${scanData.label}.`,
      });
    }
  }, [location]);

  const handleAnalyze = (data: { type: 'text' | 'url'; content: string }) => {
    setIsAnalyzing(true);
    setResult(null);

    // Simulate multi-stage scanning loops
    setTimeout(() => {
      // Create high-fidelity mock results based on input strings
      const isQuantumSample = data.content.toLowerCase().includes('quantum');
      const isUrlSample = data.type === 'url';

      let score = 78;
      let label: 'VERIFIED' | 'SUSPICIOUS' | 'CLICKBAIT' | 'FAKE NEWS' = 'VERIFIED';
      let sensationalism = 24;
      let bias: 'LEFT' | 'CENTER' | 'RIGHT' | 'EXTREME' = 'CENTER';
      let sourceTrust = 85;
      let aiProbability = 14;
      let summary = '';

      if (isQuantumSample) {
        score = 18;
        label = 'FAKE NEWS';
        sensationalism = 88;
        bias = 'EXTREME';
        sourceTrust = 22;
        aiProbability = 94;
        summary = 'Scan identified critical semantic entropy violations. The source document presents unverified assertions regarding conscious supercomputer cores that violate established thermodynamic principles. Structural syntax displays high emotional contagion thresholds typical of simulated botnets and sensationalist clickbait hubs.';
      } else if (isUrlSample) {
        score = 56;
        label = 'SUSPICIOUS';
        sensationalism = 61;
        bias = 'LEFT';
        sourceTrust = 48;
        aiProbability = 42;
        summary = 'Scanned URL content shows average credibility ratings. While the primary domain carries moderate trust weight, structural bias indicators tilt slightly leftward, and the content employs hyperbolic descriptors to inflate emotional engagement. Cross-referencing database shows medium concern score.';
      } else {
        // Generate random realistic metrics for customized pasted inputs
        score = Math.floor(Math.random() * 45) + 50; // 50 to 95
        if (score >= 80) {
          label = 'VERIFIED';
          sensationalism = Math.floor(Math.random() * 20) + 5;
          bias = Math.random() > 0.5 ? 'CENTER' : 'LEFT';
          sourceTrust = Math.floor(Math.random() * 20) + 75;
          aiProbability = Math.floor(Math.random() * 25) + 5;
          summary = 'Syntactic parsing completed successfully. The text utilizes balanced and factual vocabulary. Sentiment score is highly objective, and syntactic styling matches professional news agency benchmarks. Source is rated safe with no active mitigation required.';
        } else {
          label = 'CLICKBAIT';
          sensationalism = Math.floor(Math.random() * 30) + 55;
          bias = Math.random() > 0.5 ? 'RIGHT' : 'LEFT';
          sourceTrust = Math.floor(Math.random() * 30) + 40;
          aiProbability = Math.floor(Math.random() * 40) + 30;
          summary = 'Contextual scan warns of clickbait structure. The headline uses dramatic language to entice views, and the semantic index highlights minor logic leaps. Factual checking confirms core ideas but alerts for exaggerated framing.';
        }
      }

      setResult({
        type: data.type,
        content: data.content,
        score,
        label,
        sensationalism,
        bias,
        sourceTrust,
        aiProbability,
        summary
      });
      setIsAnalyzing(false);
    }, 4800); // 4.8 seconds loading sweep animation
  };

  const handleClear = () => {
    setResult(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-cyber-black flex relative overflow-hidden">
      {/* Background cyber grid */}
      <div className="absolute inset-0 cyber-grid opacity-10 pointer-events-none" />
      <div className="absolute top-10 left-64 w-96 h-96 rounded-full bg-cyber-cyan/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-cyber-purple/5 blur-3xl pointer-events-none" />

      {/* Responsive Sidebar Menu */}
      <Sidebar onLogout={onLogout} userEmail={userEmail} />

      {/* Main Panel Content Area */}
      <main className="flex-1 lg:pl-64 min-w-0 transition-all duration-300">
        <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 pt-20 lg:pt-10">
          
          {/* Header title */}
          <div>
            <div className="flex items-center gap-2 text-cyber-cyan">
              <Terminal className="w-5 h-5 neon-text-cyan" />
              <span className="font-mono text-xs uppercase tracking-widest font-bold">ANALYSIS TELEMETRY NODE</span>
            </div>
            <h1 className="font-display font-black text-3xl text-white mt-1 leading-none">
              CREDIBILITY SCANNER
            </h1>
            <p className="text-xs text-slate-500 font-mono mt-2">Deconstruct content structures and evaluate contextual truth ratings in real-time</p>
          </div>

          {/* Interactive Split Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Card: Input Card (Spans 5 columns) */}
            <div className="lg:col-span-5">
              <InputCard onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
            </div>

            {/* Right Card: Dynamic state view (Spans 7 columns) */}
            <div className="lg:col-span-7">
              {isAnalyzing && <LoadingScanner />}

              {!isAnalyzing && result && (
                <ResultCard result={result} onClear={handleClear} />
              )}

              {!isAnalyzing && !result && (
                /* Idle holographic screen card */
                <div className="glassmorphism rounded-2xl p-8 glow-border-cyan relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] text-center font-mono">
                  {/* Glowing core animation */}
                  <div className="relative w-24 h-24 flex items-center justify-center z-10 mb-6 group cursor-pointer">
                    {/* Ring orbit */}
                    <div className="absolute inset-0 rounded-full border border-cyber-cyan/20 animate-cyber-pulse" />
                    {/* Rotating grid circle */}
                    <div className="absolute inset-2 rounded-full border border-dashed border-cyber-cyan/40 animate-glow-spin" />
                    {/* Pulsing glow backdrop */}
                    <div className="absolute inset-4 rounded-full bg-cyber-cyan/5 group-hover:bg-cyber-cyan/15 blur-md transition-all duration-300" />
                    {/* Core CPU Icon */}
                    <div className="relative z-10 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 group-hover:text-cyber-cyan group-hover:border-cyber-cyan/50 transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      <Cpu size={24} />
                    </div>
                  </div>

                  <div className="relative z-10 max-w-sm">
                    <h3 className="font-display font-black text-slate-300 text-sm tracking-widest uppercase flex items-center justify-center gap-1.5 select-none">
                      <Sparkles size={14} className="text-cyber-cyan" />
                      <span>COGNITIVE CORE IDLE</span>
                    </h3>
                    <p className="text-[10px] text-slate-500 font-mono tracking-widest mt-1 uppercase">Awaiting telemetry scan inputs</p>
                    
                    <p className="text-xs text-slate-400 mt-6 leading-relaxed bg-slate-950/40 border border-slate-900/60 p-4 rounded-xl">
                      TruthLens AI uses advanced neural vector modeling and contextual reference checks to evaluate structural language integrity. Paste an article copy on the left to initiate telemetry scanning.
                    </p>
                  </div>
                  
                  {/* Cyber Grid background for high-tech aesthetic */}
                  <div className="absolute inset-0 cyber-grid opacity-5 pointer-events-none" />
                </div>
              )}
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};
