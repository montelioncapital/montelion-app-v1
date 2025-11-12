// app/auth/set-password/page.jsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // pas de session → lien non valide ou expiré
        window.location.replace("/login");
      }
    })();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    if (password.length < 8) {
      setErr("Use at least 8 characters.");
      return;
    }
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErr(error.message);
      return;
    }
    setOk(true);
    setTimeout(() => window.location.replace("/login"), 900);
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-6">Set your password</h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block text-sm text-slate-300">
            New password
            <input
              type="password"
              className="mc-input mt-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoFocus
            />
          </label>

          <button type="submit" className="mc-btn mc-btn-primary w-full mt-3">
            Save password
          </button>
        </form>

        {err && <p className="mt-4 text-sm text-red-400">{err}</p>}
        {ok && (
          <p className="mt-4 text-sm text-emerald-400">
            Password updated. Redirecting…
          </p>
        )}

        <p className="mt-8 text-left text-sm text-slate-500">
          Need help? Contact <a href="#">Montelion Capital Support</a>.
        </p>
      </div>
    </div>
  );
}
