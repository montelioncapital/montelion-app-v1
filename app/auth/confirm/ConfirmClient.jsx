// app/auth/confirm/ConfirmClient.jsx
"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Rôle: parse le hash OU la query (selon le lien d'invite Supabase),
 * et redirige vers /auth/confirm/set-password avec les bons tokens en query.
 */
export default function ConfirmClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1) Récupère à la fois le hash (#...) et la query (?...)
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    const fromHash = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : "");

    // Préférence: si Supabase a mis les tokens dans le hash, on prend le hash; sinon on prend la query
    const src = fromHash.get("access_token") ? fromHash : searchParams;

    const access_token = src.get("access_token") || "";
    const refresh_token = src.get("refresh_token") || "";
    const type = (src.get("type") || "").toLowerCase();
    const expires_at = src.get("expires_at") || "";
    const expires_in = src.get("expires_in") || "";

    if (access_token && (type === "invite" || type === "signup" || type === "recovery")) {
      // 2) Redirige vers set-password avec les infos nécessaires en query
      const q = new URLSearchParams({
        access_token,
        refresh_token,
        type,
        expires_at,
        expires_in,
      }).toString();

      router.replace(`/auth/confirm/set-password?${q}`);
    } else {
      // Cas non attendu -> renvoie vers login
      router.replace("/login");
    }
  }, [router, searchParams]);

  return (
    <div className="p-6">
      <p>Validation de votre invitation…</p>
    </div>
  );
}
