"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = false;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function parseHashOrQuery() {
  const params = new URLSearchParams(
    window.location.hash?.startsWith("#")
      ? window.location.hash.slice(1)
      : window.location.search?.startsWith("?")
      ? window.location.search.slice(1)
      : ""
  );
  return {
    access_token: params.get("access_token"),
    refresh_token: params.get("refresh_token"),
    type: params.get("type"),
  };
}

export default function ConfirmPage() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    (async () => {
      const { access_token, refresh_token, type } = parseHashOrQuery();

      if (!access_token) {
        router.replace("/login");
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token: refresh_token || undefined,
      });
      if (error) {
        console.error("setSession error:", error);
        router.replace("/login");
        return;
      }

      const { data } = await supabase.auth.getSession();
      const go = () =>
        router.replace(
          type === "invite" || type === "recovery"
            ? "/auth/confirm/set-password"
            : "/login"
        );

      if (!data.session) {
        const sub = supabase.auth.onAuthStateChange((_ev, sess) => {
          if (sess) {
            try { sub.data.subscription.unsubscribe(); } catch {}
            go();
          }
        });
        setTimeout(() => {
          try { sub.data.subscription.unsubscribe(); } catch {}
          go();
        }, 1500);
        return;
      }

      go();
    })();
  }, [router, sp]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
      Vérification de votre invitation…
    </div>
  );
}
