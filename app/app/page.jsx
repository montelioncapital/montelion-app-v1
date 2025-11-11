"use client";
import { useState, useTransition } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    startTransition(async () => {
      try {
        const res = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || "Login failed");
        }
        window.location.href = "/dashboard";
      } catch (err) {
        setError(err.message);
      }
    });
  };

  return (
    <main className="min-h-screen grid place-items-center bg-gradient-to-b from-black to-bg">
      <div className="w-[92%] max-w-md card p-8">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-11 w-11 rounded-2xl grid place-items-center bg-primary-500/15 ring-1 ring-primary-500/30">
            <span className="text-primary-400 text-2xl font-semibold">M</span>
          </div>
          <h1 className="text-2xl font-semibold">Montelion Capital</h1>
          <p className="text-subtle text-sm mt-1">Connecte-toi pour continuer</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-subtle mb-1">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl2 bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm text-subtle mb-1">Mot de passe</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl2 bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/30 rounded-xl2 px-3 py-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="btn-primary w-full justify-center"
          >
            {pending ? "Connexion…" : "Se connecter"}
          </button>
        </form>

        <p className="text-xs text-subtle mt-6 text-center">
          Mode sombre uniquement • Accent bleu
        </p>
      </div>
    </main>
  );
}
