import React from 'react';
import { Download } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-zinc-850 bg-[#0A0A0A] text-zinc-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-zinc-850">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center text-white shadow-md">
                <Download className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-xl tracking-tight text-white uppercase">
                SocialSave
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Fast, modern, and reliable social media downloader. Download publicly accessible Instagram Reels, Posts, Stories, and Facebook Videos in original HD quality.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-gradient-to-tr from-[#833ab4] to-[#fcb045]" />
              <span>App Made by <strong className="text-white font-bold">Sanskar Desai</strong></span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All extraction services online & active</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">
              Platform Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    onNavigate('home');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
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
                  className="hover:text-white transition-colors cursor-pointer"
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
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Facebook Video & Reel Downloader
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How It Works Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('history')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  My Download History
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">
              Compliance & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy (Zero-Log)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms of Service & Fair Use
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('dmca')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  DMCA & Copyright Takedowns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>
            Disclaimer: SocialSave is an independent utility and is not affiliated with, endorsed, or sponsored by Meta, Instagram, or Facebook. All trademarks belong to their respective owners.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <span className="text-zinc-300">
              App Made by <strong className="text-white font-semibold">Sanskar Desai</strong>
            </span>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <span>© {new Date().getFullYear()} SocialSave. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
