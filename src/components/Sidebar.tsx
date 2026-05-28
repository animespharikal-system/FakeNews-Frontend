import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  SearchCode, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  Menu, 
  X,
  ShieldCheck,
  Cpu
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
  userEmail?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onLogout, userEmail = 'analyst@truthlens.ai' }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      name: 'Dashboard', 
      icon: LayoutDashboard, 
      path: '/dashboard',
      description: 'Analytics & Scan History'
    },
    { 
      name: 'Analyze News', 
      icon: SearchCode, 
      path: '/analyze',
      description: 'Credibility Scanner'
    },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 bg-cyber-dark/95 border border-cyber-cyan/30 rounded-lg text-cyber-cyan focus:outline-none hover:bg-cyber-cyan/10 transition-colors"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Backdrop for Mobile */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-45"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-46 flex flex-col glassmorphism border-r border-slate-800 transition-all duration-300 ease-in-out
          ${isCollapsed ? 'w-20' : 'w-64'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Brand / Logo */}
        <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden cursor-pointer" onClick={() => handleNav('/')}>
            <div className="relative flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-cyber-cyan to-cyber-purple flex items-center justify-center neon-glow-cyan">
              <Cpu size={16} className="text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-display font-bold text-lg bg-gradient-to-r from-white via-cyan-200 to-cyber-cyan bg-clip-text text-transparent tracking-wide select-none">
                TRUTH<span className="text-cyber-cyan">LENS</span>
              </span>
            )}
          </div>
          
          {/* Collapse toggle (Desktop only) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-1.5 rounded-lg border border-slate-800 hover:border-cyber-cyan/30 text-slate-400 hover:text-cyber-cyan transition-colors"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <button
                key={item.name}
                onClick={() => handleNav(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 relative group
                  ${isActive 
                    ? 'text-cyber-cyan bg-cyber-cyan/5 border border-cyber-cyan/20' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
                  }
                `}
              >
                <Icon size={20} className={isActive ? 'text-cyber-cyan neon-text-cyan' : 'group-hover:text-cyber-cyan transition-colors'} />
                
                {!isCollapsed && (
                  <div className="text-left">
                    <p className="font-medium text-sm leading-none">{item.name}</p>
                    <p className="text-[10px] text-slate-500 mt-1 select-none font-mono group-hover:text-slate-400 transition-colors">{item.description}</p>
                  </div>
                )}

                {/* Left Active border indicator */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-1 bg-cyber-cyan rounded-r-md shadow-[0_0_10px_#06b6d4]" />
                )}

                {/* Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-24 px-3 py-2 bg-slate-900 border border-slate-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                    <p className="font-bold">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">{item.description}</p>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Info / Logout Panel */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/20">
          <div className={`flex items-center gap-3 overflow-hidden ${isCollapsed ? 'justify-center' : ''}`}>
            {/* Avatar block */}
            <div className="w-10 h-10 rounded-full border border-slate-800 flex-shrink-0 flex items-center justify-center bg-slate-900 text-cyber-purple font-mono font-bold text-sm relative group cursor-pointer hover:border-cyber-purple/50 transition-colors">
              {userEmail.substring(0, 2).toUpperCase()}
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-cyber-green border-2 border-cyber-black rounded-full shadow-[0_0_8px_#10b981]" />
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{userEmail.split('@')[0]}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <ShieldCheck size={10} className="text-cyber-purple" />
                  <span className="text-[9px] font-mono text-cyber-purple uppercase tracking-wider font-bold">Pro Scanner</span>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onLogout}
            className={`mt-4 w-full flex items-center gap-4 px-4 py-3 rounded-xl border border-slate-900 hover:border-cyber-red/20 text-slate-400 hover:text-cyber-red hover:bg-cyber-red/5 transition-all duration-200 relative group`}
          >
            <LogOut size={18} className="group-hover:text-cyber-red transition-colors" />
            {!isCollapsed && <span className="font-semibold text-xs">Terminate Session</span>}
            
            {/* Tooltip when collapsed */}
            {isCollapsed && (
              <div className="absolute left-24 px-3 py-2 bg-slate-900 border border-slate-800 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none whitespace-nowrap z-50">
                <span className="text-cyber-red font-bold">Terminate Session</span>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};
