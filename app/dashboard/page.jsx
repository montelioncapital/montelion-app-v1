"use client";

const brandBlue = "#2664EC";

/* -------------------- SVG ICONS -------------------- */
const IconDashboard = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z" />
  </svg>
);

const IconUser = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 9v-1a6 6 0 0 0-12 0v1Z" />
  </svg>
);

const IconCommission = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M12 1v22M5 6h14M5 12h14M5 18h14" />
  </svg>
);

const IconRules = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M4 3h16v18H4zM8 7h8M8 12h8M8 17h5" />
  </svg>
);

const IconTutorial = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M4 4h16v16H4zM4 9h16" />
  </svg>
);

const IconAbout = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

export default function DashboardPage() {
  const userName = "Demo User";
  const initials = "DU";

  const menu = [
    { label: "Dashboard", icon: <IconDashboard />, active: true },
    { label: "Account", icon: <IconUser /> },
    { label: "Commission", icon: <IconCommission /> },
    { label: "Rules", icon: <IconRules /> },
    { label: "Tutorial", icon: <IconTutorial /> },
    { label: "A Propos", icon: <IconAbout /> },
  ];

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

  return (
    <div className="flex min-h-screen bg-[#050608] text-slate-50">
      {/* BACKGROUND GLOW */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(38,100,236,0.35), transparent 60%), radial-gradient(circle at 100% 0%, rgba(38,100,236,0.2), transparent 55%)",
        }}
      />

      {/* SIDEBAR */}
      <aside className="relative z-10 flex w-72 flex-col border-r border-white/5 bg-[#050708]">
        {/* USER */}
        <div className="px-6 pt-6 pb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10">
            {initials}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{userName}</div>
            <div className="text-xs text-slate-400">Private investor Montelion</div>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 px-5 space-y-1">
          {menu.map((item) => (
            <button
              key={item.label}
              className={[
                "flex items-center w-full gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                item.active
                  ? "bg-[#0a0f14] border border-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5",
              ].join(" ")}
            >
              <span className="text-inherit">{item.icon}</span>
              <span className="text-sm">{item.label.toUpperCase()}</span>
            </button>
          ))}
        </nav>

        {/* BOTTOM BUTTONS */}
        <div className="px-5 pb-6 space-y-3">
          <button className="w-full rounded-xl border border-white/10 bg-[#0c1117] py-2 text-sm hover:bg-white/10">
            Contact Support
          </button>
          <button className="w-full rounded-xl border border-red-800/30 bg-red-900/20 py-2 text-sm text-red-300 hover:bg-red-900/30">
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 px-10 pt-8 pb-12">
        {/* PAGE TITLE */}
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>

        {/* TOP CARDS */}
        <div className="grid gap-5 md:grid-cols-3">
          {topStats.map((card) => (
            <div
              key={card.label}
              className="rounded-3xl border border-white/10 bg-[#05090d] px-6 py-5 relative"
            >
              {/* Thin gradient underline */}
              <div
                className="absolute left-0 right-0 bottom-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${brandBlue}, transparent)`,
                }}
              />

              <p className="text-sm font-medium">{card.label}</p>
              <p className="text-xs text-slate-400">{card.description}</p>

              <div className="mt-5 text-2xl font-semibold">{card.value}</div>
              <div className="mt-1 text-xs text-emerald-400">{card.change}</div>
            </div>
          ))}
        </div>

        {/* BIG CHART */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-[#05090d] px-6 py-6">
          <div className="mb-4">
            <p className="text-sm font-medium">Auto Trades Chart</p>
            <p className="text-xs text-slate-400">
              Chart of your auto-bot trades in last{" "}
              <span className="text-slate-200">14 days</span>
            </p>
          </div>

          {/* CHART */}
          <div className="rounded-2xl border border-white/5 bg-black/30 px-4 pt-4 pb-3">
            <svg viewBox="0 0 600 220" className="w-full h-44">
              <defs>
                <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={brandBlue} stopOpacity="0.45" />
                  <stop offset="90%" stopColor={brandBlue} stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="
                  M10 180
                  C60 170, 90 130, 130 140
                  C170 150, 200 110, 240 120
                  C280 130, 310 95, 340 90
                  C380 85, 410 60, 440 65
                  C470 70, 500 110, 530 115
                  C560 120, 580 105, 590 100
                  L 590 210 L 10 210 Z
                "
                fill="url(#chartFill)"
              />

              <path
                d="
                  M10 180
                  C60 170, 90 130, 130 140
                  C170 150, 200 110, 240 120
                  C280 130, 310 95, 340 90
                  C380 85, 410 60, 440 65
                  C470 70, 500 110, 530 115
                  C560 120, 580 105, 590 100
                "
                fill="none"
                stroke={brandBlue}
                strokeWidth="3"
              />

              {/* point */}
              <circle cx="440" cy="65" r="5" fill="#0f172a" />
              <circle cx="440" cy="65" r="4" fill={brandBlue} />
            </svg>

            {/* FOOTER */}
            <div className="flex justify-between mt-3 text-[11px] text-slate-500">
              <span>07.01.2024 — 21.01.2024</span>
              <span className="text-emerald-400 font-medium">+5.29%</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
