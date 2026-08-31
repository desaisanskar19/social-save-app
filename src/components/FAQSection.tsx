import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search, ShieldCheck, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'Is SocialSave free to use?',
      a: 'Yes! SocialSave is 100% free with unlimited downloads. There are no subscriptions, no credit card requirements, and no hidden fees.',
    },
    {
      q: 'How do I save videos to iPhone (iOS) Camera Roll?',
      a: 'On iOS Safari, after clicking "Download", tap the blue download arrow in Safari’s search bar, tap the downloaded video file, tap the Share icon at the bottom left, and tap "Save Video" to send it directly to your Photos / Camera Roll.',
    },
    {
      q: 'How do I download on Android devices?',
      a: 'On Android Chrome or Samsung Internet, simply tap "Download". The video or image is immediately saved into your device\'s "Download" folder and will automatically show in your Gallery app.',
    },
    {
      q: 'Can I download private Instagram posts, stories, or Facebook group videos?',
      a: 'No. SocialSave strictly respects platform privacy settings and security boundaries. You can only download publicly accessible content where the creator has permitted public viewing and distribution.',
    },
    {
      q: 'Can I extract and download audio (MP3) from Instagram Reels and Facebook videos?',
      a: 'Yes! SocialSave provides an audio-only option for videos with soundtrack or spoken audio. Simply select the "Original Audio (MP3)" format option in the result card.',
    },
    {
      q: 'Are there any watermarks added to downloaded media?',
      a: 'No. SocialSave delivers the clean, original media file exactly as uploaded to the social network, with zero added watermarks or logos.',
    },
    {
      q: 'Does SocialSave store or track my downloaded files?',
      a: 'No. SocialSave operates with a strict zero-log policy. We do not store copies of downloaded videos, nor do we track user identities. Your download history is kept strictly in your local browser storage.',
    },
    {
      q: 'Is it legal to download social media content?',
      a: 'Downloading public content for personal, non-commercial offline viewing or fair-use commentary is generally permitted. However, users are strictly responsible for respecting copyright laws, intellectual property rights, and platform terms of service. You should only download content you own or have explicit permission to use.',
    },
    {
      q: 'What video resolutions and qualities are supported?',
      a: 'SocialSave supports all original resolutions provided by the source, including 1080p Full HD (1920x1080), 720p HD, 480p SD, and Ultra-HD original photos.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq-section" className="max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/10 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-wider mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          Everything You Need to Know
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Find quick answers about saving social media content, file saving on mobile, and compliance.
        </p>

        {/* Search input */}
        <div className="relative max-w-md mx-auto mt-6">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. iPhone, MP3, private)…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-pink-500 shadow-sm"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400 text-sm">
            No questions match "{searchQuery}".
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs transition-all"
              >
                <button
                  id={`faq-toggle-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 sm:p-5 text-left font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100 flex items-center justify-between gap-4 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 text-slate-400 ${
                      isOpen ? 'rotate-180 text-pink-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 mt-1 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};
