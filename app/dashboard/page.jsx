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
  ReferenceDot,
} from "recharts";

// Faux P&L depuis l'ouverture du compte
const pnlSinceOpening = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 18000 },
  { month: "Mar", value: 26000 },
  { month: "Apr", value: 24000 },
  { month: "May", value: 34000 },
  { month: "Jun", value: 42000 },
  { month: "Jul", value: 51000 },
  { month: "Aug", value: 62000 },
];

const formatCurrency = (v) =>
  `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const point = payload[0].payload;

  return (
    <div className="rounded-xl border border-white/10 bg-[#050814]/95 px-4 py-3 shadow-lg shadow-black/40 backdrop-blur-sm">
      <div className="text-xs text-slate-400">{label}</div>
      <div className="mt-1 text-sm font-semibold text-slate-50">
        {formatCurrency(point.value)}
      </div>
      <div className="text-[11px] text-slate-400">P&amp;L since opening</div>
    </div>
  );
};

export default function DashboardPage() {
  const lastPoint = pnlSinceOpening[pnlSinceOpening.length - 1];

  return (
    <div className="dashboard-root">
      {/* --- SIDEBAR --- */}
      <aside className="flex w-[260px] flex-col border-r border-white/5 bg-[radial-gradient(circle_at_top_left,#192446_0%,#050814_45%,#02040a_100%)] px-5 pt-8 pb-6">
        {/* Brand / avatar */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2664EC] text-sm font-semibold text-white shadow-[0_0_25px_rgba(38,100,236,0.65)]">
            17
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-slate-50">
              Montelion Capital
            </span>
            <span className="text-[11px] text-slate-400">
              Managed trading dashboard
            </span>
          </div>
        </div>

        {/* Search */}
        <button className="mt-6 flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-xs text-slate-400 outline-none transition hover:border-white/15 hover:bg-white/[0.08]">
          <span className="text-[10px] rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] text-slate-400">
            ⌘K
          </span>
          <span className="text-[12px]">Search</span>
        </button>

        {/* Sections */}
        <div className="mt-6 space-y-6 text-[11px]">
          <div>
            <div className="mb-2 text-[11px] font-medium tracking-[0.16em] text-slate-500">
              GENERAL
            </div>
            <button className="flex w-full items-center justify-between rounded-xl bg-white/[0.06] px-3 py-2 text-left text-[13px] text-slate-50 shadow-[0_0_0_1px_rgba(255,255,255,0.08)]">
              <span className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5 text-[11px]">
                  ⬜
                </span>
                <span>Dashboard</span>
              </span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            </button>
          </div>

          <div>
            <div className="mb-2 text-[11px] font-medium tracking-[0.16em] text-slate-500">
              TRADING
            </div>
            <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] text-slate-400 hover:bg-white/[0.03]">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/5 text-[11px]">
                B
              </span>
              Trading
            </button>
          </div>

          <div>
            <div className="mb-2 text-[11px] font-medium tracking-[0.16em] text-slate-500">
              ACCOUNT
            </div>
            <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] text-slate-400 hover:bg-white/[0.03]">
              ⚙️ Settings
            </button>
            <button className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] text-slate-400 hover:bg-white/[0.03]">
              🔔 Notifications
            </button>
          </div>
        </div>

        <div className="mt-auto pt-4 text-[11px] text-slate-500">
          <div className="text-[10px] uppercase tracking-[0.16em] text-slate-600">
            Logged in as
          </div>
          <div className="text-[11px] text-slate-300">montelion.capital</div>
        </div>
      </aside>

      {/* --- MAIN --- */}
      <main className="dashboard-main px-10 pb-10 pt-8">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            <span className="text-slate-400">Dashboard</span>
            <span className="mx-1">/</span>
            <span className="text-slate-500">Overview</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold tracking-tight text-slate-50">
          Dashboard
        </h1>

        {/* Metric cards */}
        <section className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Balance */}
          <div className="rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_top_left,#111827_0%,#050814_40%,#040713_100%)] px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.65)]">
            <div className="text-[11px] font-medium tracking-[0.16em] text-slate-500">
              ACCOUNT BALANCE
            </div>
            <div className="mt-3 text-2xl font-semibold text-slate-50">
              $171,610.25
            </div>
            <div className="mt-1 text-[12px] text-slate-400">
              Your current equity (mock data)
            </div>
          </div>

          {/* Today P&L */}
          <div className="rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_top_left,#111827_0%,#050814_40%,#040713_100%)] px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.65)]">
            <div className="text-[11px] font-medium tracking-[0.16em] text-slate-500">
              TODAY&apos;S P&amp;L
            </div>
            <div className="mt-3 text-2xl font-semibold text-emerald-400">
              + $3,928.00
            </div>
            <div className="mt-1 text-[12px] text-slate-400">
              Realized &amp; unrealized (mock data)
            </div>
          </div>

          {/* Monthly P&L */}
          <div className="rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_top_left,#111827_0%,#050814_40%,#040713_100%)] px-5 py-4 shadow-[0_18px_40px_rgba(0,0,0,0.65)]">
            <div className="text-[11px] font-medium tracking-[0.16em] text-slate-500">
              MONTHLY P&amp;L
            </div>
            <div className="mt-3 text-2xl font-semibold text-emerald-400">
              + $12,450.90
            </div>
            <div className="mt-1 text-[12px] text-slate-400">
              From the start of this month (mock data)
            </div>
          </div>
        </section>

        {/* P&L curve */}
        <section className="mt-8 rounded-3xl border border-white/5 bg-[radial-gradient(circle_at_top,#111827_0%,#050814_45%,#02040a_100%)] px-6 pb-6 pt-5 shadow-[0_24px_60px_rgba(0,0,0,0.8)]">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium tracking-[0.16em] text-slate-500">
                P&amp;L SINCE ACCOUNT OPENING
              </div>
              <div className="mt-1 text-[12px] text-slate-400">
                Mock curve for design preview. We will plug real trading data
                later.
              </div>
            </div>
            <div className="text-right text-xs text-emerald-300">
              <div className="font-semibold">
                {formatCurrency(lastPoint.value)}
              </div>
              <div className="text-[11px] text-emerald-400/80">
                +32.8% since opening
              </div>
            </div>
          </div>

          <div className="h-[360px] w-full rounded-2xl bg-gradient-to-b from-slate-900/60 via-[#050814] to-[#02040a] p-[1px]">
            <div className="h-full w-full rounded-[18px] bg-[radial-gradient(circle_at_top,#1b2550_0%,#050814_45%,#02040a_100%)]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={pnlSinceOpening}
                  margin={{ top: 40, right: 40, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="pnlAreaGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#4FD1FF"
                        stopOpacity={0.45}
                      />
                      <stop
                        offset="80%"
                        stopColor="#2664EC"
                        stopOpacity={0}
                      />
                    </linearGradient>

                    <filter
                      id="softGlow"
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur
                        stdDeviation="10"
                        result="coloredBlur"
                      />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <CartesianGrid
                    stroke="#1F2937"
                    strokeDasharray="4 8"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#6B7280", fontSize: 12 }}
                    tickMargin={14}
                  />
                  <YAxis
                    hide
                    domain={["dataMin - 5000", "dataMax + 5000"]}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "rgba(148,163,184,0.35)",
                      strokeWidth: 1,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4FD1FF"
                    strokeWidth={3}
                    fill="url(#pnlAreaGradient)"
                    filter="url(#softGlow)"
                    dot={false}
                    activeDot={false}
                  />
                  {/* Point final mis en avant */}
                  <ReferenceDot
                    x={lastPoint.month}
                    y={lastPoint.value}
                    r={5}
                    fill="#0ea5e9"
                    stroke="#e0f2fe"
                    strokeWidth={2}
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
