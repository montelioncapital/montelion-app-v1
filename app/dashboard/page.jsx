// app/dashboard/page.jsx
'use client';

import React, { useMemo } from 'react';

// --- Mock data for the PnL since account opening curve ---
const pnlHistory = [
  { label: 'Jan', value: 0 },
  { label: 'Feb', value: 4 },
  { label: 'Mar', value: 7 },
  { label: 'Apr', value: 5 },
  { label: 'May', value: 9 },
  { label: 'Jun', value: 13 },
  { label: 'Jul', value: 12 },
  { label: 'Aug', value: 16 },
];

function useLinePath(points) {
  return useMemo(() => {
    if (!points.length) return '';

    const values = points.map((p) => p.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const normalized = points.map((p, index) => {
      const x = (index / Math.max(points.length - 1, 1)) * 100;
      const yNorm = (p.value - min) / range;
      const y = 90 - yNorm * 70; // marge haut/bas
      return { x, y };
    });

    let d = `M ${normalized[0].x},${normalized[0].y}`;
    for (let i = 1; i < normalized.length; i++) {
      d += ` L ${normalized[i].x},${normalized[i].y}`;
    }
    return d;
  }, [points]);
}

export default function DashboardPage() {
  const linePath = useLinePath(pnlHistory);

  return (
    <div className="dashboard-root flex min-h-screen bg-page text-slate-100">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-72 flex-col border-r border-white/5 bg-gradient-to-b from-[#050814] to-[#02040a]">
        {/* Top brand */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--brand)] text-sm font-semibold">
            17
          </div>
          <div>
            <div className="text-sm font-semibold tracking-tight">
              Montelion Capital
            </div>
            <div className="text-[11px] text-slate-400">
              Managed trading dashboard
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-6 pb-4">
          <div className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-slate-400">
            <span className="text-xs">⌘K</span>
            <span>Search</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 dashboard-main">
          <div className="px-2 pb-3 text-[11px] uppercase tracking-[0.12em] text-slate-500">
            General
          </div>

          <button className="mb-1 flex w-full items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-sm text-slate-50">
            <span className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-[13px]">
                ⬛
              </span>
              Dashboard
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </button>

          <button className="mb-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-400 hover:bg-white/5">
            <span className="flex items-center gap-2">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-[13px]">
                ₿
              </span>
              Trading
            </span>
          </button>

          <div className="mt-6 px-2 pb-3 text-[11px] uppercase tracking-[0.12em] text-slate-500">
            Account
          </div>

          <button className="mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 hover:bg-white/5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-[13px]">
              ⚙️
            </span>
            Settings
          </button>

          <button className="mb-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-slate-400 hover:bg-white/5">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-white/5 text-[13px]">
              🔔
            </span>
            Notifications
          </button>
        </nav>

        {/* Footer */}
        <div className="border-t border-white/5 px-6 py-4 text-[11px] text-slate-500">
          Logged in as
          <div className="text-xs text-slate-300">montelion.capital</div>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="dashboard-main flex-1 overflow-y-auto">
        {/* ICI on enlève max-w et mx-auto pour être full screen */}
        <div className="flex flex-col px-6 pb-10 pt-8 md:px-8 xl:px-12 2xl:px-16">
          {/* Breadcrumb + actions */}
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span className="cursor-default hover:text-slate-400">
                Dashboard
              </span>
              <span className="mx-1 text-slate-600">/</span>
              <span className="text-slate-400">Overview</span>
            </div>

            <div className="flex items-center gap-3">
              <button className="mc-btn mc-btn-ghost h-9 rounded-full px-4 text-xs">
                Import
              </button>
              <button className="mc-btn mc-btn-primary h-9 rounded-full px-4 text-xs">
                + Add
              </button>
            </div>
          </div>

          {/* Title + time range pills */}
          <div className="mb-6">
            <div className="text-3xl font-semibold tracking-tight">
              Dashboard
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {['12 months', '6 months', '30 days', '7 days', '24 hours'].map(
                (label, idx) => (
                  <button
                    key={label}
                    className={`rounded-full border px-3 py-1 ${
                      idx === 1
                        ? 'border-[var(--brand)] bg-[var(--brand)]/10 text-slate-50'
                        : 'border-white/5 text-slate-400 hover:border-white/15'
                    }`}
                  >
                    {label}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* KPI ROW */}
          <section className="mb-8 grid gap-4 md:grid-cols-3">
            {/* Account balance */}
            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent px-6 py-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Account balance
              </div>
              <div className="mt-3 text-2xl font-semibold">$171,610.25</div>
              <div className="mt-1 text-[11px] text-slate-400">
                Your current equity (mock data)
              </div>
              <div className="mt-3 text-[11px] text-emerald-400">
                +5.29% <span className="text-slate-400">vs last month</span>
              </div>
            </div>

            {/* Today PnL */}
            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent px-6 py-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Today&apos;s P&amp;L
              </div>
              <div className="mt-3 text-2xl font-semibold">+ $3,928.00</div>
              <div className="mt-1 text-[11px] text-slate-400">
                Realized &amp; unrealized (mock data)
              </div>
              <div className="mt-3 text-[11px] text-emerald-400">
                +1.42% <span className="text-slate-400">vs previous day</span>
              </div>
            </div>

            {/* Monthly PnL */}
            <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-white/[0.03] via-white/[0.01] to-transparent px-6 py-5">
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                Monthly P&amp;L
              </div>
              <div className="mt-3 text-2xl font-semibold">+ $12,450.90</div>
              <div className="mt-1 text-[11px] text-slate-400">
                From the start of this month (mock data)
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px]">
                <span className="text-emerald-400">
                  +8.15% <span className="text-slate-400">this month</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Live connection
                </span>
              </div>
            </div>
          </section>

          {/* PNL CURVE */}
          <section className="rounded-3xl border border-white/5 bg-gradient-to-b from-[#071628] via-[#050c18] to-[#02050d] px-6 py-6 md:px-8 md:py-7">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
                  P&amp;L since account opening
                </div>
                <div className="mt-1 text-[11px] text-slate-400">
                  Mock curve for design preview. We will plug real trading data
                  later.
                </div>
              </div>
              <div className="flex flex-col items-end text-right text-[11px] text-slate-400">
                <span className="text-xs text-slate-200">
                  Total P&amp;L&nbsp;&nbsp;
                  <span className="font-semibold text-emerald-400">
                    +$45,920.32
                  </span>
                </span>
                <span className="mt-1 text-emerald-400">+32.8% since opening</span>
              </div>
            </div>

            <div className="mt-6 h-[260px] w-full rounded-2xl bg-gradient-to-b from-[rgba(37,99,235,0.18)] via-[rgba(15,23,42,0.7)] to-[rgba(15,23,42,0.95)] p-5">
              <div className="relative h-full w-full">
                {/* Grid + curve */}
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <defs>
                    <linearGradient id="pnl-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#0b1120" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {[20, 40, 60, 80].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="100"
                      y2={y}
                      stroke="rgba(148,163,184,0.18)"
                      strokeWidth="0.3"
                    />
                  ))}

                  {linePath && (
                    <path
                      d={`${linePath} L 100 100 L 0 100 Z`}
                      fill="url(#pnl-fill)"
                    />
                  )}

                  {linePath && (
                    <path
                      d={linePath}
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  )}

                  {linePath && pnlHistory.length > 0 && (
                    <>
                      {(() => {
                        const last = pnlHistory[pnlHistory.length - 1];
                        const values = pnlHistory.map((p) => p.value);
                        const min = Math.min(...values);
                        const max = Math.max(...values);
                        const range = max - min || 1;
                        const index = pnlHistory.length - 1;
                        const x =
                          (index / Math.max(pnlHistory.length - 1, 1)) * 100;
                        const yNorm = (last.value - min) / range;
                        const y = 90 - yNorm * 70;

                        return (
                          <g key="highlight">
                            <circle
                              cx={x}
                              cy={y}
                              r="2.6"
                              fill="#0f172a"
                              stroke="#38bdf8"
                              strokeWidth="1.4"
                            />
                            <circle cx={x} cy={y} r="1" fill="#38bdf8" />
                          </g>
                        );
                      })()}
                    </>
                  )}
                </svg>

                {/* X-axis labels */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-between px-1 pb-1 text-[10px] text-slate-500">
                  {pnlHistory.map((p) => (
                    <span key={p.label}>{p.label}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
