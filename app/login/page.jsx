export const metadata = { title: "Sign in • Montelion Capital" };

export default function LoginPage() {
  return (
    <div className="mc-card">
      <div className="mc-section">
        <div className="mb-8 flex items-center justify-between">
          <div className="h-9 w-9 grid place-items-center rounded-xl bg-[--brand]/25 text-white font-medium">M</div>
          <div className="mc-brand">MONTELION CAPITAL</div>
        </div>

        <div className="mb-8 text-center">
          <div className="mx-auto h-10 w-10 grid place-items-center rounded-xl bg-[--brand]/25 text-white/90 font-medium">M</div>
          <h1 className="mt-6 text-3xl font-semibold tracking-[-0.02em]">Montelion Capital</h1>
          <p className="mt-2 text-slate-400">Sign in to continue</p>
        </div>

        <form className="space-y-4">
          <label className="block text-sm text-slate-300">
            Email
            <input type="email" placeholder="you@example.com" className="mc-input mt-2" />
          </label>

          <div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <label>Password</label>
              <a href="#" className="text-slate-400 hover:text-slate-300">Forgot password?</a>
            </div>
            <input type="password" placeholder="••••••••" className="mc-input mt-2" />
          </div>

          <button type="submit" className="mc-btn mc-btn-primary w-full mt-3">Sign in</button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-500">
          Need help? Contact{" "}
          <a href="#" className="underline decoration-white/20 hover:text-slate-300">
            Montelion Capital Support
          </a>.
        </p>
      </div>
    </div>
  );
}
