// app/auth/confirm/page.jsx
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic"; // évite le prerender error
export const revalidate = 0;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function getHashParams() {
  if (typeof window === "undefined") return {};
  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash;
  const params = new URLSearchParams(hash);
  return Object.fromEntries(params.entries());
}

export default function AuthConfirmPage() {
  const [msg, setMsg] = useState("Checking your invitation…");

  useEffect(() => {
    async function run() {
      try {
        // 1) Cas “code” (email OTP / PKCE)
        const url = new URL(window.location.href);
        const code = url.searchParams.get("code");
        if (code) {
          setMsg("Finalizing authentication…");
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
          window.location.replace("/auth/set-password");
          return;
        }

        // 2) Cas “hash” (invite/recovery/magic link)
        const { access_token, refresh_token, type } = getHashParams();

        if (access_token && refresh_token) {
          // crée la session à partir des tokens
          const { error } = await supabase.auth.setSession({
            access_token,
            refresh_token,
          });
          if (error) throw error;

          // pour invite/recovery on demande à l’utilisateur de définir son mot de passe
          if (type === "invite" || type === "recovery") {
            window.location.replace("/auth/set-password");
            return;
          }

          // sinon envoie sur l’accueil / login
          window.location.replace("/login");
          return;
        }

        // 3) Rien à traiter → renvoyer vers login
        setMsg("Link invalid or expired. Redirecting…");
        setTimeout(() => window.location.replace("/login"), 800);
      } catch (e) {
        console.error(e);
        setMsg("Error while confirming your session. Redirecting…");
        setTimeout(() => window.location.replace("/login"), 1200);
      }
    }
    run();
  }, []);

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-3">Please wait…</h1>
        <p className="text-slate-400">{msg}</p>
      </div>
    </div>
  );
}
