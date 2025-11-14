"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ContractSignedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL du PDF depuis ?file=...
  const fileUrl = searchParams.get("file");

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-xl mx-auto">

        <h1 className="mc-title mb-3">Contract signed</h1>

        <p className="text-slate-400 mb-4">
          Thank you for your trust. Your management mandate has been signed successfully.
        </p>

        <div className="rounded-xl border border-slate-800 bg-slate-900/40 px-4 py-3 mb-6 text-sm text-slate-300">
          Your signed contract is now securely stored.
        </div>

        {/* --- Bouton Download --- */}
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center mb-6 px-4 py-2 rounded-xl border border-slate-700 bg-slate-800/40 text-slate-200 text-sm hover:bg-slate-700/40 transition"
          >
            Download signed contract (PDF)
          </a>
        )}

        {/* --- Bouton Continue --- */}
        <button
          onClick={() => router.push("/get-started")}
          className="mc-btn mc-btn-primary w-full"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
