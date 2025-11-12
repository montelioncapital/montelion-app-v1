// app/auth/forgot-password/check-email/page.jsx

export default function Page({ searchParams }) {
  const email = searchParams?.email || "";

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        {/* Icône / visuel */}
        <div className="mb-6 flex items-center justify-center w-12 h-12 rounded-xl bg-[#1b1f2a]">
          {/* petite enveloppe */}
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="opacity-90">
            <path d="M4 6h16v12H4V6z" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" fill="none"/>
          </svg>
        </div>

        <h1 className="mc-title mb-2">Check your mail</h1>
        <p className="text-slate-400">
          {email ? (
            <>
              If an account exists for <span className="text-slate-200">{email}</span>, you’ll receive a reset link shortly.
            </>
          ) : (
            <>If an account exists for this email, you’ll receive a reset link shortly.</>
          )}
        </p>

        <div className="mt-8 flex gap-3">
          {/* Ouvrir l’app mail (mailto: ouvre le client par défaut) */}
          <a href={`mailto:${email || ""}`} className="mc-btn mc-btn-primary">
            Open email app
          </a>
          <a href="/login" className="mc-btn mc-btn-ghost">
            Back to sign in
          </a>
        </div>
      </div>
    </div>
  );
}
