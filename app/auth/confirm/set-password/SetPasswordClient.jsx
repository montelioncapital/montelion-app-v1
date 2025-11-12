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

  // Règles de complexité
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

  // Si pas de session, renvoyer au /login
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
    router.replace("/login");
  };

  return (
    <div className="min-h-[100svh] md:min-h-dvh bg-transparent flex items-center justify-center px-4">
      <div className="mc-card max-w-xl w-full">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Set your password</h1>
          <p className="text-slate-400 mb-8">
            Finish activating your Montelion account.
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Password */}
            <div>
              <label className="mc-label">New password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a strong password"
                  className="mc-input pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="mc-eye-btn"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  <Eye open={showPw} />
                </button>
              </div>
            </div>

            {/* Confirm */}
            <div>
              <label className="mc-label">Confirm password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Retype your password"
                  className="mc-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="mc-eye-btn"
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  <Eye open={showConfirm} />
                </button>
              </div>
            </div>

            {/* Checklist */}
            <div className="mc-box">
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

            {error && (
              <p className="mc-error">{error}</p>
            )}

            <button
              type="submit"
              disabled={!allValid || submitting}
              className={`mc-btn mc-btn-primary w-full ${
                (!allValid || submitting) ? "mc-btn-disabled" : ""
              }`}
            >
              {submitting ? "Saving…" : "Save password"}
            </button>

            <p className="text-xs text-center text-slate-500">
              Invitation received via Supabase (invite).
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Req({ ok, text }) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`mc-badge ${ok ? "mc-badge-ok" : "mc-badge-warn"}`}
        aria-hidden="true"
      >
        {ok ? (
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
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </span>
      <span className={ok ? "text-slate-200" : "text-slate-400"}>{text}</span>
    </li>
  );
}

function Eye({ open }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-1.4 2.4-3.9 4.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
