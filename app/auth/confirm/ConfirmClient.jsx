"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseBrowser"; // garde ton alias

export default function ConfirmClient() {
  const params = useSearchParams();
  const router = useRouter();
  const [msg, setMsg] = useState("Verifying…");

  useEffect(() => {
    const token_hash = params.get("token_hash");
    const type = params.get("type") || "signup"; // ou "recovery" selon tes liens

    if (!token_hash) {
      setMsg("Missing token.");
      return;
    }

    supabase.auth
      .verifyOtp({ type, token_hash })
      .then(({ error }) => {
        if (error) {
          setMsg("Link invalid or expired.");
          return;
        }
        setMsg("Email verified. Redirecting…");
        // si tu veux flux "set password" après invitation :
        router.replace("/auth/set-password");
        // sinon vers la connexion :
        // router.replace("/login");
      });
  }, [params, router]);

  return (
    <div className="mc-card">
      <div className="mc-section">
        <h1 className="mc-title mb-2">Confirm</h1>
        <p className="text-slate-400">{msg}</p>
      </div>
    </div>
  );
}
