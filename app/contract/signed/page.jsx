// app/contract/signed/page.jsx
"use client";

import Link from "next/link";

export default function ContractSignedPage() {
  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Contract signed</h1>
        <p className="text-slate-400 mb-6">
          Your discretionary management agreement has been signed
          electronically. A copy of the contract is securely stored and can be
          downloaded from your Montelion space once it is available.
        </p>

        <div className="rounded-2xl border border-emerald-900/60 bg-emerald-950/40 px-5 py-4 mb-8 text-sm text-emerald-200">
          <p className="font-semibold text-emerald-300 mb-1.5">
            You&apos;re all set with the legal part.
          </p>
          <p className="text-emerald-200/80 text-xs leading-relaxed">
            Our team will now review your file and guide you through the final
            steps to connect your exchange account and activate your managed
            strategy.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="mc-btn mc-btn-primary inline-flex items-center justify-center"
          >
            Go to dashboard
          </Link>

          <Link
            href="/get-started"
            className="mc-btn inline-flex items-center justify-center border border-slate-700 bg-slate-900/60 text-slate-200 hover:bg-slate-800"
          >
            View my onboarding steps
          </Link>
        </div>
      </div>
    </div>
  );
}
