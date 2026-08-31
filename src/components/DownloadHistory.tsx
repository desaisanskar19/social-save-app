import React, { useState } from 'react';
import { DownloadHistoryItem, MediaFormat } from '../types';
import { Clock, Trash2, Download, Search, Film, Music, Image as ImageIcon, ExternalLink, Play, Sparkles, Filter, FileJson } from 'lucide-react';
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
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-5 h-5 text-pink-500" />
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Download History
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/20">
                {history.length} saved locally
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              History is stored privately in your browser storage. Never uploaded to any server.
            </p>
          </div>

          {history.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                id="export-history-btn"
                onClick={handleExportJson}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
                title="Export History as JSON"
              >
                <FileJson className="w-4 h-4 text-purple-500" />
                <span>Export</span>
              </button>

              <button
                id="clear-all-history-btn"
                onClick={onClearHistory}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 rounded-xl border border-rose-200 dark:border-rose-900 transition-colors"
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
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                    filterPlatform === plt
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-750'
                  }`}
                >
                  {plt}
                </button>
              ))}
            </div>

            {/* Search query input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search history…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>
        )}

        {/* History Items Grid / List */}
        <div className="mt-6">
          {history.length === 0 ? (
            <div className="text-center py-12 px-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 mb-4">
                <Clock className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                No Download History Yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-4">
                When you paste a link and download media, it will appear here so you can easily access or re-download it.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-slate-500 dark:text-slate-400">
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
                    className="border border-slate-200 dark:border-slate-800 rounded-2xl p-3 bg-white dark:bg-slate-850 hover:shadow-lg transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Thumbnail Container */}
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-950 mb-3">
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
                                ? 'bg-gradient-to-r from-pink-500 to-purple-600'
                                : 'bg-blue-600'
                            }`}
                          >
                            {item.platform} {item.contentType}
                          </span>
                        </div>

                        <button
                          onClick={() => onPreview(firstFormat)}
                          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                        >
                          <Play className="w-8 h-8 fill-current" />
                        </button>
                      </div>

                      {/* Content Info */}
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                        {item.author || item.platform} •{' '}
                        {new Date(item.downloadedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* Actions footer */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => onSelectMedia(item)}
                        className="text-xs font-semibold text-pink-600 dark:text-pink-400 hover:underline flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Options</span>
                      </button>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded-md transition-colors"
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
