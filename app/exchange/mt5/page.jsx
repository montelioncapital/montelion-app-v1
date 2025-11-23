// app/exchange/mt5-access/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Mt5AccessPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérification simple : user connecté
  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      setUserId(session.user.id);
      setLoading(false);
    })();
  }, [router]);

  // Enregistrer step 13 (MT5 access)
  async function handleSubmit() {
    if (!userId) return;

    const { error } = await supabase.from("onboarding_state").upsert(
      {
        user_id: userId,
        current_step: 13,
        completed: false,
      },
      { onConflict: "user_id" }
    );

    if (error) {
      console.error("Error updating step 13:", error);
    }

    // Redirection vers la page de review
    router.push("/get-started/review");
  }

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Loading…</h1>
          <p className="text-slate-400 text-sm">Please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-xl mx-auto">
        <h1 className="mc-title mb-4">Connect your MT5 account</h1>
        <p className="text-slate-400 mb-10 text-sm">
          Enter your MT5 login credentials so Montelion can connect to your trading account.
          Your credentials are encrypted and stored securely.
        </p>

        {/* EXAMPLE FORM — tu peux mettre ce que tu veux ici */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="MT5 Login"
            className="mc-input"
          />
          <input
            type="text"
            placeholder="Server"
            className="mc-input"
          />
          <input
            type="password"
            placeholder="Password"
            className="mc-input"
          />

          <button
            onClick={handleSubmit}
            className="mc-btn mc-btn-primary w-full mt-4"
          >
            Continue
          </button>
        </div>

        <p className="text-xs text-slate-500 mt-6">
          Your MT5 credentials will never be shared.
        </p>
      </div>
    </div>
  );
}
