"use client";

import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const balanceData = [
  { month: "Jan", value: 24000 },
  { month: "Feb", value: 27500 },
  { month: "Mar", value: 31000 },
  { month: "Apr", value: 30000 },
  { month: "May", value: 34500 },
  { month: "Jun", value: 38800 },
  { month: "Jul", value: 43200 },
  { month: "Aug", value: 46200 },
];

// petit helper pour afficher les valeurs
const formatCurrency = (v) =>
  `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;

// tooltip custom (fond sombre + bord bleu)
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0];

  return (
    <div className="rounded-xl border border-white/10 bg-slate-900/95 px-4 py-3 text-xs shadow-none">
      <div className="mb-1 text-[10px] uppercase tracking-[0.16em] text-slate-400">
        {label}
      </div>
      <div className="text-sm font-medium text-white">
        {formatCurrency(point.value)}
      </div>
      <div className="mt-1 text-[11px] text-emerald-400">Total equity</div>
    </div>
  );
};

export default function DashboardPage() {
  const totalPnl = 62000;
  const totalPnlPct = 32.8;

  return (
    <div className="dashboard-root">
      {/* SIDEBAR */}
      <aside className="flex h-screen w-72 flex-col border-r border-white/5 bg-gradient-to-b from-slate-950/95 via-slate-950/90 to-slate-950/98 px-6 py-6">
        {/* Logo / brand */}
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600">
            {/* M logo minimaliste */}
            <span className="text-sm font-semibold text-white">M</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium tracking-[0.2em] text-slate-400 uppercase">
              Montelion
            </span>
            <span className="text-xs text-slate-500">
              Managed trading dashboard
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-slate-900/60 px-3 py-2 text-sm text-slate-300">
            {/* Icône search */}
            <svg
              viewBox="0 0 20 20"
              className="h-4 w-4 text-slate-400"
              aria-hidden="true"
            >
              <path
                d="M9 3.5a5.5 5.5 0 0 1 4.384 8.76l2.178 2.178a1 1 0 0 1-1.414 1.414l-2.178-2.178A5.5 5.5 0 1 1 9 3.5zm0 2A3.5 3.5 0 1 0 9 12a3.5 3.5 0 0 0 0-7.5z"
                fill="currentColor"
              />
            </svg>
            <span className="text-xs text-slate-400">Search</span>
          </div>
        </div>

        {/* Sections */}
        <nav className="flex-1 space-y-6 text-sm">
          {/* GENERAL */}
          <div>
            <div className="mb-2 text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
              General
            </div>
            <div className="space-y-1">
              {/* Dashboard active */}
              <button className="group flex w-full items-center justify-between rounded-xl border border-sky-500/40 bg-sky-500/15 px-3 py-2 text-left text-[13px] text-slate-50 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                <div className="flex items-center gap-2">
                  {/* grid icon */}
                  <svg
                    viewBox="0 0 20 20"
                    className="h-4 w-4 text-sky-400"
                    aria-hidden="true"
                  >
                    <rect
                      x="3"
                      y="3"
                      width="5"
                      height="5"
                      rx="1.2"
                      fill="currentColor"
                    />
                    <rect
                      x="12"
                      y="3"
                      width="5"
                      height="5"
                      rx="1.2"
                      fill="currentColor"
                    />
                    <rect
                      x="3"
                      y="12"
                      width="5"
                      height="5"
                      rx="1.2"
                      fill="currentColor"
                    />
                    <rect
                      x="12"
                      y="12"
                      width="5"
                      height="5"
                      rx="1.2"
                      fill="currentColor"
                    />
                  </svg>
                  <span>Dashboard</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
              </button>
            </div>
          </div>

          {/* TRADING */}
          <div>
            <div className="mb-2 text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
              Trading
            </div>
            <div className="space-y-1">
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] text-slate-400 hover:bg-slate-900/60 hover:text-slate-100">
                {/* trend icon */}
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 text-slate-500"
                  aria-hidden="true"
                >
                  <path
                    d="M4 12.5 8 8l3 3 5-6.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.5 4H16v3.5"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Trading</span>
              </button>
            </div>
          </div>

          {/* ACCOUNT */}
          <div>
            <div className="mb-2 text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
              Account
            </div>
            <div className="space-y-1">
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] text-slate-400 hover:bg-slate-900/60 hover:text-slate-100">
                {/* settings icon */}
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 text-slate-500"
                  aria-hidden="true"
                >
                  <path
                    d="M10 6.5a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                  />
                  <path
                    d="M4.4 7.1 5.4 5.4 7 4.4M4.4 12.9 5.4 14.6 7 15.6M12.9 4.4 14.6 5.4 15.6 7M12.9 15.6 14.6 14.6 15.6 12.9"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                  />
                </svg>
                <span>Settings</span>
              </button>
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-[13px] text-slate-400 hover:bg-slate-900/60 hover:text-slate-100">
                {/* bell icon */}
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4 text-slate-500"
                  aria-hidden="true"
                >
                  <path
                    d="M10 16.5a2 2 0 0 0 1.8-1.1M4.5 7.8A4.7 4.7 0 0 1 10 3a4.7 4.7 0 0 1 5.5 4.8c0 3 .8 4 1.1 4.4.2.2.1.5-.2.5H3.6c-.3 0-.4-.3-.2-.5.3-.4 1.1-1.4 1.1-4.4Z"
                    stroke="currentColor"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Notifications</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="mt-4 border-t border-white/5 pt-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-slate-500 mb-1">
            Logged in as
          </div>
          <div className="text-xs text-slate-300">montelion.capital</div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main flex flex-col overflow-y-auto px-10 py-8">
        {/* Breadcrumb + title */}
        <header className="mb-8">
          <div className="mb-1 text-xs text-slate-500">
            Dashboard <span className="mx-1">/</span>{" "}
            <span className="text-slate-400">Overview</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-slate-50">
            Dashboard
          </h1>
        </header>

        {/* 3 cards top: balance / day / month */}
        <section className="mb-8 grid grid-cols-1 gap-5 xl:grid-cols-3">
          {/* Card helper */}
          <div className="rounded-2xl border border-white/8 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_55%),linear-gradient(to_bottom,_rgba(15,23,42,0.95),_rgba(15,23,42,0.9))] px-6 py-5">
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
              Account balance
            </div>
            <div className="text-[26px] font-semibold tracking-tight text-slate-50">
              $171,610.25
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Your current equity (mock data)
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/35 bg-[radial-gradient(circle_at_top,_rgba(52,211,153,0.15),_transparent_55%),linear-gradient(to_bottom,_rgba(15,23,42,0.95),_rgba(15,23,42,0.9))] px-6 py-5">
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
              Today&apos;s P&amp;L
            </div>
            <div className="text-[26px] font-semibold tracking-tight text-emerald-400">
              + $3,928.00
            </div>
            <div className="mt-2 text-xs text-slate-400">
              Realized &amp; unrealized (mock data)
            </div>
          </div>

          <div className="rounded-2xl border border-sky-500/35 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_55%),linear-gradient(to_bottom,_rgba(15,23,42,0.95),_rgba(15,23,42,0.9))] px-6 py-5">
            <div className="mb-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
              Monthly P&amp;L
            </div>
            <div className="text-[26px] font-semibold tracking-tight text-emerald-400">
              + $12,450.90
            </div>
            <div className="mt-2 text-xs text-slate-400">
              From the start of this month (mock data)
            </div>
          </div>
        </section>

        {/* BIG CHART */}
        <section className="rounded-3xl border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.12),_transparent_55%),linear-gradient(to_bottom,_rgba(7,15,35,0.98),_rgba(3,6,18,0.98))] px-7 py-6">
          {/* header row */}
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="mb-1 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-400">
                P&amp;L since account opening
              </div>
              <p className="text-xs text-slate-500">
                Mock curve for design preview. Real trading data will be plugged
                later.
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-slate-400">Total P&amp;L</div>
              <div className="text-sm font-semibold text-emerald-400">
                +{formatCurrency(totalPnl)}{" "}
                <span className="ml-1 text-xs text-emerald-400/75">
                  +{totalPnlPct}%
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 h-[320px] rounded-2xl border border-white/5 bg-gradient-to-b from-slate-900/40 via-slate-950/40 to-slate-950/90 px-4 py-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={balanceData}
                margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
              >
                <defs>
                  <linearGradient id="balanceArea" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="#38bdf8"
                      stopOpacity={0.85}
                    />
                    <stop
                      offset="80%"
                      stopColor="#38bdf8"
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="gridFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#64748b" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#1e293b" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="url(#gridFade)"
                  strokeDasharray="3 8"
                  horizontal={true}
                  vertical={false}
                />

                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  tick={{
                    fill: "#64748b",
                    fontSize: 11,
                  }}
                />

                <Tooltip
                  cursor={{ stroke: "#38bdf8", strokeWidth: 1, opacity: 0.5 }}
                  content={<CustomTooltip />}
                />

                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#38bdf8"
                  strokeWidth={2.4}
                  fill="url(#balanceArea)"
                  activeDot={{
                    r: 5,
                    strokeWidth: 2,
                    stroke: "#e5f3ff",
                    fill: "#0ea5e9",
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
      </main>
    </div>
  );
}
