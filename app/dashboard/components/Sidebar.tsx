"use client";

import Link from "next/link";

const brandBlue = "#2664EC";

type IconProps = { className?: string };

// ----- SVG ICONS (stroke = currentColor pour suivre la couleur du texte) -----
const IconDashboard = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 13h8V3H3v10Z" />
    <path d="M3 21h8v-6H3v6Z" />
    <path d="M13 21h8V11h-8v10Z" />
    <path d="M13 3v6h8V3h-8Z" />
  </svg>
);

const IconUser = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
    <path d="M5 21a7 7 0 0 1 14 0" />
  </svg>
);

const IconCommission = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 5h16" />
    <path d="M4 12h16" />
    <path d="M4 19h16" />
    <path d="M10 3v4" />
    <path d="M10 10v4" />
    <path d="M10 17v4" />
  </svg>
);

const IconRules = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8" />
    <path d="M8 12h8" />
    <path d="M8 16h5" />
  </svg>
);

const IconTutorial = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 9h16" />
    <path d="M10 14h4" />
  </svg>
);

const IconAbout = ({ className }: IconProps) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 10v6" />
    <path d="M12 7h.01" />
  </svg>
);

// ----- Types & menu -----

type SidebarMenuItem = {
  label: string;
  path: string;
  Icon: (props: IconProps) => JSX.Element;
};

type SidebarProps = {
  currentPath: string;
};

const menu: SidebarMenuItem[] = [
  { label: "Dashboard", path: "/dashboard", Icon: IconDashboard },
  { label: "Account", path: "/dashboard/account", Icon: IconUser },
  { label: "Commission", path: "/dashboard/commission", Icon: IconCommission },
  { label: "Rules", path: "/dashboard/rules", Icon: IconRules },
  { label: "Tutorial", path: "/dashboard/tutorial", Icon: IconTutorial },
  { label: "About", path: "/dashboard/about", Icon: IconAbout },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  const userName = "Demo User";
  const initials = "DU";

  return (
    <aside className="relative z-20 flex w-full md:w-72 flex-col border-b md:border-r border-white/5 bg-[#050708]">
      {/* USER */}
      <div className="px-4 sm:px-6 pt-4 sm:pt-6 pb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-xs font-semibold">
          {initials}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{userName}</div>
          <div className="text-xs text-slate-400">Private investor Montelion</div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-3 sm:px-5 space-y-1 pb-4 md:pb-0">
        {menu.map(({ label, path, Icon }) => {
          const isActive =
            currentPath === path ||
            (path !== "/dashboard" && currentPath.startsWith(path));

          const baseText = isActive ? "text-white" : "text-slate-400";

          return (
            <Link
              key={path}
              href={path}
              className={[
                "flex items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors",
                isActive
                  ? "bg-[#0a0f14] border border-white/10"
                  : "hover:bg-white/5 border border-transparent",
                baseText,
              ].join(" ")}
            >
              <Icon className={`w-4 h-4 ${baseText}`} />
              <span className="tracking-[0.18em] uppercase text-xs">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM BUTTONS */}
      <div className="px-4 sm:px-5 pb-4 sm:pb-6 space-y-3 mt-2">
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
