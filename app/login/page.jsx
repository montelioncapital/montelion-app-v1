// app/login/page.jsx
export const metadata = {
  title: "Sign in • Montelion Capital",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen grid place-items-center px-4 py-10">
      <div className="card w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-2xl bg-[rgb(var(--accent))/18] text-white font-bold">
            M
          </div>
          <h1 className="text-2xl font-semibold">Montelion Capital</h1>
          <p className="text-sm text-white/70">Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-4" action="#" method="post">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className="input" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-sm">Password</label>
              <a href="#" className="text-xs link">Forgot password?</a>
            </div>
            <input id="password" name="password" type="password" placeholder="••••••••" className="input" />
          </div>

          <button type="submit" className="btn-primary">Sign in</button>
        </form>

        {/* Help line */}
        <p className="text-center muted">
          Need help?{" "}
          <a href="mailto:contact@montelion-capital.com" className="link">
            Contact us
          </a>
        </p>
      </div>
    </main>
  );
}
