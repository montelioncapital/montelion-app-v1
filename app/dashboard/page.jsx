// app/dashboard/page.jsx

export default function DashboardPage() {
  const positions = [
    { symbol: "BTCUSDT", side: "Long", size: "1.25 BTC", pnl: "+$3,420", pnlColor: "text-emerald-400" },
    { symbol: "ETHUSDT", side: "Short", size: "12 ETH", pnl: "-$480", pnlColor: "text-rose-400" },
    { symbol: "SOLUSDT", side: "Long", size: "540 SOL", pnl: "+$920", pnlColor: "text-emerald-400" },
  ];

  const balancePoints = [40, 46, 53, 51, 57, 63, 70]; // juste des valeurs mock

  return (
    <main className="min-h-screen bg-[#050816] text-slate-100 flex">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#050310] border-r border-white/5 flex flex-col">
        {/* Logo */}
        <div className="px-5 pt-5 pb-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-cyan-400 flex items-center justify-center text-xs font-semibold shadow-[0_0_18px_rgba(56,189,248,0.7)]">
            ML
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">
              Montelion
            </span>
            <span className="text-[11px] text-slate-400">
              Managed trading
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="px-5 mb-3">
          <div className="h-9 rounded-full bg-white/5 border border-white/10 flex items-center px-3 text-[12px] text-slate-400">
            <span className="mr-2">🔍</span>
            <span>Search…</span>
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full border border-white/15 text-slate-300/80">
              ⌘K
            </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="px-3 mt-1 space-y-1 text-[13px]">
          <SidebarItem label="Dashboard" active />
          <SidebarItem label="Trading" />
          <SidebarItem label="Accounts" />
          <SidebarItem label="Risk" />
          <SidebarItem label="Settings" />
        </nav>

        <div className="mt-auto px-4 pb-5 pt-3 text-[11px] text-slate-500 border-t border-white/5">
          <div className="mb-2">Support</div>
          <button className="w-full h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-between px-3 text-[11px] text-slate-200">
            <span>Help center</span>
            <span className="text-[10px] text-slate-400">24/7</span>
          </button>
          <div className="mt-3">
            Logged in as
            <div className="text-slate-300">client@montelion.com</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <section className="flex-1 relative overflow-hidden">
        {/* grand fond radial */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_600px_at_top,_rgba(37,99,235,0.55),transparent_60%)] opacity-80" />

        <div className="relative h-full flex flex-col gap-6 px-8 pt-6 pb-8">
          {/* Top bar */}
          <header className="flex items-center justify-between">
            <div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1">
                <span>Dashboard</span>
                <span className="opacity-60">/</span>
                <span className="text-slate-200">Overview</span>
              </div>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3 text-[12px]">
              <div className="h-8 px-3 rounded-full border border-emerald-400/40 bg-emerald-500/15 text-emerald-200 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                Live sync
              </div>
              <div className="h-8 px-3 rounded-full border border-white/10 bg-white/5 text-slate-200 flex items-center">
                Last update · 2 min ago
              </div>
              <div className="flex items-center gap-2 pl-3 pr-3 h-9 rounded-full bg-white/5 border border-white/10">
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-[11px] font-semibold">
                  MC
                </div>
                <div className="leading-tight">
                  <div className="text-[11px]">Montelion Client</div>
                  <div className="text-[10px] text-slate-400">
                    Private hedge fund
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <StatCard
              label="Account balance"
              value="$171,610.25"
              helper="Current equity"
            />
            <StatCard
              label="Today's P&L"
              value="+$3,928.00"
              helper="Realized & unrealized"
              valueClass="text-emerald-400"
            />
            <StatCard
              label="Monthly P&L"
              value="+$12,450.90"
              helper="From the start of this month"
              valueClass="text-emerald-400"
            />
          </div>

          {/* Chart + positions */}
          <div className="grid grid-cols-3 gap-4 flex-1">
            {/* Big chart card */}
            <div className="col-span-2 rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-[#050b1c] to-[#030712] px-6 pt-5 pb-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] text-slate-400">
                    Balance curve
                  </div>
                  <div className="text-sm text-slate-300">
                    Mock data for visual preview
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-300">
                  <div>Total P&L</div>
                  <div className="text-emerald-300 font-medium">+32.8%</div>
                </div>
              </div>

              {/* Simple SVG chart */}
              <div className="flex-1 flex items-center">
                <div className="w-full h-52 relative">
                  {/* y grid */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-full border-t border-dashed border-slate-700/50"
                      />
                    ))}
                  </div>

                  <svg
                    viewBox="0 0 100 40"
                    preserveAspectRatio="none"
                    className="relative w-full h-full"
                  >
                    {/* area */}
                    <defs>
                      <linearGradient id="balanceArea" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#020617" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <path
                      d={buildPath(balancePoints)}
                      fill="url(#balanceArea)"
                    />
                    <path
                      d={buildPath(balancePoints)}
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* x labels */}
              <div className="mt-3 flex justify-between text-[11px] text-slate-400">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </div>

            {/* Positions card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-5 pt-5 pb-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-[11px] text-slate-400">
                    Open positions
                  </div>
                  <div className="text-sm text-slate-200">
                    3 active / cross margin
                  </div>
                </div>
                <button className="text-[11px] text-sky-300 hover:text-sky-200">
                  View all
                </button>
              </div>

              <div className="space-y-3 text-[12px]">
                {positions.map((p) => (
                  <div
                    key={p.symbol}
                    className="rounded-xl border border-white/10 bg-black/20 px-3 py-2.5 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-slate-100 text-[13px]">
                        {p.symbol}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {p.side} · {p.size}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`${p.pnlColor} text-[13px] font-medium`}>
                        {p.pnl}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Isolated · 10x
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 h-9 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-500 text-[12px] font-medium shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                Open trading panel
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* --------- small helpers ---------- */

function SidebarItem({ label, active }) {
  if (active) {
    return (
      <div className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500/80 via-indigo-500/80 to-fuchsia-500/80 px-3 h-9 text-[13px] font-medium shadow-[0_0_22px_rgba(59,130,246,0.9)] border border-white/20">
        <span className="h-6 w-6 rounded-full bg-black/20 flex items-center justify-center text-[12px]">
          ●
        </span>
        <span>{label}</span>
      </div>
    );
  }

  return (
    <button className="flex w-full items-center gap-2 rounded-xl px-3 h-9 text-[13px] text-slate-300 hover:bg-white/[0.04] border border-transparent hover:border-white/10">
      <span className="h-6 w-6 rounded-full bg-white/[0.04] flex items-center justify-center text-[11px] text-slate-400">
        ●
      </span>
      <span>{label}</span>
    </button>
  );
}

function StatCard({ label, value, helper, valueClass = "text-slate-100" }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-4 flex flex-col justify-center">
      <div className="text-[11px] text-slate-400 uppercase tracking-[0.18em]">
        {label}
      </div>
      <div className={`mt-2 text-xl font-semibold tracking-tight ${valueClass}`}>
        {value}
      </div>
      <div className="mt-1 text-[11px] text-slate-400">{helper}</div>
    </div>
  );
}

/**
 * Transforme un tableau de valeurs en path SVG smooth
 * (0–100 en X, 0–40 en Y ; Y inversé pour le système de coordonnées SVG)
 */
function buildPath(values) {
  if (!values.length) return "";

  const stepX = 100 / (values.length - 1);
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values.map((v, i) => {
    const x = i * stepX;
    const norm = (v - min) / range; // 0–1
    const y = 40 - norm * 30 - 5; // marge haute & basse
    return { x, y };
  });

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const mx = (p0.x + p1.x) / 2;
    d += ` Q ${mx} ${p0.y} ${p1.x} ${p1.y}`;
  }

  // fermer pour l'area
  d += ` L 100 40 L 0 40 Z`;
  return d;
}
