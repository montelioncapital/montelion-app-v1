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
      <div className="fixed inset-0 flex items-center justify-center bg-page">
        <p className="text-slate-400 text-sm">Loading your dashboard…</p>
      </div>
    );
  }

  return (
    // >>> ICI : on colle le dashboard au viewport complet
    <div className="fixed inset-0 w-full bg-page text-slate-50 overflow-hidden">
      <div className="flex h-full w-full">
        {/* SIDEBAR GAUCHE */}
        <aside className="hidden lg:flex lg:flex-col w-64 border-r border-slate-900/60 bg-slate-950/40">
          <div className="px-6 pt-6 pb-4 border-b border-slate-900/60">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-xs font-semibold">
                M
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight">
                  Montelion Capital
                </p>
                <p className="text-[11px] text-slate-500">
                  Managed trading dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="px-6 py-4 border-b border-slate-900/60">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/70 px-3 py-2 text-[13px] text-slate-400 border border-slate-800/70">
              <span className="text-xs opacity-70">⌘K</span>
              <span className="truncate">Search</span>
            </div>
          </div>

          <nav className="flex-1 px-4 py-4 space-y-6 text-[13px] overflow-y-auto">
            <div>
              <p className="px-2 mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Main
              </p>
              <ul className="space-y-1">
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 bg-slate-900 border border-sky-500/70 text-slate-50 text-sm">
                    <span className="h-5 w-5 rounded-lg bg-sky-500/20 border border-sky-500/60 flex items-center justify-center text-[11px]">
                      ■
                    </span>
                    <span className="flex-1 text-left">Dashboard</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-900/60">
                    <span className="h-5 w-5 rounded-lg bg-slate-900/40 flex items-center justify-center text-[11px]">
                      ₿
                    </span>
                    <span className="flex-1 text-left">Trading</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="px-2 mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Account
              </p>
              <ul className="space-y-1">
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-900/60">
                    <span className="h-5 w-5 rounded-lg bg-slate-900/40 flex items-center justify-center text-[11px]">
                      ⚙
                    </span>
                    <span className="flex-1 text-left">Settings</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-900/60">
                    <span className="h-5 w-5 rounded-lg bg-slate-900/40 flex items-center justify-center text-[11px]">
                      🔔
                    </span>
                    <span className="flex-1 text-left">Notifications</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          <div className="px-6 py-4 border-t border-slate-900/60 text-[11px] text-slate-500">
            <p>Logged in as</p>
            <p className="text-slate-300">{displayName}</p>
          </div>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 h-full flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {/* BREADCRUMB + ACTIONS */}
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-[12px] text-slate-500">
                <span>Dashboard</span>
                <span>/</span>
                <span className="text-slate-300">Overview</span>
              </div>
              <div className="flex items-center gap-2 text-[12px]">
                <button className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-slate-200 hover:border-slate-500">
                  Import
                </button>
                <button className="rounded-lg bg-sky-500 px-3 py-1.5 text-slate-50 hover:bg-sky-600">
                  + Add
                </button>
              </div>
            </div>

            {/* TITRE + TABS */}
            <div className="mb-4">
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3">
                Dashboard
              </h1>
              <div className="flex flex-wrap items-center gap-2 text-[12px]">
                <button className="rounded-full bg-slate-900/80 px-3 py-1.5 border border-slate-700 text-slate-200">
                  12 months
                </button>
                <button className="rounded-full bg-slate-900/60 px-3 py-1.5 border border-slate-700 text-slate-100">
                  6 months
                </button>
                <button className="rounded-full bg-slate-900/40 px-3 py-1.5 border border-slate-800 text-slate-400">
                  30 days
                </button>
                <button className="rounded-full bg-slate-900/40 px-3 py-1.5 border border-slate-800 text-slate-400">
                  7 days
                </button>
                <button className="rounded-full bg-slate-900/40 px-3 py-1.5 border border-slate-800 text-slate-400">
                  24 hours
                </button>
              </div>
            </div>

            {/* BLOC PRINCIPAL : GRAPH + PANEL DROIT */}
            <section className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              {/* TOTAL PORTFOLIO */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-5 py-4 lg:px-6 lg:py-5 flex flex-col">
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
                      <span className="text-slate-500">vs last month</span>
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

                {/* Graph */}
                <div className="relative flex-1 min-h-[220px]">
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
                          <stop
                            offset="0%"
                            stopColor="rgba(56,189,248,0.35)"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgba(15,23,42,0)"
                          />
                        </linearGradient>
                      </defs>

                      <g
                        stroke="rgba(148,163,184,0.12)"
                        strokeWidth="0.6"
                      >
                        <line x1="0" y1="25" x2="340" y2="25" />
                        <line x1="0" y1="70" x2="340" y2="70" />
                        <line x1="0" y1="115" x2="340" y2="115" />
                        <line x1="60" y1="0" x2="60" y2="150" />
                        <line x1="170" y1="0" x2="170" y2="150" />
                        <line x1="280" y1="0" x2="280" y2="150" />
                      </g>

                      <path
                        d="M0 120 C 40 110, 80 85, 120 95 C 160 105, 200 70, 240 80 C 280 95, 310 60, 340 40 L 340 150 L 0 150 Z"
                        fill="url(#fillGradient)"
                      />
                      <path
                        d="M0 120 C 40 110, 80 85, 120 95 C 160 105, 200 70, 240 80 C 280 95, 310 60, 340 40"
                        fill="none"
                        stroke="url(#lineGradient)"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                      <circle cx="230" cy="82" r="3.4" fill="#22d3ee" />
                      <circle
                        cx="230"
                        cy="82"
                        r="8"
                        fill="rgba(34,211,238,0.12)"
                        stroke="rgba(34,211,238,0.4)"
                        strokeWidth="1"
                      />
                    </svg>

                    <div className="absolute right-6 top-6 rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-[11px] text-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.9)]">
                      <p className="text-[10px] text-slate-400 mb-0.5">
                        Today • 12:34
                      </p>
                      <p className="font-semibold text-slate-50">
                        $30,672.15
                      </p>
                      <p className="text-[10px] text-emerald-300">
                        +7.3%{" "}
                        <span className="text-slate-500">
                          vs previous month
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex justify-between text-[10px] text-slate-500 px-1">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>

              {/* PANEL DROIT */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950/80 px-5 py-4 lg:px-6 lg:py-5 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">
                      Connected account
                    </p>
                    <p className="text-sm font-semibold text-slate-50">
                      MetaTrader 5 • Live
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1">
                      Your managed MT5 account connected to Montelion.
                    </p>
                  </div>
                </div>

                <div className="mt-2 mb-4">
                  <p className="text-xs text-slate-400 mb-0.5">
                    Account equity
                  </p>
                  <p className="text-2xl font-semibold text-slate-50">
                    $30,672.15{" "}
                    <span className="text-[11px] text-emerald-300 align-middle">
                      +7.3%
                    </span>
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-[11px]">
                  <button className="rounded-lg border border-slate-700 bg-slate-900/70 px-3 py-1.5 text-slate-200">
                    View trading access
                  </button>
                  <button className="rounded-lg border border-slate-800 bg-slate-950/80 px-3 py-1.5 text-slate-300">
                    Track in dashboard
                  </button>
                </div>

                <dl className="space-y-2 text-[11px] text-slate-300">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Broker</dt>
                    <dd>IC Markets</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Server</dt>
                    <dd>ICMarketsSC-Live19</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Base currency</dt>
                    <dd>USD</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Leverage</dt>
                    <dd>1:100</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-500">Risk mode</dt>
                    <dd className="text-emerald-300">Normal</dd>
                  </div>
                </dl>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
