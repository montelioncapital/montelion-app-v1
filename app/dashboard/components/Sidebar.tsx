// components/Sidebar.tsx
"use client";

const brandBlue = "#2664EC";

/* --- tes icônes ici (IconDashboard, IconUser, etc.) --- */

const menu = [
  { label: "Dashboard", path: "/dashboard", icon: IconDashboard },
  { label: "Account", path: "/account", icon: IconUser },
  { label: "Commission", path: "/commission", icon: IconCommission },
  { label: "Rules", path: "/rules", icon: IconRules },
  { label: "Tutorial", path: "/tutorial", icon: IconTutorial },
  { label: "A Propos", path: "/about", icon: IconAbout },
];

export function Sidebar({ activePath }: { activePath: string }) {
  const userName = "Demo User";
  const initials = "DU";

  return (
    <aside className="relative z-10 flex w-72 flex-col border-r border-white/5 bg-[#050708]">
      {/* USER */}
      <div className="px-6 pt-6 pb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10">
          {initials}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{userName}</div>
          <div className="text-xs text-slate-400">
            Private investor Montelion
          </div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-5 space-y-1">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = activePath === item.path;

          return (
            <button
              key={item.path}
              className={[
                "flex items-center w-full gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                active
                  ? "bg-[#0a0f14] border border-white/10 text-white"
                  : "text-slate-400 hover:bg-white/5",
              ].join(" ")}
            >
              <Icon />
              <span className="text-sm">{item.label.toUpperCase()}</span>
            </button>
          );
        })}
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
  );
}
