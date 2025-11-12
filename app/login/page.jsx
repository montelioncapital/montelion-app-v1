export const metadata = {
  title: "Sign in • Montelion Capital",
};

export default function LoginPage() {
  return (
    <div className="panel panel--auth">
      {/* header */}
      <div className="flex items-center justify-between text-[12px] uppercase tracking-[0.22em] text-[rgba(255,255,255,0.55)] mb-8">
        <span className="opacity-0">.</span>
        <span>Montelion Capital</span>
      </div>

      <div className="flex flex-col items-center text-center">
        <div className="brand-badge mb-5">M</div>
        <h1 className="h1">Montelion Capital</h1>
        <p className="muted mt-2">Sign in to continue</p>
      </div>

      <form className="mt-8 space-y-5" action="#" method="post">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block mb-2 text-sm muted text-left">Email</label>
          <input id="email" name="email" type="email" placeholder="you@example.com" className="input" />
        </div>

        {/* Password + forgot */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="password" className="text-sm muted">Password</label>
            <a href="#" className="text-sm text-[rgba(255,255,255,0.75)] hover:opacity-90">Forgot password?</a>
          </div>
          <input id="password" name="password" type="password" placeholder="••••••••" className="input" />
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full mt-4">Sign in</button>
      </form>

      <p className="muted mt-6 text-center text-sm">
        Need help? Contact{" "}
        <a className="underline decoration-[rgba(255,255,255,0.2)] hover:decoration-[rgba(255,255,255,0.5)]"
           href="mailto:support@montelion-capital.com">
          Montelion Capital Support
        </a>.
      </p>
    </div>
  );
}
