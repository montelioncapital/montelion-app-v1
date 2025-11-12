"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export const metadata = { title: "Sign in • Montelion Capital" };

export default function LoginPage() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="mc-card">
      <div className="mc-section">
        {/* Ligne d’en-tête : bouton retour + titre */}
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            aria-label="Go back"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition"
            title="Back"
          >
            {/* petite flèche ← */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <h1 className="mc-title">Sign in</h1>
        </div>

        <form className="space-y-4">
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="mc-input mt-2"
            />
          </label>

          <div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <label>Password</label>
              <a href="#" className="text-slate-400 hover:text-slate-300">
                Forgot password?
              </a>
            </div>

            {/* Champ password avec œil */}
            <div className="relative mt-2">
              <input
                type={showPwd ? "text" : "password"}
                placeholder="••••••••"
                className="mc-input pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPwd(v => !v)}
                aria-label={showPwd ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-slate-400 hover:text-slate-300"
              >
                {/* œil/œil barré */}
                {showPwd ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M17.94 17.94C16.16 19.21 14.17 20 12 20 6 20 2 12 2 12a21.7 21.7 0 0 1 4.06-5.94" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.9 9.9a3 3 0 1 0 4.2 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="mc-btn mc-btn-primary w-full mt-3">
            Sign in
          </button>
        </form>

        <p className="mt-8 text-left text-sm text-slate-500">
          Need help? Contact <a href="#">Montelion Capital Support</a>.
        </p>
      </div>
    </div>
  );
}
