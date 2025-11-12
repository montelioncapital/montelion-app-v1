export const metadata = { title: "Sign in • Montelion Capital" };

export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <section className="card max-w-card w-full">
        {/* Brand */}
        <div className="text-center">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-2xl bg-accent/20 border border-accent/30 font-bold">
            M
          </div>
          <h1 className="mt-3 text-2xl font-semibold">Montelion Capital</h1>
          <p className="text-sm text-white/70">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-5" action="#" method="post">
          <div>
            <label htmlFor="email" className="text-sm text-white/70">Email</label>
            <input id="email" type="email" placeholder="you@example.com" className="input mt-2" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm text-white/70">Password</label>
              <a href="#" className="link text-xs">Forgot password?</a>
            </div>
            <input id="password" type="password" placeholder="••••••••" className="input mt-2" />
          </div>

          <button type="submit" className="btn-primary">Sign in</button>
        </form>

        <p className="mt-6 text-center hint">
          Need help? Contact <a className="link" href="#">Montelion Capital Support</a>.
        </p>
      </section>
    </main>
  );
}
