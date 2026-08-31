import { DownloadHistoryItem } from '../types';

const HISTORY_KEY = 'socialsave_download_history_v1';
const THEME_KEY = 'socialsave_theme_preference_v1';

export function getDownloadHistory(): DownloadHistoryItem[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load download history:', e);
    return [];
  }
}

export function saveDownloadToHistory(item: DownloadHistoryItem): void {
  try {
    const existing = getDownloadHistory();
    // Filter out duplicates with same sourceUrl to put newest first
    const filtered = existing.filter((i) => i.sourceUrl !== item.sourceUrl);
    const updated = [item, ...filtered].slice(0, 50); // Keep last 50 items
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save to download history:', e);
  }
}

export function removeDownloadFromHistory(id: string): void {
  try {
    const existing = getDownloadHistory();
    const updated = existing.filter((i) => i.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to remove download history item:', e);
  }
}

export function clearDownloadHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch (e) {
    console.error('Failed to clear download history:', e);
  }
}

export function getSavedTheme(): 'light' | 'dark' | 'system' {
  try {
    const theme = localStorage.getItem(THEME_KEY);
    if (theme === 'light' || theme === 'dark' || theme === 'system') {
      return theme;
    }
  } catch {}
  return 'dark'; // Default to modern sleek dark theme
}

export function setSavedTheme(theme: 'light' | 'dark' | 'system'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
}
