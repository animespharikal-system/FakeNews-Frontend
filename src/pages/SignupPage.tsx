import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Cpu, Terminal, ArrowRight, ShieldAlert, BadgeCheck } from 'lucide-react';

interface SignupPageProps {
  onLogin: (email: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'ANALYST' | 'AUDITOR' | 'OPERATOR'>('ANALYST');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    if (password !== confirmPassword) {
      setErrorMsg('Terminal passkey parity error. Values mismatch.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Terminal key length insufficient. Min 6 characters.');
      setIsLoading(false);
      return;
    }

    // Simulate node registration
    setTimeout(() => {
      onLogin(email);
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-6 cyber-dot-bg overflow-hidden">
      {/* Dynamic Background elements */}
      <div className="absolute inset-0 cyber-grid opacity-15 pointer-events-none" />
      
      {/* Background glow effects */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-cyber-purple/10 blur-3xl opacity-60" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyber-cyan/10 blur-3xl opacity-60" />

      {/* Main glass card container */}
      <div className="w-full max-w-md glassmorphism rounded-2xl p-8 border border-slate-800/80 shadow-[0_15px_40px_rgba(0,0,0,0.8)] glow-border-cyber relative z-10">
        
        {/* Sweeping laser scanner overlay line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyber-purple to-transparent animate-scanner-sweep opacity-20" />

        {/* Brand logo header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div 
            onClick={() => navigate('/')}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center neon-glow-cyan mb-4 cursor-pointer hover:scale-105 transition-transform"
          >
            <Cpu size={24} className="text-white" />
          </div>
          <h2 className="font-display font-black text-2xl text-white tracking-wide uppercase">
            REGISTER NODE
          </h2>
          <p className="text-xs text-slate-500 font-mono mt-1">Deploy new analysis console on TruthLens AI</p>
        </div>

        {/* Console error logging */}
        {errorMsg && (
          <div className="p-3 bg-cyber-red/10 border border-cyber-red/30 rounded-xl flex items-center gap-2 mb-4 font-mono text-[11px] text-cyber-red">
            <Terminal size={14} className="flex-shrink-0 animate-pulse" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <Mail size={12} className="text-cyber-cyan" />
              <span>COMMUNICATION EMAIL GATEWAY</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="analyst@truthlens.ai"
              className="w-full bg-slate-950/70 border border-slate-850 hover:border-slate-800 focus:border-cyber-cyan/50 focus:ring-1 focus:ring-cyber-cyan/30 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
            />
          </div>

          {/* Select role field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <ShieldAlert size={12} className="text-cyber-yellow" />
              <span>NODE ACCESS PROFILE</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['ANALYST', 'AUDITOR', 'OPERATOR'] as const).map((r) => (
                <button
                  type="button"
                  key={r}
                  onClick={() => setRole(r)}
                  className={`py-2 rounded-lg border text-[10px] font-bold tracking-wide cursor-pointer transition-all
                    ${role === r
                      ? 'text-cyber-yellow border-cyber-yellow bg-cyber-yellow/10'
                      : 'text-slate-400 border-slate-850 hover:border-slate-800 bg-slate-950/40 hover:text-slate-300'
                    }
                  `}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <Lock size={12} className="text-cyber-purple" />
              <span>TERMINAL PASSKEY</span>
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full bg-slate-950/70 border border-slate-850 hover:border-slate-800 focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/30 rounded-xl pl-4 pr-12 py-3 text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
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

          {/* Confirm Password input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
              <BadgeCheck size={12} className="text-cyber-purple" />
              <span>CONFIRM PASSKEY INTEGRITY</span>
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter passkey"
              className="w-full bg-slate-950/70 border border-slate-850 hover:border-slate-800 focus:border-cyber-purple/50 focus:ring-1 focus:ring-cyber-purple/30 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-600 focus:outline-none transition-all"
            />
          </div>

          {/* Submit Trigger Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 mt-2 rounded-xl font-black text-[10px] tracking-widest uppercase cyber-btn-cyan text-white flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>SPAWNING NODE INSTANCE...</span>
              </>
            ) : (
              <>
                <span>DEPLOY NODE SECURELY</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </form>

        {/* Mode switching footer links */}
        <div className="mt-6 text-center font-mono text-xs select-none">
          <span className="text-slate-500">Already registered? </span>
          <Link to="/login" className="text-cyber-purple font-bold hover:text-cyber-cyan hover:underline transition-colors">
            Connect node
          </Link>
        </div>
      </div>
    </div>
  );
};
