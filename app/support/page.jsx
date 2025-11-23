"use client";

export default function PublicSupportPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="mc-card max-w-md w-full">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-3">Need help?</h1>
          <p className="text-slate-400 mb-6">
            If you need assistance with your Montelion access, invitations, or
            onboarding steps, you can contact our team using one of the options
            below.
          </p>

          <div className="space-y-4">
            {/* Email support */}
            <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4 text-sm">
              <p className="text-slate-300 mb-1 font-semibold">Email support</p>
              <p className="text-slate-400 mb-3">
                Send us an email and we&apos;ll get back to you as soon as
                possible.
              </p>
              <a
                href="mailto:support@montelion-capital.com"
                className="mc-btn mc-btn-primary w-full text-center"
              >
                support@montelion-capital.com
              </a>
            </div>

            {/* WhatsApp support */}
            <div className="rounded-xl border border-slate-700 bg-slate-900/40 p-4 text-sm">
              <p className="text-slate-300 mb-1 font-semibold">
                WhatsApp support
              </p>
              <p className="text-slate-400 mb-3">
                You can also reach us directly on WhatsApp during business
                hours.
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
          </div>

          <p className="text-xs text-slate-500 mt-6">
            This support page is for access and onboarding questions only. Once
            you are logged in, you will also find in-app support options inside
            your Montelion dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
