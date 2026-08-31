import React, { useState } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize2, Download, ExternalLink, ShieldCheck } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="media-preview-modal-content"
        className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl text-white relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                media.platform === 'instagram'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {media.platform.toUpperCase()} {media.contentType.toUpperCase()}
            </span>
            <span className="text-xs text-slate-400 font-medium">In-App Media Player</span>
          </div>
          <button
            id="close-preview-modal-btn"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
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
              <div className="w-20 h-20 mx-auto rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mb-4">
                <Volume2 className="w-10 h-10 text-pink-400 animate-pulse" />
              </div>
              <h4 className="font-bold text-lg mb-1">{media.title}</h4>
              <p className="text-sm text-slate-400 mb-6">{media.author || 'Original Audio'}</p>
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
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-auto text-left">
            <h4 className="text-sm font-bold text-slate-100 truncate max-w-md">
              {media.title}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Selected: <span className="text-pink-400 font-semibold">{currentFormat?.label || currentFormat?.quality}</span>
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
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-pink-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download This Format</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
