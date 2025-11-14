"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SignedContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fileParam = searchParams.get("file");

  const handleDownload = () => {
    if (!fileParam) return;

    try {
      const decoded = decodeURIComponent(fileParam);
      window.open(decoded, "_blank");
    } catch {
      window.open(fileParam, "_blank");
    }
  };

  const handleContinue = () => {
    router.push("/get-started");
  };

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Contract signed</h1>
        <p className="text-slate-400 mb-6">
          Thank you for your trust. Your management mandate has been signed
          successfully.
        </p>

        {/* bandeau info */}
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-3 text-sm text-slate-200">
          <p className="text-slate-200">
            Your signed contract is now securely stored.
          </p>
        </div>

        {/* bouton téléchargement style “primary” mais en gris + icône */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={!fileParam}
          className={`w-full h-11 mb-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition
            ${
              fileParam
                ? "bg-slate-800 hover:bg-slate-700 text-slate-100"
                : "bg-slate-900 text-slate-500 cursor-not-allowed"
            }`}
        >
          {/* petite icône download en SVG inline */}
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 3.5v8.75m0 0L6.5 9.75M10 12.25l3.5-2.5M4.75 14.5h10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Download signed contract (PDF)</span>
        </button>

        {/* bouton continue = ton bouton bleu habituel */}
        <button
          type="button"
          onClick={handleContinue}
          className="mc-btn mc-btn-primary w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default function SignedPage() {
  return (
    <Suspense
      fallback={
        <div className="mc-card">
          <div className="mc-section text-left max-w-2xl mx-auto">
            <h1 className="mc-title mb-3">Contract signed</h1>
            <p className="text-slate-400 text-sm">Loading your contract…</p>
          </div>
        </div>
      }
    >
      <SignedContent />
    </Suspense>
  );
}
