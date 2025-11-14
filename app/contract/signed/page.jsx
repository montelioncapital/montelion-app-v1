"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

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

        {/* BOUTON DOWNLOAD STYLE "MC-BTN" MAIS EN GRIS */}
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mc-btn 
              w-full 
              flex items-center justify-center gap-2 
              bg-slate-700 text-white 
              hover:bg-slate-600 
              transition mb-6
            "
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Download signed contract (PDF)
          </a>
        )}

        {/* BTN CONTINUE */}
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
