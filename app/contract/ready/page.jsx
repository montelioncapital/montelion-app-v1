// app/contract/ready/page.jsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function ContractReadyPage() {
  const router = useRouter();

  useEffect(() => {
    // petite sécurité : si pas de session, on renvoie vers /login
    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.replace("/login");
      }
    })();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-xl rounded-3xl bg-slate-900/70 border border-slate-800/80 px-8 py-10 shadow-xl">
        <h1 className="mc-title mb-4">You're almost done</h1>
        <p className="text-slate-300 mb-6">
          Your onboarding information has been submitted. The next step is to
          review and sign the discretionary management agreement.
        </p>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-5 mb-8">
          <p className="text-sm text-slate-300">
            Once you sign the contract, you'll be able to download a PDF copy
            and your onboarding will be fully completed.
          </p>
        </div>

        <button
          type="button"
          onClick={() => router.push("/contract")}
          className="mc-btn mc-btn-primary w-full"
        >
          Review & sign contract
        </button>
      </div>
    </main>
  );
}
