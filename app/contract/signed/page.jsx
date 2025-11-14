// app/contract/signed/page.jsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ContractSignedPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fileUrl = searchParams.get("file") || "";

  const [isContinuing, setIsContinuing] = useState(false);

  function handleDownload() {
    if (!fileUrl) return;
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  }

  async function handleContinue() {
    setIsContinuing(true);

    try {
      // Récupérer la session pour connaître l'user_id
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (session?.user) {
        await supabase.from("onboarding_state").upsert(
          {
            user_id: session.user.id,
            current_step: 10, // ✅ étape après signature de contrat
            completed: false,
          },
          { onConflict: "user_id" }
        );
      }
    } catch (err) {
      console.error("Failed to update onboarding_state to 10:", err);
      // on ne bloque pas, on redirige quand même
    } finally {
      setIsContinuing(false);
      router.push("/get-started/advanced"); // ✅ redirection quoi qu'il arrive
    }
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Contract signed</h1>
        <p className="text-slate-400 mb-6">
          Thank you for your trust. Your management mandate has been
          signed successfully.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-3 mb-6 text-sm text-slate-300">
          Your signed contract is now securely stored.
        </div>

        {/* Bouton download style “bouton neutre” */}
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

        {/* Bouton Continue bleu, même style que le reste de l’app */}
        <button
          type="button"
          onClick={handleContinue}
          disabled={isContinuing}
          className={`mc-btn mc-btn-primary w-full ${
            isContinuing ? "opacity-60 cursor-wait" : ""
          }`}
        >
          {isContinuing ? "Loading…" : "Continue"}
        </button>
      </div>
    </div>
  );
}
