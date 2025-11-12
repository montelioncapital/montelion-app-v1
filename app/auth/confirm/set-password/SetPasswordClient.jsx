// app/auth/confirm/set-password/SetPasswordClient.jsx
"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

/**
 * Formulaire de création de mot de passe après invitation Supabase
 * Utilise seulement le client public (NEXT_PUBLIC_*).
 */
export default function SetPasswordClient() {
  const router = useRouter();
  const sp = useSearchParams();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const supabase = useMemo(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    return createClient(url, key);
  }, []);

  const access_token = sp.get("access_token") || "";
  const refresh_token = sp.get("refresh_token") || "";
  const type = (sp.get("type") || "").toLowerCase();

  // si pas de token, on renvoie vers /login
  if (!access_token) {
    if (typeof window !== "undefined") router.replace("/login");
    return <div className="p-6">Redirection…</div>;
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      // 1) se lier au token reçu (invite -> session temporaire)
      const { data: sess, error: sessErr } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });
      if (sessErr) throw sessErr;

      // 2) update password
      const { error: updErr } = await supabase.auth.updateUser({ password });
      if (updErr) throw updErr;

      // 3) go login
      router.replace("/login");
    } catch (e) {
      setErr(e?.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mc-card">
      <div className="mc-section">
        <h1 className="mc-title mb-3">Définir votre mot de passe</h1>
        <p className="text-slate-400 mb-6">
          Finalisez l’activation de votre compte Montelion.
        </p>

        <form onSubmit={onSubmit} className="flex flex-col gap-3 max-w-sm">
          <input
            type="password"
            className="mc-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nouveau mot de passe"
            minLength={8}
            required
          />
          {err && <div className="text-red-400 text-sm">{err}</div>}
          <button disabled={loading} className="mc-btn mc-btn-primary">
            {loading ? "Enregistrement…" : "Enregistrer"}
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Reçu par : invitation Supabase ({type || "invite"}).
        </p>
      </div>
    </div>
  );
}
