"use client";

const brandBlue = "#2664EC";

/* ------------------ SVG ICONS (thin) ------------------ */
const IconDashboard = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M3 13h8V3H3v10zM13 21h8v-6h-8v6zM13 3v8h8V3h-8zM3 21h8v-6H3v6z" />
  </svg>
);

const IconAccount = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="7" r="4" />
    <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
  </svg>
);

const IconCommission = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16v4H4zM4 10h16v10H4z" />
  </svg>
);

const IconRules = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M5 4h14v16H5z" />
    <path d="M9 8h6M9 12h6M9 16h6" />
  </svg>
);

const IconTutorial = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4a2 2 0 1 0-2-2" />
    <circle cx="12" cy="18" r="1" />
  </svg>
);

const IconAbout = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

/* ------------------ TOP STATS ------------------ */
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

      {/* SIDEBAR */}
      <aside className="flex w-72 flex-col border-r border-white/5 bg-[#07090E]">

        {/* USER INFO */}
        <div className="px-6 pt-6 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#11161a] border border-white/10 text-sm font-semibold">
              DU
            </div>
            <div>
              <div className="text-sm font-semibold">Demo User</div>
              <div className="text-xs text-slate-400">Private investor Montelion</div>
            </div>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-5 space-y-1 text-sm">

          <SidebarItem label="Dashboard" icon={<IconDashboard />} active />
          <SidebarItem label="Account" icon={<IconAccount />} />
          <SidebarItem label="Commission" icon={<IconCommission />} />
          <SidebarItem label="Rules" icon={<IconRules />} />
          <SidebarItem label="Tutorial" icon={<IconTutorial />} />
          <SidebarItem label="A propos" icon={<IconAbout />} />
        </nav>

        {/* FOOTER BUTTONS */}
        <div className="px-5 pb-6 space-y-3">
          <button className="w-full rounded-xl border border-white/10 bg-[#0a0d11] py-2 text-sm text-slate-300 hover:bg-[#0f1318]">
            Contact Support
          </button>

          <button className="w-full rounded-xl border border-red-900/40 bg-red-900/20 py-2 text-sm text-red-300 hover:bg-red-900/30">
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 px-10 pt-6 pb-10 space-y-8">

        {/* TITLE */}
        <h1 className="text-3xl font-semibold">Dashboard</h1>

        {/* TOP CARDS */}
        <section className="grid gap-5 md:grid-cols-3">
          {topStats.map((card) => (
            <div key={card.label} className="rounded-3xl border border-white/10 bg-[#0b0e13] p-6">

              <p className="text-sm font-medium">{card.label}</p>
              <p className="mt-1 text-xs text-slate-400">{card.description}</p>

              <div className="mt-6 text-2xl font-semibold">{card.value}</div>
              <div className="mt-1 text-xs text-emerald-400">{card.change}</div>

              {/* THIN BLUE BAR */}
              <div className="mt-4 h-[3px] w-full rounded-full"
                   style={{ background: brandBlue }} />
            </div>
          ))}
        </section>

        {/* MAIN CHART */}
        <section className="rounded-3xl border border-white/10 bg-[#0b0e13] p-6">

          <div className="mb-4">
            <p className="text-sm font-medium">Auto Trades Chart</p>
            <p className="mt-1 text-xs text-slate-400">
              Chart of your auto-bot trades in last <span className="text-slate-200">14 days</span>
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-black/30 px-4 pt-4 pb-3">
            {/* BIG CHART */}
            <svg viewBox="0 0 600 220" className="w-full h-44">
              <defs>
                <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={brandBlue} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={brandBlue} stopOpacity="0" />
                </linearGradient>
              </defs>

              <path d="M10 180 C60 170, 90 130, 130 140 C170 150, 200 110, 240 120 C280 130, 310 95, 340 90 C380 85, 410 60, 440 65 C470 70, 500 110, 530 115 C560 120, 580 105, 590 100 L590 210 L10 210 Z"
                    fill="url(#areaFill)" />

              <path d="M10 180 C60 170, 90 130, 130 140 C170 150, 200 110, 240 120 C280 130, 310 95, 340 90 C380 85, 410 60, 440 65 C470 70, 500 110, 530 115 C560 120, 580 105, 590 100"
                    fill="none" stroke={brandBlue} strokeWidth="3" strokeLinecap="round" />

              {/* POINT */}
              <circle cx="440" cy="65" r="4" fill={brandBlue} />
            </svg>

            <div className="mt-3 flex justify-between text-[11px] text-slate-500">
              <span>07.01.2024 — 21.01.2024</span>
              <span className="text-emerald-400 font-medium">+5.29%</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

/* ------------------ SIDEBAR ITEM COMPONENT ------------------ */
function SidebarItem({ label, icon, active }) {
  return (
    <button
      className={[
        "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors",
        active
          ? "bg-[#0d1117] border border-white/15 text-slate-50"
          : "text-slate-400 hover:bg-white/5",
      ].join(" ")}
    >
      <span className="text-slate-300">{icon}</span>
      <span className="text-sm">{label}</span>
    </button>
  );
}
