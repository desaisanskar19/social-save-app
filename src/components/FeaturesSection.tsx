import React from 'react';
import { Zap, ShieldCheck, Sparkles, Smartphone, Music, CheckCircle, Video, Lock, CloudLightning } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-amber-500" />,
      title: 'Ultra Fast Processing',
      description: 'Analyze URLs and download videos in seconds without artificial wait times or redirect loops.',
    },
    {
      icon: <Video className="w-6 h-6 text-pink-500" />,
      title: 'Original HD Quality',
      description: 'Download media in the highest resolution uploaded by the creator, including 1080p Full HD and 4K when available.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-purple-500" />,
      title: 'Zero Watermarks',
      description: 'Clean video downloads preserving original audio and visuals with no added logos or branding overlays.',
    },
    {
      icon: <Music className="w-6 h-6 text-sky-500" />,
      title: 'Audio Extractor (MP3)',
      description: 'Convert Instagram Reels and Facebook videos to high-bitrate MP3 audio files with one click.',
    },
    {
      icon: <Lock className="w-6 h-6 text-emerald-500" />,
      title: '100% Free & No Signup',
      description: 'No accounts, credit cards, or logins required. Completely free to use for authorized public content.',
    },
    {
      icon: <Smartphone className="w-6 h-6 text-indigo-500" />,
      title: 'Mobile-First Experience',
      description: 'Optimized touch interface supporting direct saving to iPhone Camera Roll and Android Files.',
    },
  ];

  return (
    <section id="features-section" className="py-16 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
            Why Use SocialSave?
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Engineered for high-speed social media extraction with a focus on privacy and visual fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-4 border border-slate-100 dark:border-slate-700/60">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1.5">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
