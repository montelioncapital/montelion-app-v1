"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Petit icône de téléchargement en SVG (pas de lib externe)
function DownloadIcon({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3v12" />
      <polyline points="7 11 12 16 17 11" />
      <rect x="4" y="18" width="16" height="3" rx="1" />
    </svg>
  );
}

function SignedContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fileUrl = searchParams.get("file");

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-xl mx-auto">
        <h1 className="mc-title mb-3">Contract signed</h1>

        <p className="text-slate-400 mb-4">
          Thank you for your trust. Your management mandate has been signed
          successfully.
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 mb-6 text-sm text-slate-300">
          Your signed contract is now securely stored.
        </div>

        {/* Bouton "Download" même style que Continue mais en gris */}
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mc-btn w-full mb-4
              flex items-center justify-center gap-2
              bg-slate-700 text-white hover:bg-slate-600
              transition
            "
          >
            <DownloadIcon className="h-5 w-5" />
            <span>Download signed contract (PDF)</span>
          </a>
        )}

        {/* Bouton Continue bleu */}
        <button
          type="button"
          onClick={() => router.push("/get-started")}
          className="mc-btn mc-btn-primary w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default function ContractSignedPage() {
  return (
    <Suspense
      fallback={
        <div className="mc-card">
          <div className="mc-section text-left max-w-xl mx-auto">
            <h1 className="mc-title mb-3">Contract signed</h1>
            <p className="text-slate-400">Loading your contract…</p>
          </div>
        </div>
      }
    >
      <SignedContent />
    </Suspense>
  );
}
