"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = false;

const supabase = createClient(
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
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setHasSession(true);
        setLoading(false);
        return;
      }
      const sub = supabase.auth.onAuthStateChange((_e, sess) => {
        if (sess) {
          setHasSession(true);
          setLoading(false);
        }
      });
      unsub = () => sub.data.subscription.unsubscribe();
      setTimeout(() => setLoading(false), 1500);
    })();
    return () => {
      try { unsub && unsub(); } catch {}
    };
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setErr(""); setOk("");
    const { error } = await supabase.auth.updateUser({ password });
    if (error) return setErr(error.message);
    setOk("Mot de passe mis à jour. Vous pouvez maintenant vous connecter.");
  };

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
        Préparation de votre compte…
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Session introuvable</h1>
          <p className="text-slate-400">
            Votre lien d’invitation / session n’est pas actif. Rouvrez l’invitation ou connectez-vous.
          </p>
          <div className="mt-6">
            <a href="/login" className="mc-btn mc-btn-primary">Se connecter</a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-4">Définir votre mot de passe</h1>
        <form onSubmit={submit} className="flex flex-col gap-4 max-w-sm">
          <input
            type="password"
            className="mc-input"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <button type="submit" className="mc-btn mc-btn-primary">Enregistrer</button>
        </form>
        {ok && <p className="mt-4 text-green-400">{ok}</p>}
        {err && <p className="mt-4 text-red-400">{err}</p>}
      </div>
    </div>
  );
}
