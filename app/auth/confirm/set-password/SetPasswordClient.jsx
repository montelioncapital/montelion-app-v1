"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseBrowser";

export const dynamic = "force-dynamic";
export const revalidate = false;

export default function SetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Petites règles de complexité
  const rules = useMemo(() => {
    const length = password.length >= 8;
    const special = /[^A-Za-z0-9]/.test(password);
    const number = /\d/.test(password);
    const upper = /[A-Z]/.test(password);
    const match = password.length > 0 && password === confirm;
    return { length, special, number, upper, match };
  }, [password, confirm]);

  const allValid =
    rules.length && rules.special && rules.number && rules.upper && rules.match;

  // Si la session n’existe pas (ex: lien expiré), renvoyer au login
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session) router.replace("/login");
    })();
  }, [router]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!allValid || submitting) return;

    setSubmitting(true);
    setError("");

    const { error: upErr } = await supabase.auth.updateUser({ password });
    if (upErr) {
      setError(upErr.message || "Unable to set your password. Please try again.");
      setSubmitting(false);
      return;
    }

    // Mot de passe enregistré: on envoie vers le login
    router.replace("/login");
  };

  return (
    <div className="min-h-screen w-full bg-[#0b1226] text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl bg-[#0f162e]/70 backdrop-blur-md shadow-xl border border-white/10 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Set your password
          </h1>
          <p className="mt-2 text-slate-400">
            Finish activating your Montelion account.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} className="space-y-5">
          {/* Password */}
          <div>
            <label className="block text-sm mb-2 text-slate-300">
              New password
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a strong password"
                className="w-full rounded-xl bg-[#121a38] border border-white/10 focus:border-blue-500/60 outline-none px-4 py-3"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPw((v) => !v)}
                className="absolute inset-y-0 right-3 my-auto text-slate-400 hover:text-slate-200"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {/* œil simple en SVG */}
                {showPw ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M2 12s3.5-6 10-6 10 6 10 6-1.4 2.4-3.9 4.2M8.5 8.5C7 9.2 5.8 10.5 5 12m7 5a5 5 0 01-5-5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm mb-2 text-slate-300">
              Confirm password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Retype your password"
                className="w-full rounded-xl bg-[#121a38] border border-white/10 focus:border-blue-500/60 outline-none px-4 py-3"
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute inset-y-0 right-3 my-auto text-slate-400 hover:text-slate-200"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Requirements */}
          <div className="rounded-xl bg-[#0b132b] border border-white/10 p-4">
            <p className="text-sm font-medium mb-3 text-slate-300">
              Your password must contain:
            </p>
            <ul className="space-y-2 text-sm">
              <Req ok={rules.length} text="At least 8 characters" />
              <Req ok={rules.special} text="At least one special character" />
              <Req ok={rules.number} text="At least one number" />
              <Req ok={rules.upper} text="At least one capital letter" />
              <Req ok={rules.match} text="Passwords match" />
            </ul>
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!allValid || submitting}
            className={`w-full rounded-xl px-4 py-3 font-medium transition
              ${allValid && !submitting
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-slate-600/30 text-slate-400 cursor-not-allowed"}`}
          >
            {submitting ? "Saving…" : "Save password"}
          </button>

          <p className="text-xs text-center text-slate-500">
            Invitation received via Supabase (invite).
          </p>
        </form>
      </div>
    </div>
  );
}

function Req({ ok, text }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full border
          ${ok ? "border-emerald-400 text-emerald-400" : "border-slate-500 text-slate-400"}`}
        aria-hidden="true"
      >
        {ok ? (
          /* check */
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 12.5l4 4 10-10"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          /* cross */
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </span>
      <span className={ok ? "text-slate-200" : "text-slate-400"}>{text}</span>
    </li>
  );
}
