"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

export const dynamic = "force-dynamic";
export const revalidate = false;

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

function parseHashOrQuery() {
  // Accepte access_token/refresh_token depuis le hash (#) ou la query (?)
  const params = new URLSearchParams(
    window.location.hash?.startsWith("#")
      ? window.location.hash.substring(1)
      : window.location.search.startsWith("?")
      ? window.location.search.substring(1)
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
  const sp = useSearchParams(); // garde pour déclencher un re-render si query change

  useEffect(() => {
    (async () => {
      const { access_token, refresh_token, type } = parseHashOrQuery();

      if (!access_token) {
        // Rien à faire → on renvoie vers /login
        router.replace("/login");
        return;
      }

      // 1) Pose la session côté client
      const { error } = await supabase.auth.setSession({
        access_token,
        refresh_token: refresh_token || undefined,
      });

      if (error) {
        console.error("setSession error:", error);
        router.replace("/login");
        return;
      }

      // 2) Vérifie que la session est bien active côté client
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        // session pas encore visible, on attend un petit coup via l’event
        const { data: sub } = supabase.auth.onAuthStateChange((_ev, sess) => {
          if (sess) {
            sub.subscription.unsubscribe();
            // 3) OK → go set-password si invite/recovery sinon /login
            if (type === "invite" || type === "recovery") {
              router.replace("/auth/confirm/set-password");
            } else {
              router.replace("/login");
            }
          }
        });
        // On met aussi un timeout au cas où
        setTimeout(() => {
          try { sub.subscription.unsubscribe(); } catch {}
          router.replace(type === "invite" || type === "recovery" ? "/auth/confirm/set-password" : "/login");
        }, 1500);
        return;
      }

      // 3) Session déjà là → redirige
      if (type === "invite" || type === "recovery") {
        router.replace("/auth/confirm/set-password");
      } else {
        router.replace("/login");
      }
    })();
  }, [router, sp]);

  return (
    <div className="flex min-h-[50vh] items-center justify-center text-slate-400">
      Checking your invite…
    </div>
  );
}
