export default function Page() {
  return (
    <div className="mc-card">
      <div className="mc-section">
        <div className="mb-10 flex items-center justify-between">
          <div className="h-9 w-9 grid place-items-center rounded-xl bg-[--brand]/25 text-white font-medium">M</div>
          <div className="mc-brand">MONTELION CAPITAL</div>
        </div>

        <h1 className="mc-title mb-4">Welcome</h1>
        <p className="max-w-2xl text-slate-400">
          Access your secure workspace. Use your email invite link, or sign in if your account is already active.
        </p>

        <div className="mt-8 flex gap-3">
          <a href="/login" className="mc-btn mc-btn-primary">Sign in</a>
          <button className="mc-btn mc-btn-ghost">Learn more</button>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Need help? Contact{" "}
          <a href="#" className="underline decoration-white/20 hover:text-slate-300">
            Montelion Capital Support
          </a>.
        </p>
      </div>
    </div>
  );
}
