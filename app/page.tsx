// app/page.jsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="relative z-10 min-h-screen text-slate-100">
      {/* Contenu centré, sans background plein écran */}
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-24 pt-24 lg:flex-row lg:items-start lg:px-0">
        {/* COLONNE GAUCHE : HERO */}
        <section className="max-w-xl">
          {/* Badge live trading */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-black/40 px-3 py-1 text-[11px] font-medium text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
            Live trading infrastructure for private investors
          </div>

          {/* Titre principal */}
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Put your{" "}
            <span className="bg-gradient-to-r from-sky-400 to-blue-500 bg-clip-text text-transparent">
              capital on autopilot
            </span>{" "}
            with institutional-grade strategies.
          </h1>

          {/* Sous-titre */}
          <p className="mt-5 max-w-md text-sm text-slate-300 leading-relaxed">
            Montelion connects your exchange account to an automated and
            monitored trading engine. You keep custody — we manage the
            execution, strategy, and risk.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#request"
              className="inline-flex items-center justify-center rounded-full bg-[#2563eb] px-6 py-2.5 text-sm font-medium text-white shadow-[0_0_25px_rgba(37,99,235,0.6)] transition hover:bg-[#1d4ed8]"
            >
              Request a call
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-black/40 px-6 py-2.5 text-sm font-medium text-slate-100 hover:bg-white/5"
            >
              View demo dashboard
            </Link>
          </div>

          {/* AUM / FEES */}
          <div className="mt-10 grid gap-8 text-xs text-slate-400 sm:grid-cols-2">
            <div>
              <div className="font-semibold tracking-[0.18em] text-[11px] text-slate-500">
                AUM PROTECTED
              </div>
              <div className="mt-2 text-sm text-slate-100">
                Your assets stay on your exchange
              </div>
            </div>
            <div>
              <div className="font-semibold tracking-[0.18em] text-[11px] text-slate-500">
                FEES
              </div>
              <div className="mt-2 text-sm text-slate-100">
                Performance-based only
              </div>
            </div>
          </div>
        </section>

        {/* COLONNE DROITE : CARTE DEMO */}
        <section className="w-full max-w-lg">
          <div className="rounded-3xl border border-white/10 bg-black/40 p-5 shadow-[0_18px_80px_rgba(15,23,42,0.9)] backdrop-blur">
            {/* Header carte */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-xs font-medium">
                  DU
                </div>
                <div className="leading-tight">
                  <div className="text-xs font-semibold">Demo Investor</div>
                  <div className="text-[11px] text-slate-400">
                    Connected exchange: Bybit
                  </div>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-300">
                Strategy: Active PNL
              </span>
            </div>

            {/* KPI ligne 1 */}
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {/* Balance */}
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  BALANCE
                </div>
                <div className="mt-2 text-lg font-semibold">$206,190</div>
                <div className="mt-1 text-[11px] text-emerald-400">
                  + $3,240 today
                </div>
              </div>

              {/* PNL Today */}
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  PNL TODAY
                </div>
                <div className="mt-2 text-lg font-semibold">+ $210</div>
                <div className="mt-1 text-[11px] text-emerald-400">
                  +0.32%
                </div>
              </div>

              {/* PNL This Month */}
              <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3">
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  PNL THIS MONTH
                </div>
                <div className="mt-2 text-lg font-semibold">+ $3,250</div>
                <div className="mt-1 text-[11px] text-emerald-400">
                  +4.7%
                </div>
              </div>
            </div>

            {/* Courbe d’equity fake */}
            <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span>Equity curve (last 12 months)</span>
                <span className="text-emerald-400">+38.4% net</span>
              </div>
              <div className="mt-3 h-28 rounded-2xl bg-[radial-gradient(circle_at_0%_0%,rgba(59,130,246,0.5),transparent_45%),radial-gradient(circle_at_100%_100%,rgba(59,130,246,0.5),transparent_45%)]" />
              <div className="mt-2 flex justify-between text-[10px] text-slate-500">
                <span>Non-custodial · Disconnect anytime</span>
                <span>Made for private investors</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
