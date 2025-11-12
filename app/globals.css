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

  // Règles de validation
  const rules = useMemo(() => {
    const len = pwd.length >= 8;
    const spec = /[^A-Za-z0-9]/.test(pwd);
    const num = /[0-9]/.test(pwd);
    const cap = /[A-Z]/.test(pwd);
    const match = pwd.length > 0 && pwd === pwd2;
    return { len, spec, num, cap, match };
  }, [pwd, pwd2]);

  const allOk = rules.len && rules.spec && rules.num && rules.cap && rules.match;

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!allOk || submitting) return;
    setSubmitting(true);
    setError("");

    const { error: updateErr } = await supabase.auth.updateUser({ password: pwd });
    if (updateErr) {
      setError(updateErr.message || "Something went wrong, please try again.");
      setSubmitting(false);
      return;
    }

    window.location.replace("/login");
  };

  const Check = ({ ok }) => (
    <span className={ok ? "text-emerald-400" : "text-slate-400"}>
      {ok ? "✓" : "×"}
    </span>
  );

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
                className="mc-input pr-12"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                aria-label={show1 ? "Hide password" : "Show password"}
                onClick={() => setShow1((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100 transition-colors focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-70"
                >
                  <path
                    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
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

          {/* Confirm password */}
          <div>
            <label className="block mb-2 text-slate-300">Confirm password</label>
            <div className="relative">
              <input
                type={show2 ? "text" : "password"}
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
                placeholder="Retype your password"
                className="mc-input pr-12"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                aria-label={show2 ? "Hide password" : "Show password"}
                onClick={() => setShow2((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-100 transition-colors focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="opacity-70"
                >
                  <path
                    d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z"
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
