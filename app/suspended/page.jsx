"use client";

export default function SuspendedPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="mc-card max-w-md w-full">
        <div className="mc-section text-left">
          
          <h1 className="mc-title mb-3">Your account is suspended</h1>

          <p className="text-slate-400 mb-6">
            Your Montelion account is temporarily suspended.  
            This may occur due to incomplete verification, risk review  
            or unusual account activity.
          </p>

          <div className="rounded-xl border border-amber-600/40 bg-amber-500/10 text-amber-200 p-4 text-sm mb-8">
            Our team is reviewing your case. You will be contacted once the review is complete.
            If you need further details, please reach out to support.
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="/support"
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
            During suspension, access to the platform, trading activity,  
            and user operations are temporarily restricted.
          </p>
        </div>
      </div>
    </div>
  );
}
