export const metadata = { title: "Sign in • Montelion Capital" };

export default function LoginPage() {
  return (
    <main className="screen">
      <section className="card card-pad">
        {/* top line */}
        <div className="flex items-center justify-between text-xs tracking-[0.2em] text-white/60">
          <span className="invisible">.</span>
          <span>MONTELION CAPITAL</span>
        </div>

        {/* header */}
        <div className="mt-6 text-center stack-sm">
          <div className="inline-block">
            <span className="badge">M</span>
          </div>
          <h1 className="title-xl">Montelion Capital</h1>
          <p className="subtitle">Sign in to continue</p>
        </div>

        {/* form */}
        <form className="mt-8">
          <div className="stack-md">
            <div className="stack-sm">
              <label className="text-sm text-white/70">Email</label>
              <input type="email" placeholder="you@example.com" className="input" />
            </div>

            <div className="stack-sm">
              <div className="flex items-center justify-between">
                <label className="text-sm text-white/70">Password</label>
                <a className="text-sm text-white/60 hover:text-white/80" href="#">
                  Forgot password?
                </a>
              </div>
              <input type="password" className="input" />
            </div>

            {/* spacing so it's not glued to inputs */}
            <button type="submit" className="btn btn-primary w-full mt-6">
              Sign in
            </button>
          </div>
        </form>

        {/* help — with proper spacing */}
        <p className="mt-6 text-center text-sm text-white/60">
          Need help? Contact{" "}
          <a className="underline hover:no-underline" href="#">
            Montelion Capital Support
          </a>.
        </p>
      </section>
    </main>
  );
}
