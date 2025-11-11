// Landing page with two CTAs

export const metadata = {
  title: "Welcome • Montelion Capital",
};

export default function Landing() {
  return (
    <main className="shell">
      <section className="card max-w-3xl w-full">
        {/* Logo row */}
        <div className="flex items-center gap-3 mb-4">
          <div className="size-8 rounded-md bg-white/5 grid place-items-center border border-white/10">
            <span className="text-white/90 font-bold">M</span>
          </div>
          <span className="text-white/90 font-semibold tracking-wide">
            MONTELION CAPITAL
          </span>
        </div>

        <h1 className="mb-2">Welcome</h1>
        <p className="mb-8">
          Access your secure workspace. Use your email invite link, or sign in if your account is already active.
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <a href="/login" className="btn btn-primary">Sign in</a>
          <a href="#" className="btn btn-ghost">Learn more</a>
        </div>

        <p className="mt-8 text-xs text-white/55">
          Need help? Contact <a className="underline hover:text-white" href="mailto:support@montelion-capital.com">Montelion Capital Support</a>.
        </p>
      </section>
    </main>
  );
}
