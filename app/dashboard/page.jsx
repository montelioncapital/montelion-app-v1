// app/dashboard/page.jsx
"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Faux historique de P&L cumulée depuis l’ouverture du compte
const pnlData = [
  { month: "Jan", value: 8200 },
  { month: "Feb", value: 13150 },
  { month: "Mar", value: 17680 },
  { month: "Apr", value: 16840 },
  { month: "May", value: 22790 },
  { month: "Jun", value: 29840 },
  { month: "Jul", value: 38120 },
  { month: "Aug", value: 45920 },
];

function PnlTooltip({ active, payload, label }) {
  if (!active || !payload || !payload.length) return null;

  const v = payload[0].value;

  return (
    <div className="rounded-full border border-white/10 bg-slate-950/95 px-4 py-2 text-xs shadow-lg">
      <div className="text-slate-300">{label}</div>
      <div className="text-[13px] font-semibold text-emerald-400">
        P&amp;L: +${v.toLocaleString("en-US")}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const last = pnlData[pnlData.length - 1];

  return (
    <main className="dashboard-root">
      {/* SIDEBAR */}
      <aside className="hidden md:flex w-72 flex-col border-r border-white/5 bg-black/40 backdrop-blur-xl">
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#2664EC] flex items-center justify-center text-sm font-semibold">
            17
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Montelion Capital</span>
            <span className="text-xs text-slate-400">
              Managed trading dashboard
            </span>
          </div>
        </div>

        <div className="px-4">
          <div className="rounded-xl bg-white/[0.02] border border-white/5 px-3 py-2 text-xs flex items-center gap-2 text-slate-400">
            <span className="text-[10px] rounded bg-white/5 px-1.5 py-0.5">
              ⌘K
            </span>
            <span>Search</span>
          </div>
        </div>

        <nav className="mt-6 flex-1 px-2 text-sm">
          <p className="px-4 text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-2">
            General
          </p>
          <button className="w-full flex items-center gap-3 rounded-lg px-4 py-2.5 bg-white/[0.06] border border-white/10 text-slate-50">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.05]">
              ⬛
            </span>
            <span className="flex-1 text-left">Dashboard</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </button>

          <button className="mt-1 w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-slate-400 hover:bg-white/[0.02]">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.02]">
              B
            </span>
            <span className="flex-1 text-left">Trading</span>
          </button>

          <p className="mt-6 px-4 text-[11px] uppercase tracking-[0.18em] text-slate-500 mb-2">
            Account
          </p>
          <button className="w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-slate-400 hover:bg-white/[0.02]">
            <span>⚙️</span>
            <span className="flex-1 text-left">Settings</span>
          </button>
          <button className="mt-1 w-full flex items-center gap-3 rounded-lg px-4 py-2.5 text-slate-400 hover:bg-white/[0.02]">
            <span>🔔</span>
            <span className="flex-1 text-left">Notifications</span>
          </button>
        </nav>

        <div className="px-6 py-4 text-[11px] text-slate-500 border-t border-white/5">
          Logged in as
          <div className="text-slate-300">montelion.capital</div>
        </div>
      </aside>

      {/* MAIN */}
      <section className="dashboard-main overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 lg:py-10">
          {/* HEADER */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-xs text-slate-500">
                Dashboard / <span className="text-slate-300">Overview</span>
              </div>
              <h1 className="text-3xl font-semibold tracking-[-0.03em]">
                Dashboard
              </h1>
            </div>
          </div>

          {/* KPI CARDS */}
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5">
              <p className="text-xs tracking-[0.18em] uppercase text-slate-500">
                Account balance
              </p>
              <p className="mt-3 text-2xl font-semibold">$171,610.25</p>
              <p className="mt-1 text-xs text-slate-500">
                Your current equity (mock data)
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5">
              <p className="text-xs tracking-[0.18em] uppercase text-slate-500">
                Today&apos;s P&amp;L
              </p>
              <p className="mt-3 text-2xl font-semibold text-emerald-400">
                + $3,928.00
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Realized &amp; unrealized (mock data)
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5">
              <p className="text-xs tracking-[0.18em] uppercase text-slate-500">
                Monthly P&amp;L
              </p>
              <p className="mt-3 text-2xl font-semibold text-emerald-400">
                + $12,450.90
              </p>
              <p className="mt-1 text-xs text-slate-500">
                From the start of this month (mock data)
              </p>
            </div>
          </div>

          {/* MAIN CHART */}
          <div className="mt-8 rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_top,_#182a52_0%,_#050814_55%)] px-6 pt-5 pb-7">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div>
                <p className="text-xs tracking-[0.18em] uppercase text-slate-500">
                  P&amp;L since account opening
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Mock curve for design preview. We will plug real trading data
                  later.
                </p>
              </div>
              <div className="text-right text-xs">
                <p className="text-slate-400">Total P&amp;L</p>
                <p className="text-emerald-400 font-medium">
                  +${last.value.toLocaleString("en-US")}
                  <span className="text-[11px] text-emerald-300">
                    {" "}
                    · +32.8% since opening
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/5 bg-black/20 p-4 lg:p-6">
              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={pnlData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="pnlArea" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity={0.7} />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      stroke="rgba(148,163,184,0.25)"
                      strokeDasharray="4 6"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tick={{ fill: "rgba(148,163,184,0.8)", fontSize: 11 }}
                    />
                    <YAxis
                      hide
                      domain={["dataMin - 2000", "dataMax + 2000"]}
                    />
                    <Tooltip content={<PnlTooltip />} cursor={false} />

                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={3.5}
                      fill="url(#pnlArea)"
                      dot={{
                        r: 0,
                      }}
                      activeDot={{
                        r: 6,
                        stroke: "#38bdf8",
                        strokeWidth: 3,
                        fill: "#020617",
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
