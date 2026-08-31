import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';

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
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest mb-4">
          <HelpCircle className="w-3.5 h-3.5 text-[#fd1d1d]" />
          <span>Knowledge Base</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-3 uppercase">
          Frequently Asked Questions
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400">
          Find quick answers about saving social media content, file saving on mobile, and compliance.
        </p>

        {/* Search input */}
        <div className="relative max-w-md mx-auto mt-6">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search questions (e.g. iPhone, MP3, private)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs sm:text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 shadow-md"
          />
        </div>
      </div>

      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-8 text-zinc-500 text-sm">
            No questions match "{searchQuery}".
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-zinc-900 border border-zinc-800 rounded-[22px] overflow-hidden shadow-md transition-all hover:border-zinc-700"
              >
                <button
                  id={`faq-toggle-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left font-bold text-sm sm:text-base text-white flex items-center justify-between gap-4 hover:text-[#fd1d1d] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 text-zinc-400 ${
                      isOpen ? 'rotate-180 text-[#fd1d1d]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/80 pt-3 animate-in fade-in duration-150">
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
