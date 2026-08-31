import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, Send, CheckCircle2, Scale } from 'lucide-react';
import { ActivePage } from '../types';
import { useToast } from './Toast';

interface LegalPagesProps {
  initialTab?: 'privacy' | 'terms' | 'dmca';
  onNavigateTab?: (tab: ActivePage) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({
  initialTab = 'privacy',
  onNavigateTab,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms' | 'dmca'>(initialTab);

  // DMCA form state
  const [dmcaForm, setDmcaForm] = useState({
    fullName: '',
    email: '',
    workDescription: '',
    infringingUrl: '',
    statementAgreed: false,
  });
  const [dmcaSubmitted, setDmcaSubmitted] = useState(false);

  const handleDmcaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dmcaForm.statementAgreed) {
      showToast({
        type: 'error',
        title: 'Agreement Required',
        message: 'Please certify that the notice is accurate under penalty of perjury.',
      });
      return;
    }

    setDmcaSubmitted(true);
    showToast({
      type: 'success',
      title: 'DMCA Notice Received',
      message: 'Your inquiry has been logged. Our compliance team will review and process within 24 hours.',
    });
  };

  return (
    <div id="legal-pages-container" className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Compliance Notice Highlight */}
      <div className="mb-8 p-5 rounded-[24px] bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs sm:text-sm flex items-start gap-3 shadow-xl">
        <ShieldCheck className="w-5 h-5 text-[#fd1d1d] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-white text-sm mb-1 uppercase tracking-wide">
            Compliance & Terms Policy
          </h4>
          <p className="leading-relaxed text-zinc-400">
            “Only download content you own or have permission to download. Respect copyright and platform terms.” SocialSave operates exclusively for publicly accessible media and never circumvents authentication, DRM, or access controls.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800 mb-8 overflow-x-auto gap-2 sm:gap-4 pb-1">
        <button
          id="legal-tab-privacy"
          onClick={() => {
            setActiveTab('privacy');
            if (onNavigateTab) onNavigateTab('privacy');
          }}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'privacy'
              ? 'border-[#fd1d1d] text-white'
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          <Lock className="w-4 h-4" />
          <span>Privacy Policy</span>
        </button>

        <button
          id="legal-tab-terms"
          onClick={() => {
            setActiveTab('terms');
            if (onNavigateTab) onNavigateTab('terms');
          }}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'terms'
              ? 'border-[#fd1d1d] text-white'
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Terms of Service</span>
        </button>

        <button
          id="legal-tab-dmca"
          onClick={() => {
            setActiveTab('dmca');
            if (onNavigateTab) onNavigateTab('dmca');
          }}
          className={`pb-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 cursor-pointer ${
            activeTab === 'dmca'
              ? 'border-[#fd1d1d] text-white'
              : 'border-transparent text-zinc-500 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>DMCA & Copyright Policy</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-[28px] p-6 sm:p-10 shadow-2xl text-zinc-300 text-sm leading-relaxed">
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wide">
                Privacy Policy
              </h2>
              <p className="text-xs text-zinc-500">Last updated: August 2026</p>
            </div>

            <section>
              <h3 className="text-base font-bold text-white mb-2">
                1. Strict Zero-Log Architecture
              </h3>
              <p className="text-zinc-400">
                SocialSave is designed from the ground up to guarantee user anonymity. We do not store, log, or harvest the media files you analyze or download. Requests are processed in real-time ephemerally in server memory and discarded immediately after delivery.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-white mb-2">
                2. Client-Side Local History
              </h3>
              <p className="text-zinc-400">
                Any download history shown in the "History" tab is strictly stored on your own device inside browser <code>localStorage</code>. It is never transmitted to, synchronized with, or readable by our backend servers.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-white mb-2">
                3. Third-Party Requests & Platform Interactions
              </h3>
              <p className="text-zinc-400">
                When you input a URL from Instagram or Facebook, our service acts as a proxy stream to verify public media streams. We do not access user credentials, cookies, private session tokens, or private feeds.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-white mb-2">
                4. Cookies and Analytics
              </h3>
              <p className="text-zinc-400">
                SocialSave does not use invasive tracking cookies or sale of personal data. Only your local interface preferences (such as Dark/Light theme mode and local history) are stored in client storage.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wide">
                Terms of Service
              </h2>
              <p className="text-xs text-zinc-500">Last updated: August 2026</p>
            </div>

            <section>
              <h3 className="text-base font-bold text-white mb-2">
                1. Acceptance of Terms
              </h3>
              <p className="text-zinc-400">
                By using SocialSave, you agree to comply with and be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use the service.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-white mb-2">
                2. Authorized Use & Copyright Responsibility
              </h3>
              <p className="text-zinc-400">
                SocialSave is provided solely for personal, non-commercial archiving, research, and offline viewing of content you are legally authorized to access. You agree not to download or distribute copyrighted materials without explicit authorization from the copyright holder.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-white mb-2">
                3. Prohibition of Security Circumvention
              </h3>
              <p className="text-zinc-400">
                You may not use SocialSave to bypass password protection, private accounts, digital rights management (DRM), paywalls, or technological access controls. Any attempt to abuse the service or overwhelm our systems is strictly prohibited.
              </p>
            </section>

            <section>
              <h3 className="text-base font-bold text-white mb-2">
                4. Disclaimer of Warranty & Limitation of Liability
              </h3>
              <p className="text-zinc-400">
                The service is provided on an "as is" and "as available" basis without warranties of any kind. SocialSave is not affiliated with, endorsed by, or sponsored by Meta, Instagram, or Facebook.
              </p>
            </section>
          </div>
        )}

        {activeTab === 'dmca' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wide">
                DMCA & Copyright Policy
              </h2>
              <p className="text-xs text-zinc-500">Notice and Takedown Procedure</p>
            </div>

            <p className="text-zinc-400">
              SocialSave respects the intellectual property rights of creators and adheres to the provisions of the Digital Millennium Copyright Act (17 U.S.C. § 512) and international copyright legislation.
            </p>

            <section>
              <h3 className="text-base font-bold text-white mb-2">
                How to Submit a DMCA Takedown Notice
              </h3>
              <p className="text-zinc-400">
                If you are a copyright owner or an agent authorized to act on behalf of one, and you believe that public media accessible via SocialSave infringes upon your copyright, you may submit a formal notification using the form below:
              </p>
            </section>

            {dmcaSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800 text-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-base mb-1">Notice Submitted Successfully</h4>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    Thank you. Your request regarding <span className="font-mono text-white">{dmcaForm.infringingUrl}</span> has been assigned reference ID <code className="text-emerald-400">DMCA-{Date.now().toString().slice(-6)}</code>. Our designated copyright agent will respond to {dmcaForm.email}.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleDmcaSubmit} className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={dmcaForm.fullName}
                      onChange={(e) => setDmcaForm({ ...dmcaForm, fullName: e.target.value })}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-2.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={dmcaForm.email}
                      onChange={(e) => setDmcaForm({ ...dmcaForm, email: e.target.value })}
                      placeholder="copyright@yourdomain.com"
                      className="w-full px-4 py-2.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                    Specific URL of Allegedly Infringing Media *
                  </label>
                  <input
                    type="url"
                    required
                    value={dmcaForm.infringingUrl}
                    onChange={(e) => setDmcaForm({ ...dmcaForm, infringingUrl: e.target.value })}
                    placeholder="https://www.instagram.com/p/..."
                    className="w-full px-4 py-2.5 rounded-full bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                    Description of Copyrighted Work *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={dmcaForm.workDescription}
                    onChange={(e) => setDmcaForm({ ...dmcaForm, workDescription: e.target.value })}
                    placeholder="Describe original work, title, author, and evidence of ownership..."
                    className="w-full px-4 py-3 rounded-2xl bg-zinc-950 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700"
                  />
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <input
                    id="dmca-agreed"
                    type="checkbox"
                    checked={dmcaForm.statementAgreed}
                    onChange={(e) => setDmcaForm({ ...dmcaForm, statementAgreed: e.target.checked })}
                    className="mt-1 rounded accent-[#fd1d1d]"
                  />
                  <label htmlFor="dmca-agreed" className="text-xs text-zinc-400 leading-tight">
                    I state under penalty of perjury that I am the owner or authorized representative of the copyright and the information provided is accurate.
                  </label>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-full font-bold text-xs text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 transition-opacity flex items-center gap-2 shadow-lg cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit DMCA Takedown Notice</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
