"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function ContractSignedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get("file");

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Contract signed</h1>

        <p className="text-slate-400 mb-6">
          Thank you for your trust. Your management mandate has been signed
          successfully.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4 mb-8 text-sm text-slate-300">
          <p>Your signed contract is now securely stored.</p>
        </div>

        <div className="space-y-4">
          <a
            href={fileUrl || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="mc-btn mc-btn-secondary inline-flex items-center justify-center w-full"
          >
            Download signed contract (PDF)
          </a>

          <button
            onClick={() => router.push("/exchange-setup")}
            className="mc-btn mc-btn-primary w-full"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
