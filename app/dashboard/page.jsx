// app/dashboard/page.jsx
"use client";

const brandBlue = "#2664EC";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#05060a] text-slate-100">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#020308] border-r border-slate-800 flex flex-col justify-between">
        {/* User / profile */}
        <div>
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-sm font-semibold">
                DU
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Demo User</div>
                <div className="text-xs text-slate-400">
                  demo.user@example.com
                </div>
              </div>
            </div>
          </div>

          {/* Nav */}
          <nav className="px-3 pt-2 pb-4 text-sm">
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
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                  item.active
                    ? "bg-[#050812] text-slate-50 border border-slate-700"
                    : "text-slate-400 hover:bg-[#050812]",
                ].join(" ")}
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}

            <div className="mt-6 mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              Account
            </div>

            {[
              { label: "Profile", icon: "👤" },
              { label: "Settings", icon: "⚙️" },
            ].map((item) => (
              <button
                key={item.label}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-400 hover:bg-[#050812] transition-colors"
              >
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <div className="px-3 pb-4 pt-2">
          <button className="w-full rounded-xl border border-red-500/70 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors">
            Log out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="px-10 pt-8 pb-5 border-b border-slate-800">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </header>

        {/* CONTENT */}
        <div className="flex-1 px-10 py-8 space-y-8">
          {/* Top stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-800 bg-[#0b0f19] px-5 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Balance
              </div>
              <div className="mt-3 text-2xl font-semibold">€22,193.05</div>
              <div className="mt-1 text-xs" style={{ color: brandBlue }}>
                +47.3% vs last period
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0b0f19] px-5 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Invested capital
              </div>
              <div className="mt-3 text-2xl font-semibold">€15,400.00</div>
              <div className="mt-1 text-xs" style={{ color: brandBlue }}>
                +12.1% vs last period
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-[#0b0f19] px-5 py-4">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
                Available
              </div>
              <div className="mt-3 text-2xl font-semibold">€6,793.05</div>
              <div className="mt-1 text-xs text-slate-400">
                Cash ready to deploy
              </div>
            </div>
          </div>

          {/* Chart + quick swap */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Chart card */}
            <div className="xl:col-span-2 rounded-2xl border border-slate-800 bg-[#0b0f19] px-5 py-4 flex flex-col">
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
                  YTD{" "}
                  <span className="font-medium" style={{ color: brandBlue }}>
                    +47.3%
                  </span>
                </div>
              </div>

              <div className="flex-1 rounded-xl bg-[#050812] px-4 py-4">
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
                      110,108
                      160,102
                      210,96
                      260,88
                      310,78
                      360,68
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

            {/* Quick swap (design only) */}
            <div className="rounded-2xl border border-slate-800 bg-[#0b0f19] px-5 py-4 flex flex-col gap-4">
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
                  <div className="flex items-center justify-between rounded-xl bg-[#050812] px-3 py-2">
                    <span className="text-slate-200">0.018162</span>
                    <span className="rounded-full border border-slate-700 px-2 py-0.5 text-[11px]">
                      BTC ▼
                    </span>
                  </div>
                </div>

                <div>
                  <div className="mb-1 text-slate-400">You buy</div>
                  <div className="flex items-center justify-between rounded-xl bg-[#050812] px-3 py-2">
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
