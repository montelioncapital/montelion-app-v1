// app/contract/signed/page.jsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ContractSignedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get("file") || "";
  const [updating, setUpdating] = useState(false);

  const handleDownload = useCallback(() => {
    if (!fileUrl) return;
    window.open(fileUrl, "_blank");
  }, [fileUrl]);

  const handleContinue = useCallback(async () => {
    setUpdating(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (session?.user) {
        await supabase.from("onboarding_state").upsert(
          {
            user_id: session.user.id,
            current_step: 10, // 👉 étape après signature du contrat
            completed: false,
          },
          { onConflict: "user_id" }
        );
      }
    } catch (e) {
      console.error("failed to update onboarding_state", e);
      // on ne bloque pas la redirection même si ça plante
    } finally {
      setUpdating(false);
      router.push("/get-started/advanced");
    }
  }, [router]);

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Contract signed</h1>
        <p className="text-slate-400 mb-6">
          Thank you for your trust. Your management mandate has been signed
          successfully.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-3 mb-6 text-sm text-slate-300">
          Your signed contract is now securely stored.
        </div>

        {/* Bouton download style */}
        <button
          type="button"
          onClick={handleDownload}
          disabled={!fileUrl}
          className={`w-full mb-4 inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-3 text-sm font-medium text-slate-100 hover:bg-slate-700/90 hover:border-slate-500 transition ${
            !fileUrl ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          <span className="mr-2 text-lg leading-none">⬇️</span>
          <span>Download signed contract (PDF)</span>
        </button>

        {/* Bouton Continue bleu */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={updating}
          className={`mc-btn mc-btn-primary w-full ${
            updating ? "opacity-60 cursor-wait" : ""
          }`}
        >
          {updating ? "Loading…" : "Continue"}
        </button>
      </div>
    </div>
  );
}
