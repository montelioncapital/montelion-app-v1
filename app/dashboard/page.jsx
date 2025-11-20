// app/dashboard/page.jsx

export default function DashboardPage() {
  return (
    <div className="min-h-screen w-full bg-[#050516] text-slate-100">
      {/* Fond global avec halo bleu en haut */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,#2846ff33,transparent_55%),radial-gradient(900px_900px_at_0%_100%,#1a2a5f66,transparent_60%),radial-gradient(900px_900px_at_100%_100%,#2c1f5f66,transparent_60%)]" />

      <div className="relative flex h-screen">
        {/* SIDEBAR */}
        <aside className="flex w-72 flex-col border-r border-white/5 bg-[#050513]/80 backdrop-blur-xl">
          {/* Logo / brand */}
          <div className="flex items-center gap-3 px-6 pt-6 pb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2f6bff] to-[#38e1ff]">
              <span className="text-sm font-semibold text-white">M</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-[0.24em] text-slate-400">
                MONTELION
              </span>
              <span className="text-[13px] text-slate-300">
                Managed trading dashboard
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="px-6 pb-4">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-300">
              <SearchIcon className="h-4 w-4 text-slate-400" />
              <span className="flex-1 text-xs text-slate-400">
                Search
              </span>
              <span className="rounded-full bg-black/40 px-2 py-1 text-[10px] text-slate-500">
                ⌘K
              </span>
            </div>
          </div>

          {/* Sections */}
          <nav className="mt-2 flex-1 space-y-6 px-4 text-[13px]">
            <SidebarSection label="MENU" />
            <ul className="space-y-1">
              <SidebarItem active icon={<GridIcon />} label="Dashboard" />
              <SidebarItem icon={<StatsIcon />} label="Stats" />
              <SidebarItem icon={<WalletIcon />} label="Accounts" />
              <SidebarItem icon={<TrophyIcon />} label="Competitions" />
              <SidebarItem icon={<StarIcon />} label="Leaderboard" />
            </ul>

            <SidebarSection label="ACCOUNT" />
            <ul className="space-y-1">
              <SidebarItem icon={<DocIcon />} label="Certificates" />
              <SidebarItem icon={<CoinsIcon />} label="Payouts" />
              <SidebarItem icon={<UsersIcon />} label="Affiliate Program" />
              <SidebarItem icon={<DownloadIcon />} label="Downloads" />
            </ul>

            <SidebarSection label="SUPPORT" />
            <ul className="space-y-1">
              <SidebarItem icon={<HelpIcon />} label="Help Center" />
              <SidebarItem icon={<SettingsIcon />} label="Settings" />
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-white/5 px-6 py-4 text-[11px] text-slate-500">
            Logged in as
            <div className="font-medium text-slate-300">
              montelion.capital
            </div>
          </div>
        </aside>

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto flex h-full max-w-6xl flex-col px-8 py-8">
            {/* Top bar */}
            <div className="mb-6 flex items-center justify-between gap-4">
              <div className="text-xs text-slate-400">
                <span className="text-slate-500">Dashboard</span>
                <span className="mx-1 text-slate-600">/</span>
                <span className="text-slate-300">Overview</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">
                  Last update: <span className="text-emerald-400">2 min ago</span>
                </button>
                <div className="flex items-center gap-3 rounded-full bg-white/5 px-2 py-1">
                  <div className="h-7 w-7 rounded-full bg-[url('https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg')] bg-cover bg-center" />
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-slate-100">
                      Montelion Client
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Private Hedge Fund
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cards haut */}
            <div className="mb-6 grid grid-cols-3 gap-4">
              <GlassCard>
                <div className="flex h-full flex-col justify-between">
                  <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Account Balance
                  </div>
                  <div className="text-3xl font-semibold text-slate-50">
                    $171,610.25
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Your current equity (mock data)
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex h-full flex-col justify-between">
                  <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Today&apos;s P&amp;L
                  </div>
                  <div className="text-3xl font-semibold text-emerald-400">
                    + $3,928.00
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    Realized &amp; unrealized (mock data)
                  </div>
                </div>
              </GlassCard>

              <GlassCard>
                <div className="flex h-full flex-col justify-between">
                  <div className="mb-4 text-[11px] uppercase tracking-[0.2em] text-slate-400">
                    Monthly P&amp;L
                  </div>
                  <div className="text-3xl font-semibold text-emerald-400">
                    + $12,450.90
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400">
                    From the start of this month (mock data)
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Mega card type FXIFY */}
            <div className="relative mb-10 overflow-hidden rounded-3xl border border-[#4f7bff33] bg-gradient-to-b from-[#151b33] via-[#050516] to-[#050516]">
              {/* halo violet en bas de la carte */}
              <div className="pointer-events-none absolute inset-x-0 bottom-[-40%] h-[60%] bg-[radial-gradient(900px_400px_at_50%_0%,#365bff44,transparent_70%)]" />

              <div className="relative px-8 pt-6 pb-8">
                {/* Header section */}
                <div className="mb-4 flex items-center justify-between text-[12px]">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-slate-500">
                      P&amp;L Since Account Opening
                    </div>
                    <div className="mt-1 text-[11px] text-slate-400">
                      Mock curve for design preview. Real trading data will be plugged later.
                    </div>
                  </div>
                  <div className="text-right text-[11px]">
                    <div className="text-slate-400">Total P&amp;L</div>
                    <div className="mt-1 text-emerald-400 font-semibold">
                      +$62,000 <span className="text-xs text-emerald-500">+32.8% since opening</span>
                    </div>
                  </div>
                </div>

                {/* Graph stylisé (fake, pure CSS) */}
                <div className="relative mt-4 overflow-hidden rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_0%_0%,#2f6bff33,transparent_55%),radial-gradient(circle_at_100%_0%,#3be4ff22,transparent_55%),linear-gradient(to_bottom,#050716,#050513)] px-8 py-10">
                  {/* lignes horizontales */}
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-x-6 top-1/5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="absolute inset-x-6 top-2/4 h-px bg-gradient-to-r from-transparent via-white/7 to-transparent" />
                    <div className="absolute inset-x-6 top-3/4 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>

                  {/* courbe */}
                  <svg
                    viewBox="0 0 1000 260"
                    className="relative h-52 w-full"
                    preserveAspectRatio="none"
                  >
                    {/* zone dégradée sous la courbe */}
                    <defs>
                      <linearGradient id="mc-area" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#4fd3ff" stopOpacity="0.55" />
                        <stop offset="100%" stopColor="#050716" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="mc-line" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#4fd3ff" />
                        <stop offset="100%" stopColor="#7aa9ff" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M0,210 C120,200 190,190 260,175 C340,160 410,150 470,155 C540,160 590,175 640,185 C720,200 800,210 1000,220 L1000,260 L0,260 Z"
                      fill="url(#mc-area)"
                    />

                    <path
                      d="M0,210 C120,200 190,190 260,175 C340,160 410,150 470,155 C540,160 590,175 640,185 C720,200 800,210 1000,220"
                      fill="none"
                      stroke="url(#mc-line)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* point final */}
                    <circle
                      cx="1000"
                      cy="220"
                      r="7"
                      fill="#050716"
                      stroke="#7aa9ff"
                      strokeWidth="3"
                    />
                    <circle cx="1000" cy="220" r="3" fill="#7aa9ff" />
                  </svg>

                  {/* labels mois */}
                  <div className="mt-6 grid grid-cols-8 text-center text-[11px] text-slate-400">
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* ---------- PETITS COMPOSANTS ---------- */

function GlassCard({ children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_0%_0%,#4f7bff26,transparent_55%),linear-gradient(to_bottom,#0b1020,#050513)] px-6 py-5">
      {children}
    </div>
  );
}

function SidebarSection({ label }) {
  return (
    <div className="px-2 pb-1 text-[10px] font-medium tracking-[0.2em] text-slate-500">
      {label}
    </div>
  );
}

function SidebarItem({ icon, label, active }) {
  return (
    <button
      className={[
        "group flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-[13px] transition",
        active
          ? "bg-gradient-to-r from-[#2f6bff] via-[#2f6bff] to-transparent text-slate-50"
          : "text-slate-300 hover:bg-white/5",
      ].join(" ")}
    >
      <span
        className={
          "flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 " +
          (active
            ? "bg-white/10"
            : "bg-black/30 group-hover:border-white/20 group-hover:bg-white/5")
        }
      >
        {icon}
      </span>
      <span>{label}</span>
    </button>
  );
}

/* ---------- ICONES SVG (pas de dépendances externes) ---------- */

function GridIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      className="h-4 w-4 stroke-[1.6] text-slate-100"
      fill="none"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function StatsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <path d="M4 20V9" />
      <path d="M10 20V4" />
      <path d="M16 20v-7" />
      <path d="M4 20h16" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M17 12h2.5" />
      <circle cx="15" cy="12" r="1" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
      <path d="M10 17h4" />
      <path d="M9 21h6" />
      <path d="M8 4H5a2 2 0 0 0 0 4h1" />
      <path d="M16 4h3a2 2 0 0 1 0 4h-1" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <path d="m12 3 2.3 4.7L19 9l-3.5 3.4L16 17l-4-2.1L8 17l.5-4.6L5 9l4.7-.3L12 3Z" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <path d="M7 3h7l5 5v13H7Z" />
      <path d="M14 3v5h5" />
      <path d="M10 13h6" />
      <path d="M10 17h4" />
    </svg>
  );
}

function CoinsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <circle cx="9" cy="12" r="4" />
      <circle cx="17" cy="12" r="4" />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="3" />
      <path d="M4 19a4 4 0 0 1 8 0" />
      <path d="M14 19a4 4 0 0 1 7-2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function HelpIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 0 1 4.5 1.3c0 1.2-.8 1.7-1.5 2.1-.6.4-1 1-1 1.6" />
      <circle cx="12" cy="17" r="0.9" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 stroke-[1.6] text-slate-200" fill="none">
      <circle cx="12" cy="12" r="3" />
      <path d="M4.9 12a7.1 7.1 0 0 1 .1-1l-1.8-1.4 1.5-2.6 2.1.5a7.2 7.2 0 0 1 1.7-1l.3-2.2h3l.3 2.2a7.2 7.2 0 0 1 1.7 1l2.1-.5 1.5 2.6-1.8 1.4a7.1 7.1 0 0 1 .1 1 7.1 7.1 0 0 1-.1 1l1.8 1.4-1.5 2.6-2.1-.5a7.2 7.2 0 0 1-1.7 1l-.3 2.2h-3l-.3-2.2a7.2 7.2 0 0 1-1.7-1l-2.1.5-1.5-2.6 1.8-1.4a7.1 7.1 0 0 1-.1-1Z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      className={"h-4 w-4 stroke-[1.6] " + (props.className ?? "")}
      fill="none"
    >
      <circle cx="11" cy="11" r="6" />
      <path d="m16 16 4 4" />
    </svg>
  );
}
