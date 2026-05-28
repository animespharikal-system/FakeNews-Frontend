import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Cpu, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'Core Engine', target: '#features' },
    { name: 'How It Works', target: '#workflow' },
    { name: 'Global Accuracy', target: '#stats' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-4 bg-cyber-black/85 backdrop-blur-md border-b border-slate-900 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'py-6 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <div 
          onClick={() => handleNav('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center neon-glow-cyan group-hover:scale-105 transition-transform duration-200">
            <Cpu size={18} className="text-white" />
            {/* Ambient Pulse Layer */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple opacity-40 blur-sm -z-10 group-hover:opacity-75 transition-opacity" />
          </div>
          <span className="font-display font-black text-xl tracking-wider text-white">
            TRUTH<span className="text-cyber-cyan">LENS</span>
          </span>
        </div>

        {/* Desktop Nav Links */}
        {location.pathname === '/' && (
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.target}
                className="text-slate-400 hover:text-cyber-cyan text-sm font-semibold tracking-wide transition-colors duration-200 font-display relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyber-cyan transition-all duration-200 group-hover:w-full shadow-[0_0_8px_#06b6d4]" />
              </a>
            ))}
          </nav>
        )}

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => handleNav('/dashboard')}
                className="px-5 py-2 rounded-xl text-sm font-bold text-white glassmorphism border border-slate-800 hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all flex items-center gap-1.5"
              >
                Go to Dashboard
                <ArrowUpRight size={14} />
              </button>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-cyber-red transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNav('/login')}
                className="px-4 py-2 text-sm font-bold text-slate-300 hover:text-white transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => handleNav('/signup')}
                className="px-5 py-2.5 rounded-xl text-sm font-bold text-white cyber-btn-cyan flex items-center gap-1.5"
              >
                Access Platform
                <ArrowUpRight size={15} />
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-400 hover:text-white p-1"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[73px] inset-x-0 bottom-0 bg-cyber-black/98 backdrop-blur-xl border-t border-slate-900 z-40 p-6 flex flex-col justify-between">
          <div className="space-y-6">
            {location.pathname === '/' && (
              <nav className="flex flex-col gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.target}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-slate-300 hover:text-cyber-cyan font-bold text-lg tracking-wide py-2 border-b border-slate-900/60"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            )}
          </div>

          <div className="flex flex-col gap-4 mt-auto">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => handleNav('/dashboard')}
                  className="w-full py-3.5 rounded-xl text-center font-bold text-white glassmorphism border border-slate-800 hover:border-cyber-cyan/40 hover:text-cyber-cyan transition-all flex items-center justify-center gap-2"
                >
                  Go to Dashboard
                  <ArrowUpRight size={16} />
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-3 text-center font-bold text-slate-400 hover:text-cyber-red transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleNav('/login')}
                  className="w-full py-3.5 rounded-xl text-center font-bold text-slate-300 hover:text-white border border-slate-900 hover:bg-slate-900/40 transition-all"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleNav('/signup')}
                  className="w-full py-3.5 rounded-xl text-center font-bold text-white cyber-btn-cyan flex items-center justify-center gap-2"
                >
                  Access Platform
                  <ArrowUpRight size={16} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
