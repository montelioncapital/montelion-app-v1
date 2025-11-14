// app/onboarding/contract-ready/page.jsx
"use client";

import Link from "next/link";

export default function ContractReadyPage() {
  return (
    <div className="mc-card">
      <div className="mc-section max-w-2xl mx-auto text-left">
        <h1 className="mc-title mb-3">Your onboarding is complete</h1>

        <p className="text-slate-400 mb-8">
          We’ve received your personal information and KYC documents. 
          The next step is to review and sign your discretionary 
          management agreement.
        </p>

        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-5 mb-8">
          <div className="text-xs font-semibold tracking-[0.2em] text-slate-500 mb-2">
            STEP 7 · NEXT STEP
          </div>
          <div className="text-lg font-semibold text-slate-50 mb-1">
            Sign your management mandate
          </div>
          <p className="text-sm text-slate-400">
            On the next screen, we’ll generate a contract pre-filled with your
            information. You’ll be able to review the key terms and sign
            electronically. A PDF copy will then be stored securely and
            available for download.
          </p>
        </div>

        <Link
          href="/contract"
          className="mc-btn mc-btn-primary inline-flex items-center justify-center"
        >
          Continue to contract
        </Link>
      </div>
    </div>
  );
}
