export default function Page() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 grid place-items-center">
      <div className="w-full max-w-md rounded-2xl bg-neutral-900/60 p-8 shadow-lg ring-1 ring-white/10">
        <h1 className="text-2xl font-semibold">Montelion Capital</h1>
        <p className="mt-2 text-sm text-neutral-400">Connecte-toi pour continuer</p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="text-sm text-neutral-300">Email</label>
            <input className="mt-1 w-full rounded-lg bg-neutral-800/80 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-[var(--accent)]" placeholder="you@example.com" />
          </div>
          <div>
            <label className="text-sm text-neutral-300">Mot de passe</label>
            <input type="password" className="mt-1 w-full rounded-lg bg-neutral-800/80 px-3 py-2 outline-none ring-1 ring-white/10 focus:ring-[var(--accent)]" />
          </div>
          <button className="btn-primary w-full">Se connecter</button>
        </form>

        <p className="mt-6 text-xs text-neutral-500">Mode sombre uniquement • Accent bleu</p>
      </div>
    </main>
  );
}
