import React, { useState, useEffect, useRef } from 'react';
import { Download, Sparkles, Clipboard, X, ArrowRight, ShieldCheck, Zap, Video, Camera, Film, Check, AlertCircle } from 'lucide-react';
import { Platform, ContentType } from '../types';

interface HeroSectionProps {
  url: string;
  setUrl: (url: string) => void;
  onProcess: (urlToProcess?: string) => void;
  isLoading: boolean;
  error?: string | null;
  onClearError?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  url,
  setUrl,
  onProcess,
  isLoading,
  error,
  onClearError,
}) => {
  const [detectedPlatform, setDetectedPlatform] = useState<Platform | null>(null);
  const [detectedType, setDetectedType] = useState<ContentType | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-detect platform and type as user types or pastes
  useEffect(() => {
    const trimmed = url.trim().toLowerCase();
    if (!trimmed) {
      setDetectedPlatform(null);
      setDetectedType(null);
      return;
    }

    if (trimmed.includes('instagram.com') || trimmed.includes('instagr.am')) {
      setDetectedPlatform('instagram');
      if (trimmed.includes('/reel') || trimmed.includes('/reels')) setDetectedType('reel');
      else if (trimmed.includes('/stories') || trimmed.includes('/s/')) setDetectedType('story');
      else if (trimmed.includes('/p/')) setDetectedType('post');
      else if (trimmed.includes('/tv/')) setDetectedType('video');
      else setDetectedType('post');
    } else if (trimmed.includes('facebook.com') || trimmed.includes('fb.watch') || trimmed.includes('fb.me')) {
      setDetectedPlatform('facebook');
      if (trimmed.includes('fb.watch') || trimmed.includes('/watch') || trimmed.includes('/videos')) setDetectedType('video');
      else if (trimmed.includes('/reel')) setDetectedType('reel');
      else setDetectedType('post');
    } else {
      setDetectedPlatform(null);
      setDetectedType(null);
    }
  }, [url]);

  const handlePaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text) {
          setUrl(text.trim());
          if (onClearError) onClearError();
          // Auto-focus input
          inputRef.current?.focus();
        }
      }
    } catch (err) {
      console.warn('Clipboard read permission denied or unavailable:', err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;
    onProcess();
  };

  const samplePresets = [
    {
      label: '🔥 Instagram Reel',
      url: 'https://www.instagram.com/reel/C8qA1B2xYZ3/',
      platform: 'instagram' as const,
      type: 'reel' as const,
    },
    {
      label: '📸 Instagram Carousel',
      url: 'https://www.instagram.com/p/C9mX7K9pL01/',
      platform: 'instagram' as const,
      type: 'post' as const,
    },
    {
      label: '🎬 Facebook Video',
      url: 'https://www.facebook.com/watch/?v=1092837465829102',
      platform: 'facebook' as const,
      type: 'video' as const,
    },
    {
      label: '✨ Instagram Story',
      url: 'https://www.instagram.com/stories/creative_creator/3344556677/',
      platform: 'instagram' as const,
      type: 'story' as const,
    },
    {
      label: '📰 Facebook Post',
      url: 'https://www.facebook.com/meta/posts/pfbid024982kjsdf8',
      platform: 'facebook' as const,
      type: 'post' as const,
    },
  ];

  return (
    <section id="hero-section" className="relative pt-10 pb-16 md:pt-16 md:pb-24 overflow-hidden">
      {/* Artistic Flair background ambient glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/20 blur-[130px] rounded-full pointer-events-none -z-10" />

      {/* Artistic Background Watermark Typography */}
      <div className="absolute top-0 right-0 p-8 flex flex-col items-end pointer-events-none opacity-5 select-none hidden lg:flex">
        <div className="text-[120px] font-black leading-none rotate-90 origin-top-right translate-y-20 text-white">
          REELS
        </div>
        <div className="text-[120px] font-black leading-none rotate-90 origin-top-right translate-y-40 text-white">
          STORIES
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Artistic Flair Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-slate-200/80 dark:bg-zinc-900/80 border border-slate-300 dark:border-zinc-800 text-xs font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-400 mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#833ab4] to-[#fd1d1d] animate-ping" />
          <span>High-Speed Social Content Downloader</span>
        </div>

        {/* Artistic Flair Display Headline */}
        <h1
          id="hero-heading"
          className="text-4xl sm:text-6xl md:text-[76px] font-extrabold leading-[0.95] tracking-tighter mb-6 text-zinc-900 dark:text-white uppercase"
        >
          Download{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]">
            Social Content
          </span>{' '}
          Easily
        </h1>

        {/* Subtitle */}
        <p
          id="hero-subtitle"
          className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed font-normal"
        >
          Paste a public Instagram or Facebook URL and download high-quality media in seconds. Fast, anonymous, and high-resolution.
        </p>

        {/* URL Input Form with Gradient Aura & Card */}
        <form
          id="download-form"
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto relative group mb-6"
        >
          {/* Glowing Aura backdrop */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#1877F2] rounded-[32px] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

          {/* Inner Input Card */}
          <div className="relative flex flex-col sm:flex-row bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[28px] p-2 shadow-xl dark:shadow-2xl items-center gap-2 transition-colors">
            {/* Left Input Field */}
            <div className="relative flex-1 w-full flex items-center min-w-0 px-3 py-1">
              {/* Dynamic Icon */}
              <div className="shrink-0 mr-2.5">
                {detectedPlatform === 'instagram' ? (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center text-white shadow-sm">
                    <Camera className="w-4 h-4" />
                  </div>
                ) : detectedPlatform === 'facebook' ? (
                  <div className="w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center text-white shadow-sm">
                    <Video className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 flex items-center justify-center">
                    <Download className="w-4 h-4" />
                  </div>
                )}
              </div>

              <input
                ref={inputRef}
                id="media-url-input"
                type="url"
                value={url}
                onChange={(e) => {
                  setUrl(e.target.value);
                  if (error && onClearError) onClearError();
                }}
                placeholder="Paste Instagram or Facebook URL here..."
                required
                autoComplete="off"
                className="w-full bg-transparent border-none outline-none text-base sm:text-lg text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 font-medium pr-16"
              />

              {/* Right Input Tools (Paste / Clear) */}
              <div className="absolute right-2 flex items-center gap-1">
                {url ? (
                  <button
                    type="button"
                    id="input-clear-btn"
                    onClick={() => {
                      setUrl('');
                      if (onClearError) onClearError();
                      inputRef.current?.focus();
                    }}
                    className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Clear input"
                    aria-label="Clear input"
                  >
                    <X className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    id="input-paste-btn"
                    onClick={handlePaste}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-300 transition-colors cursor-pointer"
                    title="Paste from clipboard"
                  >
                    <Clipboard className="w-3.5 h-3.5 text-[#fd1d1d]" />
                    <span className="hidden sm:inline">Paste</span>
                  </button>
                )}
              </div>
            </div>

            {/* Artistic Flair Solid High-Contrast Download Button */}
            <button
              id="hero-download-submit-btn"
              type="submit"
              disabled={isLoading || !url.trim()}
              className="w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-black px-8 sm:px-10 py-3.5 sm:py-4 rounded-[22px] font-bold text-base sm:text-lg hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </>
              )}
            </button>
          </div>

          {/* Real-time detection feedback */}
          {detectedPlatform && (
            <div className="mt-2.5 flex items-center justify-center gap-2 text-xs font-semibold">
              <span className="text-zinc-500 uppercase tracking-wider">Detected:</span>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border ${
                  detectedPlatform === 'instagram'
                    ? 'bg-pink-100 dark:bg-pink-950/40 text-pink-700 dark:text-pink-400 border-pink-300 dark:border-pink-500/30'
                    : 'bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-500/30'
                }`}
              >
                <Check className="w-3 h-3" />
                {detectedPlatform === 'instagram' ? 'Instagram' : 'Facebook'}{' '}
                {detectedType ? detectedType.toUpperCase() : 'Media'}
              </span>
            </div>
          )}
        </form>

        {/* Error Notification Alert */}
        {error && (
          <div
            id="hero-error-alert"
            className="max-w-2xl mx-auto mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-sm flex items-start gap-3 text-left shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-rose-900 dark:text-rose-200">{error}</p>
              <p className="text-xs text-rose-700 dark:text-rose-400/80 mt-1">
                Make sure the URL is public and accessible. For private profiles or DRM media, downloading is restricted.
              </p>
            </div>
            {onClearError && (
              <button
                onClick={onClearError}
                className="text-rose-600 hover:text-rose-900 dark:text-rose-400 dark:hover:text-white p-1 cursor-pointer"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Try Sample Chips */}
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 mr-2 block sm:inline mb-2 sm:mb-0">
            Quick Examples:
          </span>
          <div className="inline-flex flex-wrap items-center justify-center gap-2">
            {samplePresets.map((sample, idx) => (
              <button
                key={idx}
                id={`sample-preset-btn-${idx}`}
                type="button"
                onClick={() => {
                  setUrl(sample.url);
                  if (onClearError) onClearError();
                  onProcess(sample.url);
                }}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-slate-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white border border-slate-300 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-700 transition-all cursor-pointer shadow-sm"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Supported Platforms Pill Bar (Artistic Flair Spec) */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500 font-bold">
            Supported Platforms
          </span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-300">Instagram</span>
            </div>
            <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 rounded-full shadow-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-300">Facebook</span>
            </div>
          </div>
        </div>

        {/* Artistic Flair 01 / 02 / 03 Quick Step Counters */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 w-full max-w-4xl mx-auto pt-10 border-t border-slate-200 dark:border-zinc-900">
          <div className="border-l border-slate-300 dark:border-zinc-800 pl-6 text-left">
            <div className="text-3xl font-bold mb-1 text-zinc-900 dark:text-white">01</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Copy URL</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Copy public link from app or browser</p>
          </div>
          <div className="border-l border-slate-300 dark:border-zinc-800 pl-6 text-left">
            <div className="text-3xl font-bold mb-1 text-zinc-900 dark:text-white">02</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Paste Here</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Auto-detected & high-res streams extracted</p>
          </div>
          <div className="border-l border-slate-300 dark:border-zinc-800 pl-6 text-left">
            <div className="text-3xl font-bold mb-1 text-zinc-900 dark:text-white">03</div>
            <div className="text-xs uppercase tracking-widest text-zinc-500 font-semibold">Save Media</div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Direct instant saving with zero watermarks</p>
          </div>
        </div>
      </div>
    </section>
  );
};
