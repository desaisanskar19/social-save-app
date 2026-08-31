import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Download, Copy, Play, Check, ExternalLink, ShieldCheck, Sparkles, Music, Film, Image as ImageIcon, Eye, Heart, MessageCircle, Share2, Layers, CheckCircle2 } from 'lucide-react';
import { MediaItem, MediaFormat } from '../types';
import { useToast } from './Toast';

interface ResultCardProps {
  media: MediaItem;
  onPreview: (format: MediaFormat) => void;
  onDownloaded?: (media: MediaItem, format: MediaFormat) => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  media,
  onPreview,
  onDownloaded,
}) => {
  const { showToast } = useToast();
  const [selectedFormatId, setSelectedFormatId] = useState<string>(
    media.formats[0]?.id || ''
  );
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const selectedFormat = media.formats.find((f) => f.id === selectedFormatId) || media.formats[0];

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(media.sourceUrl);
      setIsCopied(true);
      showToast({
        type: 'success',
        title: 'Link Copied!',
        message: 'Social media post URL copied to clipboard.',
      });
      setTimeout(() => setIsCopied(false), 3000);
    } catch (e) {
      showToast({
        type: 'error',
        title: 'Failed to copy link',
      });
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ec4899', '#a855f7', '#3b82f6', '#10b981'],
      });
    } catch (e) {}
  };

  const handleDownload = async (formatToDownload?: MediaFormat) => {
    const targetFormat = formatToDownload || selectedFormat;
    if (!targetFormat) return;

    setIsDownloading(true);
    showToast({
      type: 'info',
      title: 'Starting Download…',
      message: `Fetching ${targetFormat.label || targetFormat.quality} (${targetFormat.ext.toUpperCase()})`,
    });

    try {
      // Trigger confetti celebration
      triggerConfetti();

      // Trigger proxy download
      const cleanFilename = `${media.platform}_${media.contentType}_${media.id}.${targetFormat.ext}`;
      const downloadEndpoint = `/api/proxy-download?url=${encodeURIComponent(targetFormat.url)}&filename=${encodeURIComponent(cleanFilename)}&ext=${targetFormat.ext}`;

      // Create a temporary hidden anchor to trigger standard browser download
      const a = document.createElement('a');
      a.href = downloadEndpoint;
      a.download = cleanFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      if (onDownloaded) {
        onDownloaded(media, targetFormat);
      }

      setTimeout(() => {
        setIsDownloading(false);
        showToast({
          type: 'success',
          title: 'Download Ready!',
          message: `Saved ${targetFormat.quality} to your downloads.`,
        });
      }, 1000);
    } catch (err) {
      console.error('Download error:', err);
      setIsDownloading(false);
      showToast({
        type: 'error',
        title: 'Download Failed',
        message: 'Unable to stream file directly. Opening media link directly…',
      });
      window.open(targetFormat.url, '_blank');
    }
  };

  const isInstagram = media.platform === 'instagram';

  return (
    <div
      id={`result-card-${media.id}`}
      className="max-w-4xl mx-auto px-4 sm:px-6 my-8 animate-in fade-in slide-in-from-bottom-4 duration-400"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/5 dark:shadow-black/40">
        {/* Top Platform Header Bar */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-xs ${
                isInstagram
                  ? 'bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600'
                  : 'bg-blue-600'
              }`}
            >
              {isInstagram ? 'Instagram' : 'Facebook'} {media.contentType}
            </span>

            {media.duration && (
              <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                ⏱ {media.duration}
              </span>
            )}

            {media.formats.some((f) => f.isHd) && (
              <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                HD 1080p
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              id="result-copy-link-btn"
              type="button"
              onClick={handleCopyLink}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 transition-colors shadow-2xs"
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <a
              id="result-open-source-link"
              href={media.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
              title="Open source URL on social platform"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Media Thumbnail / Preview Box */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-[4/5] max-h-[380px] rounded-2xl overflow-hidden bg-slate-950 group shadow-md border border-slate-200 dark:border-slate-800">
                <img
                  src={
                    media.slides && media.slides[activeSlideIndex]
                      ? media.slides[activeSlideIndex].thumbnail
                      : media.thumbnail
                  }
                  alt={media.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay with Quick Play/Preview Button */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <button
                      id="thumbnail-preview-btn"
                      onClick={() => onPreview(selectedFormat)}
                      className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-semibold hover:bg-pink-600 transition-colors flex items-center gap-1.5 border border-white/20 shadow-lg"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Preview Player</span>
                    </button>
                  </div>

                  <div>
                    {media.author && (
                      <div className="flex items-center gap-2 text-white">
                        {media.authorAvatar && (
                          <img
                            src={media.authorAvatar}
                            alt={media.author}
                            referrerPolicy="no-referrer"
                            className="w-7 h-7 rounded-full border-2 border-white object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate leading-tight flex items-center gap-1">
                            {media.author}
                            {media.authorVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 fill-sky-400 text-slate-900 inline" />
                            )}
                          </p>
                          {media.authorHandle && (
                            <p className="text-[10px] text-slate-300 font-medium truncate">
                              {media.authorHandle}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Multi-slide Carousel Navigator if present */}
              {media.slides && media.slides.length > 1 && (
                <div className="mt-3 w-full">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5 text-pink-500" />
                      Carousel ({media.slides.length} Items)
                    </span>
                    <span>Item {activeSlideIndex + 1} of {media.slides.length}</span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {media.slides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        onClick={() => setActiveSlideIndex(idx)}
                        className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                          activeSlideIndex === idx
                            ? 'border-pink-500 scale-105 shadow-md'
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={slide.thumbnail}
                          alt={`Slide ${idx + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Title, Format Options & Download Controls */}
            <div className="md:col-span-7 flex flex-col justify-between h-full space-y-6">
              <div>
                {/* Title and Metadata */}
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-2">
                  {media.title}
                </h3>

                {/* Social Metrics */}
                <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 mb-6">
                  {media.likesCount !== undefined && media.likesCount > 0 && (
                    <span className="flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 text-rose-500" />
                      {media.likesCount.toLocaleString()} likes
                    </span>
                  )}
                  {media.commentsCount !== undefined && media.commentsCount > 0 && (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3.5 h-3.5 text-blue-500" />
                      {media.commentsCount.toLocaleString()} comments
                    </span>
                  )}
                  {media.date && (
                    <span className="text-slate-400">
                      • {media.date}
                    </span>
                  )}
                </div>

                {/* Available Quality Options Section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Select Format & Quality:
                    </label>
                    <span className="text-xs font-semibold text-pink-600 dark:text-pink-400">
                      {media.formats.length} formats available
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {media.formats.map((fmt) => {
                      const isSelected = selectedFormatId === fmt.id;
                      const isVideoFormat = fmt.type === 'video';
                      const isAudioFormat = fmt.type === 'audio';

                      return (
                        <button
                          key={fmt.id}
                          id={`format-option-btn-${fmt.id}`}
                          type="button"
                          onClick={() => setSelectedFormatId(fmt.id)}
                          className={`p-3 rounded-xl border text-left transition-all flex items-start justify-between cursor-pointer ${
                            isSelected
                              ? 'border-pink-500 bg-pink-50/70 dark:bg-pink-950/30 ring-2 ring-pink-500/20 shadow-xs'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <div
                              className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                                isVideoFormat
                                  ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                  : isAudioFormat
                                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                              }`}
                            >
                              {isVideoFormat ? (
                                <Film className="w-4 h-4" />
                              ) : isAudioFormat ? (
                                <Music className="w-4 h-4" />
                              ) : (
                                <ImageIcon className="w-4 h-4" />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p
                                className={`text-xs font-bold truncate ${
                                  isSelected
                                    ? 'text-pink-700 dark:text-pink-300'
                                    : 'text-slate-800 dark:text-slate-200'
                                }`}
                              >
                                {fmt.quality}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                                {fmt.label}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0 ml-2">
                            {fmt.size && (
                              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 block">
                                {fmt.size}
                              </span>
                            )}
                            <span
                              className={`text-[10px] font-bold uppercase ${
                                isSelected ? 'text-pink-600 dark:text-pink-400' : 'text-slate-400'
                              }`}
                            >
                              {fmt.ext}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Main Action Buttons */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    id="result-download-now-btn"
                    onClick={() => handleDownload()}
                    disabled={isDownloading}
                    className="flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm sm:text-base text-white bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 active:scale-[0.98] transition-all shadow-xl shadow-pink-500/25 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Saving {selectedFormat?.quality}…</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Download {selectedFormat?.quality || 'Media'}</span>
                      </>
                    )}
                  </button>

                  <button
                    id="result-preview-player-btn"
                    onClick={() => onPreview(selectedFormat)}
                    className="px-5 py-3.5 rounded-2xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4 text-pink-500" />
                    <span>Watch Preview</span>
                  </button>
                </div>

                {/* Compliance notice */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Public content only. Downloaded directly in original stream quality without watermarks.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
