// app/dashboard/page.jsx
"use client";

import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Faux P&L (balance) data
const pnlData = [
  { month: "Jan", value: 17000 },
  { month: "Feb", value: 21500 },
  { month: "Mar", value: 28500 },
  { month: "Apr", value: 27200 },
  { month: "May", value: 34500 },
  { month: "Jun", value: 41200 },
  { month: "Jul", value: 50500 },
  { month: "Aug", value: 62000 },
];

const formatCurrency = (v) =>
  `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

// Tooltip custom Recharts
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  const v = payload[0].value;
  return (
    <div className="rounded-lg border border-white/10 bg-slate-900/90 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <div className="mb-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
        {label}
      </div>
      <div className="text-sm font-semibold text-slate-50">
        {formatCurrency(v)}
      </div>
    </div>
  );
};

// Icônes simples (style Quantix)
const IconDashboard = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="3" width="7" height="5" rx="2" />
    <rect x="14" y="11" width="7" height="10" rx="2" />
    <rect x="3" y="13" width="7" height="8" rx="2" />
  </svg>
);

const IconTrading = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M4 18L9 9l4 6 4-10 3 6" />
    <path d="M3 20h18" />
  </svg>
);

const IconSettings = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
    <path d="M19.4 13a7.97 7.97 0 000-2l2.1-1.6a.5.5 0 00.1-.6l-2-3.5a.5.5 0 00-.6-.2l-2.5 1a8 8 0 00-1.7-1L14.3 2.5a.5.5 0 00-.5-.5h-3.6a.5.5 0 00-.5.5L9.1 5.1a8 8 0 00-1.7 1l-2.5-1a.5.5 0 00-.6.2l-2 3.5a.5.5 0 00.1.6L4.6 11a7.97 7.97 0 000 2l-2.1 1.6a.5.5 0 00-.1.6l2 3.5a.5.5 0 00.6.2l2.5-1a8 8 0 001.7 1l.6 2.6a.5.5 0 00.5.5h3.6a.5.5 0 00.5-.5l.6-2.6a8 8 0 001.7-1l2.5 1a.5.5 0 00.6-.2l2-3.5a.5.5 0 00-.1-.6L19.4 13z" />
  </svg>
);

const IconBell = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <path d="M6 17h12" />
    <path d="M8 17V10a4 4 0 018 0v7" />
    <path d="M10 17a2 2 0 004 0" />
  </svg>
);

export default function DashboardPage() {
  return (
    <div className="dashboard-root">
      {/* SIDEBAR */}
      <aside className="flex w-[260px] flex-col border-r border-white/5 bg-[radial-gradient(circle_at_top_left,#111827_0%,#050814_45%,#020617_100%)] px-5 pt-6 pb-4">
        {/* Logo + titre */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2664EC] text-sm font-semibold text-white">
            17
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-slate-50">
              Montelion Capital
            </span>
            <span className="text-[11px] text-slate-400">
              Managed trading dashboard
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400">
            <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-slate-300">
              ⌘K
            </span>
            <span>Search</span>
          </div>
        </div>

        {/* GENERAL */}
        <div className="mt-8">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            General
          </div>

          {/* Dashboard actif */}
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#2664EC]/40 bg-[#0B1220] px-3 py-2">
            <IconDashboard className="h-4 w-4 flex-none stroke-[1.7] text-slate-50" />
            <span className="text-sm font-medium text-slate-50">
              Dashboard
            </span>
            <span className="ml-auto h-2 w-2 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* TRADING */}
        <div className="mt-7">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Trading
          </div>
          <button className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5">
            <IconTrading className="h-4 w-4 flex-none stroke-[1.7] text-slate-400" />
            <span>Trading</span>
          </button>
        </div>

        {/* ACCOUNT */}
        <div className="mt-7">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Account
          </div>
          <button className="mt-3 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5">
            <IconSettings className="h-4 w-4 flex-none stroke-[1.6] text-slate-400 fill-transparent" />
            <span>Settings</span>
          </button>
          <button className="mt-1.5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-slate-300 transition hover:bg-white/5">
            <IconBell className="h-4 w-4 flex-none stroke-[1.7] text-slate-400" />
            <span>Notifications</span>
          </button>
        </div>

        {/* Logged in */}
        <div className="mt-auto pt-6 text-[11px] text-slate-500">
          <div className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
            Logged in as
          </div>
          <div className="mt-1 text-xs text-slate-300">montelion.capital</div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main px-10 py-8">
        {/* Breadcrumb */}
        <div className="text-xs text-slate-500">
          <span>Dashboard</span>
          <span className="mx-1.5 text-slate-600">/</span>
          <span className="text-slate-400">Overview</span>
        </div>

        {/* Title */}
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-slate-50">
          Dashboard
        </h1>

        {/* Metric cards */}
        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Account balance */}
          <div className="rounded-2xl border border-white/10 bg-[#050814]/90 px-5 py-4 backdrop-blur-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Account balance
            </div>
            <div className="mt-3 text-2xl font-semibold text-slate-50">
              $171,610.25
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Your current equity (mock data)
            </div>
          </div>

          {/* Today P&L */}
          <div className="rounded-2xl border border-white/10 bg-[#050814]/90 px-5 py-4 backdrop-blur-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Today&apos;s P&amp;L
            </div>
            <div className="mt-3 text-2xl font-semibold text-emerald-400">
              + $3,928.00
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Realized &amp; unrealized (mock data)
            </div>
          </div>

          {/* Monthly P&L */}
          <div className="rounded-2xl border border-white/10 bg-[#050814]/90 px-5 py-4 backdrop-blur-sm">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Monthly P&amp;L
            </div>
            <div className="mt-3 text-2xl font-semibold text-emerald-400">
              + $12,450.90
            </div>
            <div className="mt-1 text-xs text-slate-400">
              From the start of this month (mock data)
            </div>
          </div>
        </section>

        {/* Chart section */}
        <section className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-b from-[#050814] via-[#020617] to-[#02040a] px-6 pb-6 pt-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                P&amp;L since account opening
              </div>
              <p className="mt-1 text-xs text-slate-400">
                Mock curve for design preview. We will plug real trading data
                later.
              </p>
            </div>
            <div className="text-right text-xs text-slate-300">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500">
                Total P&amp;L
              </div>
              <div className="mt-1 text-sm font-semibold text-emerald-400">
                +$62,000{" "}
                <span className="ml-1 text-[11px] font-normal text-emerald-300">
                  +32.8% since opening
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 h-[340px] w-full rounded-2xl bg-[#050814] p-[1px]">
            <div className="h-full w-full rounded-[18px] bg-[radial-gradient(circle_at_top,#111827_0%,#050814_55%,#020617_100%)]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={pnlData}
                  margin={{ top: 40, right: 32, left: 32, bottom: 32 }}
                >
                  <defs>
                    {/* fond de zone */}
                    <linearGradient
                      id="pnlAreaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#4FD1FF" stopOpacity={0.45} />
                      <stop offset="60%" stopColor="#2664EC" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#020617" stopOpacity={0} />
                    </linearGradient>

                    {/* lueur douce */}
                    <filter
                      id="softGlow"
                      x="-40%"
                      y="-40%"
                      width="180%"
                      height="180%"
                    >
                      <feGaussianBlur
                        stdDeviation="6"
                        result="coloredBlur"
                      />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.12)"
                    strokeDasharray="3 8"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={12}
                    tick={{ fill: "rgba(148,163,184,0.9)", fontSize: 11 }}
                  />
                  <YAxis
                    hide
                    domain={["dataMin - 4000", "dataMax + 4000"]}
                  />

                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ stroke: "rgba(148,163,184,0.4)", strokeWidth: 1 }}
                  />

                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4FD1FF"
                    strokeWidth={2.5}
                    fill="url(#pnlAreaGradient)"
                    filter="url(#softGlow)"
                    dot={false}
                    activeDot={{
                      r: 5,
                      fill: "#ffffff",
                      stroke: "#4FD1FF",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
