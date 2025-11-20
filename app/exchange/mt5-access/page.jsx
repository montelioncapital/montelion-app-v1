// app/exchange/mt5-access/page.jsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function Mt5AccessPage() {
  const router = useRouter();

  const [userId, setUserId] = useState(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [form, setForm] = useState({
    login: "",
    password: "",
    server: "",
    brokerName: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // ---------------------------
  //  AUTH PROTECTION
  // ---------------------------
  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error getting session:", error);
        setLoadingSession(false);
        return;
      }

      const session = data?.session;
      if (!session?.user) {
        router.replace("/login");
        return;
      }

      setUserId(session.user.id);
      setLoadingSession(false);
    })();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // ---------------------------
  //  SUBMIT: mt5_accounts + step 13
  // ---------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      router.push("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1) Sauvegarder / mettre à jour le compte MT5
      const { error: accountError } = await supabase
        .from("mt5_accounts")
        .upsert(
          {
            user_id: userId,
            login: form.login,
            password: form.password, // à chiffrer plus tard si tu veux
            server: form.server,
            broker_name: form.brokerName,
          },
          { onConflict: "user_id" }
        );

      if (accountError) {
        console.error("Error saving MT5 account:", accountError);
        alert("An unexpected error occurred while saving your access.");
        return;
      }

      // 2) Passer l’onboarding à la step 13 (Montelion review)
      const targetStep = 13;

      const { error: stepError } = await supabase
        .from("onboarding_state")
        .upsert(
          {
            user_id: userId,
            current_step: targetStep,
            completed: false,
          },
          { onConflict: "user_id" }
        );

      if (stepError) {
        console.error("Error updating onboarding_state to step 13:", stepError);
        // on continue quand même vers la page review
      }

      // 3) Redirection vers la page “Montelion review”
      router.push("/get-started/review");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingSession) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Connect Your Trading Account</h1>
          <p className="text-slate-400 text-sm">Loading session…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section max-w-2xl mx-auto text-left">
        {/* HEADER */}
        <h1 className="mc-title mb-3">Connect Your Trading Account</h1>
        <p className="text-slate-400 text-sm mb-6">
          Provide the details of your MetaTrader 5 trading account. Montelion
          will use these credentials to execute trades on your behalf.
        </p>

        {/* SECURITY NOTICE */}
        <div className="mb-8 rounded-2xl border border-amber-500/60 bg-amber-500/10 px-4 py-3 text-xs text-amber-100">
          <p className="font-medium mb-1.5">Security reminder</p>
          <p className="text-amber-100/90">
            Your trading credentials are encrypted and stored securely. Never
            share your MetaTrader login details via email, chat or screenshots.
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Login */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              MT5 Login ID
            </label>
            <input
              name="login"
              required
              value={form.login}
              onChange={handleChange}
              placeholder="e.g. 50234819"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-50"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              MT5 Password
            </label>
            <input
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Your MetaTrader 5 trading password"
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-50"
            />
          </div>

          {/* Server */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              Trading server
            </label>
            <input
              name="server"
              required
              value={form.server}
              onChange={handleChange}
              placeholder="e.g. ICMarketsSC-Live19, FTMO-Demo, etc."
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-50"
            />
          </div>

          {/* Broker */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-200">
              Broker name
            </label>
            <input
              name="brokerName"
              required
              value={form.brokerName}
              onChange={handleChange}
              placeholder="e.g. IC Markets, FTMO, Eightcap..."
              className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-xs text-slate-50"
            />
          </div>

          {/* Confirmation */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-[11px] text-slate-300">
            By submitting this form, you authorize Montelion to connect to your
            MT5 account and execute trades according to the agreed strategy.
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mc-btn mc-btn-primary min-w-[180px] disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save my trading access"}
          </button>
        </form>
      </div>
    </div>
  );
}
