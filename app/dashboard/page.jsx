"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  CartesianGrid,
} from "recharts";

const balanceData = [
  { month: "Jan", value: 171000 },
  { month: "Feb", value: 182500 },
  { month: "Mar", value: 196300 },
  { month: "Apr", value: 193000 },
  { month: "May", value: 212400 },
  { month: "Jun", value: 233800 },
  { month: "Jul", value: 251200 },
  { month: "Aug", value: 262000 },
];

// --- Petites icônes maison (pas de nouvelle dépendance) ---

function IconLogo() {
  return (
    <svg
      viewBox="0 0 32 32"
      className="h-8 w-8 text-sky-400"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect
        x="3"
        y="3"
        width="26"
        height="26"
        rx="9"
        fill="url(#logoGradient)"
        opacity="0.9"
      />
      <path
        d="M11 20.5 15 13l3 4 3-5.5"
        fill="none"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="11" cy="20.5" r="1.2" fill="white" />
      <circle cx="18" cy="17" r="1.2" fill="white" />
      <circle cx="21" cy="11.5" r="1.2" fill="white" />
    </svg>
  );
}

function IconDashboard() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
      stroke="currentColor"
      fill="none"
    >
      <rect x="3" y="3" width="7" height="7" rx="2" />
      <rect x="14" y="3" width="7" height="5" rx="2" />
      <rect x="3" y="14" width="5" height="7" rx="2" />
      <rect x="12" y="12" width="9" height="9" rx="2" />
    </svg>
  );
}

function IconTrading() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
      stroke="currentColor"
      fill="none"
    >
      <path
        d="M4 17 9.5 9.5 14 14l6-9"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M15 5h5v5" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function IconSettings() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
      stroke="currentColor"
      fill="none"
    >
      <circle cx="12" cy="12" r="3.2" strokeWidth="1.6" />
      <path
        d="M4 12.5h1.1a1 1 0 0 0 .95-.68l.28-.8a1 1 0 0 0-.24-1.02L5.3 9"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M9 4.5 9.5 5.6a1 1 0 0 0 .9.6h1.2"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M15 19.5 14.5 18.4a1 1 0 0 0-.9-.6h-1.2"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M19.7 9 17.7 10a1 1 0 0 0-.5.76l-.05.9"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBell() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      aria-hidden="true"
      stroke="currentColor"
      fill="none"
    >
      <path
        d="M6 9.5a6 6 0 0 1 12 0c0 2.3.5 3.3 1.2 4.2.5.7.1 1.8-.8 1.8H5.6c-.9 0-1.3-1.1-.8-1.8C5.5 12.8 6 11.8 6 9.5Z"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M10 18.5a2 2 0 0 0 4 0" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// --- Tooltip custom pour la courbe ---

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  const point = payload[0];

  return (
    <div className="rounded-xl border border-sky-500/40 bg-slate-900/90 px-4 py-2 text-xs shadow-lg shadow-sky-500/30">
      <div className="mb-1 text-[11px] uppercase tracking-[0.14em] text-slate-400">
        {label} balance
      </div>
      <div className="text-sm font-semibold text-sky-100">
        ${point.value.toLocaleString("en-US")}
      </div>
      <div className="mt-0.5 text-[11px] text-slate-400">
        Simulated growth since account opening
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="dashboard-root">
      {/* --- Sidebar --- */}
      <aside className="flex h-screen w-72 flex-col border-r border-white/5 bg-[radial-gradient(circle_at_top,#0f172a_0,#020617_52%,#020617_100%)]/95 px-6 pt-6 pb-4">
        {/* Logo & title */}
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-white/5 p-1.5 ring-1 ring-white/10">
            <IconLogo />
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold tracking-[0.18em] text-slate-400 uppercase">
              Montelion
            </span>
            <span className="text-sm text-slate-300">Managed trading dashboard</span>
          </div>
        </div>

        {/* Search */}
        <div className="mt-6">
          <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-slate-900/60 px-3 py-2 text-xs text-slate-400">
            <span className="rounded-md border border-white/10 px-1.5 py-0.5 text-[10px] uppercase tracking-[0.16em] text-slate-300">
              ⌘K
            </span>
            <span>Search</span>
          </div>
        </div>

        {/* Sections */}
        <div className="mt-8 space-y-7 text-xs">
          <div>
            <div className="mb-2 text-[11px] font-medium tracking-[0.18em] text-slate-500 uppercase">
              General
            </div>
            <nav className="space-y-1.5 text-[13px]">
              {/* Active item */}
              <button className="group flex w-full items-center justify-between gap-2 rounded-xl border border-sky-500/40 bg-[radial-gradient(circle_at_top_left,#0ea5e9_0,rgba(15,23,42,0.9)_45%,rgba(15,23,42,0.98)_100%)] px-3 py-2 text-left text-slate-50 shadow-[0_0_25px_rgba(56,189,248,0.35)]">
                <span className="flex items-center gap-2 text-[13px]">
                  <span className="text-sky-100">
                    <IconDashboard />
                  </span>
                  <span>Dashboard</span>
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(34,197,94,0.15)]" />
              </button>
            </nav>
          </div>

          <div>
            <div className="mb-2 text-[11px] font-medium tracking-[0.18em] text-slate-500 uppercase">
              Trading
            </div>
            <nav className="space-y-1.5 text-[13px]">
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-400 transition hover:bg-slate-900/60 hover:text-slate-100">
                <span className="text-slate-400">
                  <IconTrading />
                </span>
                <span>Trading</span>
              </button>
            </nav>
          </div>

          <div>
            <div className="mb-2 text-[11px] font-medium tracking-[0.18em] text-slate-500 uppercase">
              Account
            </div>
            <nav className="space-y-1.5 text-[13px]">
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-400 transition hover:bg-slate-900/60 hover:text-slate-100">
                <span className="text-slate-400">
                  <IconSettings />
                </span>
                <span>Settings</span>
              </button>
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-slate-400 transition hover:bg-slate-900/60 hover:text-slate-100">
                <span className="text-slate-400">
                  <IconBell />
                </span>
                <span>Notifications</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 text-[11px] text-slate-500">
          <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
            Logged in as
          </div>
          <div className="mt-1 text-xs text-slate-300">montelion.capital</div>
        </div>
      </aside>

      {/* --- Main content --- */}
      <main className="dashboard-main flex min-h-screen flex-1 flex-col overflow-y-auto px-10 pb-10 pt-8">
        {/* Header */}
        <div className="mb-6">
          <div className="text-xs text-slate-500">
            Dashboard <span className="mx-1">/</span>{" "}
            <span className="text-slate-400">Overview</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-50">
            Dashboard
          </h1>
        </div>

        {/* Stat cards */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Balance */}
          <div className="rounded-2xl border border-white/7 bg-[radial-gradient(circle_at_top_left,#1d283a_0,rgba(15,23,42,0.9)_55%,rgba(15,23,42,0.98)_100%)] px-6 py-4 shadow-none">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
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
          <div className="rounded-2xl border border-white/7 bg-[radial-gradient(circle_at_top_left,#052e16_0,rgba(15,23,42,0.9)_55%,rgba(15,23,42,0.98)_100%)] px-6 py-4 shadow-none">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
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
          <div className="rounded-2xl border border-white/7 bg-[radial-gradient(circle_at_top_left,#083344_0,rgba(15,23,42,0.9)_55%,rgba(15,23,42,0.98)_100%)] px-6 py-4 shadow-none">
            <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
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

        {/* Main chart card */}
        <section className="mt-6 rounded-3xl border border-white/7 bg-[radial-gradient(circle_at_top,#0f172a_0,#020617_55%,#020617_100%)] px-8 pt-6 pb-8 shadow-none">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-slate-400">
                P&amp;L since account opening
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Mock curve for design preview. We will plug real trading data
                later.
              </div>
            </div>
            <div className="text-right text-xs">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                Total P&amp;L
              </div>
              <div className="mt-1 text-emerald-400 text-sm font-semibold">
                +$62,000{" "}
                <span className="ml-1 text-[11px] text-emerald-300">
                  +32.8% since opening
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 h-[320px] w-full rounded-3xl bg-[radial-gradient(circle_at_top,#1e293b_0,rgba(15,23,42,0.95)_45%,rgba(15,23,42,1)_100%)] px-4 pb-6 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={balanceData} margin={{ top: 10, left: 0, right: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="pnlFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.6} />
                    <stop offset="60%" stopColor="#0f172a" stopOpacity={0.1} />
                    <stop offset="100%" stopColor="#020617" stopOpacity={0} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 6"
                  vertical={false}
                  stroke="rgba(148, 163, 184, 0.17)"
                />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tickMargin={8}
                  tick={{ fill: "rgba(148,163,184,0.8)", fontSize: 11 }}
                />
                <YAxis
                  hide
                  domain={["dataMin-5000", "dataMax+5000"]}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ stroke: "rgba(148,163,184,0.3)", strokeWidth: 1 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fill="url(#pnlFill)"
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#38bdf8"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{
                    r: 5,
                    strokeWidth: 0,
                    fill: "#f9fafb",
                    filter: "url(#glow)",
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
