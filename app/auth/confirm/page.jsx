"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseBrowser";

export default function ConfirmInvitePage() {
  const router = useRouter();
  const qp = useSearchParams();

  const token = qp.get("token") || qp.get("token_hash") || qp.get("code");
  const type  = (qp.get("type") || "invite").toLowerCase(); // invite | recovery | email_change
  const [status, setStatus] = useState("verifying"); // verifying | ready | error
  const [error, setError]   = useState("");
  const [pw, setPw]         = useState("");
  const [pw2, setPw2]       = useState("");

  // Un petit titre selon le type de lien
  const title = useMemo(() => {
    if (type === "recovery") return "Reset password";
    return "Set your password";
  }, [type]);

  // 1) Vérifier le lien (crée une session temporaire côté client)
  useEffect(() => {
    const run = async () => {
      try {
        if (!token) throw new Error("Missing token in URL");

        const { data, error } = await supabase.auth.verifyOtp({
          type: type === "recovery" ? "recovery" : "invite",
          token_hash: token,
        });

        if (error) throw error;

        setStatus("ready");
      } catch (e) {
        setError(e.message || "Invalid or expired link");
        setStatus("error");
      }
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Soumission du nouveau mot de passe
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!pw || pw.length < 8) return setError("Password must be at least 8 characters.");
    if (pw !== pw2) return setError("Passwords do not match.");

    setError("");

    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) {
      setError(error.message);
      return;
    }

    // Par sécurité, on ferme la session temporaire et on renvoie sur /login
    await supabase.auth.signOut();
    router.replace("/login?set=ok");
  };

  // UI
  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-6">{title}</h1>

        {status === "verifying" && (
          <p className="text-slate-400">Verifying your link…</p>
        )}

        {status === "error" && (
          <>
            <p className="text-red-400">{error}</p>
            <p className="mt-4 text-slate-400">
              If the link expired, ask for a new invite or password reset.
            </p>
          </>
        )}

        {status === "ready" && (
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm text-slate-300">New password</label>
              <input
                type="password"
                className="mc-input mt-2"
                placeholder="••••••••"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                autoFocus
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300">Confirm password</label>
              <input
                type="password"
                className="mc-input mt-2"
                placeholder="••••••••"
                value={pw2}
                onChange={(e) => setPw2(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400">{error}</p>}

            <button type="submit" className="mc-btn mc-btn-primary w-full mt-3">
              Save password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
