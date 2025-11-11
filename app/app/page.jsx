"use client";
import { useState, useTransition } from "react";

function Brand() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-11 w-11 rounded-2xl grid place-items-center
                      bg-primary-500/15 ring-1 ring-primary-500/30">
        <span className="text-primary-400 text-xl font-semibold">M</span>
      </div>
      <div>
        <h1 className="text-2xl font-semibold leading-tight">Montelion Capital</h1>
        <p className="text-subtle text-sm">Connecte-toi pour continuer</p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        const r = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        if (!r.ok) {
          const j = await r.json().catch(() => ({}));
          throw new Error(j?.error || "Échec de connexion");
        }
        location.href = "/dashboard";
      } catch (err) {
        setError(err.message);
      }
    });
  };

  return (
    <main className="min-h-screen relative grid place-items-center overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[520px] w-[520px]
                        rounded-full blur-3xl opacity-25
                        bg-gradient-to-br from-primary-500/60 via-primary-400/30 to-transparent" />
      </div>

      <div className="w-[92%] max-w-md card p-8">
        <Brand />

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm text-subtle mb-1">Email</label>
            <div className="relative">
              <input
                className="input pr-10"
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle/70">✉️</span>
            </div>
          </div>

          <div>
            <label className="block text-sm text-subtle mb-1">Mot de passe</label>
            <div className="relative">
              <input
                className="input pr-10"
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle/70">🔒</span>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl2 px-3 py-2">
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary w-full justify-center" disabled={pending}>
            {pending ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-subtle">Mode sombre • Accent bleu • v1</p>
        </div>
      </div>
    </main>
  );
}
