import React, { useState } from 'react';
import { DownloadHistoryItem, MediaFormat } from '../types';
import { Clock, Trash2, Download, Search, Play, FileJson } from 'lucide-react';
import { useToast } from './Toast';

interface DownloadHistoryProps {
  history: DownloadHistoryItem[];
  onClearHistory: () => void;
  onRemoveItem: (id: string) => void;
  onPreview: (format: MediaFormat) => void;
  onSelectMedia: (item: DownloadHistoryItem) => void;
}

export const DownloadHistory: React.FC<DownloadHistoryProps> = ({
  history,
  onClearHistory,
  onRemoveItem,
  onPreview,
  onSelectMedia,
}) => {
  const { showToast } = useToast();
  const [filterPlatform, setFilterPlatform] = useState<'all' | 'instagram' | 'facebook'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = history.filter((item) => {
    const matchesPlatform = filterPlatform === 'all' || item.platform === filterPlatform;
    const matchesSearch =
      !searchQuery.trim() ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.author && item.author.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesPlatform && matchesSearch;
  });

  const handleExportJson = () => {
    if (history.length === 0) return;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(history, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute('href', dataStr);
    dlAnchorElem.setAttribute('download', `socialsave_history_${Date.now()}.json`);
    dlAnchorElem.click();
    showToast({
      type: 'success',
      title: 'History Exported',
      message: 'Download history exported as JSON file.',
    });
  };

  return (
    <section id="download-history-section" className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-[#fd1d1d]" />
              <h2 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide">
                Download History
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-zinc-950 text-zinc-300 border border-zinc-800">
                {history.length} saved locally
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400">
              History is stored privately in your browser storage. Never uploaded to any server.
            </p>
          </div>

          {history.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                id="export-history-btn"
                onClick={handleExportJson}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-zinc-800 hover:bg-zinc-750 rounded-full border border-zinc-700 transition-colors cursor-pointer"
                title="Export History as JSON"
              >
                <FileJson className="w-4 h-4 text-[#833ab4]" />
                <span>Export</span>
              </button>

              <button
                id="clear-all-history-btn"
                onClick={onClearHistory}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-950/40 hover:bg-rose-900/50 rounded-full border border-rose-900/60 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          )}
        </div>

        {/* Filter and Search Bar */}
        {history.length > 0 && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
            {/* Platform Filter Buttons */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto">
              {(['all', 'instagram', 'facebook'] as const).map((plt) => (
                <button
                  key={plt}
                  onClick={() => setFilterPlatform(plt)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-colors cursor-pointer ${
                    filterPlatform === plt
                      ? 'bg-white text-black'
                      : 'bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                >
                  {plt}
                </button>
              ))}
            </div>

            {/* Search query input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search history..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 rounded-full text-xs bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
              />
            </div>
          </div>
        )}

        {/* History Items Grid / List */}
        <div className="mt-6">
          {history.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center mx-auto text-zinc-500 mb-4">
                <Clock className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">
                No Download History Yet
              </h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto mb-4">
                When you paste a link and download media, it will appear here so you can easily access or re-download it.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-zinc-400">
                No items match your filter criteria.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => {
                const isInsta = item.platform === 'instagram';
                const firstFormat = item.formats[0];

                return (
                  <div
                    key={item.id}
                    className="border border-zinc-800 rounded-[20px] p-3.5 bg-zinc-950 hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black mb-3">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 left-2 flex items-center gap-1">
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white uppercase ${
                              isInsta
                                ? 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]'
                                : 'bg-[#1877F2]'
                            }`}
                          >
                            {item.platform} {item.contentType}
                          </span>
                        </div>

                        <button
                          onClick={() => onPreview(firstFormat)}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white cursor-pointer"
                        >
                          <Play className="w-8 h-8 fill-current" />
                        </button>
                      </div>

                      {/* Content Info */}
                      <h4 className="text-xs font-bold text-white line-clamp-2 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 mb-2">
                        {item.author || item.platform} •{' '}
                        {new Date(item.downloadedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions footer */}
                    <div className="pt-2.5 border-t border-zinc-800/80 flex items-center justify-between">
                      <button
                        onClick={() => onSelectMedia(item)}
                        className="text-xs font-semibold text-white hover:text-[#fd1d1d] flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Options</span>
                      </button>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-zinc-500 hover:text-rose-400 rounded-md transition-colors cursor-pointer"
                        title="Remove from history"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
