// app/dashboard/page.jsx
"use client";

const brandBlue = "#2664EC";

const topStats = [
  {
    label: "Gross Revenue",
    description: "Your revenue from last month",
    value: "$171,610.25",
    change: "+5.29% From last month",
  },
  {
    label: "Auto Trades",
    description: "Amount of bot-trades",
    value: "3,612",
    change: "+1,259 From last month",
  },
  {
    label: "New Assets",
    description: "New assets in portfolio",
    value: "53",
    change: "+21 From last month",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-[#050608] text-slate-50">
      {/* BACKGROUND GLOW */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(38,100,236,0.4), transparent 60%), radial-gradient(circle at 100% 0%, rgba(38,100,236,0.25), transparent 55%)",
        }}
      />

      {/* SIDEBAR */}
      <aside className="relative z-10 flex w-72 flex-col border-r border-white/5 bg-gradient-to-b from-[#050708] via-[#050708] to-[#020304]">
        {/* Logo + search */}
        <div className="px-6 pt-6 pb-5">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#0f171d] border border-white/10 text-sm font-semibold">
              17
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">SevenTeen®</div>
              <div className="text-xs text-slate-400">Finance Panel</div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#05090d] px-3 py-2 text-xs text-slate-400 flex items-center gap-2">
            <span className="text-slate-500">🔍</span>
            <span>Search</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-5 pb-6">
          {/* General */}
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            General
          </div>
          <div className="space-y-1 text-sm">
            <SidebarItem label="Home Page" icon="🏠" />
            <SidebarItem
              label="Dashboard"
              icon="📊"
              active
              withDot
              dotColor={brandBlue}
            />
            <SidebarItem label="Database" icon="🗄️" />
          </div>

          {/* Files */}
          <div className="mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Files
          </div>
          <div className="mt-2 space-y-1 text-sm text-slate-400">
            <SidebarSubItem label="pricing_2024.pdf" />
            <SidebarSubItem label="publish.docx" />
            <SidebarSubItem label="summary.pdf" />
            <SidebarSubItem label="whop.pdf" />
          </div>

          {/* Account */}
          <div className="mt-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            Account
          </div>
          <div className="mt-2 space-y-1 text-sm">
            <SidebarItem label="Messages" icon="💬" />
            <SidebarItem label="Groups" icon="👥" />
            <SidebarItem label="Settings" icon="⚙️" />
            <SidebarItem label="My Account" icon="👤" />
          </div>
        </nav>

        {/* Bottom circular widget (demi-cercle) */}
        <div className="relative flex h-32 items-end justify-center overflow-hidden px-6 pb-4">
          <div className="absolute -bottom-20 h-40 w-40 rounded-full border border-white/10 bg-[#05090d] flex items-center justify-center">
            <div className="text-center text-xs text-slate-300">
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 mb-1">
                Usage
              </div>
              <div className="text-sm font-semibold">480 / 500</div>
              <div className="text-[11px] text-slate-500">
                Auto Trades Left • Be Pro!
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN */}
      <main className="relative z-10 flex-1 overflow-y-auto">
        <div className="px-10 pt-6 pb-10 space-y-6">
          {/* OVERVIEW TITLE */}
          <section>
            <h1 className="text-2xl font-semibold">Overview</h1>
          </section>

          {/* TOP STATS CARDS (sans mini-graphes) */}
          <section className="grid gap-5 md:grid-cols-3">
            {topStats.map((card) => (
              <div
                key={card.label}
                className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#070b10] via-[#05080d] to-[#040609] px-6 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.7)] overflow-hidden"
              >
                {/* Gradient accent line */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${brandBlue}, transparent)`,
                  }}
                  aria-hidden="true"
                />

                <p className="text-sm font-medium">{card.label}</p>
                <p className="mt-1 text-xs text-slate-400">{card.description}</p>

                <div className="mt-6 text-2xl font-semibold">{card.value}</div>
                <div className="mt-1 text-xs text-emerald-400">{card.change}</div>
              </div>
            ))}
          </section>

          {/* BIG CHART FULL WIDTH */}
          <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#070b10] via-[#05080d] to-[#040609] px-6 py-5 shadow-[0_24px_80px_rgba(0,0,0,0.8)]">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto Trades Chart</p>
                <p className="mt-1 text-xs text-slate-400">
                  Chart of your auto-bot trades in last{" "}
                  <span className="text-slate-200 font-medium">14 days</span>
                </p>
              </div>
              <button className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-lg text-slate-300">
                +
              </button>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/40 px-4 pt-4 pb-3">
              {/* BIG AREA CHART */}
              <svg viewBox="0 0 600 220" className="w-full h-44">
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={brandBlue} stopOpacity="0.45" />
                    <stop offset="100%" stopColor={brandBlue} stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Area */}
                <path
                  d="
                    M10 180
                    C 60 170, 90 130, 130 140
                    C 170 150, 200 110, 240 120
                    C 280 130, 310 95, 340 90
                    C 380 85, 410 60, 440 65
                    C 470 70, 500 110, 530 115
                    C 560 120, 580 105, 590 100
                    L 590 210 L 10 210 Z
                  "
                  fill="url(#areaFill)"
                />

                {/* Line */}
                <path
                  d="
                    M10 180
                    C 60 170, 90 130, 130 140
                    C 170 150, 200 110, 240 120
                    C 280 130, 310 95, 340 90
                    C 380 85, 410 60, 440 65
                    C 470 70, 500 110, 530 115
                    C 560 120, 580 105, 590 100
                  "
                  fill="none"
                  stroke={brandBlue}
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Highlight point */}
                <circle cx="440" cy="65" r="5" fill="#0f172a" />
                <circle cx="440" cy="65" r="4" fill={brandBlue} />

                {/* Tooltip */}
                <rect
                  x="452"
                  y="40"
                  rx="6"
                  ry="6"
                  width="90"
                  height="26"
                  fill="#020617"
                  opacity="0.95"
                />
                <text
                  x="462"
                  y="57"
                  fill="#e5e7eb"
                  fontSize="11"
                  fontFamily="system-ui, -apple-system, BlinkMacSystemFont"
                >
                  $3,928.00
                </text>
              </svg>

              {/* X axis + AVG */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex gap-6">
                  <span>07.01.2024</span>
                  <span>—</span>
                  <span>21.01.2024</span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">AVG</div>
                  <div className="text-sm text-emerald-400 font-medium">
                    +5.29%
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* --- Small helpers --- */

function SidebarItem({ label, icon, active, withDot, dotColor }) {
  return (
    <button
      className={[
        "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-left transition-colors",
        active
          ? "bg-[#050b0f] border border-white/15 text-slate-50"
          : "text-slate-400 hover:bg-white/5",
      ].join(" ")}
    >
      <span className="flex items-center gap-2">
        <span className="w-5 text-sm">{icon}</span>
        <span className="text-sm">{label}</span>
      </span>
      {withDot && (
        <span
          className="h-1.5 w-3 rounded-full"
          style={{ backgroundColor: dotColor || "#22c55e" }}
        />
      )}
    </button>
  );
}

function SidebarSubItem({ label }) {
  return (
    <div className="flex items-center gap-2 rounded-xl px-2 py-1 text-xs hover:bg-white/5 cursor-pointer">
      <span className="text-[10px] text-slate-500">•</span>
      <span className="truncate">{label}</span>
    </div>
  );
}
