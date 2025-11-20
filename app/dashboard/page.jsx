"use client";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#020516] text-slate-100">
      {/* --- LEFT SIDEBAR --- */}
      <aside className="w-72 border-r border-white/5 bg-[#050815] relative flex flex-col">
        {/* Gradient halo derrière la sidebar */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(69,110,255,0.35),transparent_55%),radial-gradient(circle_at_bottom,rgba(37,182,255,0.18),transparent_55%)]" />

        {/* Top brand + search */}
        <div className="relative z-10 px-6 pt-6 pb-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-[#3d7bff] via-[#5c8cff] to-[#8c4dff] flex items-center justify-center shadow-[0_0_25px_rgba(80,122,255,0.9)]">
              <span className="text-xs font-semibold tracking-[0.18em]">
                FX
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-slate-300">
                FXIFY
              </span>
              <span className="text-[11px] text-slate-400">
                Futures trading panel
              </span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent blur-[6px] opacity-60" />
            <div className="relative flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-slate-300">
              <span className="opacity-70">Search…</span>
              <span className="ml-auto rounded-full border border-white/15 px-2 py-[2px] text-[10px] text-slate-400">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* MAIN NAV */}
        <nav className="relative z-10 px-4 pt-4 space-y-6 text-sm">
          <div>
            <p className="px-2 mb-2 text-[11px] font-medium tracking-[0.16em] text-slate-500 uppercase">
              Menu
            </p>
            <div className="space-y-2">
              {/* Active item */}
              <button className="w-full rounded-2xl bg-[radial-gradient(circle_at_left,rgba(84,131,255,0.9),transparent_60%),linear-gradient(90deg,#356bff,#5f8dff,#8d52ff)] p-[1.5px] shadow-[0_0_40px_rgba(71,116,255,0.9)]">
                <div className="flex items-center gap-3 w-full rounded-2xl bg-[#050815] px-4 py-3">
                  <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-[#4b7cff] to-[#7e4bff] flex items-center justify-center text-[15px]">
                    ▢▢
                  </div>
                  <span className="text-[13px] font-medium">Dashboard</span>
                </div>
              </button>

              <NavItem icon="📊" label="Stats" />
              <NavItem icon="👤" label="Accounts" />
              <NavItem icon="🏆" label="Competitions" />
              <NavItem icon="🏅" label="Leaderboard" />
            </div>
          </div>

          <div>
            <p className="px-2 mb-2 text-[11px] font-medium tracking-[0.16em] text-slate-500 uppercase">
              Account
            </p>
            <div className="space-y-2">
              <NavItem icon="🎓" label="Certificates" />
              <NavItem icon="💳" label="Payouts" />
              <NavItem icon="🤝" label="Affiliate Program" />
              <NavItem icon="⬇️" label="Downloads" />
            </div>
          </div>
        </nav>

        {/* Support footer */}
        <div className="relative z-10 mt-auto px-4 pb-6 pt-4">
          <div className="rounded-2xl border border-white/10 bg-black/40 px-4 py-3 flex items-center gap-3 text-xs text-slate-300">
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-[#4b7cff] to-[#7f5dff] flex items-center justify-center text-[13px]">
              ?
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-[12px]">Help Center</span>
              <span className="text-[11px] text-slate-400">
                Chat with our team 24/7
              </span>
            </div>
          </div>

          <p className="mt-5 text-[11px] text-slate-500 text-left">
            Logged in as
            <span className="block text-slate-300">trader@example.com</span>
          </p>
        </div>
      </aside>

      {/* --- MAIN AREA --- */}
      <main className="flex-1 relative overflow-hidden">
        {/* Fond global */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(86,128,255,0.52),transparent_60%),radial-gradient(circle_at_bottom,rgba(40,12,90,0.7),transparent_60%)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(25,167,255,0.12),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(108,76,255,0.25),transparent_55%)] mix-blend-screen" />

        <div className="relative z-10 h-full flex flex-col px-10 pt-7 pb-8">
          {/* TOP BAR */}
          <header className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span>Dashboard</span>
                <span className="opacity-40">/</span>
                <span className="text-slate-300">Competitions</span>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Competitions
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/40 bg-black/40 px-3 py-1.5 text-xs text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.55)]">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.9)]" />
                <span>Live sync enabled</span>
              </div>

              <button className="rounded-full border border-white/15 bg-black/40 text-xs px-3 py-1.5 text-slate-300">
                Today · 14:21 UTC
              </button>

              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/60 px-2 py-1">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#4b7cff] to-[#8d4fff] flex items-center justify-center text-xs font-semibold">
                  DB
                </div>
                <div className="flex flex-col leading-tight mr-2">
                  <span className="text-xs font-medium">Dave Bhids</span>
                  <span className="text-[10px] text-slate-400">
                    pro.trader@fxify.com
                  </span>
                </div>
                <div className="h-7 w-7 rounded-full bg-white/5 flex items-center justify-center text-[11px] text-slate-300">
                  ▾
                </div>
              </div>
            </div>
          </header>

          {/* MAIN CARD */}
          <section className="flex-1 rounded-3xl border border-white/12 bg-[radial-gradient(circle_at_top,rgba(61,93,255,0.55),rgba(11,18,45,0.98)),radial-gradient(circle_at_bottom,rgba(19,32,88,0.95),#040616)] shadow-[0_40px_80px_rgba(0,0,0,0.90)] overflow-hidden flex flex-col">
            {/* Upper content */}
            <div className="px-8 pt-7 pb-5 flex items-start justify-between gap-10">
              {/* Left section text */}
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-slate-200 mb-4">
                  <span className="h-5 w-5 rounded-full bg-gradient-to-br from-[#4b7cff] to-[#7e4bff] flex items-center justify-center text-[12px]">
                    ⬤
                  </span>
                  <span className="uppercase tracking-[0.2em] text-[10px] text-slate-300">
                    FXIFY Challenge
                  </span>
                </div>

                <h2 className="text-xl font-semibold mb-2 tracking-tight">
                  June 2024 Global Trading Competition
                </h2>
                <p className="text-xs text-slate-200/80 max-w-md">
                  Join our tournaments to win real prizes, hone your skills, and
                  compete against top proprietary traders. New competitions are
                  added regularly, do not miss out.
                </p>

                <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-slate-200/90">
                  <StatPill label="Contestants" value="1,538" />
                  <StatPill label="Active contestants" value="538" />
                  <StatPill label="Failed accounts" value="120" />
                </div>
              </div>

              {/* Right side small cards */}
              <div className="flex flex-col gap-3 min-w-[260px]">
                <div className="flex items-center justify-end gap-3 text-[11px] text-slate-200/90 mb-1">
                  <button className="rounded-full bg-white/8 border border-white/20 px-3 py-1">
                    Start 30.06
                  </button>
                  <button className="rounded-full bg-white/5 border border-white/15 px-3 py-1">
                    2024 Series
                  </button>
                </div>

                <div className="rounded-2xl border border-white/14 bg-black/30 px-4 py-3 text-xs text-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-slate-300">
                      Prize pool
                    </span>
                    <span className="text-[11px] text-slate-400">
                      FXIFY Account
                    </span>
                  </div>
                  <div className="text-lg font-semibold tracking-tight">
                    $100,000
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300">
                    <span>2 phases · 30 days</span>
                    <span className="text-emerald-300">
                      + Live payout enabled
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-indigo-400/40 bg-gradient-to-r from-[#3340b4] via-[#4d37d8] to-[#8647ff] px-[1.5px] py-[1.5px] shadow-[0_0_40px_rgba(94,92,255,0.9)]">
                  <button className="w-full rounded-[1rem] bg-[#05061a] px-4 py-3 flex items-center justify-between text-[12px] text-slate-100">
                    <span>You joined the current competition</span>
                    <span className="rounded-full bg-gradient-to-r from-[#3f7bff] to-[#57b0ff] px-3 py-1 text-[11px] font-medium shadow-[0_0_22px_rgba(59,130,246,0.9)]">
                      View dashboard →
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider glow */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-40" />

            {/* Lower area: three glowing cards row (mock) */}
            <div className="flex-1 px-8 pb-7 pt-6 flex flex-col gap-5">
              <div className="flex items-center justify-between text-xs text-slate-200/80 mb-1">
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#45e0ff] to-[#6a6bff] shadow-[0_0_16px_rgba(72,209,255,0.7)]" />
                  Upcoming rounds
                </span>
                <button className="text-[11px] text-slate-300/90 underline-offset-2 hover:underline">
                  View all schedules
                </button>
              </div>

              <div className="grid grid-cols-3 gap-5">
                <GlowCard title="Qualification round" subtitle="Opens in 03:21:45">
                  <div className="mt-4 h-16 rounded-xl bg-[radial-gradient(circle_at_top,rgba(116,238,255,0.6),transparent_55%),radial-gradient(circle_at_bottom,rgba(61,92,255,0.9),transparent_65%)] opacity-90" />
                </GlowCard>
                <GlowCard title="Semi finals" subtitle="Top 250 traders">
                  <div className="mt-4 h-16 rounded-xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.38),transparent_55%),radial-gradient(circle_at_bottom,rgba(107,74,255,0.95),transparent_70%)] opacity-95" />
                </GlowCard>
                <GlowCard title="Grand final" subtitle="Live streaming event">
                  <div className="mt-4 h-16 rounded-xl bg-[radial-gradient(circle_at_top,rgba(255,214,165,0.7),transparent_55%),radial-gradient(circle_at_bottom,rgba(249,115,22,0.9),transparent_70%)] opacity-95" />
                </GlowCard>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* --- SMALL COMPONENTS --- */

function NavItem({ icon, label }) {
  return (
    <button className="w-full rounded-2xl px-3 py-2.5 flex items-center gap-3 text-[13px] text-slate-300 hover:bg-white/4 transition">
      <div className="h-7 w-7 rounded-xl bg-white/5 flex items-center justify-center text-[14px]">
        <span>{icon}</span>
      </div>
      <span>{label}</span>
    </button>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/30 px-3 py-1">
      <span className="text-[11px] text-slate-300">{label}</span>
      <span className="text-[11px] font-semibold text-slate-50">{value}</span>
    </div>
  );
}

function GlowCard({ title, subtitle, children }) {
  return (
    <div className="rounded-2xl border border-white/14 bg-black/35 px-4 py-3.5 text-[11px] text-slate-200/90 shadow-[0_20px_40px_rgba(0,0,0,0.7)]">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] font-medium mb-0.5">{title}</p>
          <p className="text-[11px] text-slate-400">{subtitle}</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-[13px]">
          →
        </div>
      </div>
      {children}
    </div>
  );
}
