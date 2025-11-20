// app/dashboard/page.jsx

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-[#050816] text-slate-100 flex">
      {/* Fond cosmique global */}
      <div className="pointer-events-none fixed inset-0 opacity-90 bg-[radial-gradient(1600px_800px_at_50%_-200px,#2b3cff_0%,#141735_35%,#050816_70%,#02020a_100%)]" />
      <div className="relative flex min-h-screen w-full">
        {/* SIDEBAR */}
        <aside className="w-[260px] border-r border-white/5 bg-gradient-to-b from-[#050816] via-[#050816] to-[#050816]/95">
          {/* halo bleu derrière le menu sélectionné */}
          <div className="pointer-events-none absolute left-0 top-24 h-14 w-full translate-x-2 bg-[radial-gradient(circle_at_left,_rgba(69,111,255,0.75),transparent_60%)] blur-xl" />
          <div className="relative flex h-full flex-col px-6 py-6">
            {/* Logo + titre */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4a7dff] to-[#5ce1ff] text-sm font-semibold">
                M
              </div>
              <div className="leading-tight">
                <div className="text-xs uppercase tracking-[0.25em] text-slate-400">
                  Montelion
                </div>
                <div className="text-[11px] text-slate-400">
                  Managed trading dashboard
                </div>
              </div>
            </div>

            {/* Search */}
            <button className="mb-6 flex h-10 w-full items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 text-xs text-slate-300/80">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5 text-[11px]">
                ⌘K
              </span>
              <span className="truncate text-[13px] text-slate-400">
                Search
              </span>
            </button>

            {/* Menu sections */}
            <nav className="flex-1 space-y-6 text-[13px]">
              <div className="space-y-1">
                <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Menu
                </p>

                {/* item actif */}
                <button className="relative flex h-11 w-full items-center gap-3 rounded-2xl border border-white/10 bg-gradient-to-r from-[#3b5dff] via-[#4664ff] to-[#3b5dff] px-3 text-[13px] font-medium text-white">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-white/10 text-[15px]">
                    ⬛
                  </span>
                  <span className="flex-1 text-left">Dashboard</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </button>

                {/* autres items (placeholders, style FXIFY) */}
                <SidebarItem label="Stats" icon="📊" />
                <SidebarItem label="Accounts" icon="💼" />
                <SidebarItem label="Competitions" icon="🏆" />
                <SidebarItem label="Leaderboard" icon="📈" />
              </div>

              <div className="space-y-1">
                <p className="mb-1 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                  Account
                </p>
                <SidebarItem label="Certificates" icon="📜" />
                <SidebarItem label="Payouts" icon="💸" />
                <SidebarItem label="Affiliate Program" icon="🤝" />
                <SidebarItem label="Downloads" icon="⬇️" />
              </div>
            </nav>

            {/* Support / logged in */}
            <div className="mt-8 border-t border-white/5 pt-4 text-[11px] text-slate-500">
              <div className="mb-1 text-[11px] uppercase tracking-[0.18em]">
                Support
              </div>
              <div className="flex items-center gap-2 text-[12px] text-slate-400">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/5">
                  ?
                </span>
                Help center
              </div>

              <div className="mt-4 text-[11px] text-slate-500">
                Logged in as
                <div className="text-[12px] text-slate-300">montelion.client</div>
              </div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 overflow-y-auto px-10 pb-10 pt-8">
          {/* top bar */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">
                Dashboard <span className="mx-1">/</span> Overview
              </div>
              <h1 className="mt-1 text-3xl font-semibold tracking-tight">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-slate-300/80">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span>Last update: 2 min ago</span>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                <div className="h-7 w-7 rounded-full bg-[radial-gradient(circle_at_30%_20%,#ffe27d,transparent_55%),radial-gradient(circle_at_70%_80%,#5ce1ff,transparent_55%)]" />
                <div className="text-right">
                  <div className="text-[12px]">Montelion Client</div>
                  <div className="text-[11px] text-slate-400">
                    Private Hedge Fund
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 KPI cards */}
          <section className="mb-6 grid gap-4 lg:grid-cols-3">
            <KpiCard
              label="Account balance"
              value="$171,610.25"
              caption="Your current equity (mock data)"
            />
            <KpiCard
              label="Today's P&L"
              value="+ $3,928.00"
              caption="Realized & unrealized (mock data)"
            />
            <KpiCard
              label="Monthly P&L"
              value="+ $12,450.90"
              caption="From the start of this month (mock data)"
            />
          </section>

          {/* Big gradient panel + chart */}
          <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#181b3a] via-[#080b1f] to-[#050816] px-6 pb-6 pt-5">
            <div className="mb-4 flex items-center justify-between text-xs">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
                  P&L since account opening
                </div>
                <div className="mt-1 text-[11px] text-slate-500">
                  Mock curve for design preview. Real trading data will be plugged later.
                </div>
              </div>
              <div className="text-right text-[11px]">
                <div className="uppercase tracking-[0.18em] text-slate-400">
                  Total P&L
                </div>
                <div className="mt-1 text-emerald-400 text-[12px]">
                  +$62,000 <span className="text-slate-400">+32.8% since opening</span>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b from-[#111733] via-[#050816] to-[#050816] px-6 pt-8 pb-6">
              {/* SVG chart */}
              <div className="h-[260px] w-full">
                <svg
                  viewBox="0 0 800 260"
                  className="h-full w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient
                      id="lineGradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#5ce1ff" />
                      <stop offset="50%" stopColor="#4a7dff" />
                      <stop offset="100%" stopColor="#6b8bff" />
                    </linearGradient>

                    <linearGradient
                      id="fillGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(92,225,255,0.45)" />
                      <stop offset="35%" stopColor="rgba(74,125,255,0.28)" />
                      <stop offset="100%" stopColor="rgba(5,8,22,0)" />
                    </linearGradient>
                  </defs>

                  {/* fond gradient */}
                  <rect
                    x="0"
                    y="0"
                    width="800"
                    height="260"
                    fill="url(#fillGradient)"
                    opacity="0.35"
                  />

                  {/* lignes horizontales */}
                  {[40, 90, 140, 190, 240].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="800"
                      y2={y}
                      stroke="rgba(148,163,184,0.18)"
                      strokeWidth="1"
                      strokeDasharray="2 6"
                    />
                  ))}

                  {/* courbe (path calculé à la main) */}
                  <path
                    d="M 0 190 
                       C 80 180, 140 165, 200 155
                       C 260 145, 320 140, 380 145
                       C 440 150, 500 165, 560 175
                       C 620 185, 700 190, 800 180"
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* glow sous la ligne */}
                  <path
                    d="M 0 190 
                       C 80 180, 140 165, 200 155
                       C 260 145, 320 140, 380 145
                       C 440 150, 500 165, 560 175
                       C 620 185, 700 190, 800 180
                       L 800 260 L 0 260 Z"
                    fill="url(#fillGradient)"
                    opacity="0.7"
                  />

                  {/* point terminal */}
                  <circle
                    cx="800"
                    cy="180"
                    r="7"
                    fill="#050816"
                    stroke="#5ce1ff"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* labels mois */}
              <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
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
        </main>
      </div>
    </div>
  );
}

// -------- small sub components --------

function SidebarItem({ label, icon }) {
  return (
    <button className="flex h-10 w-full items-center gap-3 rounded-2xl px-3 text-left text-slate-400/80 transition hover:bg-white/5 hover:text-slate-100">
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-xl bg-white/5 text-[15px]">
        {icon}
      </span>
      <span className="truncate text-[13px]">{label}</span>
    </button>
  );
}

function KpiCard({ label, value, caption }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/[0.02] to-white/[0.01] px-6 py-5">
      <div className="text-[11px] uppercase tracking-[0.18em] text-slate-400">
        {label}
      </div>
      <div className="mt-3 text-2xl font-semibold">{value}</div>
      <div className="mt-1 text-[12px] text-slate-400">{caption}</div>
    </div>
  );
}
