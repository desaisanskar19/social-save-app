import React from 'react';
import { Zap, Sparkles, Smartphone, Music, Video, Lock } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-5 h-5 text-[#fcb045]" />,
      title: 'Ultra Fast Processing',
      description: 'Analyze URLs and download videos in seconds without artificial wait times or redirect loops.',
    },
    {
      icon: <Video className="w-5 h-5 text-[#fd1d1d]" />,
      title: 'Original HD Quality',
      description: 'Download media in the highest resolution uploaded by the creator, including 1080p Full HD and 4K when available.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-[#833ab4]" />,
      title: 'Zero Watermarks',
      description: 'Clean video downloads preserving original audio and visuals with no added logos or branding overlays.',
    },
    {
      icon: <Music className="w-5 h-5 text-sky-400" />,
      title: 'Audio Extractor (MP3)',
      description: 'Convert Instagram Reels and Facebook videos to high-bitrate MP3 audio files with one click.',
    },
    {
      icon: <Lock className="w-5 h-5 text-emerald-400" />,
      title: '100% Free & No Signup',
      description: 'No accounts, credit cards, or logins required. Completely free to use for authorized public content.',
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#1877F2]" />,
      title: 'Mobile-First Experience',
      description: 'Optimized touch interface supporting direct saving to iPhone Camera Roll and Android Files.',
    },
  ];

  return (
    <section id="features-section" className="py-20 bg-zinc-950/60 border-y border-zinc-850">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-bold uppercase tracking-[0.3em] text-zinc-500 mb-3">
            Core Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3 uppercase">
            Engineered For Speed & Quality
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Engineered for high-speed social media extraction with a focus on privacy and visual fidelity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-zinc-900 border border-zinc-800 rounded-[24px] p-6 shadow-xl hover:border-zinc-700 transition-colors"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-5">
                {feature.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
