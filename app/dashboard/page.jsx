// app/dashboard/page.jsx
"use client";

const chartPoints = [
  { label: "Jan", value: 100 },
  { label: "Feb", value: 115 },
  { label: "Mar", value: 140 },
  { label: "Apr", value: 135 },
  { label: "May", value: 160 },
  { label: "Jun", value: 190 },
  { label: "Jul", value: 210 },
  { label: "Aug", value: 245 },
];

// construit une courbe lissée + une zone remplie
function buildSmoothPath(points, width = 800, height = 260, padding = 32) {
  const innerWidth = width - padding * 2;
  const innerHeight = height - padding * 2;

  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const coords = points.map((p, i) => {
    const x =
      padding +
      (innerWidth * (points.length === 1 ? 0 : i / (points.length - 1)));
    const y =
      padding + innerHeight * (1 - (p.value - min) / range); // inversé (0 en haut)
    return { ...p, x, y };
  });

  let d = `M ${coords[0].x} ${coords[0].y}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const current = coords[i];
    const next = coords[i + 1];
    const mx = (current.x + next.x) / 2;

    d += ` C ${mx} ${current.y}, ${mx} ${next.y}, ${next.x} ${next.y}`;
  }

  const baselineY = padding + innerHeight;
  const last = coords[coords.length - 1];
  const first = coords[0];
  const areaD = `${d} L ${last.x} ${baselineY} L ${first.x} ${baselineY} Z`;

  return { path: d, areaPath: areaD, coords, viewBox: `0 0 ${width} ${height}` };
}

export default function DashboardPage() {
  const { path, areaPath, coords, viewBox } = buildSmoothPath(chartPoints);
  const lastPoint = coords[coords.length - 1];

  return (
    <main className="dashboard-root">
      {/* Sidebar */}
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

      {/* Main */}
      <section className="dashboard-main overflow-y-auto">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-8 lg:py-10">
          {/* header */}
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

          {/* KPI cards */}
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {/* Balance */}
            <div className="rounded-2xl border border-white/5 bg-white/[0.02] px-6 py-5">
              <p className="text-xs tracking-[0.18em] uppercase text-slate-500">
                Account balance
              </p>
              <p className="mt-3 text-2xl font-semibold">$171,610.25</p>
              <p className="mt-1 text-xs text-slate-500">
                Your current equity (mock data)
              </p>
            </div>

            {/* Today PnL */}
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

            {/* Monthly PnL */}
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

          {/* Main chart */}
          <div className="mt-8 rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_top,_#1b2a55_0%,_#050814_55%)] px-6 pt-5 pb-7">
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
                  +$45,920.32&nbsp;
                  <span className="text-[11px] text-emerald-300">
                    · +32.8% since opening
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-white/5 bg-black/20 p-4 lg:p-6">
              <svg
                viewBox={viewBox}
                preserveAspectRatio="none"
                className="w-full h-64"
              >
                <defs>
                  <linearGradient
                    id="pnl-area"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#2664EC" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#2664EC" stopOpacity="0" />
                  </linearGradient>

                  <filter id="pnl-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* zone remplie */}
                <path d={areaPath} fill="url(#pnl-area)" opacity="0.9" />

                {/* ligne principale */}
                <path
                  d={path}
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  filter="url(#pnl-glow)"
                />

                {/* petite grille horizontale */}
                {[0.25, 0.5, 0.75].map((ratio) => (
                  <line
                    key={ratio}
                    x1="32"
                    x2="768"
                    y1={32 + (260 - 64) * ratio}
                    y2={32 + (260 - 64) * ratio}
                    stroke="rgba(148,163,184,0.18)"
                    strokeWidth="0.5"
                    strokeDasharray="4 6"
                  />
                ))}

                {/* points + labels en bas */}
                {coords.map((p, idx) => (
                  <text
                    key={p.label}
                    x={p.x}
                    y={240}
                    textAnchor="middle"
                    fontSize="11"
                    fill="rgba(148,163,184,0.75)"
                  >
                    {p.label}
                  </text>
                ))}

                {/* point final */}
                <g>
                  <circle
                    cx={lastPoint.x}
                    cy={lastPoint.y}
                    r="6"
                    fill="#0f172a"
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                  <circle
                    cx={lastPoint.x}
                    cy={lastPoint.y}
                    r="12"
                    fill="rgba(56,189,248,0.18)"
                  />

                  {/* bubble de valeur */}
                  <rect
                    x={lastPoint.x - 70}
                    y={lastPoint.y - 52}
                    rx="999"
                    ry="999"
                    width="140"
                    height="32"
                    fill="rgba(15,23,42,0.95)"
                    stroke="rgba(148,163,184,0.35)"
                  />
                  <text
                    x={lastPoint.x}
                    y={lastPoint.y - 31}
                    textAnchor="middle"
                    fontSize="12"
                    fill="#e5e7eb"
                  >
                    Total P&amp;L · +$45,920
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
