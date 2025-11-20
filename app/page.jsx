'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import icon from '../icone-montelion.svg';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const { location } = window;

    // 1) Supabase envoie classiquement /#access_token=...
    const hasAuthInHash =
      location.hash &&
      (location.hash.includes('access_token=') ||
        location.hash.includes('type=') ||
        location.hash.includes('refresh_token=') ||
        location.hash.includes('code='));

    if (hasAuthInHash) {
      router.replace(`/auth/confirm${location.hash}`);
      return;
    }

    // 2) Parfois certains flows mettent les params en ?access_token=...
    const hasAuthInQuery =
      location.search &&
      (location.search.includes('access_token=') ||
        location.search.includes('type=') ||
        location.search.includes('refresh_token=') ||
        location.search.includes('code='));

    if (hasAuthInQuery) {
      // On convertit la query en hash pour que /auth/confirm la lise de façon uniforme
      const hash = `#${location.search.slice(1)}`;
      router.replace(`/auth/confirm${hash}`);
    }
  }, [router]);

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        {/* Icône dans un carré arrondi */}
        <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-xl bg-[#1b1f2a]">
          <Image
            src={icon}
            alt="Montelion Icon"
            width={28}
            height={28}
            className="opacity-90"
            priority
          />
        </div>

        <h1 className="mc-title mb-4">Welcome</h1>
        <p className="max-w-2xl text-slate-400">
          Access your secure workspace. Use your email invite link, or sign in if your account is already active.
        </p>

        <div className="mt-8 flex gap-3">
          <a href="/login" className="mc-btn mc-btn-primary">Sign in</a>
          <button className="mc-btn mc-btn-ghost">Learn more</button>
        </div>

        {/* Le lien hérite la couleur du paragraphe (text-slate-500) et ne change pas au survol */}
        <p className="mt-10 text-sm text-slate-500">
          Need help? Contact{' '}
          <a href="#" className="mc-link-muted">Montelion Capital Support</a>.
        </p>
      </div>
    </div>
  );
}
