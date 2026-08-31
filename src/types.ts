export type Platform = 'instagram' | 'facebook';
export type ContentType = 'reel' | 'post' | 'story' | 'video' | 'carousel';

export interface MediaFormat {
  id: string;
  quality: string;
  label: string;
  ext: 'mp4' | 'mp3' | 'jpg' | 'png' | 'webp';
  size?: string;
  url: string;
  type: 'video' | 'audio' | 'image';
  width?: number;
  height?: number;
  isHd?: boolean;
}

export interface MediaSlide {
  id: string;
  type: 'image' | 'video';
  thumbnail: string;
  url: string;
  formats: MediaFormat[];
}

export interface MediaItem {
  id: string;
  sourceUrl: string;
  platform: Platform;
  contentType: ContentType;
  title: string;
  author?: string;
  authorHandle?: string;
  authorAvatar?: string;
  authorVerified?: boolean;
  thumbnail: string;
  duration?: string;
  likesCount?: number;
  commentsCount?: number;
  date?: string;
  formats: MediaFormat[];
  slides?: MediaSlide[];
  downloadUrl?: string;
  requiresNotice?: boolean;
}

export interface DownloadHistoryItem extends MediaItem {
  downloadedAt: number;
  selectedFormatId?: string;
}

export interface DownloadRequest {
  url: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  code?: 'INVALID_URL' | 'UNSUPPORTED_PLATFORM' | 'PRIVATE_CONTENT' | 'DELETED_CONTENT' | 'FETCH_FAILED' | 'RATE_LIMIT' | 'SERVER_ERROR';
}

export type ActivePage = 'home' | 'how-it-works' | 'faq' | 'privacy' | 'terms' | 'dmca' | 'history';
