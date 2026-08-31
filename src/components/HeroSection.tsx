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
    <section id="hero-section" className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-pink-500/15 via-purple-500/10 to-blue-500/15 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Header Tag / Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 dark:bg-pink-950/40 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-semibold uppercase tracking-wider mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
          <span>High-Speed Social Media Media Downloader</span>
        </div>

        {/* Heading */}
        <h1
          id="hero-heading"
          className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-4"
        >
          Download Social Media <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Content Easily
          </span>
        </h1>

        {/* Subtitle */}
        <p
          id="hero-subtitle"
          className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 sm:mb-10 font-normal leading-relaxed"
        >
          Paste a public Instagram or Facebook URL and download available media in seconds. High quality, zero watermarks, and no login required.
        </p>

        {/* URL Input Form */}
        <form
          id="download-form"
          onSubmit={handleSubmit}
          className="relative max-w-3xl mx-auto mb-6"
        >
          <div
            className={`relative rounded-2xl p-1.5 sm:p-2 bg-white dark:bg-slate-900 border-2 transition-all shadow-xl ${
              detectedPlatform === 'instagram'
                ? 'border-pink-500/70 shadow-pink-500/10 ring-4 ring-pink-500/10'
                : detectedPlatform === 'facebook'
                ? 'border-blue-500/70 shadow-blue-500/10 ring-4 ring-blue-500/10'
                : 'border-slate-200 dark:border-slate-800 focus-within:border-pink-500 focus-within:ring-4 focus-within:ring-pink-500/10'
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center gap-2">
              {/* Left Input Field with Platform Indicator */}
              <div className="relative flex-1 w-full flex items-center min-w-0 px-3 py-1.5">
                {/* Dynamic Icon */}
                <div className="shrink-0 mr-2.5">
                  {detectedPlatform === 'instagram' ? (
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 via-pink-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                      <Camera className="w-4 h-4" />
                    </div>
                  ) : detectedPlatform === 'facebook' ? (
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
                      <Video className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
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
                  placeholder="Paste Instagram or Facebook URL here…"
                  required
                  autoComplete="off"
                  className="w-full bg-transparent border-0 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none text-sm sm:text-base font-medium pr-16"
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
                      className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
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
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      title="Paste from clipboard"
                    >
                      <Clipboard className="w-3.5 h-3.5 text-pink-500" />
                      <span className="hidden sm:inline">Paste</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Download Button */}
              <button
                id="hero-download-submit-btn"
                type="submit"
                disabled={isLoading || !url.trim()}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-pink-500/25 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing…</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Real-time detection feedback tag */}
          {detectedPlatform && (
            <div className="mt-2 flex items-center justify-center gap-2 text-xs font-medium">
              <span className="text-slate-500 dark:text-slate-400">Detected:</span>
              <span
                className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${
                  detectedPlatform === 'instagram'
                    ? 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20'
                    : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
                }`}
              >
                <Check className="w-3 h-3" />
                {detectedPlatform === 'instagram' ? 'Instagram' : 'Facebook'}{' '}
                {detectedType ? detectedType.toUpperCase() : 'Media'}
              </span>
            </div>
          )}
        </form>

        {/* Error Notification Alert if any */}
        {error && (
          <div
            id="hero-error-alert"
            className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 text-sm flex items-start gap-3 text-left shadow-sm animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold">{error}</p>
              <p className="text-xs text-rose-600/80 dark:text-rose-300/80 mt-1">
                Make sure the URL is public, accessible, and has no typos. For private profiles or DRM media, downloading is restricted.
              </p>
            </div>
            {onClearError && (
              <button
                onClick={onClearError}
                className="text-rose-500 hover:text-rose-700 p-1"
                aria-label="Dismiss error"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Try Sample Chips */}
        <div className="mb-8">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mr-2 block sm:inline mb-2 sm:mb-0">
            Quick Test Examples:
          </span>
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
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
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 hover:bg-pink-50 dark:bg-slate-800/80 dark:hover:bg-slate-750 text-slate-700 hover:text-pink-600 dark:text-slate-300 dark:hover:text-pink-400 border border-slate-200 dark:border-slate-700/60 transition-all hover:border-pink-300 dark:hover:border-pink-500/40 cursor-pointer shadow-xs"
              >
                {sample.label}
              </button>
            ))}
          </div>
        </div>

        {/* Supported Platforms Row */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 max-w-xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-3">
            Supported Content Types
          </div>
          <div className="flex items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500" />
              <span>Instagram</span>
              <span className="text-slate-400 font-normal text-xs">(Reels • Posts • Stories)</span>
            </div>
            <div className="text-slate-300 dark:text-slate-700">•</div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span>Facebook</span>
              <span className="text-slate-400 font-normal text-xs">(Reels • Videos • Posts)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
