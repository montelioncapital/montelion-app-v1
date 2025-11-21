"use client";

import Link from "next/link";

type SidebarProps = {
  currentPath?: string;
};

/* -------------------- SVG ICONS -------------------- */

const IconDashboard = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z" />
  </svg>
);

const IconUser = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 9v-1a6 6 0 0 0-12 0v1Z" />
  </svg>
);

const IconCommission = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M12 1v22M5 6h14M5 12h14M5 18h14" />
  </svg>
);

const IconRules = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M4 3h16v18H4zM8 7h8M8 12h8M8 17h5" />
  </svg>
);

const IconTutorial = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M4 4h16v16H4zM4 9h16" />
  </svg>
);

const IconAbout = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

/* -------------------- MENU CONFIG -------------------- */

const menu = [
  { label: "Dashboard", path: "/dashboard", Icon: IconDashboard },
  { label: "Account", path: "/account", Icon: IconUser },
  { label: "Commission", path: "/commission", Icon: IconCommission },
  { label: "Rules", path: "/rules", Icon: IconRules },
  { label: "Tutorial", path: "/tutorial", Icon: IconTutorial },
  { label: "About", path: "/about", Icon: IconAbout },
];

/* -------------------- COMPONENT -------------------- */

export function Sidebar({ currentPath }: SidebarProps) {
  const userName = "Demo User";
  const initials = "DU";

  return (
    <aside className="relative z-10 flex w-72 flex-col border-r border-white/5 bg-[#050708]">
      {/* USER HEADER */}
      <div className="px-6 pt-6 pb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-sm font-semibold">
          {initials}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{userName}</div>
          <div className="text-xs text-slate-400">Private investor Montelion</div>
        </div>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-5 space-y-1">
        {menu.map(({ label, path, Icon }) => {
          const isActive =
            currentPath === path ||
            (path !== "/dashboard" && currentPath?.startsWith(path));

          return (
            <Link key={path} href={path}>
              <button
                className={[
                  "flex items-center w-full gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                  isActive
                    ? "bg-[#0a0f14] border border-white/10 text-white"
                    : "text-slate-400 hover:bg-white/5",
                ].join(" ")}
              >
                <span className="flex items-center">
                  <Icon />
                </span>
                <span className="text-sm tracking-[0.12em] uppercase">
                  {label}
                </span>
              </button>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM BUTTONS */}
      <div className="px-5 pb-6 space-y-3">
        <button className="w-full rounded-xl border border-white/10 bg-[#0c1117] py-2 text-sm text-slate-200 hover:bg-white/10 transition-colors">
          Contact Support
        </button>
        <button className="w-full rounded-xl border border-red-800/30 bg-red-900/20 py-2 text-sm text-red-300 hover:bg-red-900/30 transition-colors">
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
