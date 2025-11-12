"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [showPwd, setShowPwd] = useState(false);

  return (
    <>
      {/* Bouton retour */}
      <button
        type="button"
        onClick={() => router.back()}
        className="mb-4 inline-flex items-center gap-2 text-slate-400 hover:text-slate-300"
        aria-label="Back"
      >
        <span className="text-lg leading-none">‹</span>
        <span className="text-sm">Back</span>
      </button>

      {/* Titre */}
      <div className="mb-8 text-left">
        <h1 className="mc-title">Sign in</h1>
      </div>

      {/* Formulaire */}
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

          {/* Champ mot de passe avec œil */}
          <div className="relative mt-2">
            <input
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              className="mc-input pr-11"
            />
            <button
              type="button"
              onClick={() => setShowPwd(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3.2"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Bouton principal */}
        <button type="submit" className="mc-btn mc-btn-primary w-full mt-3">
          Sign in
        </button>
      </form>

      {/* Lien support */}
      <p className="mt-8 text-left text-sm text-slate-500">
        Need help? Contact <a href="#">Montelion Capital Support</a>.
      </p>
    </>
  );
}
