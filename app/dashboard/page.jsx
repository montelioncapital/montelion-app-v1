// app/dashboard/page.jsx
"use client";

const brandBlue = "#2664EC";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#050816] text-slate-100">
      {/* SIDEBAR */}
      <aside className="flex w-64 flex-col border-r border-white/5 bg-[#040712]">
        {/* User header */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold">
            DU
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium">Demo User</div>
            <div className="text-xs text-slate-400">demo.user@example.com</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="mt-4 flex-1 px-3 text-sm">
          <button className="mb-1 flex w-full items-center gap-3 rounded-xl bg-[#08101f] px-3 py-2.5 text-left text-slate-50 border border-white/5">
            <span className="text-base">📊</span>
            <span>Dashboard</span>
          </button>

          {[
            { label: "Assets", icon: "💰" },
            { label: "Market", icon: "📈" },
            { label: "Trade", icon: "⚡️" },
            { label: "Analytics", icon: "📊" },
          ].map((item) => (
            <button
              key={item.label}
              className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-slate-400 hover:bg-[#070d1b] transition-colors"
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div className="mt-5 mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Account
          </div>

          {[
            { label: "Profile", icon: "👤" },
            { label: "Settings", icon: "⚙️" },
          ].map((item) => (
            <button
              key={item.label}
              className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-slate-400 hover:bg-[#070d1b] transition-colors"
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout button */}
        <div className="px-3 py-4 border-t border-white/5">
          <button className="flex w-full items-center justify-center rounded-xl border border-red-500/60 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
            Log out
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex flex-1 flex-col">
        {/* Header */}
        <header className="px-10 pt-7 pb-5">
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        </header>

        {/* CONTENT */}
        <div className="flex-1 px-10 pb-10 space-y-7">
          {/* Top metric cards */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <div className="rounded-2xl border border-white/5 bg-[#0b1220] px-5 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Balance
              </div>
              <div className="mt-3 text-2xl font-semibold">€22,193.05</div>
              <div className="mt-1 text-xs text-emerald-400">
                +47.3% vs last period
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0b1220] px-5 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Invested capital
              </div>
              <div className="mt-3 text-2xl font-semibold">€15,400.00</div>
              <div className="mt-1 text-xs text-emerald-400">
                +12.1% vs last period
              </div>
            </div>

            <div className="rounded-2xl border border-white/5 bg-[#0b1220] px-5 py-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Available
              </div>
              <div className="mt-3 text-2xl font-semibold">€6,793.05</div>
              <div className="mt-1 text-xs text-slate-400">
                Cash ready to deploy
              </div>
            </div>
          </div>

          {/* Chart + quick swap row */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            {/* Chart card */}
            <section className="xl:col-span-2 rounded-2xl border border-white/5 bg-[#0b1220] px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Balance
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Account value performance over time
                  </p>
                </div>
                <div className="text-xs text-slate-400">
                  YTD{" "}
                  <span className="font-medium text-emerald-400">+47.3%</span>
                </div>
              </div>

              <div className="rounded-xl bg-[#050815] px-4 py-4">
                <svg viewBox="0 0 400 160" className="h-40 w-full">
                  <polyline
                    fill="none"
                    stroke={brandBlue}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points="
                      10,120
                      60,115
                      110,108
                      160,103
                      210,95
                      260,88
                      310,78
                      360,70
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
            </section>

            {/* Quick swap card */}
            <section className="rounded-2xl border border-white/5 bg-[#0b1220] px-5 py-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                    Quick swap
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    Convert assets instantly
                  </p>
                </div>
                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  Live quotes
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="mb-1 text-slate-400">You sell</div>
                  <div className="flex items-center justify-between rounded-xl bg-[#050815] px-3 py-2">
                    <span className="text-slate-100">0.018162</span>
                    <span className="rounded-full border border-slate-600 px-2 py-0.5 text-[11px]">
                      BTC ▼
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-slate-400">You buy</div>
                  <div className="flex items-center justify-between rounded-xl bg-[#050815] px-3 py-2">
                    <span className="text-slate-100">923.42</span>
                    <span className="rounded-full border border-slate-600 px-2 py-0.5 text-[11px]">
                      USDT ▼
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="mt-5 flex w-full items-center justify-center rounded-xl px-4 py-2 text-sm font-medium"
                style={{ backgroundColor: brandBlue, color: "#ffffff" }}
              >
                Visualize swap →
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
