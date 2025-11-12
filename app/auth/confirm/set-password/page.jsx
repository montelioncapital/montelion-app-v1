"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export const dynamic = "force-dynamic";
export const revalidate = false;

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function SetPasswordPage() {
  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    let unsub;
    (async () => {
      // 1) Check session immédiat
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setHasSession(true);
        setLoading(false);
        return;
      }
      // 2) Écoute un éventuel setSession (depuis /auth/confirm)
      const sub = supabase.auth.onAuthStateChange((_e, sess) => {
        if (sess) {
          setHasSession(true);
          setLoading(false);
        }
      });
      unsub = () => sub.data.subscription.unsubscribe();

      // 3) Fallback timeout
      setTimeout(() => setLoading(false), 1500);
    })();

    return () => {
      try { unsub && unsub(); } catch {}
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setOk("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setErr(error.message);
    setOk("Password updated. You can now sign in.");
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
        Preparing your account…
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Session not found</h1>
          <p className="text-slate-400">
            Your invite/session isn’t active yet. Please re-open your invite link or sign in.
          </p>
          <div className="mt-6">
            <a href="/login" className="mc-btn mc-btn-primary">Sign in</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-4">Set your password</h1>
        <form onSubmit={submit} className="flex flex-col gap-4 max-w-sm">
          <input
            type="password"
            className="mc-input"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button type="submit" className="mc-btn mc-btn-primary">Save password</button>
        </form>
        {ok && <p className="mt-4 text-green-400">{ok}</p>}
        {err && <p className="mt-4 text-red-400">{err}</p>}
      </div>
    </div>
  );
}
