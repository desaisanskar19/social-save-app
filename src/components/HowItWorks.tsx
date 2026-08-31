import React, { useState } from 'react';
import { Copy, Sparkles, Download, CheckCircle2, Smartphone, Monitor, ArrowRight, Share2, HelpCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const [activePlatformTab, setActivePlatformTab] = useState<'instagram' | 'facebook'>('instagram');

  return (
    <section id="how-it-works-section" className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Simple 3-Step Process</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          How to Download Social Media Media
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Save your favorite reels, videos, stories, and posts in high definition within seconds.
        </p>
      </div>

      {/* 3 Core Steps Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {/* Step 1 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg relative flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-pink-500/20">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Copy the Public Link
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Open Instagram or Facebook, locate the public post, reel, story, or video you wish to download, tap the <span className="font-semibold text-slate-900 dark:text-white">Share</span> button, and select <span className="font-semibold text-slate-900 dark:text-white">"Copy Link"</span>.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-pink-600 dark:text-pink-400">
            <Share2 className="w-4 h-4" />
            <span>Works on mobile apps & desktop</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg relative flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-purple-500/20">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Paste in SocialSave
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Paste the copied URL into the search box above. SocialSave automatically detects the source platform and extracts the highest quality available streams.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400">
            <Copy className="w-4 h-4" />
            <span>Automatic platform auto-detector</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-lg relative flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 text-white flex items-center justify-center font-black text-xl mb-6 shadow-md shadow-blue-500/20">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Select Quality & Save
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Choose your desired format (1080p Full HD, standard MP4, audio MP3, or high-res cover JPG) and click <span className="font-semibold text-slate-900 dark:text-white">Download</span>.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
            <Download className="w-4 h-4" />
            <span>Direct instant saving without watermarks</span>
          </div>
        </div>
      </div>

      {/* Platform-Specific Step Guide Tabs */}
      <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Platform Specific Copying Instructions
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Select your platform to see detailed instructions
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-200 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActivePlatformTab('instagram')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePlatformTab === 'instagram'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Instagram Guide
            </button>
            <button
              onClick={() => setActivePlatformTab('facebook')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePlatformTab === 'facebook'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
              }`}
            >
              Facebook Guide
            </button>
          </div>
        </div>

        {activePlatformTab === 'instagram' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
            <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                <Smartphone className="w-4 h-4 text-pink-500" />
                <span>Instagram App (iOS / Android)</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed">
                <li>Open the Instagram app and navigate to the Reel or Post.</li>
                <li>Tap the <strong>Paper Airplane (Share)</strong> icon below the post or on the side of the Reel.</li>
                <li>Tap the <strong>"Copy Link"</strong> button at the bottom tray.</li>
                <li>Return to SocialSave and paste the URL.</li>
              </ol>
            </div>

            <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                <Monitor className="w-4 h-4 text-purple-500" />
                <span>Instagram Web Browser</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed">
                <li>Open <code className="text-pink-500">instagram.com</code> in your browser.</li>
                <li>Click on any post or reel to view it in full page mode.</li>
                <li>Copy the address from your browser's address bar (e.g. <span className="font-mono text-[11px] text-slate-400">instagram.com/reel/...</span>).</li>
                <li>Paste it directly into SocialSave.</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-600 dark:text-slate-300">
            <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                <Smartphone className="w-4 h-4 text-blue-500" />
                <span>Facebook App (iOS / Android)</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed">
                <li>Open the Facebook mobile app and find the video or reel.</li>
                <li>Tap the <strong>Share</strong> button at the bottom of the post.</li>
                <li>Tap <strong>More Options</strong> and select <strong>"Copy Link"</strong>.</li>
                <li>Paste it into SocialSave.</li>
              </ol>
            </div>

            <div className="bg-white dark:bg-slate-850 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2">
                <Monitor className="w-4 h-4 text-blue-500" />
                <span>Facebook Web Browser</span>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-xs leading-relaxed">
                <li>Open Facebook on your desktop or mobile browser.</li>
                <li>Click the <strong>three dots (...)</strong> on the top right of the post.</li>
                <li>Click <strong>"Copy link"</strong>, or copy the direct URL from the address bar.</li>
                <li>Paste the URL into SocialSave.</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
