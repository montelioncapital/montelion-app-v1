"use client";

const brandBlue = "#2664EC";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#0B0F1A]">
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111827] text-slate-200 flex flex-col border-r border-white/5">
        
        {/* USER INFO */}
        <div className="px-5 py-6 flex items-center gap-3 border-b border-white/5">
          <div className="h-10 w-10 rounded-full bg-[#1F2937] flex items-center justify-center font-semibold">
            DU
          </div>
          <div className="leading-tight">
            <div className="font-medium">Demo User</div>
            <div className="text-xs text-slate-400">demo.user@example.com</div>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 px-3 py-6 space-y-1 text-sm">
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
                "flex w-full items-center gap-3 rounded-xl px-3 py-2 transition",
                item.active
                  ? "bg-[#1C2333] text-white"
                  : "text-slate-400 hover:bg-[#1A2231]"
              ].join(" ")}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

          <div className="pt-4 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            Account
          </div>

          {[
            { label: "Profile", icon: "👤" },
            { label: "Settings", icon: "⚙️" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-slate-400 hover:bg-[#1A2231] text-sm"
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}

        </nav>

        {/* LOGOUT BUTTON */}
        <div className="px-4 py-4 border-t border-white/5">
          <button className="w-full rounded-xl bg-[#2D1F1F] text-red-400 py-2 font-medium hover:bg-[#3A2626]">
            Log out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 text-white px-10 py-10">
        
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold mb-10">Dashboard</h1>

        {/* TOP CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl bg-[#141B29] border border-white/5 p-5">
            <div className="text-xs uppercase tracking-widest text-slate-500">Balance</div>
            <div className="mt-3 text-2xl font-semibold">€22,193.05</div>
            <div className="text-xs text-emerald-400 mt-1">+47.3% vs last period</div>
          </div>

          <div className="rounded-xl bg-[#141B29] border border-white/5 p-5">
            <div className="text-xs uppercase tracking-widest text-slate-500">Invested capital</div>
            <div className="mt-3 text-2xl font-semibold">€15,400.00</div>
            <div className="text-xs text-emerald-400 mt-1">+12.1% vs last period</div>
          </div>

          <div className="rounded-xl bg-[#141B29] border border-white/5 p-5">
            <div className="text-xs uppercase tracking-widest text-slate-500">Available</div>
            <div className="mt-3 text-2xl font-semibold">€6,793.05</div>
            <div className="text-xs text-slate-400 mt-1">Cash ready to deploy</div>
          </div>
        </div>

        {/* CHART + SWAP */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">
          
          {/* CHART */}
          <div className="xl:col-span-2 rounded-xl bg-[#141B29] border border-white/5 p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Balance</div>
                <div className="text-xs text-slate-400">Account value performance</div>
              </div>
              <div className="text-xs text-emerald-400 font-medium">+47.3% YTD</div>
            </div>

            <svg viewBox="0 0 400 160" className="w-full h-40">
              <polyline
                fill="none"
                stroke={brandBlue}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                points="10,120 60,115 110,105 160,100 210,90 260,82 310,70 360,60"
              />
            </svg>

            <div className="mt-2 flex justify-between text-[11px] text-slate-500">
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span>
            </div>
          </div>

          {/* QUICK SWAP */}
          <div className="rounded-xl bg-[#141B29] border border-white/5 p-5">
            <div className="text-xs uppercase tracking-widest text-slate-500">Quick Swap</div>
            <div className="text-xs text-slate-400 mt-1">Convert assets instantly</div>

            <div className="mt-4 text-xs space-y-3">
              {/* Sell */}
              <div>
                <div className="mb-1 text-slate-400">You sell</div>
                <div className="flex items-center justify-between rounded-xl bg-[#0F1624] px-3 py-2">
                  <span>0.018162</span>
                  <span className="rounded-full border border-slate-600 px-2 py-0.5 text-[11px]">
                    BTC ▼
                  </span>
                </div>
              </div>

              {/* Buy */}
              <div>
                <div className="mb-1 text-slate-400">You buy</div>
                <div className="flex items-center justify-between rounded-xl bg-[#0F1624] px-3 py-2">
                  <span>923.42</span>
                  <span className="rounded-full border border-slate-600 px-2 py-0.5 text-[11px]">
                    USDT ▼
                  </span>
                </div>
              </div>
            </div>

            <button
              className="mt-5 w-full text-center rounded-xl py-2 text-sm font-medium"
              style={{ backgroundColor: brandBlue }}
            >
              Visualize swap →
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
