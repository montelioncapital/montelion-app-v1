export default function Page() {
  return (
    <div className="bg-page">
      <div className="mc-card">
        <div className="mc-section">
          <div className="mc-brand mb-5">
            <img src="/icone-montelion.svg" alt="Montelion" />
          </div>

          <h1 className="mc-title mb-4">Welcome</h1>

          <p className="mc-lead sm:max-w-2xl">
            Access your secure workspace. Use your email invite link, or sign in if your account is already active.
          </p>

          <div className="mc-actions">
            <a href="/login" className="mc-btn mc-btn-primary">Sign in</a>
            <button className="mc-btn mc-btn-ghost">Learn more</button>
          </div>

          <p className="mt-8 sm:mt-10 text-xs sm:text-sm text-slate-500">
            Need help? Contact <a href="#">Montelion Capital Support</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
