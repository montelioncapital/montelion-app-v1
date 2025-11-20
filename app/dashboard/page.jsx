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
    <div className="fixed inset-0 w-full bg-page text-slate-50 overflow-hidden">
      <div className="flex h-full w-full">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex lg:flex-col w-64 border-r border-slate-900/70 bg-slate-950/40">
          {/* Brand */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-900/70">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-[var(--brand)] to-sky-500 flex items-center justify-center text-xs font-semibold">
                17
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

          {/* Search */}
          <div className="px-6 py-4 border-b border-slate-900/70">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-2 text-[13px] text-slate-400 border border-slate-800">
              <span className="text-xs opacity-70">⌘K</span>
              <span className="truncate">Search</span>
            </div>
          </div>

          {/* Nav */}
          <nav className="flex-1 px-4 py-4 space-y-6 text-[13px] overflow-y-auto">
            <div>
              <p className="px-2 mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                General
              </p>
              <ul className="space-y-1">
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 bg-slate-900 border border-[var(--brand-light)]/70 text-slate-50 text-sm">
                    <span className="h-5 w-5 rounded-lg bg-[var(--brand)]/20 border border-[var(--brand-light)] flex items-center justify-center text-[11px]">
                      ⬤
                    </span>
                    <span className="flex-1 text-left">Dashboard</span>
                    <span className="text-[10px] bg-[var(--brand)]/15 text-sky-200 px-1.5 py-0.5 rounded-full border border-[var(--brand-light)]/70">
                      3
                    </span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-900/70">
                    <span className="h-5 w-5 rounded-lg bg-slate-900/60 flex items-center justify-center text-[11px]">
                      🏠
                    </span>
                    <span className="flex-1 text-left">Home page</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-900/70">
                    <span className="h-5 w-5 rounded-lg bg-slate-900/60 flex items-center justify-center text-[11px]">
                      🗄
                    </span>
                    <span className="flex-1 text-left">Database</span>
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="px-2 mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Files
              </p>
              <ul className="space-y-1 text-slate-400">
                {["pricing_2024.pdf", "publish.docx", "summary.pdf", "whop.pdf"].map(
                  (file) => (
                    <li key={file}>
                      <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-slate-900/60">
                        <span className="h-5 w-5 rounded-lg bg-slate-900/60 flex items-center justify-center text-[11px]">
                          📄
                        </span>
                        <span className="flex-1 text-left truncate">{file}</span>
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>

            <div>
              <p className="px-2 mb-2 text-[11px] uppercase tracking-[0.16em] text-slate-500">
                Account
              </p>
              <ul className="space-y-1">
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-900/70">
                    <span className="h-5 w-5 rounded-lg bg-slate-900/60 flex items-center justify-center text-[11px]">
                      💬
                    </span>
                    <span className="flex-1 text-left">Messages</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-900/70">
                    <span className="h-5 w-5 rounded-lg bg-slate-900/60 flex items-center justify-center text-[11px]">
                      👥
                    </span>
                    <span className="flex-1 text-left">Groups</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-900/70">
                    <span className="h-5 w-5 rounded-lg bg-slate-900/60 flex items-center justify-center text-[11px]">
                      ⚙
                    </span>
                    <span className="flex-1 text-left">Settings</span>
                  </button>
                </li>
                <li>
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 hover:bg-slate-900/70">
                    <span className="h-5 w-5 rounded-lg bg-slate-900/60 flex items-center justify-center text-[11px]">
                      👤
                    </span>
                    <span className="flex-1 text-left">My account</span>
                  </button>
                </li>
              </ul>
            </div>
          </nav>

          {/* bottom */}
          <div className="px-6 py-4 border-t border-slate-900/70 text-[11px] text-slate-500">
            <p>Logged in as</p>
            <p className="text-slate-300 truncate">{displayName}</p>
          </div>
        </aside>

        {/* MAIN AREA */}
        <main className="flex-1 h-full flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
            {/* TOP BAR CARD */}
            <div className="mb-6 rounded-2xl border border-[var(--brand-light)]/25 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-slate-950/40 px-5 py-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-2xl bg-[var(--brand)]/15 border border-[var(--brand-light)] flex items-center justify-center text-lg text-slate-50">
                  📊
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Dashboard</p>
                    <span className="text-[10px] bg-[var(--brand)]/15 text-sky-200 px-1.5 py-0.5 rounded-full border border-[var(--brand-light)]/60">
                      3
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Track and learn about your trading performance.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <button className="h-8 w-8 rounded-full border border-slate-700/80 bg-slate-900/80 flex items-center justify-center">
                  ⤢
                </button>
                <button className="h-8 w-8 rounded-full border border-slate-700/80 bg-slate-900/80 flex items-center justify-center">
                  ⋯
                </button>
              </div>
            </div>

            {/* OVERVIEW TITLE */}
            <div className="mb-5 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
                  Overview
                </h1>
                <span className="text-[11px] bg-slate-900/80 px-2 py-0.5 rounded-full border border-slate-700/80 text-slate-300">
                  7 days
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="h-2 w-2 rounded-full bg-[var(--brand-light)]" />
                <span>Live connection</span>
              </div>
            </div>

            {/* TOP ROW METRIC CARDS */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              {/* Gross revenue */}
              <div className="rounded-2xl border border-[var(--brand-light)]/25 bg-slate-950/80 px-4 py-3.5 flex flex-col overflow-hidden">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-[11px] text-slate-400">Gross revenue</p>
                    <p className="text-[11px] text-slate-500">
                      Performance from last month
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500">Total</span>
                </div>
                <p className="text-xl font-semibold text-slate-50 mb-1">
                  $171,610.25
                </p>
                <p className="text-[11px] text-[var(--brand-light)] mb-2">
                  +5.29%{" "}
                  <span className="text-slate-500">From last month</span>
                </p>
                {/* mini sparkline */}
                <div className="h-16 -mx-2 mt-1">
                  <svg viewBox="0 0 140 60" className="w-full h-full">
                    <defs>
                      <linearGradient
                        id="miniGrossLine"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#2664EC" />
                        <stop offset="100%" stopColor="#38bdf8" />
                      </linearGradient>
                      <linearGradient
                        id="miniGrossFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="rgba(38,100,236,0.45)"
                        />
                        <stop
                          offset="100%"
                          stopColor="rgba(15,23,42,0)"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 42 C 20 38, 35 40, 50 35 C 65 30, 85 28, 105 24 C 120 22, 130 20, 140 18 L 140 60 L 0 60 Z"
                      fill="url(#miniGrossFill)"
                    />
                    <path
                      d="M0 42 C 20 38, 35 40, 50 35 C 65 30, 85 28, 105 24 C 120 22, 130 20, 140 18"
                      fill="none"
                      stroke="url(#miniGrossLine)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Auto trades */}
              <div className="rounded-2xl border border-[var(--brand-light)]/20 bg-slate-950/80 px-4 py-3.5 flex flex-col overflow-hidden">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-[11px] text-slate-400">Auto trades</p>
                    <p className="text-[11px] text-slate-500">
                      Executed by Montelion
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500">30D</span>
                </div>
                <p className="text-xl font-semibold text-slate-50 mb-1">3,612</p>
                <p className="text-[11px] text-[var(--brand-light)] mb-2">
                  +1,259{" "}
                  <span className="text-slate-500">From last month</span>
                </p>
                <div className="h-16 -mx-2 mt-1">
                  <svg viewBox="0 0 140 60" className="w-full h-full">
                    <path
                      d="M0 40 C 20 36, 35 38, 50 34 C 65 30, 80 26, 100 24 C 115 22, 130 24, 140 22"
                      fill="none"
                      stroke="#2664EC"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <circle cx="100" cy="24" r="3" fill="#2664EC" />
                  </svg>
                </div>
              </div>

              {/* New assets */}
              <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-br from-slate-950/80 via-slate-950/80 to-slate-950/50 px-4 py-3.5 flex flex-col overflow-hidden">
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-[11px] text-slate-400">New assets</p>
                    <p className="text-[11px] text-slate-500">
                      Added to your portfolio
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-500">7D</span>
                </div>
                <p className="text-xl font-semibold text-slate-50 mb-1">53</p>
                <p className="text-[11px] text-[var(--brand-light)] mb-2">
                  +21{" "}
                  <span className="text-slate-500">From last month</span>
                </p>
                <div className="h-16 -mx-2 mt-1">
                  <svg viewBox="0 0 140 60" className="w-full h-full">
                    <defs>
                      <linearGradient
                        id="miniNewAssets"
                        x1="0"
                        y1="0"
                        x2="1"
                        y2="0"
                      >
                        <stop offset="0%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#fdba74" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 44 C 20 40, 40 38, 60 36 C 80 34, 105 30, 130 26"
                      fill="none"
                      stroke="url(#miniNewAssets)"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* MIDDLE: BIG CHART + ASSETS LIST */}
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
              {/* Auto Trades Chart */}
              <div className="rounded-2xl border border-[var(--brand-light)]/25 bg-slate-950/85 px-5 py-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[12px] font-medium text-slate-100">
                      Auto trades chart
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Chart of your auto-bot trades in last 14 days
                    </p>
                  </div>
                  <button className="h-8 w-8 rounded-lg border border-slate-700/80 bg-slate-900/90 flex items-center justify-center text-xs text-slate-300">
                    +
                  </button>
                </div>

                <div className="relative flex-1 min-h-[220px] mt-1">
                  <div className="relative rounded-2xl border border-slate-800 bg-slate-950 px-4 py-4 h-full overflow-hidden">
                    <svg viewBox="0 0 340 160" className="w-full h-full">
                      <defs>
                        <linearGradient
                          id="autoTradesFill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="rgba(38,100,236,0.45)"
                          />
                          <stop
                            offset="100%"
                            stopColor="rgba(15,23,42,0)"
                          />
                        </linearGradient>
                        <linearGradient
                          id="autoTradesLine"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="0"
                        >
                          <stop offset="0%" stopColor="#2664EC" />
                          <stop offset="100%" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>

                      {/* Area */}
                      <path
                        d="M0 125 C 40 115, 70 110, 100 100 C 130 90, 160 92, 190 82 C 220 72, 250 70, 280 60 C 305 52, 325 45, 340 40 L 340 160 L 0 160 Z"
                        fill="url(#autoTradesFill)"
                      />
                      {/* Line */}
                      <path
                        d="M0 125 C 40 115, 70 110, 100 100 C 130 90, 160 92, 190 82 C 220 72, 250 70, 280 60 C 305 52, 325 45, 340 40"
                        fill="none"
                        stroke="url(#autoTradesLine)"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                      />

                      {/* Focus point */}
                      <circle cx="230" cy="76" r="4" fill="#2664EC" />
                      <circle
                        cx="230"
                        cy="76"
                        r="9"
                        fill="rgba(38,100,236,0.12)"
                        stroke="rgba(148,163,253,0.7)"
                        strokeWidth="1"
                      />
                    </svg>

                    {/* tooltip price (sans ombre) */}
                    <div className="absolute right-8 top-6 rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-[11px] text-slate-100">
                      <p className="text-[10px] text-slate-400 mb-0.5">
                        21/01/2024 • 09:32
                      </p>
                      <p className="font-semibold">$3,928.00</p>
                    </div>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="space-x-3">
                    <span>
                      AVG{" "}
                      <span className="text-[var(--brand-light)] font-medium">
                        +5.29%
                      </span>
                    </span>
                  </div>
                  <div className="space-x-4">
                    <span>07.01.2024</span>
                    <span>–</span>
                    <span>21.01.2024</span>
                  </div>
                </div>
              </div>

              {/* Assets list */}
              <div className="rounded-2xl border border-[var(--brand-light)]/25 bg-slate-950/85 px-5 py-4 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[12px] font-medium text-slate-100">
                      Assets
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Best assets from your portfolio
                    </p>
                  </div>
                  <button className="h-7 px-3 rounded-full border border-slate-700 bg-slate-900/90 text-[11px] text-slate-300">
                    View all
                  </button>
                </div>

                <div className="space-y-3 text-[12px]">
                  {[
                    {
                      name: "Bitcoin",
                      ticker: "BTC",
                      color: "from-yellow-400 to-amber-500",
                    },
                    {
                      name: "Ethereum",
                      ticker: "ETH",
                      color: "from-sky-400 to-indigo-500",
                    },
                    {
                      name: "Serum",
                      ticker: "SRM",
                      color: "from-fuchsia-400 to-violet-500",
                    },
                    {
                      name: "Kadena",
                      ticker: "KDA",
                      color: "from-emerald-400 to-lime-400",
                    },
                    {
                      name: "BNB",
                      ticker: "BNB",
                      color: "from-orange-400 to-yellow-500",
                    },
                  ].map((asset, i) => (
                    <div
                      key={asset.ticker}
                      className="flex items-center gap-3 rounded-xl bg-slate-900/70 border border-slate-800 px-3 py-2.5"
                    >
                      <div
                        className={`h-8 w-8 rounded-full bg-gradient-to-br ${asset.color} flex items-center justify-center text-[11px] font-semibold text-slate-950`}
                      >
                        {asset.ticker[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] text-slate-100 leading-tight">
                          {asset.name}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          {asset.ticker}
                        </p>
                      </div>
                      <div className="w-20 h-8">
                        {/* tiny line chart */}
                        <svg viewBox="0 0 80 32" className="w-full h-full">
                          <defs>
                            <linearGradient
                              id={`assetLine-${i}`}
                              x1="0"
                              y1="0"
                              x2="1"
                              y2="0"
                            >
                              <stop offset="0%" stopColor="#2664EC" />
                              <stop offset="100%" stopColor="#38bdf8" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 24 C 10 22, 18 18, 26 19 C 34 20, 42 16, 50 17 C 58 18, 68 14, 80 12"
                            fill="none"
                            stroke={`url(#assetLine-${i})`}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] text-[var(--brand-light)]">
                          +5.29%
                        </p>
                        <p className="text-[10px] text-slate-500">AVG</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-[var(--brand-light)]/40 bg-gradient-to-br from-[var(--brand)]/12 to-sky-500/10 px-4 py-3 text-[11px] text-sky-50">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-sky-200 mb-1">
                    Auto-trading quota
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[22px] leading-none font-semibold">
                        480{" "}
                        <span className="text-[13px] text-sky-200">/ 500</span>
                      </p>
                      <p className="mt-1 text-sky-100">
                        20 auto trades left – be pro!
                      </p>
                    </div>
                    <div className="h-14 w-14 rounded-full border border-sky-400/60 flex items-center justify-center text-[12px]">
                      <span>96%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
