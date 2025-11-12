"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/confirm/set-password`,
      });
      // On redirige toujours vers la page de confirmation
      router.push(
        `/auth/forgot-password/check-email?email=${encodeURIComponent(email)}`
      );
    } catch (e) {
      // Même UX: on affiche la page de confirmation
      router.push(
        `/auth/forgot-password/check-email?email=${encodeURIComponent(email)}`
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-2">Forgot password</h1>
        <p className="text-slate-400 mb-8">
          Enter your email address and we’ll send you a link to set a new password.
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="mc-input mt-2"
              autoComplete="email"
              required
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {err && <p className="text-sm text-rose-400">{err}</p>}

          <button
            type="submit"
            disabled={!email || loading}
            className={`mc-btn mc-btn-primary w-full ${
              !email || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Remembered it?{" "}
          <a href="/login" className="underline">
            Go back to sign in.
          </a>
        </p>
      </div>
    </div>
  );
}
