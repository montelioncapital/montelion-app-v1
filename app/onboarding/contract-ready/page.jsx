// app/onboarding/contract-ready/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";
import Link from "next/link";

export default function ContractReadyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function checkState() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const { data: state, error: stateErr } = await supabase
        .from("onboarding_state")
        .select("current_step, completed")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (stateErr) {
        console.error(stateErr);
        if (!cancelled) {
          setError("We couldn't load your onboarding status.");
          setLoading(false);
        }
        return;
      }

      // Si l'onboarding n'est pas encore au step 7 → retour au flow normal
      if (!state || state.current_step < 7) {
        router.replace("/onboarding");
        return;
      }

      // Si déjà contrat signé (step 8+) → on bascule directement
      if (state.current_step >= 8 || state.completed) {
        router.replace("/contract");
        return;
      }

      if (!cancelled) setLoading(false);
    }

    checkState();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section max-w-2xl mx-auto text-left">
          <p className="text-slate-400 text-sm">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section max-w-2xl mx-auto text-left">
        <h1 className="mc-title mb-3">Your onboarding is complete</h1>

        {error && (
          <div className="mb-4 rounded-md bg-red-950/40 border border-red-500/40 px-3 py-2 text-sm text-red-300">
            {error}
          </div>
        )}

        <p className="text-slate-400 mb-8">
          We’ve received your personal information and KYC documents. The next
          step is to review and sign your discretionary management agreement.
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
