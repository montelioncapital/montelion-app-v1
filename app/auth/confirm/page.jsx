"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseBrowser"; // ton client browser

// Empêche tout prérendu/ISR sur cette page
export const dynamic = "force-dynamic";
export const revalidate = 0; // (un nombre, pas un objet)

export default function ConfirmPage() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    const access_token = sp.get("access_token");
    const refresh_token = sp.get("refresh_token") || null;
    const type = sp.get("type"); // invite | signup | recovery | magiclink…
    const code = sp.get("code");

    // 1) Si Supabase a mis des tokens dans l’URL-hash (#access_token=…)
    if (access_token) {
      // Pose la session locale puis va sur set-password si invite/recovery sinon login
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

    // 2) Sinon, pour les liens `type=invite|recovery` (par ex. si Supabase redirige avec ?type=invite&code=…)
    if (type === "invite" || type === "recovery" || code) {
      router.replace(`/auth/set-password?${sp.toString()}`);
      return;
    }

    // 3) Par défaut, on renvoie au login
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
