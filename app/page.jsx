export const metadata = {
  title: "Welcome • Montelion Capital",
};

export default function Home() {
  return (
    <div className="panel panel--welcome">
      {/* header line */}
      <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.22em] text-[rgba(255,255,255,0.55)] mb-6">
        <span className="opacity-0">.</span>
        <span>Montelion Capital</span>
      </div>

      {/* badge */}
      <div className="flex justify-start mb-6">
        <div className="brand-badge">M</div>
      </div>

      {/* main copy */}
      <h1 className="h1 mb-4">Welcome</h1>
      <p className="muted max-w-2xl">
        Access your secure workspace. Use your email invite link, or sign in if your account is already active.
      </p>

      {/* actions */}
      <div className="mt-8 flex flex-wrap gap-3">
        <a className="btn btn-primary" href="/login">Sign in</a>
        <a className="btn btn-ghost" href="#learn">Learn more</a>
      </div>

      {/* support */}
      <p className="muted mt-10 text-sm">
        Need help? Contact <a className="underline decoration-[rgba(255,255,255,0.2)] hover:decoration-[rgba(255,255,255,0.5)]" href="mailto:support@montelion-capital.com">Montelion Capital Support</a>.
      </p>
    </div>
  );
}
