import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Cpu, Terminal, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: (email: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    // Simulate authenticating against backend
    setTimeout(() => {
      if (email.trim() && password.length >= 6) {
        onLogin(email);
        navigate('/dashboard');
      } else {
        setErrorMsg('Invalid telemetry key. Verify credentials.');
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-6 cyber-dot-bg overflow-hidden">
      {/* Dynamic Cyberpunk background grid elements */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
      
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-cyber-cyan/10 blur-3xl opacity-60" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-cyber-purple/10 blur-3xl opacity-60" />

      {/* Main glass card container */}
      <div className="w-full max-w-md glassmorphism rounded-2xl p-8 border border-slate-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.8)] glow-border-cyber relative z-10">
        
        {/* Floating Scanner Bar inside Card */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent animate-scanner-sweep opacity-20" />

        {/* Brand logo header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div 
            onClick={() => navigate('/')}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center neon-glow-cyan mb-4 cursor-pointer hover:scale-105 transition-transform"
          >
            <Cpu size={24} className="text-white" />
          </div>
          <h2 className="font-display font-black text-2xl text-white tracking-wide uppercase">
            SECURE ACCESS
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">Authenticate node connection to TruthLens AI</p>
        </div>

        {/* Console error logging */}
        {errorMsg && (
          <div className="p-3 bg-cyber-red/10 border border-cyber-red/30 rounded-xl flex items-center gap-2 mb-6 font-mono text-[11px] text-cyber-red">
            <Terminal size={14} className="flex-shrink-0 animate-pulse" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email input field */}
          <div className="space-y-1.5 font-mono">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <Mail size={12} className="text-cyber-cyan" />
              <span>Telemetry Node Email</span>
            </label>
            <div className="relative flex items-center">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@truthlens.ai"
                className="w-full bg-slate-950/70 border border-slate-850 hover:border-slate-800 focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 rounded-xl px-4 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-1.5 font-mono">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <Lock size={12} className="text-cyber-purple" />
              <span>Terminal Passkey</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950/70 border border-slate-850 hover:border-slate-800 focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/30 rounded-xl pl-4 pr-12 py-3.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-slate-500 hover:text-slate-350 transition-colors p-1"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Forgot Passkey Mock Toggle */}
          <div className="flex justify-end font-mono">
            <span className="text-[10px] text-slate-500 hover:text-cyber-cyan transition-colors cursor-pointer select-none">
              Recover Terminal Key?
            </span>
          </div>

          {/* Submit Trigger Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-black text-xs tracking-widest uppercase cyber-btn-cyan text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>DECRYPTING TELEMETRY LOCK...</span>
              </>
            ) : (
              <>
                <span>ESTABLISH SECURE LINK</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Divider and social gateways */}
        <div className="my-6 flex items-center justify-between font-mono select-none">
          <span className="h-[1px] w-full bg-slate-900" />
          <span className="text-[9px] text-slate-600 px-3 uppercase tracking-wider whitespace-nowrap">External Auth Gates</span>
          <span className="h-[1px] w-full bg-slate-900" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => {
              setEmail('git.analyst@truthlens.ai');
              setPassword('cybersecuritypass');
            }}
            className="py-2.5 rounded-xl border border-slate-850 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-white flex items-center justify-center gap-2 font-mono text-xs cursor-pointer transition-colors"
          >
            <Terminal size={14} />
            <span>GitHub Gate</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setEmail('chrome.expert@truthlens.ai');
              setPassword('googletravelpass');
            }}
            className="py-2.5 rounded-xl border border-slate-850 hover:border-slate-700 bg-slate-950/40 text-slate-400 hover:text-white flex items-center justify-center gap-2 font-mono text-xs cursor-pointer transition-colors"
          >
            <Cpu size={14} />
            <span>Google Gate</span>
          </button>
        </div>

        {/* Mode switching footer links */}
        <div className="mt-8 text-center font-mono text-xs select-none">
          <span className="text-slate-500">Unregistered terminal? </span>
          <Link to="/signup" className="text-cyber-purple font-bold hover:text-cyber-cyan hover:underline transition-colors">
            Register new node
          </Link>
        </div>
      </div>
    </div>
  );
};
