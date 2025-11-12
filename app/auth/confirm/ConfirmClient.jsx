'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabaseBrowser';

export default function ConfirmClient() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    // 1) Récupère d’abord dans la query (?param=)
    const qp = new URLSearchParams(sp?.toString() || '');
    let access_token = qp.get('access_token');
    let refresh_token = qp.get('refresh_token');
    let type = qp.get('type');        // "invite", "recovery", ...
    let code = qp.get('code');        // flow PKCE/code

    // 2) Si rien, regarde dans le hash (#param=)
    if (!access_token && typeof window !== 'undefined') {
      const hash = window.location.hash?.replace(/^#/, '') || '';
      const hp = new URLSearchParams(hash);
      access_token = hp.get('access_token') || access_token;
      refresh_token = hp.get('refresh_token') || refresh_token;
      type = type || hp.get('type');
      code = code || hp.get('code');
    }

    const goLogin = () => router.replace('/login');
    const goSetPwd = () => router.replace('/auth/confirm/set-password'); // <<< Chemin correct

    // 3) Cas flow "code" (PKCE / magic link moderne)
    if (code && !access_token) {
      supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
        if (error) return goLogin();
        if (type === 'invite' || type === 'recovery') return goSetPwd();
        return goLogin();
      });
      return;
    }

    // 4) Cas flow "implicit" (tokens dans l’URL)
    if (access_token) {
      supabase.auth.setSession({ access_token, refresh_token }).finally(() => {
        if (type === 'invite' || type === 'recovery') return goSetPwd();
        return goLogin();
      });
      return;
    }

    // 5) Rien trouvé → login
    goLogin();
  }, [router, sp]);

  return null;
}
