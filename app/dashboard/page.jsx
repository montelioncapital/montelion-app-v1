// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("montelion.capital");

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const email = session.user.email || "";
      const nameFromEmail = email.split("@")[0];
      setDisplayName(nameFromEmail || "montelion.capital");

      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="mc-card mc-card-wide">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Dashboard</h1>
          <p className="text-slate-400 text-sm">Loading your account…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card mc-card-wide">
      <div className="mc-section text-left">
        {/* GROS CADRAN PRINCIPAL EN PAYSAGE */}
        <div className="rounded-[32px] border border-slate-800 bg-slate-950/95 px-6 py-6 lg:px-8 lg:py-7 shadow-[0_24px_80px_rgba(15,23,42,0.95)]">
          {/* HEADER TOP BAR */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">
                Montelion dashboard
              </p>
              <h1 className="text-2xl lg:text-3xl font-semibold text-slate-50 leading-snug">
                Welcome back,{" "}
                <span className="block md:inline">{displayName}</span>
              </h1>
              <p className="mt-1 text-sm text-slate-400 max-w-xl">
                Your trading account is active. Montelion is managing positions
                on your connected MT5 account and monitoring risk in real time.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <span className="inline-flex items-center rounded-full border border-emerald-500/70 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium text-emerald-200">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]" />
                Account active
              </span>
              <p className="text-[11px] text-slate-500">
                Last sync: a few seconds ago
              </p>
            </div>
          </div>

          {/* BARRE D’INTERVALLE (OVERVIEW / 12M / 6M / etc.) */}
          <div className="flex items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="text-slate-400/80">Overview</span>
              <span className="h-1 w-1 rounded-full bg-slate-700" />
              <span className="text-slate-400/80">Total portfolio</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px]">
              <button className="rounded-full bg-slate-900/80 px-3 py-1 border border-slate-700 text-slate-200">
                12 months
              </button>
              <button className="rounded-full bg-slate-900/40 px-3 py-1 border border-slate-800 text-slate-400">
                6 months
              </button>
              <button className="rounded-full bg-slate-900/40 px-3 py-1 border border-slate-800 text-slate-400">
                30 days
              </button>
              <button className="rounded-full bg-slate-900/40 px-3 py-1 border border-slate-800 text-slate-400">
                7 days
              </button>
              <button className="rounded-full bg-slate-900/40 px-3 py-1 border border-slate-800 text-slate-400">
                24 hours
              </button>
            </div>
          </div>

          {/* ZONE PRINCIPALE EN PAYSAGE */}
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] gap-6">
            {/* COLONNE GAUCHE : TOTAL PORTFOLIO + COURBE */}
            <div className="rounded-3xl border border-slate-800 bg-slate-950/90 px-5 py-4 lg:px-6 lg:py-5 flex flex-col">
              {/* Header du bloc gauche */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">
                    Total portfolio
                  </p>
                  <p className="text-2xl font-semibold text-slate-50">
                    $24,955.00
                  </p>
                  <p className="text-[11px] text-emerald-300 mt-1">
                    +40%{" "}
                    <span className="text-slate-500">
                      vs last month (mock data)
                    </span>
                  </p>
                </div>
                <div className="text-right text-[11px] text-slate-400 space-y-0.5">
                  <p>Today • 12:34</p>
                  <p>
                    Last trade PnL:{" "}
                    <span className="text-emerald-300 font-medium">
                      +$1,955.00
                    </span>
                  </p>
                </div>
              </div>

              {/* COURBE LARGE HORIZONTALE */}
              <div className="relative flex-1 min-h-[220px]">
                <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.18),_transparent_55%)] pointer-events-none" />
                <div className="relative rounded-2xl border border-slate-800 bg-slate-950/95 px-4 py-4 h-full overflow-hidden">
                  <svg
                    viewBox="0 0 340 150"
                    className="w-full h-full"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="lineGradient"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#22d3ee" />
                        <stop offset="100%" stopColor="#4ade80" />
                      </linearGradient>
                      <linearGradient
                        id="fillGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="rgba(56,189,248,0.35)" />
                        <stop offset="100%" stopColor="rgba(15,23,42,0)" />
                      </linearGradient>
                    </defs>

                    {/* Grille */}
                    <g stroke="rgba(148,163,184,0.12)" strokeWidth="0.6">
                      <line x1="0" y1="25" x2="340" y2="25" />
                      <line x1="0" y1="70" x2="340" y2="70" />
                      <line x1="0" y1="115" x2="340" y2="115" />
                      <line x1="60" y1="0" x2="60" y2="150" />
                      <line x1="170" y1="0" x2="170" y2="150" />
                      <line x1="280" y1="0" x2="280" y2="150" />
                    </g>

                    {/* Zone sous la courbe */}
                    <path
                      d="M0 120 C 40 115, 80 90, 120 95 C 160 105, 200 70, 240 80 C 280 95, 310 55, 340 40 L 340 150 L 0 150 Z"
                      fill="url(#fillGradient)"
                    />

                    {/* Courbe */}
                    <path
                      d="M0 120 C 40 115, 80 90, 120 95 C 160 105, 200 70, 240 80 C 280 95, 310 55, 340 40"
                      fill="none"
                      stroke="url(#lineGradient)"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    />

                    {/* Point mis en avant */}
                    <circle cx="280" cy="95" r="3.4" fill="#22d3ee" />
                    <circle
                      cx="280"
                      cy="95"
                      r="8"
                      fill="rgba(34,211,238,0.12)"
                      stroke="rgba(34,211,238,0.4)"
                      strokeWidth="1"
                    />
                  </svg>

                  {/* Tooltip flottant */}
                  <div className="absolute right-6 top-6 rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-[11px] text-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.9)]">
                    <p className="text-[10px] text-slate-400 mb-0.5">
                      Today • 12:34
                    </p>
                    <p className="font-semibold text-slate-50">$30,672.15</p>
                    <p className="text-[10px] text-emerald-300">
                      +7.3%{" "}
                      <span className="text-slate-500">
                        vs previous month
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Axe temps */}
              <div className="mt-3 flex justify-between text-[10px] text-slate-500 px-1">
                <span>12M ago</span>
                <span>9M</span>
                <span>6M</span>
                <span>3M</span>
                <span>Now</span>
              </div>
            </div>

            {/* COLONNE DROITE : CONNECTED ACCOUNT + SNAPSHOT */}
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 px-5 py-4 lg:px-5 lg:py-4">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">
                  Connected account
                </p>
                <h2 className="text-sm font-semibold text-slate-50 mb-2">
                  MetaTrader 5 • Live
                </h2>
                <dl className="space-y-1.5 text-[11px] text-slate-300">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Broker</dt>
                    <dd className="text-slate-100">IC Markets</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Server</dt>
                    <dd className="text-slate-100">ICMarketsSC-Live19</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Base currency</dt>
                    <dd className="text-slate-100">USD</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Leverage</dt>
                    <dd className="text-slate-100">1:100</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Risk profile</dt>
                    <dd className="text-slate-100">Balanced</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1.5 text-[11px] text-slate-200 hover:border-slate-500 hover:bg-slate-900 transition-colors"
                >
                  View trading access
                </button>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-950/90 px-5 py-4 text-[11px] text-slate-300">
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">
                  Snapshot
                </p>
                <ul className="space-y-1.5">
                  <li className="flex justify-between">
                    <span>Realized PnL (30D)</span>
                    <span className="text-emerald-300 font-medium">
                      +$3,120.50
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Current risk</span>
                    <span className="text-slate-100 font-medium">2.3%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Max drawdown (12M)</span>
                    <span className="text-amber-300 font-medium">-6.8%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Risk mode</span>
                    <span className="text-emerald-300 font-medium">
                      Normal
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* FIN GROS CADRAN */}
        </div>
      </div>
    </div>
  );
}
