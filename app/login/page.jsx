// app/login/page.jsx
export const metadata = {
  title: "Sign in • Montelion Capital",
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center">
      {/* En-tête carte */}
      <div className="flex w-full items-start justify-between">
        <div className="brand-dot">M</div>
        <div className="brand-dot">MONTELION CAPITAL</div>
      </div>

      {/* Corps */}
      <div className="mt-10 flex flex-col items-center">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
          <span className="font-semibold">M</span>
        </div>
        <h1 className="text-2xl font-semibold">Montelion Capital</h1>
        <p className="mt-2 text-white/70">Sign in to continue</p>

        <form className="mt-10 w-full max-w-[720px] space-y-5" action="#" method="post">
          <label className="block space-y-2">
            <span className="text-sm text-white/75">Email</span>
            <input className="input" id="email" name="email" type="email" placeholder="you@example.com" />
          </label>

          <label className="block space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/75">Password</span>
              <a href="#" className="text-xs text-white/60 hover:text-white/80 transition">Forgot password?</a>
            </div>
            <input className="input" id="password" name="password" type="password" placeholder="••••••••" />
          </label>

          <button type="submit" className="btn btn-primary w-full mt-2">Sign in</button>
        </form>

        <p className="mt-6 hint">
          Need help? Contact <a className="underline hover:text-white/80" href="#">Montelion Capital Support</a>.
        </p>
      </div>
    </div>
  );
}
