// app/page.jsx
"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#020617] text-slate-50">
      {/* BACKGROUND GRADIENTS (inspiré de VaultX mais custom) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 0%, rgba(88,101,242,0.32), transparent 55%),
            radial-gradient(circle at 85% 0%, rgba(56,189,248,0.26), transparent 55%),
            radial-gradient(circle at 50% 100%, rgba(15,23,42,0.9), #020617)
          `,
        }}
      />

      {/* Lignes légères diagonales */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(148,163,184,0.18) 0, rgba(148,163,184,0.18) 1px, transparent 1px, transparent 12px)",
        }}
      />

      {/* CONTENU */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* HEADER */}
        <header className="flex items-center justify-between px-6 py-4 md:px-16 md:py-6">
          {/* Logo + nom */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/logo-montelion-02.svg"
                alt="Montelion Capital"
                className="h-6 w-auto"
              />
            </Link>
          </div>

          {/* NAV */}
          <nav className="hidden gap-8 text-sm text-slate-200/70 md:flex">
            <Link
              href="#features"
              className="transition-colors hover:text-slate-50"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="transition-colors hover:text-slate-50"
            >
              Pricing
            </Link>
            <Link
              href="#performance"
              className="transition-colors hover:text-slate-50"
            >
              Performance
            </Link>
            <Link
              href="#security"
              className="transition-colors hover:text-slate-50"
            >
              Security
            </Link>
            <Link href="#faq" className="transition-colors hover:text-slate-50">
              FAQ
            </Link>
          </nav>

          {/* CTA droite */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="hidden rounded-full border border-slate-500/40 px-4 py-1.5 text-xs font-medium text-slate-100/80 shadow-[0_0_0_1px_rgba(15,23,42,0.8)] transition-colors hover:border-slate-300/70 hover:text-slate-50 md:inline-block"
            >
              Launch App
            </Link>
            <Link
              href="#request"
              className="rounded-full bg-gradient-to-r from-[#4f46e5] via-[#6366f1] to-[#38bdf8] px-4 py-1.5 text-xs font-semibold text-slate-50 shadow-[0_10px_35px_rgba(56,189,248,0.35)] transition-transform hover:translate-y-[1px]"
            >
              Request a Call
            </Link>
          </div>
        </header>

        {/* HERO SECTION */}
        <section className="flex flex-1 items-center justify-center px-6 pb-20 pt-6 md:px-16 md:pt-10">
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-500/40 bg-slate-900/60 px-4 py-1 text-xs text-slate-300/80 shadow-[0_0_0_1px_rgba(15,23,42,0.8)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Live trading infrastructure for private investors</span>
            </div>

            {/* Titre */}
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-slate-50 md:text-6xl">
              Put your{" "}
              <span className="bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#38bdf8] bg-clip-text text-transparent">
                capital on autopilot
              </span>{" "}
              with institutional-grade strategies.
            </h1>

            {/* Sous-titre */}
            <p className="mt-6 max-w-2xl text-sm text-slate-300 md:text-base">
              Montelion connects your exchange account to an automated and
              monitored trading engine. You keep custody — we manage execution,
              risk, and strategy.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="#request"
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#4f46e5] via-[#6366f1] to-[#38bdf8] px-8 py-3 text-sm font-semibold text-slate-50 shadow-[0_15px_40px_rgba(56,189,248,0.45)] transition-transform hover:translate-y-[1px]"
              >
                Request a Call
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-full border border-slate-500/40 bg-slate-950/50 px-8 py-3 text-sm font-medium text-slate-100/80 shadow-[0_0_0_1px_rgba(15,23,42,0.9)] transition-colors hover:border-slate-300/70 hover:text-slate-50"
              >
                View Demo Dashboard
              </Link>
            </div>

            {/* Mini social proof */}
            <div className="mt-10 flex flex-col items-center gap-3 text-xs text-slate-400 sm:flex-row sm:gap-4">
              <div className="flex -space-x-2">
                <div className="h-8 w-8 rounded-full border border-slate-900 bg-slate-600/70" />
                <div className="h-8 w-8 rounded-full border border-slate-900 bg-slate-500/80" />
                <div className="h-8 w-8 rounded-full border border-slate-900 bg-slate-400/80" />
              </div>
              <p>Early private investors already trade with Montelion.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
