"use client";

export default function DisabledPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="mc-card max-w-md w-full">
        <div className="mc-section text-left">
          
          <h1 className="mc-title mb-3">Your account is disabled</h1>

          <p className="text-slate-400 mb-6">
            Access to your Montelion account has been permanently disabled.  
            This can occur for compliance, security or contractual reasons.
          </p>

          <div className="rounded-xl border border-rose-700/40 bg-rose-500/10 text-rose-200 p-4 text-sm mb-8">
            If you believe this is a mistake or you would like more information
            about this decision, please contact Montelion Capital support.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="mailto:support@montelion-capital.com"
              className="mc-btn mc-btn-primary w-full text-center"
            >
              Contact support
            </a>

            <a
              href="/login"
              className="mc-btn w-full text-center border border-slate-700 bg-slate-800/40 hover:bg-slate-800"
            >
              Back to login
            </a>
          </div>

          <p className="text-xs text-slate-500 mt-6">
            For security reasons, trading activity and access to your client area  
            are no longer available on this account.
          </p>
        </div>
      </div>
    </div>
  );
}
