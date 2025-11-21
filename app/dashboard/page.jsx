"use client";

const balanceSeries = [22000, 22900, 23650, 23900, 24750, 25900, 26950];

export default function DashboardPage() {
  return (
    <div className="tp-shell flex">
      {/* SIDEBAR */}
      <aside className="tp-sidebar">
        <div className="flex items-center gap-3 px-4 pt-5 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400 text-sm font-semibold">
            TP
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Trading
            </span>
            <span className="text-sm font-medium text-white">
              Modern dashboard UI
            </span>
          </div>
        </div>

        <div className="px-4">
          <div className="glass-card flex items-center gap-2 rounded-xl px-3 py-2">
            <span className="text-xs text-slate-400">Search…</span>
          </div>
        </div>

        <nav className="mt-6 flex-1 space-y-6 px-4 text-sm">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Overview
            </p>
            <button className="nav-item nav-item-active w-full">
              <span className="nav-item-icon">🏠</span>
              <span>Dashboard</span>
            </button>
            <button className="nav-item w-full">
              <span className="nav-item-icon">💰</span>
              <span>Assets</span>
            </button>
            <button className="nav-item w-full">
              <span className="nav-item-icon">📈</span>
              <span>Market</span>
            </button>
            <button className="nav-item w-full">
              <span className="nav-item-icon">⚡</span>
              <span>Trade</span>
            </button>
            <button className="nav-item w-full">
              <span className="nav-item-icon">📊</span>
              <span>Analytics</span>
            </button>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Account
            </p>
            <button className="nav-item w-full">
              <span className="nav-item-icon">👤</span>
              <span>Profile</span>
            </button>
            <button className="nav-item w-full">
              <span className="nav-item-icon">⚙️</span>
              <span>Settings</span>
            </button>
          </div>
        </nav>

        <div className="mt-auto px-4 pb-4">
          <button className="glass-card flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs text-slate-300">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-900/70 text-[13px]">
                ?
              </span>
              Help center
            </span>
            <span className="text-[11px] text-slate-500">24/7</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto">
        {/* HEADER */}
        <header className="tp-header">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Trading</span>
              <span>/</span>
              <span className="text-slate-300">Dashboard</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">
              Main dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="pill">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live sync
            </span>
            <button className="pill">1D</button>
            <button className="pill">1W</button>
            <button className="pill">1Y</button>
          </div>
        </header>

        {/* CONTENU */}
        <section className="space-y-6 px-8 pb-10">
          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="glass-card p-5">
              <p className="kpi-label">Balance</p>
              <p className="kpi-value mt-3">€22,193.05</p>
              <p className="kpi-sub mt-1">
                <span className="text-emerald-400 font-medium">+47.3%</span>{" "}
                <span className="text-slate-500">vs last period</span>
              </p>
            </div>

            <div className="glass-card p-5">
              <p className="kpi-label">Invested capital</p>
              <p className="kpi-value mt-3">€15,400.00</p>
              <p className="kpi-sub mt-1">
                <span className="text-emerald-400 font-medium">+12.1%</span>{" "}
                <span className="text-slate-500">vs last period</span>
              </p>
            </div>

            <div className="glass-card p-5">
              <p className="kpi-label">Available</p>
              <p className="kpi-value mt-3">€6,793.05</p>
              <p className="kpi-sub mt-1 text-slate-500">Cash ready to deploy</p>
            </div>
          </div>

          {/* BALANCE + QUICK SWAP */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
            {/* COURBE */}
            <div className="chart-frame p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="kpi-label">Balance</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Account value performance over time
                  </p>
                </div>
                <p className="text-xs text-emerald-400">
                  YTD <span className="font-semibold">+47.3%</span>
                </p>
              </div>

              <div className="mt-4 h-64 rounded-2xl bg-black/75 p-5">
                {/* Courbe simple en SVG, couleur bleu Montelion */}
                <svg
                  viewBox="0 0 400 160"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="balanceLine"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#2664EC" stopOpacity="1" />
                      <stop
                        offset="100%"
                        stopColor="#2664EC"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                  </defs>

                  {/* ligne */}
                  <polyline
                    fill="none"
                    stroke="#2664EC"
                    strokeWidth="3"
                    strokeLinecap="round"
                    points={balanceSeries
                      .map((v, i) => {
                        const x = 40 + (i / (balanceSeries.length - 1)) * 320;
                        const min = 22000;
                        const max = 27000;
                        const t = (v - min) / (max - min);
                        const y = 130 - t * 80;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                  />

                  {/* petite base horizontale en bas (même bleu) */}
                  <line
                    x1="40"
                    y1="140"
                    x2="360"
                    y2="140"
                    stroke="#2664EC"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* labels mois (juste visuel) */}
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"].map(
                    (label, i) => {
                      const x = 40 + (i / 6) * 320;
                      return (
                        <text
                          key={label}
                          x={x}
                          y={152}
                          fontSize="10"
                          textAnchor="middle"
                          fill="#6b7280"
                        >
                          {label}
                        </text>
                      );
                    }
                  )}
                </svg>
              </div>
            </div>

            {/* QUICK SWAP */}
            <div className="glass-card flex flex-col p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="kpi-label">Quick swap</p>
                  <p className="mt-1 text-xs text-slate-400">
                    Convert assets instantly
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <p className="text-slate-400">You sell</p>
                  <div className="flex items-center justify-between rounded-xl bg-black/70 px-3 py-2">
                    <span className="text-slate-200">0.018162</span>
                    <span className="rounded-lg bg-slate-900/70 px-3 py-1 text-[11px] text-slate-200">
                      BTC ▾
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-slate-400">You buy</p>
                  <div className="flex items-center justify-between rounded-xl bg-black/70 px-3 py-2">
                    <span className="text-slate-200">923.42</span>
                    <span className="rounded-lg bg-slate-900/70 px-3 py-1 text-[11px] text-slate-200">
                      USDT ▾
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="btn-primary w-full text-sm">
                  Visualize swap →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
