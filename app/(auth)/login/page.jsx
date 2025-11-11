// app/(auth)/login/page.jsx
import Link from "next/link";

export const metadata = { title: "Connexion — Montelion Capital" };

export default function LoginPage() {
  return (
    <main className="min-h-dvh grid place-items-center px-4">
      <div className="w-full max-w-md card-glass p-6 sm:p-8">
        {/* Branding */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-10 w-10 rounded-xl bg-[rgb(var(--accent))] grid place-items-center text-white font-semibold">
            M
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Montelion Capital</h1>
          <p className="text-sm text-white/60">Connecte-toi pour continuer</p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-white/80">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5
                         outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/40"
            />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="block text-sm text-white/80">Mot de passe</label>
              <Link href="#" className="text-xs text-[rgb(var(--accent))]/90 hover:underline">
                Mot de passe oublié ?
              </Link>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2.5
                         outline-none focus:ring-2 focus:ring-[rgb(var(--accent))]/40"
            />
          </div>

          <button type="submit" className="btn-primary w-full">Se connecter</button>

          <p className="text-center text-xs text-white/50">
            En continuant, tu acceptes nos{" "}
            <Link href="#" className="text-[rgb(var(--accent))]/90 hover:underline">
              CGU
            </Link>
            .
          </p>
        </form>
      </div>

      {/* Petit badge version */}
      <p className="mt-6 text-xs text-white/40">v1 • Mode sombre • Accent bleu</p>
    </main>
  );
}
