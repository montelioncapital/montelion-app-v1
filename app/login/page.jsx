export const metadata = { title: "Sign in • Montelion Capital" };

export default function LoginPage() {
  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        {/* Titre */}
        <h1 className="mc-title">Sign in</h1>

        {/* Formulaire */}
        <form className="mt-6 space-y-4">
          {/* Email */}
          <label className="block text-sm text-slate-300">
            Email
            <input
              type="email"
              placeholder="you@example.com"
              className="mc-input mt-2"
            />
          </label>

          {/* Password + lien */}
          <div>
            <div className="flex items-center justify-between text-sm text-slate-300">
              <label>Password</label>
              <a href="#" className="text-slate-400 hover:text-slate-300">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              placeholder="••••••••"
              className="mc-input mt-2"
            />
          </div>

          {/* Bouton */}
          <button type="submit" className="mc-btn mc-btn-primary w-full mt-3">
            Sign in
          </button>
        </form>

        {/* Support */}
        <p className="mt-8 text-sm text-slate-500">
          Need help? Contact{" "}
          <a href="#" className="mc-support-link">
            Montelion Capital Support
          </a>.
        </p>
      </div>
    </div>
  );
}
