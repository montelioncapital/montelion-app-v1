// app/dashboard/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

const mockMetrics = [
  {
    id: "equity",
    label: "Account equity",
    value: "$24,955.00",
    change: "+4.0%",
    changeLabel: "vs last month",
  },
  {
    id: "pnl",
    label: "Realized PnL",
    value: "+$3,120.50",
    change: "+1.8%",
    changeLabel: "last 30 days",
  },
  {
    id: "risk",
    label: "Current risk",
    value: "2.3%",
    change: "Safe",
    changeLabel: "of account equity",
  },
];

const mockActivity = [
  {
    id: 1,
    label: "Strategy allocation updated",
    time: "Today • 09:31",
    detail: "Risk profile adjusted to conservative.",
  },
  {
    id: 2,
    label: "Connection check successful",
    time: "Yesterday • 18:04",
    detail: "MT5 server ICMarketsSC-Live19.",
  },
  {
    id: 3,
    label: "Onboarding completed",
    time: "2 days ago",
    detail: "Account reviewed and activated by Montelion.",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState("Investor");

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      // Simple nom d’affichage pour l’instant (on connectera la DB plus tard)
      const email = session.user.email || "";
      const nameFromEmail = email.split("@")[0];
      setDisplayName(nameFromEmail || "Investor");

      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Dashboard</h1>
          <p className="text-slate-400 text-sm">Loading your account…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section max-w-6xl mx-auto text-left">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">
              Montelion dashboard
            </p>
            <h1 className="text-2xl md:text-3xl font-semibold text-slate-50 mb-1">
              Welcome back, {displayName}
            </h1>
            <p className="text-sm text-slate-400">
              Your trading account is active. Montelion is managing positions on
              your connected MT5 account.
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

        {/* TOP GRID: METRICS + CHART */}
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] gap-6 mb-6">
          {/* METRICS COLUMN */}
          <div className="space-y-4">
            {/* Connected account card */}
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-slate-950/90 px-5 py-4 sm:px-6 sm:py-5 shadow-[0_18px_45px_rgba(15,23,42,0.75)]">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                    Connected account
                  </p>
                  <h2 className="text-sm font-semibold text-slate-50 mt-0.5">
                    MetaTrader 5 • Live
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Broker: <span className="text-slate-200">IC Markets</span>{" "}
                    • Server:{" "}
                    <span className="text-slate-200">ICMarketsSC-Live19</span>
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="inline-flex items-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-200">
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Connection OK
                  </span>
                  <button
                    type="button"
                    className="mt-1 rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-0.5 text-[10px] text-slate-300 hover:border-slate-500/80 hover:bg-slate-900 transition-colors"
                  >
                    View trading access
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-slate-300">
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.16em]">
                    Strategy
                  </p>
                  <p className="font-medium text-slate-100">
                    Montelion Alpha Futures
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Mid-term trend following with dynamic risk.
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-slate-500 uppercase tracking-[0.16em]">
                    Risk profile
                  </p>
                  <p className="font-medium text-slate-100">Balanced</p>
                  <p className="text-[11px] text-slate-500">
                    Target risk:{" "}
                    <span className="text-slate-200 font-medium">2–3%</span>{" "}
                    per trade.
                  </p>
                </div>
              </div>
            </div>

            {/* KPI cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {mockMetrics.map((m) => (
                <div
                  key={m.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3.5 text-xs text-slate-200 shadow-[0_14px_40px_rgba(15,23,42,0.85)]"
                >
                  <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                    {m.label}
                  </p>
                  <p className="text-sm font-semibold text-slate-50 mb-1">
                    {m.value}
                  </p>
                  <p className="text-[11px] text-emerald-300">
                    {m.change}{" "}
                    <span className="text-slate-500 font-normal">
                      {m.changeLabel}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CHART COLUMN */}
          <div className="rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950 px-5 py-4 sm:px-6 sm:py-5 shadow-[0_26px_70px_rgba(15,23,42,0.95)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  Equity curve
                </p>
                <h2 className="text-sm font-semibold text-slate-50">
                  Last 6 months
                </h2>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  className="rounded-full bg-slate-900/80 px-2.5 py-0.5 text-[10px] text-slate-200 border border-slate-700"
                >
                  6M
                </button>
                <button
                  type="button"
                  className="rounded-full bg-slate-900/40 px-2.5 py-0.5 text-[10px] text-slate-400 border border-slate-800"
                >
                  3M
                </button>
                <button
                  type="button"
                  className="rounded-full bg-slate-900/40 px-2.5 py-0.5 text-[10px] text-slate-400 border border-slate-800"
                >
                  30D
                </button>
              </div>
            </div>

            {/* Simple custom SVG chart (placeholder for now) */}
            <div className="relative mb-3">
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(59,130,246,0.16),_transparent_55%)] pointer-events-none" />
              <div className="relative rounded-2xl border border-slate-800 bg-slate-950/90 px-3 py-3 h-52 overflow-hidden">
                <svg
                  viewBox="0 0 240 120"
                  className="w-full h-full text-sky-400"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="equityLine"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                    <linearGradient
                      id="equityFill"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="rgba(56,189,248,0.35)" />
                      <stop offset="100%" stopColor="rgba(15,23,42,0)" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  <g stroke="rgba(148,163,184,0.12)" strokeWidth="0.5">
                    <line x1="0" y1="20" x2="240" y2="20" />
                    <line x1="0" y1="50" x2="240" y2="50" />
                    <line x1="0" y1="80" x2="240" y2="80" />
                    <line x1="40" y1="0" x2="40" y2="120" />
                    <line x1="120" y1="0" x2="120" y2="120" />
                    <line x1="200" y1="0" x2="200" y2="120" />
                  </g>

                  {/* Area fill */}
                  <path
                    d="M0 95 C 40 85, 80 70, 120 78 C 160 86, 200 60, 240 40 L 240 120 L 0 120 Z"
                    fill="url(#equityFill)"
                  />

                  {/* Line */}
                  <path
                    d="M0 95 C 40 85, 80 70, 120 78 C 160 86, 200 60, 240 40"
                    fill="none"
                    stroke="url(#equityLine)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />

                  {/* Highlight point */}
                  <circle cx="200" cy="60" r="3.2" fill="#22d3ee" />
                  <circle
                    cx="200"
                    cy="60"
                    r="7"
                    fill="rgba(34,211,238,0.12)"
                    stroke="rgba(34,211,238,0.4)"
                    strokeWidth="1"
                  />
                </svg>

                {/* Tooltip style card */}
                <div className="absolute right-6 top-6 rounded-xl border border-slate-700 bg-slate-950/95 px-3 py-2 text-[11px] text-slate-200 shadow-[0_12px_30px_rgba(15,23,42,0.9)]">
                  <p className="text-[10px] text-slate-400 mb-0.5">
                    Today • 12:34
                  </p>
                  <p className="font-semibold text-slate-50">$30,672.15</p>
                  <p className="text-[10px] text-emerald-300">
                    +7.3%{" "}
                    <span className="text-slate-500">vs previous month</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Axis labels */}
            <div className="flex justify-between text-[10px] text-slate-500 px-1">
              <span>6M ago</span>
              <span>3M</span>
              <span>1M</span>
              <span>Now</span>
            </div>
          </div>
        </div>

        {/* BOTTOM GRID: ACTIVITY + RISK SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)] gap-6">
          {/* Recent activity */}
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4 sm:px-6 sm:py-5 shadow-[0_20px_60px_rgba(15,23,42,0.9)]">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                  Activity
                </p>
                <h2 className="text-sm font-semibold text-slate-50">
                  Latest events
                </h2>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-[10px] text-slate-300 hover:bg-slate-900"
              >
                View all
              </button>
            </div>

            <div className="divide-y divide-slate-800/80">
              {mockActivity.map((item) => (
                <div
                  key={item.id}
                  className="py-3 flex items-start justify-between gap-3"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-100">
                      {item.label}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {item.detail}
                    </p>
                  </div>
                  <p className="text-[11px] text-slate-500 whitespace-nowrap">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Risk summary */}
          <div className="space-y-4">
            <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-950/90 to-slate-900 px-5 py-4 sm:px-6 sm:py-5 shadow-[0_20px_60px_rgba(15,23,42,0.95)]">
              <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">
                Risk overview
              </p>
              <h2 className="text-sm font-semibold text-slate-50 mb-3">
                Current risk exposure
              </h2>

              <div className="mb-3">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Utilization</span>
                  <span className="text-slate-200 font-medium">42%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-900 overflow-hidden">
                  <div className="h-full w-[42%] bg-gradient-to-r from-emerald-400 via-sky-400 to-sky-500" />
                </div>
              </div>

              <ul className="mt-2 space-y-1.5 text-[11px] text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Max drawdown controlled below 10%.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  No open positions exceeding your risk profile.
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Montelion monitors volatility and adjusts position sizing.
                </li>
              </ul>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4 text-xs text-slate-300">
              <p className="font-medium text-slate-100 mb-1.5">
                What happens next?
              </p>
              <p className="text-[11px] text-slate-400 mb-1.5">
                This dashboard will soon show your live performance, open
                positions and detailed reporting directly connected to your MT5
                account.
              </p>
              <p className="text-[11px] text-slate-400">
                You don&apos;t need to take any action. If you have questions
                about your account or want to adjust your risk profile, please
                contact Montelion support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
