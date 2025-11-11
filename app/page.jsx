// app/page.jsx
export const metadata = {
  title: "Sign in — Montelion Capital",
  description: "Secure login to Montelion Capital",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-app grid place-items-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="card">
          <div className="mx-auto h-11 w-11 rounded-xl bg-[rgb(var(--accent))]/20 ring-1 ring-white/10 grid place-items-center">
            <span className="text-white/90 font-semibold">M</span>
          </div>

          <h1 className="mt-4 text-center text-2xl font-semibold text-white">
            Montelion Capital
          </h1>
          <p className="mt-1 text-center text-sm text-white/60">
            Sign in to continue
          </p>

          <form className="mt-6 space-y-4">
            <div>
              <label htmlFor="email" className="lbl">Email</label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="inp"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="lbl">Password</label>
                <a href="#" className="link">Forgot password?</a>
              </div>
              <input
                id="password"
                type="password"
                className="inp"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Sign in
            </button>
          </form>

          {/* Help line */}
          <p className="mt-4 text-center text-xs text-white/60">
            Need help?{" "}
            <a href="mailto:support@montelion-capital.com" className="link">
              Contact us by email
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
