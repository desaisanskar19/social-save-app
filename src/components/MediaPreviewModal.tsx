import React from 'react';
import { X, Volume2, Download } from 'lucide-react';
import { MediaItem, MediaFormat } from '../types';

interface MediaPreviewModalProps {
  media: MediaItem | null;
  selectedFormat: MediaFormat | null;
  isOpen: boolean;
  onClose: () => void;
  onDownload: (format: MediaFormat) => void;
}

export const MediaPreviewModal: React.FC<MediaPreviewModalProps> = ({
  media,
  selectedFormat,
  isOpen,
  onClose,
  onDownload,
}) => {
  if (!isOpen || !media) return null;

  const currentFormat = selectedFormat || media.formats[0];
  const isVideo = currentFormat?.type === 'video' || media.contentType === 'reel' || media.contentType === 'video';
  const isAudio = currentFormat?.type === 'audio';

  return (
    <div
      id="media-preview-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="media-preview-modal-content"
        className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-[28px] max-w-2xl w-full overflow-hidden shadow-2xl text-zinc-900 dark:text-white relative animate-in zoom-in-95 duration-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                media.platform === 'instagram'
                  ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white'
                  : 'bg-[#1877F2] text-white'
              }`}
            >
              {media.platform.toUpperCase()} {media.contentType.toUpperCase()}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">In-App Media Player</span>
          </div>
          <button
            id="close-preview-modal-btn"
            onClick={onClose}
            className="p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Container */}
        <div className="relative bg-black flex items-center justify-center min-h-[300px] max-h-[60vh] overflow-hidden">
          {isVideo ? (
            <video
              src={currentFormat?.url || media.formats.find((f) => f.type === 'video')?.url}
              poster={media.thumbnail}
              controls
              autoPlay
              playsInline
              className="max-h-[60vh] w-auto max-w-full mx-auto"
            />
          ) : isAudio ? (
            <div className="p-8 text-center w-full max-w-md">
              <div className="w-20 h-20 mx-auto rounded-full bg-zinc-850 border border-zinc-700 flex items-center justify-center mb-4">
                <Volume2 className="w-10 h-10 text-[#fd1d1d] animate-pulse" />
              </div>
              <h4 className="font-bold text-lg mb-1 text-white">{media.title}</h4>
              <p className="text-sm text-zinc-400 mb-6">{media.author || 'Original Audio'}</p>
              <audio
                src={currentFormat?.url}
                controls
                autoPlay
                className="w-full"
              />
            </div>
          ) : (
            <img
              src={currentFormat?.url || media.thumbnail}
              alt={media.title}
              referrerPolicy="no-referrer"
              className="max-h-[60vh] w-auto max-w-full object-contain mx-auto"
            />
          )}
        </div>

        {/* Details & Actions Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-zinc-900 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-auto text-left">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-md">
              {media.title}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Selected: <span className="text-[#fd1d1d] font-semibold">{currentFormat?.label || currentFormat?.quality}</span>
              {currentFormat?.size && ` • ${currentFormat.size}`}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="preview-download-btn"
              onClick={() => {
                if (currentFormat) {
                  onDownload(currentFormat);
                }
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download Format</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
