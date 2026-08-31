import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProcessingState } from './components/ProcessingState';
import { ResultCard } from './components/ResultCard';
import { MediaPreviewModal } from './components/MediaPreviewModal';
import { DownloadHistory } from './components/DownloadHistory';
import { HowItWorks } from './components/HowItWorks';
import { FeaturesSection } from './components/FeaturesSection';
import { FAQSection } from './components/FAQSection';
import { LegalPages } from './components/LegalPages';
import { Footer } from './components/Footer';
import { ToastProvider, useToast } from './components/Toast';
import { MediaItem, MediaFormat, DownloadHistoryItem, ActivePage, ApiResponse } from './types';
import { getDownloadHistory, saveDownloadToHistory, removeDownloadFromHistory, clearDownloadHistory, getSavedTheme, setSavedTheme } from './utils/storage';

function AppContent() {
  const { showToast } = useToast();
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [url, setUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaResult, setMediaResult] = useState<MediaItem | null>(null);
  const [history, setHistory] = useState<DownloadHistoryItem[]>([]);
  const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
  const [previewFormat, setPreviewFormat] = useState<MediaFormat | null>(null);
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>('dark');

  // Initialize theme and load history
  useEffect(() => {
    const saved = getSavedTheme();
    setThemeState(saved);
    applyTheme(saved);
    setHistory(getDownloadHistory());
  }, []);

  const applyTheme = (targetTheme: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    if (targetTheme === 'dark') {
      root.classList.add('dark');
    } else if (targetTheme === 'light') {
      root.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) root.classList.add('dark');
      else root.classList.remove('dark');
    }
  };

  const handleSetTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    setSavedTheme(newTheme);
    applyTheme(newTheme);
  };

  const handleProcessUrl = async (urlToProcess?: string) => {
    const targetUrl = (urlToProcess || url).trim();
    if (!targetUrl) {
      setError('Please paste an Instagram or Facebook URL to download.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setMediaResult(null);

    try {
      const res = await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      const json: ApiResponse<MediaItem> = await res.json();

      if (!res.ok || !json.success || !json.data) {
        const errorMsg = json.error || 'Sorry, we couldn’t process this URL. Make sure the post is publicly accessible and the URL is correct.';
        setError(errorMsg);
        showToast({
          type: 'error',
          title: 'Extraction Error',
          message: errorMsg,
        });
      } else {
        setMediaResult(json.data);
        setError(null);
        showToast({
          type: 'success',
          title: 'Media Ready!',
          message: `Found ${json.data.formats.length} download options for ${json.data.platform.toUpperCase()} ${json.data.contentType}.`,
        });

        // Scroll smoothly to results card
        setTimeout(() => {
          const resultElement = document.getElementById(`result-card-${json.data?.id}`);
          if (resultElement) {
            resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }
    } catch (err: any) {
      console.error('Fetch error:', err);
      const networkErrorMsg = 'Network or server error while processing request. Please try again.';
      setError(networkErrorMsg);
      showToast({
        type: 'error',
        title: 'Connection Error',
        message: networkErrorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPaste = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.readText) {
        const text = await navigator.clipboard.readText();
        if (text && text.trim()) {
          setUrl(text.trim());
          setActivePage('home');
          handleProcessUrl(text.trim());
        }
      }
    } catch (e) {
      showToast({
        type: 'info',
        title: 'Clipboard Access',
        message: 'Please paste the URL directly into the search box.',
      });
    }
  };

  const handleDownloaded = (media: MediaItem, format: MediaFormat) => {
    const historyItem: DownloadHistoryItem = {
      ...media,
      downloadedAt: Date.now(),
      selectedFormatId: format.id,
    };
    saveDownloadToHistory(historyItem);
    setHistory(getDownloadHistory());
  };

  const handleClearHistory = () => {
    clearDownloadHistory();
    setHistory([]);
    showToast({
      type: 'info',
      title: 'History Cleared',
      message: 'All local download records were removed.',
    });
  };

  const handleRemoveHistoryItem = (id: string) => {
    removeDownloadFromHistory(id);
    setHistory(getDownloadHistory());
  };

  const handleOpenPreview = (format: MediaFormat) => {
    setPreviewFormat(format);
    setPreviewModalOpen(true);
  };

  const handleSelectMediaFromHistory = (item: DownloadHistoryItem) => {
    setMediaResult(item);
    setUrl(item.sourceUrl);
    setActivePage('home');
    setTimeout(() => {
      const resultElement = document.getElementById(`result-card-${item.id}`);
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white selection:bg-[#fd1d1d] selection:text-white">
      {/* Top Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        theme={theme}
        setTheme={handleSetTheme}
        historyCount={history.length}
        onQuickPaste={handleQuickPaste}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <div>
            <HeroSection
              url={url}
              setUrl={setUrl}
              onProcess={handleProcessUrl}
              isLoading={isLoading}
              error={error}
              onClearError={() => setError(null)}
            />

            {isLoading && <ProcessingState url={url} />}

            {mediaResult && !isLoading && (
              <ResultCard
                media={mediaResult}
                onPreview={handleOpenPreview}
                onDownloaded={handleDownloaded}
              />
            )}

            <FeaturesSection />

            <HowItWorks />

            {history.length > 0 && (
              <DownloadHistory
                history={history.slice(0, 6)}
                onClearHistory={handleClearHistory}
                onRemoveItem={handleRemoveHistoryItem}
                onPreview={handleOpenPreview}
                onSelectMedia={handleSelectMediaFromHistory}
              />
            )}

            <FAQSection />
          </div>
        )}

        {activePage === 'how-it-works' && <HowItWorks />}

        {activePage === 'faq' && <FAQSection />}

        {activePage === 'history' && (
          <DownloadHistory
            history={history}
            onClearHistory={handleClearHistory}
            onRemoveItem={handleRemoveHistoryItem}
            onPreview={handleOpenPreview}
            onSelectMedia={handleSelectMediaFromHistory}
          />
        )}

        {(activePage === 'privacy' || activePage === 'terms' || activePage === 'dmca') && (
          <LegalPages
            initialTab={activePage}
            onNavigateTab={(tab) => setActivePage(tab)}
          />
        )}
      </main>

      {/* Media In-App Player Modal */}
      <MediaPreviewModal
        media={mediaResult}
        selectedFormat={previewFormat}
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
        onDownload={(fmt) => {
          if (mediaResult) {
            handleDownloaded(mediaResult, fmt);
          }
        }}
      />

      {/* Global Footer */}
      <Footer onNavigate={(page) => setActivePage(page)} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
