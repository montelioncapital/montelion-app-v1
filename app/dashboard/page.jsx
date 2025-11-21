// app/dashboard/page.jsx

const balanceSeries = [22193, 22540, 23110, 23480, 24150, 25120, 26190];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      {/* SIDEBAR */}
      <aside className="hidden md:flex h-screen w-64 flex-col border-r border-white/5 bg-slate-950/80 backdrop-blur-2xl">
        {/* Logo / titre */}
        <div className="flex items-center gap-3 px-5 pt-6 pb-4">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 text-sm font-semibold">
            TP
          </div>
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Trading
            </span>
            <span className="text-sm font-medium text-slate-100">
              Modern dashboard UI
            </span>
          </div>
        </div>

        {/* Barre de recherche (fake pour le design) */}
        <div className="px-5">
          <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-slate-900/60 px-3 py-2 text-xs text-slate-500 backdrop-blur-xl">
            <span>Search…</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6 flex-1 space-y-6 px-4 text-sm">
          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Overview
            </p>
            <button className="flex w-full items-center gap-3 rounded-xl bg-slate-900/70 px-3 py-2 text-slate-50 shadow-[0_0_0_1px_rgba(148,163,184,0.3),0_16px_40px_rgba(15,23,42,0.9)]">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-[15px]">
                🏠
              </span>
              <span>Dashboard</span>
            </button>
            <button className="mt-1.5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-400 hover:bg-slate-900/60 transition">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-[15px]">
                💰
              </span>
              <span>Assets</span>
            </button>
            <button className="mt-1.5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-400 hover:bg-slate-900/60 transition">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-[15px]">
                📈
              </span>
              <span>Market</span>
            </button>
            <button className="mt-1.5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-400 hover:bg-slate-900/60 transition">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-[15px]">
                ⚡
              </span>
              <span>Trade</span>
            </button>
            <button className="mt-1.5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-400 hover:bg-slate-900/60 transition">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-[15px]">
                📊
              </span>
              <span>Analytics</span>
            </button>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.18em] text-slate-500">
              Account
            </p>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-400 hover:bg-slate-900/60 transition">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-[15px]">
                👤
              </span>
              <span>Profile</span>
            </button>
            <button className="mt-1.5 flex w-full items-center gap-3 rounded-xl px-3 py-2 text-slate-400 hover:bg-slate-900/60 transition">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950/80 text-[15px]">
                ⚙️
              </span>
              <span>Settings</span>
            </button>
          </div>
        </nav>

        {/* Help center */}
        <div className="mt-auto px-4 pb-4">
          <button className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-slate-900/70 px-3 py-2 text-xs text-slate-300 backdrop-blur-xl shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_14px_35px_rgba(0,0,0,0.9)]">
            <span className="inline-flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-slate-950/80 text-[13px]">
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
        {/* Header top */}
        <header className="flex items-center justify-between px-8 pt-6 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Trading</span>
              <span>/</span>
              <span className="text-slate-300">Dashboard</span>
            </div>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-50">
              Main dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-slate-300 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live sync
            </span>
            <button className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-slate-300 backdrop-blur-xl">
              1D
            </button>
            <button className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-slate-300 backdrop-blur-xl">
              1W
            </button>
            <button className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-slate-300 backdrop-blur-xl">
              1Y
            </button>
          </div>
        </header>

        {/* CONTENU */}
        <section className="space-y-6 px-8 pb-10">
          {/* KPIs */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_18px_50px_rgba(0,0,0,0.85)]">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Balance
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-50">
                €22,193.05
              </p>
              <p className="mt-1 text-xs">
                <span className="font-medium text-emerald-400">+47.3%</span>{" "}
                <span className="text-slate-500">vs last period</span>
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_18px_50px_rgba(0,0,0,0.85)]">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Invested capital
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-50">
                €15,400.00
              </p>
              <p className="mt-1 text-xs">
                <span className="font-medium text-emerald-400">+12.1%</span>{" "}
                <span className="text-slate-500">vs last period</span>
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_18px_50px_rgba(0,0,0,0.85)]">
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Available
              </p>
              <p className="mt-3 text-2xl font-semibold text-slate-50">
                €6,793.05
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Cash ready to deploy
              </p>
            </div>
          </div>

          {/* Graph + quick swap */}
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2.2fr)_minmax(0,1fr)]">
            {/* GRAPH */}
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_18px_50px_rgba(0,0,0,0.85)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Balance
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Account value performance over time
                  </p>
                </div>
                <p className="text-xs text-emerald-400">
                  YTD <span className="font-semibold">+47.3%</span>
                </p>
              </div>

              <div className="mt-4 h-64 rounded-2xl bg-black/80 p-5">
                <svg
                  viewBox="0 0 400 160"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  {/* Ligne bleu Montelion */}
                  <polyline
                    fill="none"
                    stroke="#2563eb" // remplace par ton bleu Montelion si besoin
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

                  {/* Ligne de base */}
                  <line
                    x1="40"
                    y1="140"
                    x2="360"
                    y2="140"
                    stroke="#2563eb"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Labels mois */}
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
            <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(15,23,42,0.7),0_18px_50px_rgba(0,0,0,0.85)]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Quick swap
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Convert assets instantly
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-4 text-xs">
                <div className="space-y-1.5">
                  <p className="text-slate-400">You sell</p>
                  <div className="flex items-center justify-between rounded-xl bg-black/75 px-3 py-2">
                    <span className="text-slate-100">0.018162</span>
                    <span className="rounded-lg bg-slate-900/80 px-3 py-1 text-[11px] text-slate-200">
                      BTC ▾
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <p className="text-slate-400">You buy</p>
                  <div className="flex items-center justify-between rounded-xl bg-black/75 px-3 py-2">
                    <span className="text-slate-100">923.42</span>
                    <span className="rounded-lg bg-slate-900/80 px-3 py-1 text-[11px] text-slate-200">
                      USDT ▾
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="inline-flex w-full items-center justify-center rounded-xl bg-blue-500 px-5 py-2 text-sm font-medium text-white shadow-[0_0_0_1px_rgba(191,219,254,0.4),0_16px_45px_rgba(37,99,235,0.9)] hover:brightness-110 transition">
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
