"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const dynamic = "force-dynamic";
export const revalidate = false;

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setOk("");
    setErr("");
    setSending(true);

    try {
      // Redirige l’utilisateur du lien d’email vers TA page /auth/confirm/set-password
      const redirectTo = `${window.location.origin}/auth/confirm/set-password`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      // Sécurité anti-énumération : on répond “si un compte existe, un email a été envoyé”
      if (error) {
        // Si vraiment tu veux remonter l’erreur, dé-commente :
        // setErr(error.message || "Unable to send reset email.");
      }

      setOk(
        "If an account exists for this email, you’ll receive a reset link shortly."
      );
    } catch (e) {
      setErr("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-2">Forgot password</h1>
        <p className="text-slate-400 mb-8">
          Enter your email address and we’ll send you a link to set a new password.
        </p>

        {ok && <p className="mb-4 text-sm text-emerald-400">{ok}</p>}
        {err && <p className="mb-4 text-sm text-rose-400">{err}</p>}

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="mc-input mt-2"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              inputMode="email"
            />
          </label>

          <button
            type="submit"
            className="mc-btn mc-btn-primary w-full disabled:opacity-60"
            disabled={sending || !email}
          >
            {sending ? "Sending…" : "Send reset link"}
          </button>
        </form>

        <p className="mt-8 text-left text-sm text-slate-500">
          Remembered it? <a href="/login">Go back to sign in</a>.
        </p>
      </div>
    </div>
  );
}
