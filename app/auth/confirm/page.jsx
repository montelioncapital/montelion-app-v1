"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseBrowser";

// Empêche tout prérendu/ISR sur cette page
export const dynamic = "force-dynamic";
export const revalidate = 0; // <= un NOMBRE, pas un objet

export default function ConfirmPage() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    const access_token = sp.get("access_token");
    const refresh_token = sp.get("refresh_token") || null;
    const type = sp.get("type");
    const code = sp.get("code");

    // Cas 1 : tokens dans le hash/URL -> on installe la session et on route
    if (access_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .finally(() => {
          if (type === "invite" || type === "recovery") {
            router.replace("/auth/set-password");
          } else {
            router.replace("/login");
          }
        });
      return;
    }

    // Cas 2 : lien d’invite/récupération avec ?type=...&code=...
    if (type === "invite" || type === "recovery" || code) {
      router.replace(`/auth/set-password?${sp.toString()}`);
      return;
    }

    // Par défaut
    router.replace("/login");
  }, [router, sp]);

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-4">Just a moment…</h1>
        <p className="text-slate-400">We’re finalizing your invitation.</p>
      </div>
    </div>
  );
}
