// /app/login/page.jsx
export const metadata = {
  title: "Sign in • Montelion Capital",
};

export default function LoginPage() {
  return (
    <main className="shell">
      <div className="card w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 grid place-items-center rounded-2xl"
               style={{ backgroundColor: "rgba(39,82,229,0.18)" }}>
            <span className="text-white font-bold">M</span>
          </div>
          <h1>Montelion Capital</h1>
          <p>Sign in to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-4" action="#" method="post">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" placeholder="you@example.com" className="input" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password">Password</label>
              <a href="#" className="link">Forgot password?</a>
            </div>
            <input id="password" name="password" type="password" placeholder="••••••••" className="input" />
          </div>

          <button type="submit" className="btn btn-primary w-full">Sign in</button>
        </form>

        <p className="text-xs text-center text-white/55">
          Need help? Contact <a className="underline hover:text-white" href="mailto:support@montelion-capital.com">Montelion Capital Support</a>.
        </p>
      </div>
    </main>
  );
}
