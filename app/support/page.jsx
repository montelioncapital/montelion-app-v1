"use client";

export default function PublicSupportPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="mc-card max-w-md w-full">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-3">Support Montelion</h1>

          <p className="text-slate-400 mb-6">
            Our team is available to assist you with <span className="text-slate-200">any request</span> —
            account access, invitations, technical issues or general information.
          </p>

          {/* Email */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4 text-sm mb-4">
            <p className="text-slate-300 font-semibold mb-1">Email</p>
            <p className="text-slate-400 mb-3">
              Contact us for any question or assistance. Response within 24h.
            </p>
            <a
              href="mailto:support@montelion-capital.com"
              className="mc-btn mc-btn-primary w-full text-center"
            >
              support@montelion-capital.com
            </a>
          </div>

          {/* WhatsApp */}
          <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4 text-sm">
            <p className="text-slate-300 font-semibold mb-1">WhatsApp</p>
            <p className="text-slate-400 mb-3">
              Reach us instantly for urgent matters or quick questions.
            </p>
            <a
              href="https://wa.me/33610454578"
              target="_blank"
              rel="noreferrer"
              className="mc-btn w-full text-center border border-slate-600 bg-slate-800/60 hover:bg-slate-800"
            >
              +33 6 10 45 45 78
            </a>
          </div>

          <p className="text-xs text-slate-500 mt-6">
            This support page is available before logging in.  
            Additional support options will be accessible once you enter the Montelion client platform.
          </p>
        </div>
      </div>
    </div>
  );
}
