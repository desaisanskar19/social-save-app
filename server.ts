import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory rate limiting map
const ipRequestCounts = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_MAX = 30; // 30 requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRequestCounts.get(ip) || { count: 0, lastReset: now };

  if (now - record.lastReset > RATE_LIMIT_WINDOW) {
    record.count = 1;
    record.lastReset = now;
    ipRequestCounts.set(ip, record);
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  ipRequestCounts.set(ip, record);
  return true;
}

// Sample fallback videos and media with reliable high-speed public CDNs
const SAMPLE_VIDEOS = {
  instagramReel: {
    video1080: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    video720: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    video480: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    audio: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyblazes.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80',
  },
  facebookVideo: {
    video1080: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    video720: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    video480: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
  },
  instagramPost: {
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
  },
  instagramStory: {
    video1080: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
  }
};

// URL Detection & Validation Logic
function detectPlatformAndType(urlStr: string): { platform: 'instagram' | 'facebook' | null; contentType: 'reel' | 'post' | 'story' | 'video' | 'carousel'; valid: boolean; normalizedId: string; cleanUrl: string } {
  let raw = urlStr.trim();
  if (!raw) {
    return { platform: null, contentType: 'post', valid: false, normalizedId: '', cleanUrl: '' };
  }

  // Prepend https:// if missing
  if (!/^https?:\/\//i.test(raw)) {
    raw = 'https://' + raw;
  }

  let parsed: URL;
  try {
    parsed = new URL(raw);
  } catch {
    // If URL parsing fails, check text content
    if (raw.toLowerCase().includes('instagram.com') || raw.toLowerCase().includes('instagr.am')) {
      return { platform: 'instagram', contentType: 'reel', valid: true, normalizedId: 'ig_media', cleanUrl: raw };
    }
    if (raw.toLowerCase().includes('facebook.com') || raw.toLowerCase().includes('fb.watch') || raw.toLowerCase().includes('fb.me')) {
      return { platform: 'facebook', contentType: 'video', valid: true, normalizedId: 'fb_media', cleanUrl: raw };
    }
    return { platform: null, contentType: 'post', valid: false, normalizedId: '', cleanUrl: raw };
  }

  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname.toLowerCase();

  // Instagram Detection
  if (hostname.includes('instagram.com') || hostname.includes('instagr.am')) {
    if (pathname.includes('/reel/') || pathname.includes('/reels/') || pathname.includes('/share/reel/')) {
      const match = parsed.pathname.match(/\/(?:share\/)?reels?\/([a-zA-Z0-9_-]+)/i);
      return { platform: 'instagram', contentType: 'reel', valid: true, normalizedId: match ? match[1] : 'reel_' + Date.now().toString().slice(-4), cleanUrl: raw };
    }
    if (pathname.includes('/stories/') || pathname.includes('/s/')) {
      const match = parsed.pathname.match(/\/stories\/([^\/]+)\/([0-9]+)/i) || parsed.pathname.match(/\/s\/([a-zA-Z0-9_-]+)/i);
      return { platform: 'instagram', contentType: 'story', valid: true, normalizedId: match ? (match[2] || match[1]) : 'story_' + Date.now().toString().slice(-4), cleanUrl: raw };
    }
    if (pathname.includes('/p/') || pathname.includes('/share/p/')) {
      const match = parsed.pathname.match(/\/(?:share\/)?p\/([a-zA-Z0-9_-]+)/i);
      return { platform: 'instagram', contentType: 'post', valid: true, normalizedId: match ? match[1] : 'post_' + Date.now().toString().slice(-4), cleanUrl: raw };
    }
    if (pathname.includes('/tv/')) {
      const match = parsed.pathname.match(/\/tv\/([a-zA-Z0-9_-]+)/i);
      return { platform: 'instagram', contentType: 'video', valid: true, normalizedId: match ? match[1] : 'tv_' + Date.now().toString().slice(-4), cleanUrl: raw };
    }
    // Generic Instagram url
    return { platform: 'instagram', contentType: pathname.includes('reel') ? 'reel' : 'post', valid: true, normalizedId: 'ig_' + Date.now().toString().slice(-4), cleanUrl: raw };
  }

  // Facebook Detection
  if (hostname.includes('facebook.com') || hostname.includes('fb.watch') || hostname.includes('fb.me') || hostname.includes('fb.gg')) {
    if (hostname.includes('fb.watch') || pathname.includes('/watch') || pathname.includes('/videos/') || pathname.includes('/video/') || pathname.includes('/share/v/')) {
      const match = parsed.pathname.match(/\/(?:videos?|watch|share\/v)\/([0-9]+|[a-zA-Z0-9_-]+)/i);
      return { platform: 'facebook', contentType: 'video', valid: true, normalizedId: match ? match[1] : 'fb_video', cleanUrl: raw };
    }
    if (pathname.includes('/reel/') || pathname.includes('/reels/') || pathname.includes('/share/r/')) {
      const match = parsed.pathname.match(/\/(?:share\/r|reels?)\/([0-9]+|[a-zA-Z0-9_-]+)/i);
      return { platform: 'facebook', contentType: 'reel', valid: true, normalizedId: match ? match[1] : 'fb_reel', cleanUrl: raw };
    }
    if (pathname.includes('/posts/') || pathname.includes('permalink.php') || pathname.includes('/photos/') || pathname.includes('/photo/') || pathname.includes('/share/p/')) {
      return { platform: 'facebook', contentType: 'post', valid: true, normalizedId: 'fb_post_' + Date.now().toString().slice(-4), cleanUrl: raw };
    }
    return { platform: 'facebook', contentType: 'video', valid: true, normalizedId: 'fb_' + Date.now().toString().slice(-4), cleanUrl: raw };
  }

  return { platform: null, contentType: 'post', valid: false, normalizedId: '', cleanUrl: raw };
}

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Main POST /api/download endpoint
app.post('/api/download', async (req: Request, res: Response) => {
  const clientIp = req.ip || req.headers['x-forwarded-for']?.toString() || '127.0.0.1';

  if (!checkRateLimit(clientIp)) {
    return res.status(429).json({
      success: false,
      code: 'RATE_LIMIT',
      error: 'Rate limit exceeded. Please wait a minute before making more requests.',
    });
  }

  const { url } = req.body;

  if (!url || typeof url !== 'string' || !url.trim()) {
    return res.status(400).json({
      success: false,
      code: 'INVALID_URL',
      error: 'Please provide a valid social media URL.',
    });
  }

  const cleanUrl = url.trim();
  const detection = detectPlatformAndType(cleanUrl);

  if (!detection.valid || !detection.platform) {
    return res.status(400).json({
      success: false,
      code: 'UNSUPPORTED_PLATFORM',
      error: 'Unsupported URL. Please enter a valid public Instagram or Facebook link (Reel, Post, Story, or Video).',
    });
  }

  // Simulate fast, realistic server-side processing & metadata discovery
  try {
    const { platform, contentType, normalizedId } = detection;

    // Check for simulated private or deleted identifiers
    if (cleanUrl.toLowerCase().includes('private_test') || cleanUrl.toLowerCase().includes('restricted')) {
      return res.status(403).json({
        success: false,
        code: 'PRIVATE_CONTENT',
        error: 'This content is from a private account or requires authentication. SocialSave only supports publicly available media.',
      });
    }

    if (cleanUrl.toLowerCase().includes('deleted_test') || cleanUrl.toLowerCase().includes('404')) {
      return res.status(404).json({
        success: false,
        code: 'DELETED_CONTENT',
        error: 'The requested media could not be found. It may have been removed or deleted by the creator.',
      });
    }

    // Build structured response depending on platform and content type
    let title = '';
    let author = '';
    let authorHandle = '';
    let authorAvatar = '';
    let thumbnail = '';
    let duration = '';
    let likesCount = 0;
    let commentsCount = 0;
    let formats: any[] = [];
    let slides: any[] | undefined = undefined;

    if (platform === 'instagram') {
      if (contentType === 'reel') {
        title = 'Trending Reel • Original Audio & High Quality Visuals';
        author = 'Creative Creator';
        authorHandle = '@creative_creator';
        authorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80';
        thumbnail = SAMPLE_VIDEOS.instagramReel.thumbnail;
        duration = '0:34';
        likesCount = 48290;
        commentsCount = 1204;
        formats = [
          {
            id: 'fmt-1080p',
            quality: '1080p Full HD',
            label: 'HD MP4 Video (Best Quality)',
            ext: 'mp4',
            size: '14.2 MB',
            url: SAMPLE_VIDEOS.instagramReel.video1080,
            type: 'video',
            width: 1080,
            height: 1920,
            isHd: true,
          },
          {
            id: 'fmt-720p',
            quality: '720p HD',
            label: 'Standard HD MP4',
            ext: 'mp4',
            size: '8.4 MB',
            url: SAMPLE_VIDEOS.instagramReel.video720,
            type: 'video',
            width: 720,
            height: 1280,
            isHd: true,
          },
          {
            id: 'fmt-480p',
            quality: '480p SD',
            label: 'Mobile Compact MP4',
            ext: 'mp4',
            size: '4.1 MB',
            url: SAMPLE_VIDEOS.instagramReel.video480,
            type: 'video',
            width: 480,
            height: 854,
            isHd: false,
          },
          {
            id: 'fmt-audio',
            quality: '320 kbps',
            label: 'Original Audio (MP3)',
            ext: 'mp3',
            size: '1.2 MB',
            url: SAMPLE_VIDEOS.instagramReel.audio,
            type: 'audio',
          },
          {
            id: 'fmt-thumb',
            quality: 'High Res',
            label: 'Cover Image (JPG)',
            ext: 'jpg',
            size: '450 KB',
            url: SAMPLE_VIDEOS.instagramReel.thumbnail,
            type: 'image',
          }
        ];
      } else if (contentType === 'story') {
        title = 'Public Story Update';
        author = 'Storyteller Visuals';
        authorHandle = '@visual_stories';
        authorAvatar = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80';
        thumbnail = SAMPLE_VIDEOS.instagramStory.thumbnail;
        duration = '0:15';
        likesCount = 1840;
        commentsCount = 89;
        formats = [
          {
            id: 'fmt-story-1080p',
            quality: '1080p HD',
            label: 'Full Story Video (MP4)',
            ext: 'mp4',
            size: '6.8 MB',
            url: SAMPLE_VIDEOS.instagramStory.video1080,
            type: 'video',
            width: 1080,
            height: 1920,
            isHd: true,
          },
          {
            id: 'fmt-story-thumb',
            quality: 'High Res',
            label: 'Story Snapshot (JPG)',
            ext: 'jpg',
            size: '520 KB',
            url: SAMPLE_VIDEOS.instagramStory.thumbnail,
            type: 'image',
          }
        ];
      } else {
        // Post / Carousel
        title = 'Inspiring Photography & Visual Art Collection';
        author = 'Studio Horizon';
        authorHandle = '@studiohorizon';
        authorAvatar = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80';
        thumbnail = SAMPLE_VIDEOS.instagramPost.thumbnail;
        likesCount = 12450;
        commentsCount = 432;
        formats = [
          {
            id: 'fmt-img-max',
            quality: 'Original UHD',
            label: 'High-Resolution Photo (JPG)',
            ext: 'jpg',
            size: '3.8 MB',
            url: SAMPLE_VIDEOS.instagramPost.image,
            type: 'image',
            width: 2048,
            height: 2048,
            isHd: true,
          },
          {
            id: 'fmt-img-std',
            quality: 'Standard 1080p',
            label: 'Compressed Photo (JPG)',
            ext: 'jpg',
            size: '1.2 MB',
            url: SAMPLE_VIDEOS.instagramPost.thumbnail,
            type: 'image',
            width: 1080,
            height: 1080,
            isHd: false,
          }
        ];

        // Also provide multi-slide carousel items
        slides = [
          {
            id: 'slide-1',
            type: 'image',
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80',
            url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
            formats: [
              {
                id: 'slide-1-hd',
                quality: 'High Res',
                label: 'Slide 1 - High Definition',
                ext: 'jpg',
                url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
                type: 'image',
                size: '2.1 MB'
              }
            ]
          },
          {
            id: 'slide-2',
            type: 'image',
            thumbnail: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80',
            url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
            formats: [
              {
                id: 'slide-2-hd',
                quality: 'High Res',
                label: 'Slide 2 - High Definition',
                ext: 'jpg',
                url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
                type: 'image',
                size: '2.4 MB'
              }
            ]
          },
          {
            id: 'slide-3',
            type: 'image',
            thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80',
            url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
            formats: [
              {
                id: 'slide-3-hd',
                quality: 'High Res',
                label: 'Slide 3 - High Definition',
                ext: 'jpg',
                url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
                type: 'image',
                size: '1.9 MB'
              }
            ]
          }
        ];
      }
    } else {
      // Facebook Video or Reel or Post
      if (contentType === 'video' || contentType === 'reel') {
        title = 'Facebook Public Video • Community Spotlight & Highlights';
        author = 'Global Explorer News';
        authorHandle = 'GlobalExplorerOfficial';
        authorAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80';
        thumbnail = SAMPLE_VIDEOS.facebookVideo.thumbnail;
        duration = '1:24';
        likesCount = 89400;
        commentsCount = 3450;
        formats = [
          {
            id: 'fb-fmt-1080p',
            quality: '1080p Full HD',
            label: 'HD 1080p MP4 (Direct)',
            ext: 'mp4',
            size: '26.8 MB',
            url: SAMPLE_VIDEOS.facebookVideo.video1080,
            type: 'video',
            width: 1920,
            height: 1080,
            isHd: true,
          },
          {
            id: 'fb-fmt-720p',
            quality: '720p HD',
            label: 'Standard HD 720p MP4',
            ext: 'mp4',
            size: '14.5 MB',
            url: SAMPLE_VIDEOS.facebookVideo.video720,
            type: 'video',
            width: 1280,
            height: 720,
            isHd: true,
          },
          {
            id: 'fb-fmt-480p',
            quality: '480p SD',
            label: 'Mobile Compact 480p',
            ext: 'mp4',
            size: '7.2 MB',
            url: SAMPLE_VIDEOS.facebookVideo.video480,
            type: 'video',
            width: 854,
            height: 480,
            isHd: false,
          },
          {
            id: 'fb-fmt-thumb',
            quality: 'High Res',
            label: 'Video Thumbnail (JPG)',
            ext: 'jpg',
            size: '380 KB',
            url: SAMPLE_VIDEOS.facebookVideo.thumbnail,
            type: 'image',
          }
        ];
      } else {
        // Facebook Post / Image
        title = 'Facebook Public Post & Announcement';
        author = 'Meta Community Insights';
        authorHandle = 'MetaInsights';
        authorAvatar = 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=160&q=80';
        thumbnail = 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80';
        likesCount = 5420;
        commentsCount = 612;
        formats = [
          {
            id: 'fb-post-hd',
            quality: 'High Res',
            label: 'Full Size Photo (JPG)',
            ext: 'jpg',
            size: '2.5 MB',
            url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
            type: 'image',
            width: 1200,
            height: 800,
            isHd: true,
          }
        ];
      }
    }

    const resultData = {
      id: `media_${Date.now()}_${normalizedId}`,
      sourceUrl: cleanUrl,
      platform,
      contentType,
      title,
      author,
      authorHandle,
      authorAvatar,
      authorVerified: true,
      thumbnail,
      duration: duration || undefined,
      likesCount,
      commentsCount,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      formats,
      slides,
      downloadUrl: formats[0]?.url,
      requiresNotice: true,
    };

    return res.json({
      success: true,
      data: resultData,
    });
  } catch (error: any) {
    console.error('Extraction error:', error);
    return res.status(500).json({
      success: false,
      code: 'SERVER_ERROR',
      error: 'Sorry, we couldn’t process this URL. Make sure the post is publicly accessible and the URL is correct.',
    });
  }
});

// Proxy download endpoint to stream media with proper Content-Disposition header
app.get('/api/proxy-download', async (req: Request, res: Response) => {
  const { url, filename, ext } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).send('Missing media URL');
  }

  try {
    const targetUrl = decodeURIComponent(url);
    const downloadFilename = (typeof filename === 'string' && filename.trim())
      ? filename.trim()
      : `socialsave_${Date.now()}.${ext || 'mp4'}`;

    const response = await fetch(targetUrl);
    if (!response.ok) {
      return res.status(response.status).send('Unable to fetch target media');
    }

    const contentType = response.headers.get('content-type') || (ext === 'mp3' ? 'audio/mpeg' : ext === 'jpg' ? 'image/jpeg' : 'video/mp4');
    const contentLength = response.headers.get('content-length');

    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(downloadFilename)}"`);
    res.setHeader('Content-Type', contentType);
    if (contentLength) {
      res.setHeader('Content-Length', contentLength);
    }
    res.setHeader('Cache-Control', 'public, max-age=3600');

    if (response.body) {
      // Stream body to response
      const reader = response.body.getReader();
      const pump = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            res.end();
            break;
          }
          res.write(value);
        }
      };
      await pump();
    } else {
      const buffer = await response.arrayBuffer();
      res.send(Buffer.from(buffer));
    }
  } catch (err: any) {
    console.error('Proxy download stream error:', err);
    // Fallback: redirect user directly
    if (typeof url === 'string') {
      res.redirect(url);
    } else {
      res.status(500).send('Failed to stream download');
    }
  }
});

// Start the server
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SocialSave server running on http://localhost:${PORT}`);
  });
}

startServer();
