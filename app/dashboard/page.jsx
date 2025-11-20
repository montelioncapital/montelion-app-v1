"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const balanceData = [
  { month: "Jan", value: 120000 },
  { month: "Feb", value: 132000 },
  { month: "Mar", value: 145000 },
  { month: "Apr", value: 143000 },
  { month: "May", value: 158000 },
  { month: "Jun", value: 171000 },
  { month: "Jul", value: 186000 },
];

const MONTELION_BLUE = "#2664EC";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#050814] text-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 flex flex-col">
        <div className="px-5 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-[rgba(38,100,236,0.18)] flex items-center justify-center">
              <span className="text-sm font-semibold" style={{ color: MONTELION_BLUE }}>
                M
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium tracking-tight">
                Montelion
              </span>
              <span className="text-[11px] text-slate-400">
                Managed trading
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="mt-5">
            <div className="h-9 w-full rounded-full border border-white/10 bg-black/40 px-3 text-xs text-slate-300 flex items-center justify-between">
              <span className="opacity-70">Search…</span>
              <span className="px-1.5 py-0.5 rounded bg-black/60 text-[9px] border border-white/10">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-4 py-6 text-xs">
          <p className="px-2 mb-2 text-[11px] font-medium tracking-[0.16em] text-slate-500">
            OVERVIEW
          </p>

          {/* Active item */}
          <button
            className="mb-1 w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium bg-black/70 border border-white/15"
            style={{ boxShadow: "0 0 0 1px rgba(38,100,236,0.55)" }}
          >
            <span
              className="h-6 w-6 rounded-full flex items-center justify-center text-[11px]"
              style={{ backgroundColor: "rgba(38,100,236,0.16)", color: MONTELION_BLUE }}
            >
              ▢
            </span>
            <span>Dashboard</span>
          </button>

          {/* Other items */}
          <button className="mb-1 w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-400 hover:bg-white/5">
            <span className="h-6 w-6 rounded-full border border-white/15 text-[11px] flex items-center justify-center">
              ⇄
            </span>
            <span>Trading</span>
          </button>

          <button className="mb-1 w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-400 hover:bg-white/5">
            <span className="h-6 w-6 rounded-full border border-white/15 text-[11px] flex items-center justify-center">
              ₿
            </span>
            <span>Accounts</span>
          </button>

          <button className="mb-1 w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-400 hover:bg-white/5">
            <span className="h-6 w-6 rounded-full border border-white/15 text-[11px] flex items-center justify-center">
              ⚠
            </span>
            <span>Risk</span>
          </button>

          <button className="w-full flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-slate-400 hover:bg-white/5">
            <span className="h-6 w-6 rounded-full border border-white/15 text-[11px] flex items-center justify-center">
              ⚙
            </span>
            <span>Settings</span>
          </button>
        </nav>

        {/* Support */}
        <div className="px-4 pb-5 pt-2 border-t border-white/5 text-[11px]">
          <button className="w-full flex items-center justify-between rounded-xl px-3 py-2 bg-black/70 border border-white/10 text-xs">
            <span className="flex items-center gap-2">
              <span className="h-5 w-5 rounded-full border border-white/15 flex items-center justify-center text-[11px]">
                ?
              </span>
              <span>Help center</span>
            </span>
            <span className="text-[10px] text-slate-400">24/7</span>
          </button>

          <div className="mt-4 text-[10px] text-slate-500">
            <div className="uppercase tracking-[0.14em] mb-1">
              Logged in as
            </div>
            <div className="text-slate-400">client@montelion.com</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col px-10 py-8 gap-6">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span>Dashboard</span>
              <span>/</span>
              <span className="text-slate-300">Overview</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 h-8">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: MONTELION_BLUE }}
              />
              <span className="text-slate-300">Live sync</span>
            </button>

            <button className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 h-8 text-slate-300">
              Last update · 2 min ago
            </button>

            <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/60 px-3 h-9">
              <div className="h-6 w-6 rounded-full bg-slate-700 flex items-center justify-center text-[11px] font-medium">
                MC
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-xs">Montelion Client</span>
                <span className="text-[10px] text-slate-400">
                  Private Hedge Fund
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
            <div className="text-[11px] tracking-[0.18em] text-slate-500 uppercase mb-3">
              Account balance
            </div>
            <div className="text-2xl font-semibold mb-1">$171,610.25</div>
            <p className="text-xs text-slate-400">Current equity</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
            <div className="text-[11px] tracking-[0.18em] text-slate-500 uppercase mb-3">
              Today&apos;s P&amp;L
            </div>
            <div
              className="text-2xl font-semibold mb-1"
              style={{ color: MONTELION_BLUE }}
            >
              +$3,928.00
            </div>
            <p className="text-xs text-slate-400">Realized &amp; unrealized</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/60 p-5">
            <div className="text-[11px] tracking-[0.18em] text-slate-500 uppercase mb-3">
              Monthly P&amp;L
            </div>
            <div
              className="text-2xl font-semibold mb-1"
              style={{ color: MONTELION_BLUE }}
            >
              +$12,450.90
            </div>
            <p className="text-xs text-slate-400">From the start of this month</p>
          </div>
        </section>

        {/* BALANCE CURVE CARD */}
        <section className="flex-1 rounded-2xl border border-white/10 bg-black/70 p-6 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-[11px] tracking-[0.18em] text-slate-500 uppercase mb-1">
                Balance curve
              </div>
              <p className="text-xs text-slate-400">
                Mock data for design preview. Real trading data will be plugged later.
              </p>
            </div>

            <div className="text-right text-xs">
              <div className="text-slate-400">Total P&amp;L</div>
              <div
                className="font-medium"
                style={{ color: MONTELION_BLUE }}
              >
                +32.8% since opening
              </div>
            </div>
          </div>

          <div className="flex-1 rounded-2xl border border-white/5 bg-black/80 px-6 py-5">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                <CartesianGrid vertical={false} stroke="rgba(148,163,184,0.15)" strokeDasharray="3 6" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    borderRadius: 10,
                    border: "1px solid rgba(148,163,184,0.35)",
                    fontSize: 11,
                  }}
                  labelStyle={{ color: "#e5e7eb", marginBottom: 4 }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Balance"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={MONTELION_BLUE}
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 5,
                    stroke: MONTELION_BLUE,
                    strokeWidth: 2,
                    fill: "#020617",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
