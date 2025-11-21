// app/dashboard/page.jsx
"use client";

const brandBlue = "#2664EC";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-white/5 bg-black/40 backdrop-blur flex flex-col">
        {/* Logo / titre */}
        <div className="px-5 pt-5 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-slate-900 flex items-center justify-center text-sm font-semibold">
              TP
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Trading Panel</div>
              <div className="text-xs text-slate-400">Modern dashboard UI</div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-5">
            <div className="flex items-center gap-2 rounded-xl bg-slate-900/80 px-3 py-2 text-xs text-slate-400">
              <span className="text-slate-500">🔍</span>
              <span className="truncate">Search…</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          {[
            { label: "Dashboard", icon: "📊", active: true },
            { label: "Assets", icon: "💰" },
            { label: "Market", icon: "📈" },
            { label: "Trade", icon: "⚡️" },
            { label: "Analytics", icon: "📊" },
          ].map((item) => (
            <button
              key={item.label}
              className={[
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition",
                item.active
                  ? "bg-slate-900 text-slate-50 border border-white/10"
                  : "text-slate-400 hover:bg-slate-900/60",
              ].join(" ")}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Account
          </div>

          {[
            { label: "Profile", icon: "👤" },
            { label: "Settings", icon: "⚙️" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-slate-400 hover:bg-slate-900/60 text-sm transition"
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Bottom / support */}
        <div className="border-t border-white/5 px-3 py-4 text-xs">
          <button className="flex w-full items-center justify-between rounded-xl bg-slate-900 px-3 py-2 text-slate-300 hover:bg-slate-800 transition">
            <span className="flex items-center gap-2">
              <span className="text-sm">❓</span>
              <span>Help center</span>
            </span>
            <span className="text-[10px] text-slate-500">24/7</span>
          </button>

          <div className="mt-3 text-[11px] text-slate-500">
            Logged in as
            <div className="text-slate-300">client@example.com</div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between px-10 py-6 border-b border-white/5">
          <div>
            <div className="text-xs text-slate-500">
              Trading / <span className="text-slate-300">Dashboard</span>
            </div>
            <h1 className="mt-1 text-2xl font-semibold">Main dashboard</h1>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-3 py-1.5 text-slate-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live sync
            </span>
            <button className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-300">
              1D
            </button>
            <button className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-300">
              1W
            </button>
            <button className="rounded-full border border-slate-700 px-3 py-1.5 text-slate-300">
              1Y
            </button>
          </div>
        </header>

        {/* CONTENT */}
        <div className="flex-1 px-10 py-8 space-y-8 bg-[#020617]">
          {/* Stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-white/5 bg-black/40 px-5 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Balance
              </div>
              <div className="mt-3 text-2xl font-semibold">
                €22,193.05
              </div>
              <div className="mt-1 text-xs text-emerald-400">
                +47.3% vs last period
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/40 px-5 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Invested capital
              </div>
              <div className="mt-3 text-2xl font-semibold">
                €15,400.00
              </div>
              <div className="mt-1 text-xs text-emerald-400">
                +12.1% vs last period
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/40 px-5 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Available
              </div>
              <div className="mt-3 text-2xl font-semibold">
                €6,793.05
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Cash ready to deploy
              </div>
            </div>
          </div>

          {/* Balance chart + Quick swap placeholder */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Chart card */}
            <div className="xl:col-span-2 rounded-2xl border border-white/5 bg-black/50 px-5 py-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Balance
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    Account value performance over time
                  </div>
                </div>
                <div className="text-xs text-slate-400">
                  YTD <span className="text-emerald-400 font-medium">+47.3%</span>
                </div>
              </div>

              <div className="flex-1 rounded-xl bg-slate-950/80 px-4 py-4">
                {/* Simple SVG chart, une seule couleur bleu Montelion */}
                <svg viewBox="0 0 400 160" className="w-full h-40">
                  <rect x="0" y="0" width="400" height="160" fill="transparent" />
                  <polyline
                    fill="none"
                    stroke={brandBlue}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="
                      10,120
                      60,115
                      110,105
                      160,100
                      210,90
                      260,82
                      310,70
                      360,60
                    "
                  />
                </svg>
                <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                </div>
              </div>
            </div>

            {/* Quick swap placeholder (design seulement) */}
            <div className="rounded-2xl border border-white/5 bg-black/50 px-5 py-4 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Quick swap
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    Convert assets instantly
                  </div>
                </div>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  Live quotes
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="mb-1 text-slate-400">You sell</div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-950/80 px-3 py-2">
                    <span className="text-slate-200">0.018162</span>
                    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px]">
                      BTC ▼
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-slate-400">You buy</div>
                  <div className="flex items-center justify-between rounded-xl bg-slate-950/80 px-3 py-2">
                    <span className="text-slate-200">923.42</span>
                    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px]">
                      USDT ▼
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="mt-auto inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium"
                style={{
                  backgroundColor: brandBlue,
                  color: "#ffffff",
                }}
              >
                Visualize swap →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
