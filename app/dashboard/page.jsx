"use client";

import { useState } from "react";

const TIME_RANGES = ["12 months", "6 months", "30 days", "7 days", "24 hours"];

function TimeRangePills({ active, onChange }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {TIME_RANGES.map((range) => {
        const isActive = range === active;
        return (
          <button
            key={range}
            type="button"
            onClick={() => onChange(range)}
            className={`dash-pill ${
              isActive ? "dash-pill-active" : "border border-white/5"
            }`}
          >
            {range}
          </button>
        );
      })}
    </div>
  );
}

function MetricCard({ label, value, subLabel, trend }) {
  return (
    <div className="dash-metric-card">
      <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-50">
        {value}
      </p>
      <div className="mt-1 flex items-center justify-between text-[12px] text-slate-400">
        <span>{subLabel}</span>
        {trend && (
          <span
            className={
              trend.startsWith("-") ? "text-rose-400" : "text-emerald-400"
            }
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeRange, setActiveRange] = useState("6 months");

  return (
    <div className="flex h-screen w-screen bg-page text-slate-100">
      {/* Sidebar */}
      <aside className="flex h-full w-64 flex-col border-r border-white/5 bg-[#040713]/90 px-6 py-6">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--brand)] text-sm font-semibold">
            17
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-tight">
              Montelion Capital
            </p>
            <p className="text-[11px] text-slate-400">
              Managed trading dashboard
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex items-center gap-2 rounded-xl bg-slate-900/70 px-3 py-2.5 text-xs text-slate-400">
            <span className="rounded-md border border-slate-700 px-1.5 py-0.5 text-[10px] text-slate-300">
              ⌘K
            </span>
            <span>Search</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-6 text-sm">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
              General
            </p>
            <button className="mb-1 flex w-full items-center justify-between gap-2 rounded-xl bg-slate-900 px-3 py-2.5 text-xs font-medium text-slate-100">
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-800 text-[10px]">
                  ⬛
                </span>
                Dashboard
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
            </button>
          </div>

          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-slate-500">
              Account
            </p>
            <ul className="space-y-1 text-xs text-slate-400">
              <li className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-900/60 hover:text-slate-100">
                <span>⚙️</span>
                <span>Settings</span>
              </li>
              <li className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-slate-900/60 hover:text-slate-100">
                <span>🔔</span>
                <span>Notifications</span>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-6 border-t border-slate-800 pt-4 text-[11px] text-slate-500">
          <p>Logged in as</p>
          <p className="font-medium text-slate-300">montelion.capital</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        <div className="no-scrollbar flex h-full flex-col overflow-y-auto px-8 py-6 md:px-12">
          {/* Header */}
          <header className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-slate-400">Dashboard</span>
                <span>/</span>
                <span className="text-slate-300">Overview</span>
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-50">
                Dashboard
              </h1>
            </div>

            <div className="flex gap-2">
              <button className="rounded-full border border-slate-700/70 px-4 py-1.5 text-xs text-slate-200 hover:bg-slate-900">
                Import
              </button>
              <button className="rounded-full border border-[var(--brand-light)] bg-[var(--brand)] px-4 py-1.5 text-xs font-medium text-white hover:bg-[var(--brand-600)]">
                + Add
              </button>
            </div>
          </header>

          {/* Time ranges */}
          <TimeRangePills active={activeRange} onChange={setActiveRange} />

          {/* Top metrics */}
          <section className="mt-6 grid gap-4 md:grid-cols-3">
            <MetricCard
              label="Account balance"
              value="$171,610.25"
              subLabel="Your current equity (mock data)"
              trend="+5.29% vs last month"
            />
            <MetricCard
              label="Today's P&L"
              value="+$3,928.00"
              subLabel="Realized & unrealized"
              trend="+1.42%"
            />
            <MetricCard
              label="Monthly P&L"
              value="+$12,450.90"
              subLabel="From the start of this month"
              trend="+8.15%"
            />
          </section>

          {/* PnL chart since account opening */}
          <section className="mt-6 mb-6">
            <div className="dash-chart-card">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-slate-400">
                    P&amp;L since account opening
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Mock curve for design preview. We&apos;ll plug real data
                    later.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300">
                    <span className="mr-1 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live connection
                  </span>
                  <span className="text-slate-500">Last update: 2 min ago</span>
                </div>
              </div>

              <div className="mt-5 h-72 rounded-2xl bg-gradient-to-b from-[rgba(59,119,255,0.35)] via-[rgba(6,12,26,0.9)] to-[rgba(6,12,26,1)] px-4 pt-4 pb-6">
                <svg
                  viewBox="0 0 600 260"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="pnlLine"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#3B77FF" />
                      <stop offset="50%" stopColor="#4DF3FF" />
                      <stop offset="100%" stopColor="#38bdf8" />
                    </linearGradient>

                    <linearGradient
                      id="pnlFill"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(61, 191, 255, 0.45)" />
                      <stop
                        offset="50%"
                        stopColor="rgba(61, 191, 255, 0.20)"
                      />
                      <stop offset="100%" stopColor="transparent" />
                    </linearGradient>

                    <pattern
                      id="pnlGrid"
                      x="0"
                      y="0"
                      width="60"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 0 40 H 60 M 0 0 V 0"
                        stroke="rgba(148, 163, 184, 0.12)"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>

                  <rect
                    x="0"
                    y="0"
                    width="600"
                    height="260"
                    fill="url(#pnlGrid)"
                  />

                  <path
                    d="M 0 210
                       C 80 200, 120 190, 160 180
                       C 200 170, 240 165, 280 175
                       C 320 185, 360 170, 400 150
                       C 440 135, 480 120, 520 90
                       C 560 70, 580 55, 600 50"
                    fill="url(#pnlFill)"
                    stroke="none"
                  />

                  <path
                    d="M 0 210
                       C 80 200, 120 190, 160 180
                       C 200 170, 240 165, 280 175
                       C 320 185, 360 170, 400 150
                       C 440 135, 480 120, 520 90
                       C 560 70, 580 55, 600 50"
                    fill="none"
                    stroke="url(#pnlLine)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  <circle cx="600" cy="50" r="5" fill="#0f172a" />
                  <circle
                    cx="600"
                    cy="50"
                    r="4"
                    fill="#4DF3FF"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />

                  <g transform="translate(430, 60)">
                    <rect
                      x="0"
                      y="0"
                      rx="10"
                      ry="10"
                      width="140"
                      height="46"
                      fill="rgba(15,23,42,0.95)"
                      stroke="rgba(148,163,184,0.45)"
                      strokeWidth="0.6"
                    />
                    <text
                      x="12"
                      y="17"
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="system-ui, -apple-system, BlinkMacSystemFont"
                    >
                      Total P&amp;L
                    </text>
                    <text
                      x="12"
                      y="32"
                      fill="#e2e8f0"
                      fontSize="13"
                      fontWeight="600"
                      fontFamily="system-ui, -apple-system, BlinkMacSystemFont"
                    >
                      +$45,920.32
                    </text>
                    <text
                      x="100"
                      y="32"
                      fill="#4ade80"
                      fontSize="11"
                      fontFamily="system-ui, -apple-system, BlinkMacSystemFont"
                    >
                      +32.8%
                    </text>
                  </g>
                </svg>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
