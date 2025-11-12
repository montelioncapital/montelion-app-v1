export const metadata = { title: "Welcome • Montelion Capital" };

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <section className="card max-w-hero w-full">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/20 border border-accent/30 text-white font-semibold">
              M
            </div>
          </div>
          <div className="tracking-widest text-xs text-white/60">
            MONTELION CAPITAL
          </div>
        </div>

        <h1 className="text-4xl font-semibold">Welcome</h1>
        <p className="mt-3 max-w-[60ch] text-white/70">
          Access your secure workspace. Use your email invite link, or sign in if your account is already active.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <a href="/login" className="btn-primary !w-auto px-6">Sign in</a>
          <a href="#" className="input !w-auto px-6 py-3 bg-white/0 hover:bg-white/5 transition">Learn more</a>
        </div>

        <p className="mt-8 hint">
          Need help? Contact <a className="link" href="#">Montelion Capital Support</a>.
        </p>
      </section>
    </main>
  );
}
