// app/exchange/mt5-access/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Mt5AccessPage() {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [brokerName, setBrokerName] = useState("");
  const [server, setServer] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // 1) Vérifier que l'utilisateur est connecté
  useEffect(() => {
    (async () => {
      setLoadingSession(true);
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        setLoadingSession(false);
        return;
      }

      const session = sessionData?.session;
      if (!session?.user) {
        router.replace("/login");
        return;
      }

      setUserId(session.user.id);
      setLoadingSession(false);

      // Optionnel : pré-remplir si des données existent déjà
      const { data: existing, error: mt5Err } = await supabase
        .from("mt5_accounts")
        .select("broker_name, server, password")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (!mt5Err && existing) {
        setBrokerName(existing.broker_name || "");
        setServer(existing.server || "");
        setPassword(existing.password || "");
      }
    })();
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!userId) return;

    setSaving(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      // 2) Sauvegarder / mettre à jour l'accès MT5
      const { error: mt5Error } = await supabase.from("mt5_accounts").upsert(
        {
          user_id: userId,
          broker_name: brokerName.trim(),
          server: server.trim(),
          password: password, // on ne trim pas un mot de passe
        },
        { onConflict: "user_id" }
      );

      if (mt5Error) {
        console.error("Error saving mt5_accounts:", mt5Error);
        setErrorMsg("Unable to save your MT5 access. Please try again.");
        setSaving(false);
        return;
      }

      // 3) Mettre à jour la step d'onboarding → 13 (review)
      const { error: onboardingError } = await supabase
        .from("onboarding_state")
        .upsert(
          {
            user_id: userId,
            current_step: 13,
            completed: false,
          },
          { onConflict: "user_id" }
        );

      if (onboardingError) {
        console.error("Error updating onboarding_state:", onboardingError);
        // On affiche l'erreur mais on peut quand même rediriger
      }

      setSuccessMsg("Your MT5 access has been saved.");
      router.push("/get-started/review");
    } catch (err) {
      console.error("Unexpected error saving MT5 access:", err);
      setErrorMsg("Unexpected error. Please try again.");
      setSaving(false);
    }
  }

  if (loadingSession) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">MT5 access</h1>
          <p className="text-slate-400 text-sm">Loading your session…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section max-w-xl mx-auto text-left space-y-6">
        <div>
          <h1 className="mc-title mb-3">Connect your MT5 account</h1>
          <p className="text-slate-400 text-sm">
            Please provide the access details of the MT5 account that will be
            traded by Montelion. Make sure the information is correct before
            validating.
          </p>
        </div>

        {/* Messages */}
        {errorMsg && (
          <div className="rounded-md border border-rose-500/70 bg-rose-500/10 px-3 py-2 text-sm text-rose-100">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="rounded-md border border-emerald-500/70 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
            {successMsg}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Broker name */}
          <label className="block text-sm text-slate-300">
            Broker name
            <input
              type="text"
              className="mc-input mt-2"
              placeholder="Ex: IC Markets, Pepperstone…"
              value={brokerName}
              onChange={(e) => setBrokerName(e.target.value)}
              required
            />
          </label>

          {/* Server */}
          <label className="block text-sm text-slate-300">
            MT5 server
            <input
              type="text"
              className="mc-input mt-2"
              placeholder="Ex: ICMarketsSC-Demo, Broker-MT5-Live"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              required
            />
          </label>

          {/* Password + œil */}
          <div>
            <label className="block text-sm text-slate-300">
              MT5 password
            </label>
            <div className="relative mt-2">
              <input
                type={showPassword ? "text" : "password"}
                className="mc-input pr-11"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // eye-off
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M3 3l18 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.09A10.94 10.94 0 0112 5c5.52 0 9 4.5 9 7-.23.83-1.07 2.19-2.54 3.53M6.53 6.53C4.51 7.74 3.23 9.3 3 12c0 2.5 3.48 7 9 7 1.21 0 2.34-.21 3.36-.6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  // eye
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            These credentials are stored securely and used only to connect your
            MT5 account to Montelion&apos;s trading infrastructure.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="mc-btn mc-btn-primary w-full mt-2 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save and continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
