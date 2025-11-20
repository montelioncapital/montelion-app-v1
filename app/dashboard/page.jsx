// app/dashboard/page.jsx
// Clone-style FXIFY "Competitions" page (only design, mock data)

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-[#050712] text-slate-100 flex">
      {/* SIDEBAR */}
      <aside className="w-72 flex flex-col border-r border-white/5 bg-gradient-to-b from-[#070815] via-[#050713] to-[#050712]">
        {/* Brand */}
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-[#4f8bff] via-[#7c5cff] to-[#ff6fd8] flex items-center justify-center shadow-[0_0_24px_rgba(111,140,255,0.75)]">
            <span className="text-xs font-semibold tracking-[0.18em]">
              FX
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-wide">
              FXIFY<span className="text-[#8b9dff]">Futures</span>
            </span>
            <span className="text-[11px] text-slate-400">
              Futures trading panel
            </span>
          </div>
        </div>

        {/* Start Challenge CTA */}
        <div className="px-6">
          <button className="w-full h-11 rounded-xl bg-gradient-to-r from-[#4168ff] via-[#6b5dff] to-[#b34fff] text-[13px] font-medium shadow-[0_0_30px_rgba(88,120,255,0.8)] border border-white/15 flex items-center justify-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
            Start Challenge
          </button>
        </div>

        {/* Search */}
        <div className="px-6 mt-4 mb-2">
          <div className="h-10 rounded-full bg-white/5 border border-white/10 flex items-center px-3 text-xs text-slate-400">
            <SearchIcon className="h-4 w-4 mr-2 text-slate-400" />
            Search...
            <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full border border-white/15 text-slate-300/80">
              ⌘K
            </span>
          </div>
        </div>

        {/* Main menu */}
        <SidebarSection title="MENU">
          <SidebarItem label="Dashboard" active icon={<GridIcon />} />
          <SidebarItem label="Stats" icon={<StatsIcon />} />
          <SidebarItem label="Accounts" icon={<UserIcon />} />
          <SidebarItem label="Competitions" icon={<TrophyIcon />} />
          <SidebarItem label="Leaderboard" icon={<LeaderboardIcon />} />
        </SidebarSection>

        {/* Account */}
        <SidebarSection title="ACCOUNT">
          <SidebarItem label="Certificates" icon={<BadgeIcon />} />
          <SidebarItem label="Payouts" icon={<WalletIcon />} />
          <SidebarItem label="Affiliate Program" icon={<UsersIcon />} />
          <SidebarItem label="Downloads" icon={<DownloadIcon />} />
        </SidebarSection>

        {/* Help / footer */}
        <div className="mt-auto px-4 pb-5 pt-2">
          <button className="w-full h-11 rounded-xl bg-white/3 border border-white/10 flex items-center gap-2 px-3 text-[12px] text-slate-200/90">
            <div className="h-7 w-7 rounded-full bg-[#101626] flex items-center justify-center">
              <HelpIcon className="h-3.5 w-3.5 text-slate-300" />
            </div>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[11px] text-slate-300">Help Center</span>
              <span className="text-[10px] text-slate-400">
                Chat with our team 24/7
              </span>
            </div>
          </button>

          <div className="mt-4 text-[10px] text-slate-500">
            Logged in as
            <div className="text-slate-300">pro.trader@fxify.com</div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <section className="flex-1 bg-[radial-gradient(circle_at_top,_#2136a8_0%,#050712_55%,#01020a_100%)] relative overflow-hidden">
        {/* soft glow overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen bg-[radial-gradient(1200px_600px_at_center_top,#274cff_0%,rgba(38,99,255,0.0)_60%)]" />

        <div className="relative h-full flex flex-col px-10 pt-7 pb-10 gap-6">
          {/* Top bar */}
          <header className="flex items-center justify-between gap-6">
            <div className="flex flex-col">
              <nav className="text-[11px] text-slate-400 flex items-center gap-1">
                <span>Dashboard</span>
                <span className="opacity-50">/</span>
                <span className="text-slate-300">Competitions</span>
              </nav>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight">
                Competitions
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-8 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 flex items-center text-[11px] text-emerald-200 shadow-[0_0_20px_rgba(52,211,153,0.5)]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 mr-1.5 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                Live sync enabled
              </div>
              <div className="h-8 px-3 rounded-full bg-white/5 border border-white/10 text-[11px] text-slate-200 flex items-center">
                Today · 14:21 UTC
              </div>
              <button className="h-8 w-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-[13px] text-slate-200">
                👤
              </button>
              <div className="h-9 rounded-full bg-white/3 border border-white/15 px-2 pr-3 flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-[#4f8bff] via-[#7b5cff] to-[#ff6fd8] flex items-center justify-center text-[11px] font-semibold text-white">
                  DB
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-[11px] text-slate-100">
                    Dave Bhids
                  </span>
                  <span className="text-[10px] text-slate-400">
                    pro.trader@fxify.com
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Main gradient card */}
          <div className="flex-1 rounded-3xl border border-white/10 bg-gradient-to-br from-[#131624] via-[#111632] to-[#1f2852] shadow-[0_0_80px_rgba(74,105,255,0.55)] overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Competition header area */}
              <div className="px-10 pt-8 pb-6 flex gap-10 items-start">
                {/* Title + description */}
                <div className="flex-1">
                  <div className="inline-flex items-center text-[11px] text-slate-200 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4 gap-2">
                    <span className="h-5 w-5 rounded-full bg-gradient-to-br from-[#4f8bff] to-[#9b5cff] flex items-center justify-center text-[11px]">
                      <TrophyIcon className="h-3 w-3" />
                    </span>
                    FXIFY Challenge
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight">
                    June 2024 Global Trading Competition
                  </h2>
                  <p className="mt-2 text-[12px] text-slate-200/80 max-w-xl leading-relaxed">
                    Join our tournaments to win real prizes, hone your skills,
                    and compete against top proprietary traders. New
                    competitions are added regularly, don’t miss out.
                  </p>

                  {/* Metrics row */}
                  <div className="mt-5 flex flex-wrap gap-3 text-[11px] text-slate-200">
                    <MetricPill label="Contestants" value="1,538" />
                    <MetricPill label="Active contestants" value="538" />
                    <MetricPill label="Failed accounts" value="120" />
                  </div>
                </div>

                {/* Right block: prize + CTA */}
                <div className="w-[320px] flex flex-col gap-3">
                  {/* top row: start & year */}
                  <div className="flex justify-end gap-2">
                    <button className="px-3 h-7 rounded-full text-[11px] border border-white/15 bg-white/5 text-slate-200">
                      Start 30.06
                    </button>
                    <button className="px-3 h-7 rounded-full text-[11px] border border-white/10 bg-white/5 text-slate-300/90">
                      2024 Series
                    </button>
                  </div>

                  <div className="mt-2 rounded-2xl border border-white/15 bg-gradient-to-br from-[#181c34] via-[#1b2344] to-[#252d5b] px-5 py-4 text-[12px] text-slate-100 shadow-[0_0_40px_rgba(87,119,255,0.7)]">
                    <div className="flex justify-between text-[11px] text-slate-300/80">
                      <span>Prize pool</span>
                      <span>FXIFY Account</span>
                    </div>
                    <div className="mt-2 flex items-baseline gap-2">
                      <span className="text-2xl font-semibold tracking-tight">
                        $100K
                      </span>
                      <span className="text-[11px] text-slate-300/80">
                        account
                      </span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-300/80">
                      2 phases · 30 days
                    </p>
                    <p className="mt-1 text-[11px] text-emerald-300">
                      + Live payout enabled
                    </p>
                  </div>

                  <button className="mt-1 h-10 rounded-2xl flex items-center justify-between px-4 bg-gradient-to-r from-[#4168ff] via-[#6b5dff] to-[#b34fff] text-[12px] font-medium text-white border border-white/25 shadow-[0_0_38px_rgba(88,120,255,0.9)]">
                    <span>You joined the current competition</span>
                    <span className="flex items-center gap-1 text-[11px]">
                      View dashboard
                      <span className="inline-block translate-y-[1px]">
                        →
                      </span>
                    </span>
                  </button>
                </div>
              </div>

              {/* Bottom area (Upcoming cards row placeholder) */}
              <div className="mt-2 flex-1 bg-gradient-to-b from-transparent via-[#0a0d1c] to-[#050712] px-10 pb-8 pt-4">
                <div className="flex items-center justify-between text-[12px] text-slate-200/90 mb-4">
                  <div className="flex items-center gap-2">
                    <HourglassIcon className="h-4 w-4 text-slate-200" />
                    <span className="font-medium">Upcoming</span>
                    <span className="text-slate-400">Current</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-300/80">
                    <button className="px-3 h-7 rounded-full bg-white/5 border border-white/15">
                      2024
                    </button>
                    <button className="px-3 h-7 rounded-full border border-transparent text-slate-400">
                      2023
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {["Qualification round", "Semi finals", "Grand final"].map(
                    (title, idx) => (
                      <div
                        key={title}
                        className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#101320] via-[#151a33] to-[#1f274a] p-4 flex flex-col gap-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-[12px]">
                            <div className="text-slate-100/95 font-medium">
                              {title}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-0.5">
                              {idx === 0
                                ? "Opens in 03:21:45"
                                : idx === 1
                                ? "Top 250 traders"
                                : "Live streaming event"}
                            </div>
                          </div>
                          <button className="h-8 w-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-[14px] text-slate-100">
                            →
                          </button>
                        </div>

                        <div className="mt-1 h-16 rounded-xl bg-gradient-to-r from-[#4466ff] via-[#6a5dff] to-[#ff6fd8] opacity-70 blur-[1px]" />
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---- small UI helpers ---- */

function SidebarSection({ title, children }) {
  return (
    <div className="mt-4 px-4">
      <div className="text-[11px] font-medium tracking-[0.18em] text-slate-500 mb-2">
        {title}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function SidebarItem({ label, icon, active = false }) {
  const base =
    "group flex items-center gap-3 rounded-xl px-3 h-10 text-[13px] transition";
  if (active) {
    return (
      <button
        className={`${base} text-white bg-gradient-to-r from-[#4466ff] via-[#6b5dff] to-[#b34fff] shadow-[0_0_30px_rgba(88,120,255,0.95)] border border-white/20`}
      >
        <div className="h-7 w-7 rounded-full bg-black/20 flex items-center justify-center">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </button>
    );
  }

  return (
    <button
      className={`${base} text-slate-300/90 bg-transparent hover:bg-white/[0.04] border border-transparent hover:border-white/10`}
    >
      <div className="h-7 w-7 rounded-full bg-white/[0.03] flex items-center justify-center text-slate-400 group-hover:text-slate-200">
        {icon}
      </div>
      <span>{label}</span>
    </button>
  );
}

function MetricPill({ label, value }) {
  return (
    <div className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-3 py-1">
      <span className="text-[11px] text-slate-300/85 mr-2">{label}</span>
      <span className="text-[11px] font-semibold text-slate-50">{value}</span>
    </div>
  );
}

/* ---- tiny SVG icons (no external deps) ---- */

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle
        cx="9"
        cy="9"
        r="5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M12.5 12.5L16 16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GridIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="3" y="3" width="5" height="5" rx="1.2" stroke="currentColor" />
      <rect x="12" y="3" width="5" height="5" rx="1.2" stroke="currentColor" />
      <rect x="3" y="12" width="5" height="5" rx="1.2" stroke="currentColor" />
      <rect x="12" y="12" width="5" height="5" rx="1.2" stroke="currentColor" />
    </svg>
  );
}

function StatsIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M4 12.5V16M9 9V16M14 6V16"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle
        cx="10"
        cy="7"
        r="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M4.5 15.5C5.4 13.6 7.5 12.5 10 12.5c2.5 0 4.6 1.1 5.5 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TrophyIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M6 4h8v2.5a4 4 0 01-4 4 4 4 0 01-4-4V4z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M8 14h4M9 10.5V12a1 1 0 001 1 1 1 0 001-1v-1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M6 5H4.5A1.5 1.5 0 006 7v0M14 5h1.5A1.5 1.5 0 0114 7v0"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LeaderboardIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect
        x="3"
        y="9"
        width="4"
        height="8"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="8"
        y="5"
        width="4"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <rect
        x="13"
        y="11"
        width="4"
        height="6"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function BadgeIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle
        cx="10"
        cy="8"
        r="3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M7 11l-2 4 3-1.2 2 1.2 2-1.2 3 1.2-2-4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WalletIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect
        x="3"
        y="5"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M13 9.5h3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12.5" cy="9.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle
        cx="8"
        cy="8"
        r="2.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <circle
        cx="13.5"
        cy="7.5"
        r="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4.5 14.5C5.3 13 6.7 12.2 8.2 12.2c1.6 0 3 0.8 3.8 2.3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M12 12c1.1 0 2.3.5 3 1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DownloadIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M10 3v8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M6.5 9.5L10 13l3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="4"
        y="14.5"
        width="12"
        height="2"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}

function HelpIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle
        cx="10"
        cy="10"
        r="7"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M9 8a2 2 0 113 1.732C11.5 10.3 11 10.7 11 11.5V12"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="10" cy="13.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function HourglassIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M6 4h8M6 16h8"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M7 4c0 3 2 3.5 3 5-1 1.5-3 2-3 5m6-10c0 3-2 3.5-3 5 1 1.5 3 2 3 5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  );
}
