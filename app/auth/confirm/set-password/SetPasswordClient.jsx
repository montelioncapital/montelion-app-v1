"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const dynamic = "force-dynamic";
export const revalidate = false;

export default function SetPasswordPage() {
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [hasSession, setHasSession] = useState(false);

  // ✅ nouveau : état de succès pour afficher l'écran de confirmation
  const [done, setDone] = useState(false);

  // Hydrate/valide la session à l’arrivée
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session) {
        setHasSession(true);
        return;
      }

      const search = new URLSearchParams(window.location.search);
      const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const access_token =
        search.get("access_token") || hash.get("access_token") || undefined;
      const refresh_token =
        search.get("refresh_token") || hash.get("refresh_token") || undefined;

      if (access_token && refresh_token) {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });
        if (!error) {
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, "", cleanUrl);
          setHasSession(true);
          return;
        }
      }
      setHasSession(false);
    })();
  }, []);

  // Règles de validation
  const rules = useMemo(() => {
    const len = pwd.length >= 8;
    const spec = /[^A-Za-z0-9]/.test(pwd);
    const num = /[0-9]/.test(pwd);
    const cap = /[A-Z]/.test(pwd);
    const match = pwd.length > 0 && pwd === pwd2;
    return { len, spec, num, cap, match };
  }, [pwd, pwd2]);

  const allOk =
    rules.len && rules.spec && rules.num && rules.cap && rules.match && hasSession;

  // Soumission
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!allOk || submitting) return;
    setSubmitting(true);
    setError("");

    const { data } = await supabase.auth.getSession();
    if (!data?.session) {
      setError("Auth session missing! Open the invite link again (from your email).");
      setSubmitting(false);
      return;
    }

    const { error: updateErr } = await supabase.auth.updateUser({ password: pwd });
    if (updateErr) {
      setError(updateErr.message || "Something went wrong, please try again.");
      setSubmitting(false);
      return;
    }

    // ✅ on affiche l'écran de confirmation (pas de redirection auto)
    setDone(true);
    setSubmitting(false);
  };

  const Check = ({ ok }) => (
    <span className={ok ? "text-emerald-400" : "text-slate-400"}>{ok ? "✓" : "×"}</span>
  );

  // ✅ ÉCRAN DE CONFIRMATION
  if (done) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Password updated</h1>
          <p className="text-slate-400 mb-8">
            Your password has been saved successfully. You can now sign in to your account.
          </p>

          <button
            className="mc-btn mc-btn-primary w-full"
            onClick={async () => {
              // optionnel : on nettoie la session d’invitation avant d’aller sur /login
              try {
                await supabase.auth.signOut();
              } catch {}
              window.location.href = "/login";
            }}
          >
            Go to sign in
          </button>
        </div>
      </div>
    );
  }

  // Formulaire (inchangé, même design)
  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-2">Set your password</h1>
        <p className="text-slate-400 mb-8">
          Finish activating your Montelion account.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* New password */}
          <div>
            <label className="block mb-2 text-slate-300">New password</label>
            <div className="relative">
              <input
                type={show1 ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Enter a strong password"
                className="mc-input pr-11"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShow1((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                aria-label={show1 ? "Hide password" : "Show password"}
              >
                {show1 ? (
                  // eye-off (identique à la page Login)
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block mb-2 text-slate-300">Confirm password</label>
            <div className="relative">
              <input
                type={show2 ? "text" : "password"}
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
                placeholder="Retype your password"
                className="mc-input pr-11"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShow2((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                aria-label={show2 ? "Hide password" : "Show password"}
              >
                {show2 ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path
                      d="M10.58 10.58A3 3 0 0012 15a3 3 0 002.42-4.42M9.88 5.09A10.94 10.94 0 0112 5c5.52 0 9 4.5 9 7-.23.83-1.07 2.19-2.54 3.53M6.53 6.53C4.51 7.74 3.23 9.3 3 12c0 2.5 3.48 7 9 7 1.21 0 2.34-.21 3.36-.6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Password rules */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <p className="text-slate-300 mb-3">Your password must contain:</p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <Check ok={rules.len} /> At least 8 characters
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Check ok={rules.spec} /> At least one special character
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Check ok={rules.num} /> At least one number
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Check ok={rules.cap} /> At least one capital letter
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Check ok={rules.match} /> Passwords match
              </li>
            </ul>
          </div>

          {!hasSession && (
            <p className="text-sm text-rose-400 -mt-2">
              Auth session missing! Open the invite link again (from your email).
            </p>
          )}
          {error && <p className="text-sm text-rose-400 -mt-2">{error}</p>}

          <button
            type="submit"
            disabled={!allOk || submitting}
            className={`mc-btn mc-btn-primary w-full ${
              !allOk || submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Saving..." : "Save password"}
          </button>
        </form>
      </div>
    </div>
  );
}
