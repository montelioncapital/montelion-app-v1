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
    <div className="fixed inset-0 w-full bg-page text-slate-50 overflow-hidden">
      <div className="flex h-full w-full">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex lg:flex-col w-64 border-r border-slate-900/70 bg-slate-950/40">
          {/* Brand */}
          <div className="px-6 pt-6 pb-4 border-b border-slate-900/70">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-xs font-semibold">
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
                  <button className="w-full flex items-center gap-3 rounded-xl px-3 py-2.5 bg-slate-900 border border-emerald-500/60 text-slate-50 text-sm">
                    <span className="h-5 w-5 rounded-lg bg-emerald-500/20 border border-emerald-400/70 flex items-center justify-center text-[11px]">
                      ⬤
                    </span>
                    <span className="flex-1 text-left">Dashboard</span>
                    <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-400/60">
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
            {/* TOP BAR CARD (Dashboard + subtitle) */}
            <div className="mb-6 rounded-2xl border border-emerald-500/15 bg-gradient-to-r from-slate-950/90 via-slate-950/80 to-slate-950/40 px-5 py-4 flex items-center justify-between gap-4 shadow-[0_18px_45px_rgba(0,0,0,0.75)]">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-2xl bg-emerald-500/20 border border-emerald-400/60 flex items-center justify-center text-lg">
                  📊
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">Dashboard</p>
                    <span className="text-[10px] bg-emerald-500/15 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-400/50">
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
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Live connection</span>
              </div>
            </div>

            {/* TOP ROW METRIC CARDS */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              {/* Gross revenue */}
              <div className="rounded-2xl border border-emerald-500/25 bg-slate-950/80 px-4 py-3.5 flex flex-col overflow-hidden">
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
                <p className="text-[11px] text-emerald-300 mb-2">
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
                        <stop offset="0%" stopColor="#22c55e" />
                        <stop offset="100%" stopColor="#22d3ee" />
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
                          stopColor="rgba(34,197,94,0.4)"
                        />
                        <stop
                          offset="100%"
                          stopColor="rgba(15,23,42,0)"
                        />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 45 C 20 40, 35 42, 50 35 C 65 28, 80 30, 95 22 C 115 12, 130 18, 140 8 L 140 60 L 0 60 Z"
                      fill="url(#miniGrossFill)"
                    />
                    <path
                      d="M0 45 C 20 40, 35 42, 50 35 C 65 28, 80 30, 95 22 C 115 12, 130 18, 140 8"
                      fill="none"
                      stroke="url(#miniGrossLine)"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Auto trades */}
              <div className="rounded-2xl border border-emerald-500/15 bg-slate-950/80 px-4 py-3.5 flex flex-col overflow-hidden">
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
                <p className="text-[11px] text-emerald-300 mb-2">
                  +1,259{" "}
                  <span className="text-slate-500">From last month</span>
                </p>
                <div className="h-16 -mx-2 mt-1">
                  <svg viewBox="0 0 140 60" className="w-full h-full">
                    <path
                      d="M0 35 C 20 30, 35 40, 50 28 C 65 20, 80 25, 100 15 C 115 10, 130 20, 140 12"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <circle cx="110" cy="17" r="3" fill="#22c55e" />
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
                <p className="text-[11px] text-emerald-300 mb-2">
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
                        <stop offset="0%" stopColor="#fb923c" />
                        <stop offset="100%" stopColor="#facc15" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 40 C 20 35, 40 32, 60 30 C 80 28, 100 24, 120 18 C 135 12, 145 15, 150 10"
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
              <div className="rounded-2xl border border-emerald-500/18 bg-slate-950/85 px-5 py-4 flex flex-col">
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
                            stopColor="rgba(34,197,94,0.45)"
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
                          <stop offset="0%" stopColor="#22c55e" />
                          <stop offset="100%" stopColor="#22d3ee" />
                        </linearGradient>
                      </defs>

                      {/* Area */}
                      <path
                        d="M0 120 C 15 105, 35 110, 55 95 C 75 80, 95 85, 115 70 C 135 60, 150 65, 165 55 C 180 48, 195 60, 210 50 C 225 42, 240 55, 255 45 C 270 40, 285 55, 300 50 C 315 48, 330 40, 340 38 L 340 160 L 0 160 Z"
                        fill="url(#autoTradesFill)"
                      />
                      {/* Line */}
                      <path
                        d="M0 120 C 15 105, 35 110, 55 95 C 75 80, 95 85, 115 70 C 135 60, 150 65, 165 55 C 180 48, 195 60, 210 50 C 225 42, 240 55, 255 45 C 270 40, 285 55, 300 50 C 315 48, 330 40, 340 38"
                        fill="none"
                        stroke="url(#autoTradesLine)"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                      />

                      {/* Focus point + label */}
                      <circle cx="240" cy="52" r="3.5" fill="#22c55e" />
                      <circle
                        cx="240"
                        cy="52"
                        r="8"
                        fill="rgba(34,197,94,0.1)"
                        stroke="rgba(34,197,94,0.6)"
                        strokeWidth="1"
                      />
                    </svg>

                    {/* tooltip price */}
                    <div className="absolute right-8 top-6 rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-[11px] text-slate-100 shadow-[0_18px_40px_rgba(0,0,0,0.85)]">
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
                      <span className="text-emerald-300 font-medium">
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
              <div className="rounded-2xl border border-emerald-500/18 bg-slate-950/85 px-5 py-4 flex flex-col">
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
                              <stop offset="0%" stopColor="#22c55e" />
                              <stop offset="100%" stopColor="#22d3ee" />
                            </linearGradient>
                          </defs>
                          <path
                            d="M0 24 C 10 22, 18 16, 26 18 C 34 19, 42 10, 50 13 C 58 16, 66 8, 80 6"
                            fill="none"
                            stroke={`url(#assetLine-${i})`}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] text-emerald-300">+5.29%</p>
                        <p className="text-[10px] text-slate-500">AVG</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 rounded-2xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/15 to-emerald-400/10 px-4 py-3 text-[11px] text-emerald-50">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-emerald-200 mb-1">
                    Auto-trading quota
                  </p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[22px] leading-none font-semibold">
                        480 <span className="text-[13px] text-emerald-200">/ 500</span>
                      </p>
                      <p className="mt-1 text-emerald-100">
                        20 auto trades left – be pro!
                      </p>
                    </div>
                    <div className="h-14 w-14 rounded-full border border-emerald-400/60 flex items-center justify-center text-[12px]">
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
