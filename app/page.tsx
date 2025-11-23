// app/page.jsx
"use client";

import React from "react";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Glow spécifique au hero (par-dessus le fond global) */}
      <div className="pointer-events-none absolute inset-x-0 -top-40 h-[420px] opacity-70">
        <div className="h-full w-full bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.6),transparent_60%)]" />
      </div>

      {/* HEADER */}
      <header className="relative z-20 border-b border-white/5/40 bg-black/20 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="/logo-montelion-02.svg"
              alt="Montelion Capital"
              className="h-6 w-auto"
            />
            <span className="hidden text-xs uppercase tracking-[0.2em] text-slate-400 md:inline">
              CAPITAL
            </span>
          </div>

          {/* Nav */}
          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <button className="hover:text-white transition-colors">Product</button>
            <button className="hover:text-white transition-colors">How it works</button>
            <button className="hover:text-white transition-colors">Performance</button>
            <button className="hover:text-white transition-colors">Security</button>
            <button className="hover:text-white transition-colors">Pricing</button>
            <button className="hover:text-white transition-colors">FAQ</button>
          </nav>

          {/* CTA droite */}
          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-100 hover:bg-white/10 md:inline"
            >
              Launch app
            </a>
            <button className="rounded-full bg-[#2563eb] px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_35px_rgba(37,99,235,0.7)] hover:bg-[#1d4ed8]">
              Request access
            </button>
          </div>
        </div>
      </header>

      {/* CONTENU */}
      <main className="relative z-10 flex-1">
        <section className="mx-auto flex max-w-6xl flex-col px-4 pt-16 pb-20 md:px-6 md:pt-24 md:pb-28">
          {/* Badge */}
          <div className="mx-auto mb-6 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/40 px-4 py-1 text-xs text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.35)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>Live trading infrastructure for private investors</span>
            </div>
          </div>

          {/* Hero text centré */}
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
              Put your{" "}
              <span className="bg-gradient-to-r from-[#60a5ff] via-[#3b82f6] to-[#a5b4fc] bg-clip-text text-transparent">
                capital on autopilot
              </span>{" "}
              with institutional-grade strategies.
            </h1>
            <p className="mt-5 text-sm leading-relaxed text-slate-300 md:text-base">
              Montelion connects your exchange account to an automated and
              monitored trading engine. You keep custody — we manage the
              execution, strategy and risk.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-full bg-[#2563eb] px-6 py-2 text-sm font-semibold text-white shadow-[0_0_40px_rgba(37,99,235,0.75)] hover:bg-[#1d4ed8]">
                Request a call
              </button>
              <a
                href="/dashboard"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-2 text-sm font-medium text-slate-100 hover:bg-white/10"
              >
                View demo dashboard
              </a>
            </div>
          </div>

          {/* Small stats ligne (AUM / Fees) */}
          <div className="mt-12 grid gap-8 text-left text-xs uppercase tracking-[0.22em] text-slate-400 sm:grid-cols-2 sm:text-[11px]">
            <div>
              <div>AUM PROTECTED</div>
              <div className="mt-2 text-sm normal-case tracking-normal text-slate-100">
                Your assets stay on your exchange
              </div>
            </div>
            <div>
              <div>FEES</div>
              <div className="mt-2 text-sm normal-case tracking-normal text-slate-100">
                Performance-based only
              </div>
            </div>
          </div>

          {/* Bloc demo dashboard centré comme sur VaultX */}
          <div className="mt-16 flex justify-center">
            <div className="w-full max-w-4xl rounded-3xl border border-white/10 bg-black/40 px-6 py-5 shadow-[0_40px_120px_rgba(0,0,0,0.9)]">
              {/* Top bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-semibold">
                    DU
                  </div>
                  <div className="text-xs">
                    <div className="font-medium text-slate-100">
                      Demo Investor
                    </div>
                    <div className="text-slate-400">
                      Connected exchange: Bybit
                    </div>
                  </div>
                </div>
                <div className="rounded-full bg-emerald-900/30 px-3 py-1 text-[11px] font-medium text-emerald-300">
                  Strategy: Active PNL
                </div>
              </div>

              {/* KPIs */}
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-[11px] text-slate-400">BALANCE</div>
                  <div className="mt-1 text-xl font-semibold text-slate-50">
                    $206,190
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-400">
                    + $3,240 today
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-[11px] text-slate-400">PNL TODAY</div>
                  <div className="mt-1 text-xl font-semibold text-slate-50">
                    +$210
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-400">
                    +0.32%
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <div className="text-[11px] text-slate-400">
                    PNL THIS MONTH
                  </div>
                  <div className="mt-1 text-xl font-semibold text-slate-50">
                    +$3,250
                  </div>
                  <div className="mt-1 text-[11px] text-emerald-400">
                    +4.7%
                  </div>
                </div>
              </div>

              {/* Equity curve placeholder */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-r from-[#1d2951] via-[#1f3a7a] to-[#1b2550] px-4 py-4">
                <div className="flex items-center justify-between text-[11px] text-slate-300">
                  <span>Equity curve (last 12 months)</span>
                  <span className="text-emerald-300">+38.4% net</span>
                </div>
                <div className="mt-4 h-28 rounded-xl bg-[radial-gradient(circle_at_20%_0,rgba(148,163,253,0.9),transparent_55%),radial-gradient(circle_at_80%_100%,rgba(59,130,246,0.9),transparent_60%)] opacity-90" />
                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Non-custodial · Disconnect anytime</span>
                  <span>Made for private investors</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
