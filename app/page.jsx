export default function Page() {
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-2xl bg-[rgb(var(--accent))]/20 ring-1 ring-[rgb(var(--accent))]/30 grid place-items-center">
            <span className="text-[rgb(var(--accent))] font-bold">M</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Montelion Capital</h1>
          <p className="text-sm text-zinc-400">Connecte-toi pour continuer</p>
        </div>

        <div className="card p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm text-zinc-300" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="you@example.com" className="input" />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-zinc-300" htmlFor="password">Mot de passe</label>
            <input id="password" type="password" placeholder="••••••••" className="input" />
          </div>
          <button className="btn-primary w-full">Se connecter</button>

          <p className="text-xs text-zinc-500 text-center">
            Mode sombre uniquement • Accent bleu • v1
          </p>
        </div>
      </div>

      {/* Glow décoratif */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full
                        bg-[rgb(var(--accent))]/10 blur-3xl" />
      </div>
    </main>
  );
}
