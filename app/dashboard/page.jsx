// app/dashboard/page.jsx
"use client";

const balancePoints = [
  { x: 0, y: 70 },
  { x: 15, y: 60 },
  { x: 30, y: 65 },
  { x: 45, y: 50 },
  { x: 60, y: 55 },
  { x: 75, y: 40 },
  { x: 90, y: 35 },
  { x: 100, y: 30 },
];

function toPath(points) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
}

export default function DashboardPage() {
  const path = toPath(balancePoints);

  return (
    <>
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-800/80 bg-[#05070c]">
        {/* Logo + title */}
        <div className="flex items-center gap-3 px-6 pt-6 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/40">
            <span className="text-lg font-semibold text-emerald-400">T</span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide">
              Trading Panel
            </span>
            <span className="text-xs text-slate-400">
              Modern dashboard UI
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-xl bg-[#070a12] border border-slate-800 px-9 py-2 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-emerald-400/70 focus:ring-1 focus:ring-emerald-400/50"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
              🔍
            </span>
          </div>
        </div>

        {/* Main nav */}
        <nav className="flex-1 px-3 space-y-1">
          <SidebarItem active label="Dashboard" icon="▢▢" />
          <SidebarItem label="Assets" icon="💰" />
          <SidebarItem label="Market" icon="📈" />
          <SidebarItem label="Trade" icon="⚡" />
          <SidebarItem label="Analytics" icon="📊" />
        </nav>

        {/* Bottom section */}
        <div className="mt-auto border-t border-slate-800/70 px-4 py-4 space-y-3">
          <SidebarItem label="Profile" icon="👤" small />
          <SidebarItem label="Settings" icon="⚙️" small />
          <button className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-[#090c14] px-3 py-2 text-xs text-slate-300 hover:border-emerald-400/60 hover:text-emerald-200 hover:bg-slate-900/80 transition">
            <span>Help center</span>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 flex flex-col min-h-screen bg-[#05070c]">
        {/* Top gradient glow bar */}
        <div className="pointer-events-none h-24 w-full bg-gradient-to-r from-emerald-500/10 via-emerald-400/15 to-sky-500/10 blur-2xl opacity-60" />

        {/* Content */}
        <div className="relative -mt-20 px-4 pb-10 md:px-8 lg:px-12">
          {/* Top bar */}
          <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                <span>Trading</span>
                <span>/</span>
                <span className="text-slate-300">Dashboard</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                Main dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 bg-[#05070c] border border-slate-800 rounded-full px-3 py-1.5">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.9)]" />
                <span>Live sync</span>
              </div>
              <button className="hidden md:inline-flex items-center rounded-full border border-slate-700 bg-[#05070c] px-3 py-1.5 text-xs text-slate-300 hover:border-emerald-400/70 hover:text-emerald-200 transition">
                1D
              </button>
              <button className="hidden md:inline-flex items-center rounded-full border border-slate-700 bg-[#05070c] px-3 py-1.5 text-xs text-slate-300 hover:border-emerald-400/70 hover:text-emerald-200 transition">
                1W
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-[#05070c] px-3 py-1.5 text-xs text-slate-200">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-[11px] font-semibold">
                  DB
                </span>
                <span className="hidden sm:inline text-left leading-tight">
                  <span className="block text-xs">Demo User</span>
                  <span className="block text-[10px] text-slate-500">
                    pro.trader@example.com
                  </span>
                </span>
              </button>
            </div>
          </header>

          {/* GRID */}
          <div className="grid gap-6 xl:grid-cols-[2.2fr,1.3fr]">
            {/* LEFT COLUMN */}
            <div className="space-y-6">
              {/* Balance & metrics row */}
              <div className="grid gap-4 md:grid-cols-3">
                <StatCard
                  label="Balance"
                  value="€22,193.05"
                  change="+47.3%"
                />
                <StatCard
                  label="Invested capital"
                  value="€15,400.00"
                  change="+12.1%"
                />
                <StatCard
                  label="Available"
                  value="€6,793.05"
                  change="+3.5%"
                />
              </div>

              {/* Balance chart card */}
              <div className="glass-card rounded-2xl border border-slate-800/80 bg-gradient-to-b from-slate-900/70 via-slate-950/90 to-black/95">
                <div className="flex items-center justify-between pb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                      Balance
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Account value performance over time
                    </p>
                  </div>
                  <div className="flex items-baseline gap-2 text-right">
                    <span className="text-sm text-slate-400">YTD</span>
                    <span className="text-xs font-medium text-emerald-400">
                      +47.3%
                    </span>
                  </div>
                </div>

                <div className="mt-2 h-64 rounded-xl bg-gradient-to-b from-slate-900/80 to-black/95 border border-slate-800/80 px-6 py-4 flex flex-col justify-between">
                  {/* fake y labels */}
                  <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                    <span>€24k</span>
                    <span>€22k</span>
                    <span>€20k</span>
                    <span>€18k</span>
                  </div>

                  <div className="relative flex-1">
                    <svg
                      viewBox="0 0 100 80"
                      className="absolute inset-0 h-full w-full"
                      preserveAspectRatio="none"
                    >
                      {/* grid lines */}
                      {[20, 40, 60].map((y) => (
                        <line
                          key={y}
                          x1="0"
                          x2="100"
                          y1={y}
                          y2={y}
                          stroke="rgba(148,163,184,0.2)"
                          strokeWidth="0.25"
                          strokeDasharray="1.5 2"
                        />
                      ))}

                      {/* area */}
                      <path
                        d={`${path} L 100 80 L 0 80 Z`}
                        fill="url(#areaGradient)"
                        opacity="0.9"
                      />
                      {/* line */}
                      <path
                        d={path}
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.6"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                      />
                      {/* last point */}
                      <circle
                        cx="100"
                        cy="30"
                        r="2.5"
                        fill="#0f172a"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                      />

                      <defs>
                        <linearGradient
                          id="areaGradient"
                          x1="0"
                          x2="0"
                          y1="0"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* x labels */}
                  <div className="mt-6 flex justify-between text-[10px] text-slate-500">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(
                      (m) => (
                        <span key={m}>{m}</span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-6">
              {/* Quick swap */}
              <div className="glass-card rounded-2xl border border-slate-800 bg-[#05070c]">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                      Quick swap
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Convert assets instantly
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300 border border-emerald-400/40">
                    Live quotes
                  </span>
                </div>

                <div className="space-y-3">
                  <SwapRow label="You sell" ticker="BTC" amount="0.018162" />
                  <SwapRow label="You buy" ticker="USDT" amount="923.42" />
                </div>

                <button className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 text-xs font-medium text-slate-900 py-2.5 hover:bg-emerald-400 transition">
                  Visualize swap
                </button>
              </div>

              {/* Assets table */}
              <div className="glass-card rounded-2xl border border-slate-800 bg-[#05070c]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Assets
                  </p>
                  <span className="text-[11px] text-slate-500">
                    Total value: <span className="text-slate-200">€22,193.05</span>
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-slate-800/80 bg-slate-950/60">
                  <table className="min-w-full text-xs">
                    <thead className="bg-slate-900/80 text-slate-400">
                      <tr className="[&>th]:px-3 [&>th]:py-2 [&>th]:font-medium [&>th]:text-left">
                        <th>Name</th>
                        <th>Qty</th>
                        <th className="hidden sm:table-cell">Entry</th>
                        <th>Value</th>
                        <th className="text-right">P&L</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      <AssetRow
                        name="Bitcoin"
                        ticker="BTC"
                        qty="0.172634"
                        entry="€22,000"
                        value="€17,379.60"
                        pnl="+€13,581.65"
                        positive
                      />
                      <AssetRow
                        name="Ethereum"
                        ticker="ETH"
                        qty="1.3519"
                        entry="€1,200"
                        value="€4,338.45"
                        pnl="+€2,716.17"
                        positive
                      />
                      <AssetRow
                        name="Tether"
                        ticker="USDT"
                        qty="500"
                        entry="€0.96"
                        value="€475"
                        pnl="-€5.00"
                      />
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Repartition */}
              <div className="glass-card rounded-2xl border border-slate-800 bg-[#05070c]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
                    Repartition
                  </p>
                  <span className="text-[11px] text-slate-500">
                    By asset type
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Simple fake donut chart */}
                  <div className="relative h-24 w-24">
                    <div className="absolute inset-0 rounded-full bg-slate-900" />
                    <div className="absolute inset-2 rounded-full border-4 border-slate-700/80" />
                    <div className="absolute inset-2 rounded-full border-[5px] border-transparent border-t-emerald-400 border-r-sky-400 rotate-[-35deg]" />
                    <div className="absolute inset-6 rounded-full bg-slate-950/95" />
                  </div>

                  <div className="space-y-2 text-[11px]">
                    <LegendDot label="Bitcoin" value="60%" color="bg-emerald-400" />
                    <LegendDot label="Ethereum" value="25%" color="bg-sky-400" />
                    <LegendDot label="Stablecoins" value="15%" color="bg-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <SimpleCard title="Recent transactions">
              <p className="text-xs text-slate-400">
                Design only. You can plug your own transaction feed here later.
              </p>
            </SimpleCard>
            <SimpleCard title="Market overview">
              <p className="text-xs text-slate-400">
                Use this area for watchlists, heatmaps or sector performance.
              </p>
            </SimpleCard>
            <SimpleCard title="News & insights">
              <p className="text-xs text-slate-400">
                Space for curated news, AI insights or internal communications.
              </p>
            </SimpleCard>
          </div>
        </div>
      </main>
    </>
  );
}

/* ---------- small components ---------- */

function SidebarItem({ label, icon, active, small }) {
  const base =
    "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors";
  if (small) {
    return (
      <button
        className={`${base} text-xs text-slate-400 hover:text-slate-100 hover:bg-slate-900/70`}
      >
        <span className="text-[13px]">{icon}</span>
        <span>{label}</span>
      </button>
    );
  }

  return (
    <button
      className={
        active
          ? `${base} text-slate-100 bg-gradient-to-r from-emerald-500/40 via-emerald-500/50 to-sky-500/40 shadow-[0_0_25px_rgba(16,185,129,0.6)]`
          : `${base} text-slate-400 hover:text-slate-100 hover:bg-slate-900/70`
      }
    >
      <span className="text-[14px]">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

function StatCard({ label, value, change }) {
  return (
    <div className="glass-card rounded-2xl border border-slate-800 bg-[#05070c] px-4 py-4">
      <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-lg font-semibold">{value}</p>
      <p className="mt-1 text-[11px] text-emerald-400">{change} vs last period</p>
    </div>
  );
}

function SwapRow({ label, ticker, amount }) {
  return (
    <div className="rounded-xl bg-slate-950/80 border border-slate-800 px-3 py-2.5 flex items-center justify-between text-xs">
      <div className="flex flex-col">
        <span className="text-[10px] uppercase tracking-[0.14em] text-slate-500">
          {label}
        </span>
        <span className="mt-1 text-slate-200">{amount}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-slate-900 border border-slate-700 px-2 py-1 text-[11px]">
          {ticker}
        </span>
        <span className="text-slate-600 text-xs">▼</span>
      </div>
    </div>
  );
}

function AssetRow({ name, ticker, qty, entry, value, pnl, positive }) {
  return (
    <tr className="[&>td]:px-3 [&>td]:py-2 text-[11px] text-slate-300">
      <td>
        <div className="flex flex-col">
          <span>{name}</span>
          <span className="text-[10px] text-slate-500">{ticker}</span>
        </div>
      </td>
      <td>{qty}</td>
      <td className="hidden sm:table-cell">{entry}</td>
      <td>{value}</td>
      <td className="text-right">
        <span className={positive ? "text-emerald-400" : "text-rose-400"}>
          {pnl}
        </span>
      </td>
    </tr>
  );
}

function LegendDot({ label, value, color }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span className="text-slate-300">{label}</span>
      <span className="ml-auto text-slate-500">{value}</span>
    </div>
  );
}

function SimpleCard({ title, children }) {
  return (
    <div className="glass-card rounded-2xl border border-slate-800 bg-[#05070c] px-4 py-4">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500 mb-2">
        {title}
      </p>
      {children}
    </div>
  );
}
