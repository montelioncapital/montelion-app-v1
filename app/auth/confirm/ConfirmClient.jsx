"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseBrowser";

export default function ConfirmClient() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    const access_token  = sp.get("access_token");
    const refresh_token = sp.get("refresh_token");
    const type          = sp.get("type");
    const code          = sp.get("code");

    const go = (p) => router.replace(p);

    if (access_token) {
      supabase.auth.setSession({ access_token, refresh_token })
        .finally(() => {
          if (type === "invite" || type === "recovery") go("/auth/set-password");
          else go("/login");
        });
      return;
    }

    if (code) {
      supabase.auth.exchangeCodeForSession(code)
        .finally(() => go("/auth/set-password"));
      return;
    }

    go("/login");
  }, [sp, router]);

  return null;
}
