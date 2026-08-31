import React, { useState } from 'react';
import { Copy, Sparkles, Download, Smartphone, Monitor, Share2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activePlatformTab, setActivePlatformTab] = useState<'instagram' | 'facebook'>('instagram');

  return (
    <section id="how-it-works-section" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#fd1d1d]" />
          <span>Simple 3-Step Process</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3 uppercase">
          How to Download Social Media
        </h2>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
          Save your favorite reels, videos, stories, and posts in high definition within seconds.
        </p>
      </div>

      {/* 3 Core Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Step 1 */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[28px] p-6 sm:p-8 shadow-md dark:shadow-xl relative flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-pink-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Copy the Public Link
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Open Instagram or Facebook, locate the public post, reel, story, or video you wish to download, tap the <span className="font-semibold text-zinc-900 dark:text-white">Share</span> button, and select <span className="font-semibold text-zinc-900 dark:text-white">"Copy Link"</span>.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center gap-2 text-xs font-semibold text-[#fd1d1d]">
            <Share2 className="w-4 h-4" />
            <span>Works on mobile apps & desktop</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[28px] p-6 sm:p-8 shadow-md dark:shadow-xl relative flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#fd1d1d] to-[#1877F2] text-white flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-blue-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Paste in SocialSave
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Paste the copied URL into the search box above. SocialSave automatically detects the source platform and extracts the highest quality available streams.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center gap-2 text-xs font-semibold text-[#1877F2]">
            <Copy className="w-4 h-4" />
            <span>Automatic platform auto-detector</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[28px] p-6 sm:p-8 shadow-md dark:shadow-xl relative flex flex-col justify-between hover:border-slate-300 dark:hover:border-zinc-700 transition-colors">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1877F2] to-emerald-400 text-white flex items-center justify-center font-black text-xl mb-6 shadow-lg shadow-emerald-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
              Select Quality & Save
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Choose your desired format (1080p Full HD, standard MP4, audio MP3, or high-res cover JPG) and click <span className="font-semibold text-zinc-900 dark:text-white">Download</span>.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-200 dark:border-zinc-800 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Download className="w-4 h-4" />
            <span>Direct instant saving without watermarks</span>
          </div>
        </div>
      </div>

      {/* Platform-Specific Step Guide Tabs */}
      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[28px] p-6 sm:p-8 shadow-xl transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white uppercase tracking-wide">
              Platform Copying Guide
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
              Select your platform for step-by-step instructions
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-950 p-1.5 rounded-full border border-slate-200 dark:border-zinc-800">
            <button
              onClick={() => setActivePlatformTab('instagram')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePlatformTab === 'instagram'
                  ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Instagram Guide
            </button>
            <button
              onClick={() => setActivePlatformTab('facebook')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activePlatformTab === 'facebook'
                  ? 'bg-[#1877F2] text-white shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              Facebook Guide
            </button>
          </div>
        </div>

        {activePlatformTab === 'instagram' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-700 dark:text-zinc-300">
            <div className="bg-slate-50 dark:bg-zinc-950/80 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-2">
                <Smartphone className="w-4 h-4 text-[#fd1d1d]" />
                <span>Instagram App (iOS / Android)</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                <li>Open the Instagram app and navigate to the Reel or Post.</li>
                <li>Tap the <strong className="text-zinc-900 dark:text-white">Paper Airplane (Share)</strong> icon below the post or on the side of the Reel.</li>
                <li>Tap the <strong className="text-zinc-900 dark:text-white">"Copy Link"</strong> button at the bottom tray.</li>
                <li>Return to SocialSave and paste the URL.</li>
              </ol>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-950/80 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-2">
                <Monitor className="w-4 h-4 text-[#833ab4]" />
                <span>Instagram Web Browser</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                <li>Open <code className="text-[#fd1d1d]">instagram.com</code> in your browser.</li>
                <li>Click on any post or reel to view it in full page mode.</li>
                <li>Copy the address from your browser's address bar (e.g. <span className="font-mono text-[11px] text-zinc-500">instagram.com/reel/...</span>).</li>
                <li>Paste it directly into SocialSave.</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-700 dark:text-zinc-300">
            <div className="bg-slate-50 dark:bg-zinc-950/80 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-2">
                <Smartphone className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook App (iOS / Android)</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                <li>Open the Facebook mobile app and find the video or reel.</li>
                <li>Tap the <strong className="text-zinc-900 dark:text-white">Share</strong> button at the bottom of the post.</li>
                <li>Tap <strong className="text-zinc-900 dark:text-white">More Options</strong> and select <strong className="text-zinc-900 dark:text-white">"Copy Link"</strong>.</li>
                <li>Paste it into SocialSave.</li>
              </ol>
            </div>

            <div className="bg-slate-50 dark:bg-zinc-950/80 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white mb-2">
                <Monitor className="w-4 h-4 text-[#1877F2]" />
                <span>Facebook Web Browser</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                <li>Open Facebook on your desktop or mobile browser.</li>
                <li>Click the <strong className="text-zinc-900 dark:text-white">three dots (...)</strong> on the top right of the post.</li>
                <li>Click <strong className="text-zinc-900 dark:text-white">"Copy link"</strong>, or copy the direct URL from the address bar.</li>
                <li>Paste the URL into SocialSave.</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
