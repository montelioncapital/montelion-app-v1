// app/dashboard/page.jsx
"use client";

const navItems = [
  { label: "Dashboard", icon: "grid", active: true },
  { label: "Stats", icon: "chart" },
  { label: "Accounts", icon: "wallet" },
  { label: "Competitions", icon: "trophy" },
  { label: "Leaderboard", icon: "cup" },
];

const accountItems = [
  { label: "Certificates", icon: "badge" },
  { label: "Payouts", icon: "cash" },
  { label: "Affiliate Program", icon: "users" },
  { label: "Downloads", icon: "download" },
];

function Icon({ name, className = "" }) {
  const common = "stroke-current";
  switch (name) {
    case "grid":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <rect x="4" y="4" width="6" height="6" rx="1.5" />
          <rect x="14" y="4" width="6" height="6" rx="1.5" />
          <rect x="4" y="14" width="6" height="6" rx="1.5" />
          <rect x="14" y="14" width="6" height="6" rx="1.5" />
        </svg>
      );
    case "chart":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <path
            d="M4 18L9 11L13 14L20 6"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="11" r="1.2" />
          <circle cx="13" cy="14" r="1.2" />
          <circle cx="20" cy="6" r="1.2" />
        </svg>
      );
    case "wallet":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="2.5"
            fill="none"
            strokeWidth="1.7"
          />
          <path
            d="M17 12.5h2.5a1.5 1.5 0 0 0 0-3H17"
            fill="none"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="16.75" cy="11" r="0.9" />
        </svg>
      );
    case "trophy":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <path
            d="M8 5h8v3.5A4 4 0 0 1 12 13a4 4 0 0 1-4-4.5V5Z"
            fill="none"
            strokeWidth="1.7"
          />
          <path
            d="M10 15.5h4M10 18.5h4"
            fill="none"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M8 7H5.5A1.5 1.5 0 0 0 4 8.5C4 10.4 5.6 12 7.5 12"
            fill="none"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M16 7h2.5A1.5 1.5 0 0 1 20 8.5C20 10.4 18.4 12 16.5 12"
            fill="none"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "cup":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <path
            d="M8 4h8v5.5A4 4 0 0 1 12 13a4 4 0 0 1-4-3.5V4Z"
            fill="none"
            strokeWidth="1.7"
          />
          <path
            d="M9 18h6M10 21h4"
            fill="none"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    case "badge":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="10"
            r="4"
            fill="none"
            strokeWidth="1.7"
          />
          <path
            d="M8.5 14.5 7 21l5-2 5 2-1.5-6.5"
            fill="none"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "cash":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <rect
            x="3"
            y="6"
            width="18"
            height="12"
            rx="2"
            fill="none"
            strokeWidth="1.7"
          />
          <circle cx="12" cy="12" r="2.5" />
          <path
            d="M7 9.5V9M17 15v-0.5"
            fill="none"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "users":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <circle cx="10" cy="9" r="3" />
          <path
            d="M4.5 18.2C5.6 15.8 7.5 14.5 10 14.5s4.4 1.3 5.5 3.7"
            fill="none"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="17" cy="9.5" r="2" />
        </svg>
      );
    case "download":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <path
            d="M12 4v9"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M8.5 10.5 12 13.5l3.5-3"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 18.5h12"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      );
    case "help":
      return (
        <svg className={`${common} ${className}`} viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="8"
            fill="none"
            strokeWidth="1.7"
          />
          <path
            d="M9.5 9A2.5 2.5 0 0 1 14 10c0 1.5-1.5 1.9-2.1 2.3-.4.3-.4.7-.4 1.2"
            fill="none"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="12" cy="16.4" r="0.9" />
        </svg>
      );
    default:
      return null;
  }
}

const chartData = [
  { x: 0, y: 120 },
  { x: 80, y: 110 },
  { x: 160, y: 95 },
  { x: 240, y: 80 },
  { x: 320, y: 90 },
  { x: 400, y: 105 },
  { x: 480, y: 115 },
  { x: 560, y: 118 },
];

function buildPath(points) {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const mx = (p0.x + p1.x) / 2;
    d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

export default function DashboardPage() {
  const path = buildPath(chartData);

  return (
    <div className="min-h-screen bg-[#020618] text-slate-100 flex">
      {/* ---- LEFT SIDEBAR ---- */}
      <aside className="relative w-72 border-r border-white/5 bg-gradient-to-b from-[#05091f] via-[#030616] to-[#020414] overflow-hidden">
        {/* halo */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#3b82f6]/30 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -right-10 h-40 w-40 rounded-full bg-[#22c1c3]/20 blur-2xl" />

        <div className="relative flex h-full flex-col px-5 pt-5 pb-4 space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-500 shadow-[0_0_30px_rgba(56,189,248,0.65)]">
              <span className="text-sm font-semibold tracking-tight">
                M
              </span>
            </div>
            <div className="leading-tight">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
                Montelion
              </p>
              <p className="text-[11px] text-slate-400">
                Managed trading dashboard
              </p>
            </div>
          </div>

          {/* Search */}
          <button className="relative flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-300/90 shadow-[0_0_0_1px_rgba(15,23,42,0.6)] hover:border-sky-400/70 hover:bg-white/7 transition">
            <span className="text-[11px] text-slate-400">Search</span>
            <span className="ml-auto flex items-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-slate-400">
              ⌘K
            </span>
          </button>

          {/* Menu sections */}
          <div className="flex-1 space-y-6 text-xs">
            <div>
              <p className="mb-2 px-1 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
                Menu
              </p>
              <nav className="space-y-1.5">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-[13px] transition ${
                      item.active
                        ? "bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 text-white shadow-[0_0_25px_rgba(56,189,248,0.75)]"
                        : "text-slate-400 hover:bg-white/4 hover:text-slate-100"
                    }`}
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                        item.active
                          ? "border-white/40 bg-black/10"
                          : "border-white/10 bg-black/20 group-hover:border-sky-400/60"
                      }`}
                    >
                      <Icon
                        name={item.icon}
                        className={`h-3.5 w-3.5 ${
                          item.active
                            ? "text-white"
                            : "text-slate-400 group-hover:text-sky-300"
                        }`}
                      />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div>
              <p className="mb-2 px-1 text-[10px] font-medium uppercase tracking-[0.25em] text-slate-500">
                Account
              </p>
              <nav className="space-y-1.5">
                {accountItems.map((item) => (
                  <button
                    key={item.label}
                    className="group flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-[13px] text-slate-400 transition hover:bg-white/4 hover:text-slate-100"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-black/20 group-hover:border-sky-400/60">
                      <Icon
                        name={item.icon}
                        className="h-3.5 w-3.5 text-slate-400 group-hover:text-sky-300"
                      />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-2 text-[11px]">
            <button className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-3 py-2 text-slate-300/90 hover:border-sky-400/50 hover:text-white transition">
              <Icon name="help" className="h-3.5 w-3.5 text-sky-300" />
              <span>Help center</span>
            </button>
            <p className="text-[10px] text-slate-500">
              Logged in as
              <br />
              <span className="text-slate-300">montelion.client</span>
            </p>
          </div>
        </div>
      </aside>

      {/* ---- MAIN CONTENT ---- */}
      <main className="relative flex-1 overflow-hidden">
        {/* grand halo top */}
        <div className="pointer-events-none absolute inset-x-0 -top-40 h-72 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.42),_transparent_60%)] opacity-80" />
        {/* subtle starfield */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(148,163,253,0.18),transparent_55%),radial-gradient(circle_at_80%_0%,rgba(56,189,248,0.14),transparent_55%)] mix-blend-screen" />

        <div className="relative z-10 h-full px-10 pb-10 pt-8">
          {/* Top bar */}
          <header className="mb-8 flex items-center justify-between">
            <div>
              <div className="mb-1 text-xs text-slate-500">
                Dashboard
                <span className="mx-1.5 text-slate-600">/</span>
                <span className="text-slate-400">Overview</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Last update: 2 min ago</span>
              </div>
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 shadow-[0_0_18px_rgba(15,23,42,0.6)]">
                <div className="h-7 w-7 rounded-full bg-gradient-to-br from-slate-200 via-slate-100 to-slate-400" />
                <div className="leading-tight">
                  <p className="text-[11px] font-medium text-slate-100">
                    Montelion Client
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Private Hedge Fund
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Stat cards */}
          <section className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/12 bg-[linear-gradient(135deg,rgba(15,23,42,0.95),rgba(15,23,42,0.7))] px-6 py-5 shadow-[0_10px_40px_rgba(15,23,42,0.9)] backdrop-blur-xl">
              <p className="text-[11px] font-medium tracking-[0.2em] text-slate-500 uppercase">
                Account Balance
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-50">
                $171,610.25
              </p>
              <p className="mt-1 text-[11px] text-slate-500">
                Your current equity (mock data)
              </p>
            </div>

            <div className="rounded-3xl border border-teal-400/20 bg-[linear-gradient(135deg,rgba(8,47,73,0.9),rgba(15,23,42,0.7))] px-6 py-5 shadow-[0_12px_45px_rgba(34,197,235,0.45)] backdrop-blur-xl">
              <p className="text-[11px] font-medium tracking-[0.2em] text-sky-200/80 uppercase">
                Today&apos;s P&L
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-emerald-300">
                + $3,928.00
              </p>
              <p className="mt-1 text-[11px] text-sky-100/80">
                Realized &amp; unrealized (mock data)
              </p>
            </div>

            <div className="rounded-3xl border border-indigo-400/25 bg-[linear-gradient(135deg,rgba(30,64,175,0.9),rgba(15,23,42,0.8))] px-6 py-5 shadow-[0_12px_45px_rgba(79,70,229,0.6)] backdrop-blur-xl">
              <p className="text-[11px] font-medium tracking-[0.2em] text-indigo-100/80 uppercase">
                Monthly P&L
              </p>
              <p className="mt-3 text-2xl font-semibold tracking-tight text-emerald-200">
                + $12,450.90
              </p>
              <p className="mt-1 text-[11px] text-indigo-100/90">
                From the start of this month (mock data)
              </p>
            </div>
          </section>

          {/* Big competition / P&L card */}
          <section className="mt-4 rounded-[32px] border border-white/12 bg-[radial-gradient(ellipse_at_top,_rgba(56,189,248,0.24),transparent_55%),linear-gradient(to_bottom,_rgba(15,23,42,0.96),_rgba(3,7,18,0.98))] px-8 pt-6 pb-8 shadow-[0_24px_80px_rgba(15,23,42,0.95)] backdrop-blur-2xl">
            {/* header row */}
            <div className="mb-6 flex items-center justify-between text-xs">
              <div>
                <p className="text-[11px] font-medium tracking-[0.24em] text-slate-400 uppercase">
                  P&amp;L since account opening
                </p>
                <p className="mt-1 text-[11px] text-slate-400">
                  Mock curve for design preview. Real trading data will be
                  plugged later.
                </p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-medium tracking-[0.24em] text-slate-400 uppercase">
                  Total P&amp;L
                </p>
                <p className="mt-1 text-[13px] font-semibold text-emerald-300">
                  +$62,000{" "}
                  <span className="ml-1 text-[11px] font-normal text-emerald-200/80">
                    +32.8% since opening
                  </span>
                </p>
              </div>
            </div>

            {/* chart container */}
            <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_50%_-40%,rgba(56,189,248,0.5),transparent_55%),linear-gradient(to_bottom,#020617,#020617)] px-2 pt-6 pb-8">
              {/* horizontal grid lines */}
              <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-b border-dashed border-slate-600/35"
                    style={{
                      top: `${(i + 1) * 16}%`,
                      position: "absolute",
                      left: "0",
                      right: "0",
                    }}
                  />
                ))}
              </div>

              {/* line chart */}
              <div className="relative h-56">
                <svg
                  viewBox="0 0 560 180"
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
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="40%" stopColor="#22c1c3" />
                      <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                    <linearGradient
                      id="fillGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(56,189,248,0.55)" />
                      <stop offset="40%" stopColor="rgba(56,189,248,0.25)" />
                      <stop offset="100%" stopColor="rgba(15,23,42,0.2)" />
                    </linearGradient>
                  </defs>

                  {/* area */}
                  <path
                    d={`${path} L 560 180 L 0 180 Z`}
                    fill="url(#fillGradient)"
                    opacity="0.9"
                  />
                  {/* line */}
                  <path
                    d={path}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_12px_rgba(56,189,248,0.7)]"
                  />
                  {/* end point */}
                  {chartData.length > 0 && (
                    <circle
                      cx={chartData[chartData.length - 1].x}
                      cy={chartData[chartData.length - 1].y}
                      r="5"
                      fill="#0f172a"
                      stroke="#38bdf8"
                      strokeWidth="3"
                    />
                  )}
                </svg>
              </div>

              {/* months */}
              <div className="mt-3 flex items-center justify-between px-4 text-[11px] text-slate-400">
                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(
                  (m) => (
                    <span key={m}>{m}</span>
                  ),
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
