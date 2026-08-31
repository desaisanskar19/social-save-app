import React, { useState } from 'react';
import { Download, Sun, Moon, Sparkles, Clock, HelpCircle, BookOpen, ShieldCheck, Menu, X, Clipboard } from 'lucide-react';
import { ActivePage } from '../types';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  historyCount: number;
  onQuickPaste?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  setActivePage,
  theme,
  setTheme,
  historyCount,
  onQuickPaste,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  const navItems: { id: ActivePage; label: string; icon: React.ReactNode; badge?: number }[] = [
    { id: 'home', label: 'Download', icon: <Download className="w-3.5 h-3.5" /> },
    { id: 'how-it-works', label: 'How it Works', icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { id: 'history', label: 'History', icon: <Clock className="w-3.5 h-3.5" />, badge: historyCount },
    { id: 'privacy', label: 'Compliance', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-zinc-800/80 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo with 12-deg rotated artistic gradient */}
        <button
          id="nav-logo-button"
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center space-x-3 group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-pink-500/20 group-hover:rotate-0 transition-transform duration-300">
            <Download className="w-4.5 h-4.5 text-white -rotate-12 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            SocialSave
          </span>
        </button>

        {/* Desktop Navigation with Artistic Flair tracking and active underlines */}
        <nav className="hidden md:flex items-center space-x-8 text-xs font-semibold uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => {
                  setActivePage(item.id);
                  if (item.id === 'home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                  isActive
                    ? 'text-zinc-900 dark:text-white underline underline-offset-8 decoration-[#1877F2] font-bold decoration-2'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                }`}
              >
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#fd1d1d] text-white leading-none">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {onQuickPaste && (
            <button
              id="nav-quick-paste-btn"
              onClick={onQuickPaste}
              title="Paste clipboard URL"
              className="hidden sm:flex items-center space-x-2 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-slate-300 dark:border-zinc-800 transition-all cursor-pointer shadow-sm"
            >
              <Clipboard className="w-3.5 h-3.5 text-[#fd1d1d]" />
              <span>Paste URL</span>
            </button>
          )}

          {/* Theme toggle custom styled switch */}
          <button
            id="nav-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className="w-13 h-7 bg-slate-200 hover:bg-slate-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-full flex items-center px-1 relative transition-colors cursor-pointer border border-slate-300 dark:border-zinc-700 shadow-inner"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            <div
              className={`w-5 h-5 rounded-full transition-transform duration-200 flex items-center justify-center shadow-md ${
                theme === 'dark'
                  ? 'translate-x-6 bg-zinc-950 text-amber-400'
                  : 'translate-x-0 bg-amber-400 text-zinc-900'
              }`}
            >
              {theme === 'dark' ? (
                <Moon className="w-3 h-3" />
              ) : (
                <Sun className="w-3 h-3" />
              )}
            </div>
          </button>

          {/* Mobile menu button */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-drawer-menu"
          className="md:hidden border-b border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-[#0A0A0A]/95 backdrop-blur-2xl px-6 py-5 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs uppercase tracking-widest font-semibold transition-colors ${
                  isActive
                    ? 'text-zinc-900 dark:text-white bg-slate-100 dark:bg-zinc-900 border border-slate-300 dark:border-zinc-800 font-bold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-900/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#fd1d1d] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
