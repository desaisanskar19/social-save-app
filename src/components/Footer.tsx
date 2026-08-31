import React from 'react';
import { Download, ShieldCheck, Heart, Sparkles, Activity } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-100 dark:border-slate-800/80">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-600 to-amber-500 flex items-center justify-center text-white">
                <Download className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-lg bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                SocialSave
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast, modern, and reliable social media media downloader. Download publicly accessible Instagram Reels, Posts, Stories, and Facebook Videos in original HD quality.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All extraction services online & active</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Platform Tools
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-pink-500 transition-colors"
                >
                  Instagram Reels Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-pink-500 transition-colors"
                >
                  Instagram Photo & Story Saver
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-pink-500 transition-colors"
                >
                  Facebook Video & Reel Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-pink-500 transition-colors"
                >
                  How It Works Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-pink-500 transition-colors"
                >
                  My Download History
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="md:col-span-4 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              Compliance & Legal
            </h4>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-pink-500 transition-colors"
                >
                  Privacy Policy (Zero-Log)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-pink-500 transition-colors"
                >
                  Terms of Service & Fair Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dmca')}
                  className="hover:text-pink-500 transition-colors"
                >
                  DMCA & Copyright Takedowns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-pink-500 transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 dark:text-slate-500">
          <p>
            Disclaimer: SocialSave is an independent utility and is not affiliated with, endorsed, or sponsored by Meta, Instagram, or Facebook. All trademarks belong to their respective owners.
          </p>
          <div className="flex items-center gap-1 shrink-0">
            <span>© {new Date().getFullYear()} SocialSave. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
