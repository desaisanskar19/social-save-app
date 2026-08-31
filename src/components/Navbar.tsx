import React, { useState } from 'react';
import { Download, Sun, Moon, Sparkles, Clock, HelpCircle, BookOpen, ShieldCheck, Menu, X, Share2, Clipboard } from 'lucide-react';
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
    { id: 'home', label: 'Downloader', icon: <Download className="w-4 h-4" /> },
    { id: 'how-it-works', label: 'How It Works', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'history', label: 'History', icon: <Clock className="w-4 h-4" />, badge: historyCount },
    { id: 'privacy', label: 'Compliance', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          id="nav-logo-button"
          onClick={() => {
            setActivePage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-500 p-0.5 shadow-md shadow-pink-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-white">
              <Download className="w-5 h-5 text-pink-400 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                SocialSave
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                PRO
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block -mt-1 font-medium">
              Instagram & Facebook Media
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
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
                className={`relative px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 font-semibold'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="ml-1 text-[11px] font-bold px-1.5 py-0.2 rounded-full bg-pink-500 text-white leading-none">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onQuickPaste && (
            <button
              id="nav-quick-paste-btn"
              onClick={onQuickPaste}
              title="Paste clipboard and analyze"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700"
            >
              <Clipboard className="w-3.5 h-3.5 text-pink-500" />
              <span>Paste URL</span>
            </button>
          )}

          {/* Theme toggle */}
          <button
            id="nav-theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Mobile menu button */}
          <button
            id="nav-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-800"
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
          className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200"
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
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-950/40 font-semibold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-pink-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-2 text-xs text-slate-500">
            <span>Fast, Secure, No registration</span>
            <span className="flex items-center gap-1 text-pink-500 font-medium">
              <Sparkles className="w-3.5 h-3.5" /> 100% Free
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
