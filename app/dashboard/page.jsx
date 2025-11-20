"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Faux P&L cumulatif depuis l'ouverture du compte
const pnlData = [
  { month: "Jan", value: 125000 },
  { month: "Feb", value: 131500 },
  { month: "Mar", value: 138200 },
  { month: "Apr", value: 136400 },
  { month: "May", value: 144800 },
  { month: "Jun", value: 153600 },
  { month: "Jul", value: 162900 },
  { month: "Aug", value: 171610 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0].value;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/95 px-3 py-2 text-xs shadow-lg">
      <div className="mb-1 text-slate-400">{label}</div>
      <div className="font-medium text-sky-300">
        Balance{" "}
        {value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        })}
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="dashboard-root">
      {/* SIDEBAR */}
      <aside className="hidden h-screen w-72 flex-col border-r border-white/5 bg-[#05070f]/95 px-5 py-6 md:flex">
        {/* Logo + name */}
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2664EC] text-sm font-semibold">
            17
          </div>
          <div>
            <div className="text-sm font-medium">Montelion Capital</div>
            <div className="text-xs text-slate-400">
              Managed trading dashboard
            </div>
          </div>
        </div>

        {/* Search */}
        <button className="mb-6 flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-xs text-slate-400">
          <span className="text-[11px]">⌘K</span>
          <span className="text-[11px]">Search</span>
        </button>

        {/* Nav */}
        <div className="flex-1 space-y-6 text-xs">
          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
              General
            </div>
            <button className="flex w-full items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-[13px] text-slate-100">
              <span>Dashboard</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
            </button>
          </div>

          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Trading
            </div>
            <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13px] text-slate-400 hover:bg-white/5">
              <span>Trading</span>
            </button>
          </div>

          <div>
            <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
              Account
            </div>
            <div className="space-y-1">
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13px] text-slate-400 hover:bg-white/5">
                <span>Settings</span>
              </button>
              <button className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-[13px] text-slate-400 hover:bg-white/5">
                <span>Notifications</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/5 pt-4 text-[11px] text-slate-500">
          Logged in as
          <div className="text-slate-300">montelion.capital</div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main flex-1">
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-12 lg:py-10">
          {/* Top bar */}
          <div className="mb-6 flex items-center justify-between text-xs text-slate-400">
            <div>
              <span className="text-slate-500">Dashboard</span>
              <span className="px-1">/</span>
              <span className="text-slate-300">Overview</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-50">
            Dashboard
          </h1>

          {/* Stat cards */}
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {/* Account balance */}
            <div className="rounded-2xl border border-white/5 bg-[#070b14]/90 px-6 py-5">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Account balance
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight">
                $171,610.25
              </div>
              <div className="mt-2 text-xs text-slate-400">
                Your current equity (mock data)
              </div>
            </div>

            {/* Today P&L */}
            <div className="rounded-2xl border border-white/5 bg-[#070b14]/90 px-6 py-5">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Today&apos;s P&amp;L
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight text-emerald-400">
                + $3,928.00
              </div>
              <div className="mt-2 text-xs text-slate-400">
                Realized &amp; unrealized (mock data)
              </div>
            </div>

            {/* Monthly P&L */}
            <div className="rounded-2xl border border-white/5 bg-[#070b14]/90 px-6 py-5">
              <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Monthly P&amp;L
              </div>
              <div className="mt-3 text-2xl font-semibold tracking-tight text-emerald-400">
                + $12,450.90
              </div>
              <div className="mt-2 text-xs text-slate-400">
                From the start of this month (mock data)
              </div>
            </div>
          </div>

          {/* Main chart */}
          <section className="mt-8 flex-1 rounded-3xl border border-white/5 bg-[radial-gradient(1600px_900px_at_50%_120%,rgba(37,99,235,0.35)_0%,#050814_40%,#050814_100%)] px-6 pb-6 pt-5 lg:px-8">
            <div className="flex items-start justify-between text-xs">
              <div>
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  P&amp;L since account opening
                </div>
                <div className="mt-1 text-slate-400">
                  Mock curve for design preview. We will plug real trading data
                  later.
                </div>
              </div>
              <div className="text-right">
                <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Total P&amp;L
                </div>
                <div className="mt-1 text-[13px] font-medium text-emerald-400">
                  +$45,920.32{" "}
                  <span className="text-xs text-emerald-500">
                    · +32.8% since opening
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 h-[320px] rounded-2xl border border-white/5 bg-gradient-to-b from-[#050814]/40 via-[#050814]/90 to-[#020309]/95 px-4 py-4 sm:px-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={pnlData}
                  margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
                >
                  <defs>
                    <linearGradient
                      id="pnlLine"
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="0"
                    >
                      <stop
                        offset="0%"
                        stopColor="#38bdf8"
                        stopOpacity={0.9}
                      />
                      <stop
                        offset="100%"
                        stopColor="#2664EC"
                        stopOpacity={0.95}
                      />
                    </linearGradient>
                  </defs>

                  <CartesianGrid
                    stroke="rgba(148, 163, 184, 0.12)"
                    strokeDasharray="3 6"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tickMargin={10}
                    tick={{ fontSize: 11, fill: "#9CA3AF" }}
                  />
                  <YAxis hide domain={["dataMin - 4000", "dataMax + 4000"]} />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      stroke: "rgba(148,163,184,0.35)",
                      strokeWidth: 1,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="url(#pnlLine)"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{
                      r: 6,
                      strokeWidth: 2,
                      stroke: "#38bdf8",
                      fill: "#0f172a",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
