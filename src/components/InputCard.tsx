import React, { useState } from 'react';
import { AlignLeft, Link2, Sparkles, Terminal, FileText } from 'lucide-react';

interface InputCardProps {
  onAnalyze: (data: { type: 'text' | 'url'; content: string }) => void;
  isAnalyzing: boolean;
}

export const InputCard: React.FC<InputCardProps> = ({ onAnalyze, isAnalyzing }) => {
  const [activeTab, setActiveTab] = useState<'text' | 'url'>('text');
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');

  const wordCount = textContent.trim() === '' ? 0 : textContent.trim().split(/\s+/).length;
  const charCount = textContent.length;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const content = activeTab === 'text' ? textContent : urlContent;
    if (content.trim()) {
      onAnalyze({ type: activeTab, content });
    }
  };

  const handleQuickPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (activeTab === 'text') {
        setTextContent(text);
      } else {
        setUrlContent(text);
      }
    } catch (err) {
      console.warn('Clipboard paste failed, please paste manually');
    }
  };

  const handleLoadSample = () => {
    if (activeTab === 'text') {
      setTextContent(
        `BREAKING telemetry: Quantum supercomputing node in Silicon Valley claims to have achieved absolute conscious AI core activation overnight. Inside sources state that the neural cluster started writing its own physics equations that violate thermal entropy limits. Scientists at the institute are supposedly refusing to power off the machine due to concerns of terminating a novel lifeform. The government has allegedly issued a quarantine on the facility.`
      );
    } else {
      setUrlContent('https://scitechdaily.com/quantum-anomaly-entropy-breach-simulated');
    }
  };

  return (
    <div className="glassmorphism rounded-2xl p-6 glow-border-cyber relative overflow-hidden group">
      {/* Laser scanner grid overlay background decorative effect */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-scanner-sweep opacity-30" />

      {/* Card Header */}
      <div className="flex items-center justify-between mb-6 relative">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-cyber-cyan w-4.5 h-4.5 neon-text-cyan animate-pulse" />
            <h3 className="font-display font-black text-slate-100 text-base uppercase tracking-wider">Scannable Inputs</h3>
          </div>
          <p className="text-xs text-slate-500 font-mono mt-1">Submit news copies or URLs for deep semantic analysis</p>
        </div>
        
        {/* Sample Loader */}
        <button
          onClick={handleLoadSample}
          disabled={isAnalyzing}
          className="px-2.5 py-1 text-[10px] font-mono font-bold tracking-wider text-cyber-purple bg-cyber-purple/10 border border-cyber-purple/20 rounded-lg hover:bg-cyber-purple/20 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
        >
          <Terminal size={10} />
          <span>LOAD SAMPLE</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-slate-950/80 border border-slate-900 rounded-xl mb-6 relative">
        <button
          onClick={() => setActiveTab('text')}
          disabled={isAnalyzing}
          className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer disabled:opacity-50
            ${activeTab === 'text'
              ? 'text-white bg-slate-900 border border-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.5)] glow-border-cyan'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }
          `}
        >
          <AlignLeft size={14} className={activeTab === 'text' ? 'text-cyber-cyan' : ''} />
          <span>FULL TEXT BODY</span>
        </button>

        <button
          onClick={() => setActiveTab('url')}
          disabled={isAnalyzing}
          className={`flex-1 flex items-center justify-center gap-2.5 py-2.5 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer disabled:opacity-50
            ${activeTab === 'url'
              ? 'text-white bg-slate-900 border border-slate-800 shadow-[0_2px_10px_rgba(0,0,0,0.5)] glow-border-purple'
              : 'text-slate-400 hover:text-slate-200 border border-transparent'
            }
          `}
        >
          <Link2 size={14} className={activeTab === 'url' ? 'text-cyber-purple' : ''} />
          <span>ARTICLE URL SOURCE</span>
        </button>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'text' ? (
          /* Text Area Panel */
          <div className="relative">
            <textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              disabled={isAnalyzing}
              placeholder="Paste article body text, social media claims, or press releases (Min 50 characters recommended for high accuracy metrics)..."
              className="w-full h-64 bg-slate-950/60 border border-slate-850 hover:border-slate-800 focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 rounded-xl p-4 text-sm text-slate-200 font-sans leading-relaxed placeholder-slate-600 focus:outline-none resize-none transition-all"
            />
            
            {/* Real-time counters panel */}
            <div className="absolute bottom-4 right-4 flex items-center gap-3 bg-slate-900/90 border border-slate-850 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-400 select-none">
              <span className="flex items-center gap-1">
                <FileText size={10} />
                <span>{wordCount} w</span>
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
              <span>{charCount} chars</span>
            </div>
          </div>
        ) : (
          /* URL Input Panel */
          <div className="space-y-3">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-slate-500">
                <Link2 size={18} />
              </div>
              <input
                type="url"
                value={urlContent}
                onChange={(e) => setUrlContent(e.target.value)}
                disabled={isAnalyzing}
                placeholder="https://example-news-platform.com/article-slug-identifier"
                required
                className="w-full bg-slate-950/60 border border-slate-850 hover:border-slate-800 focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/30 rounded-xl pl-12 pr-4 py-4 text-sm text-slate-200 font-mono placeholder-slate-600 focus:outline-none transition-all"
              />
            </div>
            <div className="flex items-center gap-2 p-3 bg-cyber-purple/5 border border-cyber-purple/10 rounded-xl text-[11px] font-mono text-slate-400 leading-normal">
              <Terminal size={14} className="text-cyber-purple flex-shrink-0" />
              <span>TruthLens web engine parses meta headers, checks domain trust records, and downloads public page markup for deep NLP contextual evaluations.</span>
            </div>
          </div>
        )}

        {/* Buttons Controls */}
        <div className="flex gap-4 pt-2">
          {/* Quick Clipboard Paste */}
          <button
            type="button"
            onClick={handleQuickPaste}
            disabled={isAnalyzing}
            className="px-4 py-3 rounded-xl border border-slate-850 hover:border-slate-700 bg-slate-950/40 text-slate-300 font-semibold text-xs tracking-wide cursor-pointer transition-colors hover:text-white disabled:opacity-50"
          >
            Paste Clipboard
          </button>

          {/* Trigger Scan Button */}
          <button
            type="submit"
            disabled={isAnalyzing || (activeTab === 'text' ? !textContent.trim() : !urlContent.trim())}
            className={`flex-1 py-3.5 rounded-xl font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer disabled:opacity-30 disabled:pointer-events-none transition-all
              ${activeTab === 'text' ? 'cyber-btn-cyan text-white' : 'cyber-btn-purple text-white'}
            `}
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>{isAnalyzing ? 'DECONSTRUCTING CORE...' : 'INITIATE NEURAL SCAN'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
