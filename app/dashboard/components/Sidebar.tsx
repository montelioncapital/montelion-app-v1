// app/dashboard/components/Sidebar.tsx
"use client";

type SidebarProps = {
  currentPath: string;
};

const brandBlue = "#2664EC";

/* -------------------- SVG ICONS -------------------- */
const IconDashboard = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconUser = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm7 8v-1a5 5 0 0 0-5-5H10a5 5 0 0 0-5 5v1Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconCommission = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 6h16M4 12h16M4 18h16"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconRules = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <path
      d="M6 3h12v18H6z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M9 8h6M9 12h6M9 16h4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconTutorial = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <rect
      x="4"
      y="4"
      width="16"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M8 9h8"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

const IconAbout = () => (
  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M12 11v5M12 8h.01"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

/** Normalise les path pour /dashboard et /dashboard/ */
const normalizePath = (value: string) => {
  if (!value) return "/";
  return value.replace(/\/+$/, "") || "/";
};

export default function Sidebar({ currentPath }: SidebarProps) {
  const userName = "Demo User";
  const initials = "DU";

  const menu = [
    { label: "Dashboard", path: "/dashboard", icon: IconDashboard },
    { label: "Account", path: "/account", icon: IconUser },
    { label: "Commission", path: "/commission", icon: IconCommission },
    { label: "Rules", path: "/rules", icon: IconRules },
    { label: "Tutorial", path: "/tutorial", icon: IconTutorial },
    { label: "About", path: "/about", icon: IconAbout },
  ];

  const normalizedCurrent = normalizePath(currentPath);

  return (
    <aside className="relative z-10 flex w-72 flex-col border-r border-white/5 bg-[#050708] text-slate-200">
      {/* USER */}
      <div className="px-6 pt-6 pb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-sm font-semibold">
          {initials}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{userName}</div>
          <div className="text-xs text-slate-400">Private investor Montelion</div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-5 space-y-1">
        {menu.map((item) => {
          const isActive =
            normalizePath(item.path) === normalizedCurrent;

          return (
            <button
              key={item.label}
              className={[
                "flex items-center w-full gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                isActive
                  ? "bg-[#0a0f14] border border-white/10 text-slate-50"
                  : "text-slate-400 hover:bg-white/5",
              ].join(" ")}
            >
              <span className="flex items-center justify-center">
                <item.icon />
              </span>
              <span className="text-sm tracking-[0.12em] uppercase">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* BOTTOM BUTTONS */}
      <div className="px-5 pb-6 space-y-3">
        <button className="w-full rounded-xl border border-white/10 bg-[#0c1117] py-2 text-sm text-slate-200 hover:bg-white/10">
          Contact Support
        </button>
        <button className="w-full rounded-xl border border-red-800/30 bg-red-900/20 py-2 text-sm text-red-300 hover:bg-red-900/30">
          Logout
        </button>
      </div>
    </aside>
  );
}
