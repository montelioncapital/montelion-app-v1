"use client";

import Link from "next/link";

const brandBlue = "#2664EC";

type SidebarProps = {
  currentPath: string; // <- requis, on va toujours le passer depuis le layout
};

/* -------------------- SVG ICONS (couleur = currentColor) -------------------- */

const IconDashboard = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
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
    strokeWidth={1.7}
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
    strokeWidth={1.7}
    viewBox="0 0 24 24"
  >
    <path d="M4 5h16M4 12h10M4 19h7" />
  </svg>
);

const IconRules = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    viewBox="0 0 24 24"
  >
    <path d="M5 4h11l3 4v12H5z" />
    <path d="M9 9h6M9 13h4M9 17h3" />
  </svg>
);

const IconTutorial = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    viewBox="0 0 24 24"
  >
    <path d="M4 5h16v14H4z" />
    <path d="M8 9h8M8 13h5" />
  </svg>
);

const IconAbout = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const menu = [
  { label: "Dashboard", path: "/dashboard", Icon: IconDashboard },
  { label: "Account", path: "/dashboard/account", Icon: IconUser },
  { label: "Commission", path: "/dashboard/commission", Icon: IconCommission },
  { label: "Rules", path: "/dashboard/rules", Icon: IconRules },
  { label: "Tutorial", path: "/dashboard/tutorial", Icon: IconTutorial },
  { label: "About", path: "/dashboard/about", Icon: IconAbout },
];

function normalizePath(path: string) {
  const [base] = path.split("?", 1);
  if (base.length > 1 && base.endsWith("/")) return base.slice(0, -1);
  return base;
}

export default function Sidebar({ currentPath }: SidebarProps) {
  const userName = "Demo User";
  const initials = "DU";

  const normalizedCurrent = normalizePath(currentPath || "/");

  return (
    <aside className="relative z-20 flex w-72 flex-col border-r border-white/5 bg-[#050708]">
      {/* USER */}
      <div className="px-6 pt-6 pb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-sm font-semibold">
          {initials}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold text-slate-50">{userName}</div>
          <div className="text-xs text-slate-400">Private investor Montelion</div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-5 space-y-1">
        {menu.map(({ label, path, Icon }) => {
          const isActive = normalizePath(path) === normalizedCurrent;

          const base =
            "flex items-center w-full gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors";
          const active = "bg-[#0a0f14] border border-white/10 text-slate-50";
          const inactive = "text-slate-400 hover:bg-white/5";

          return (
            <Link
              key={path}
              href={path}
              className={`${base} ${isActive ? active : inactive}`}
            >
              <span className="text-current">
                <Icon />
              </span>
              <span className="tracking-wide uppercase text-[11px]">
                {label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM BUTTONS */}
      <div className="px-5 pb-6 space-y-3">
        <button className="w-full rounded-xl border border-white/10 bg-[#0c1117] py-2 text-sm text-slate-100 hover:bg-white/10 transition">
          Contact Support
        </button>
        <button className="w-full rounded-xl border border-red-800/30 bg-red-900/20 py-2 text-sm text-red-300 hover:bg-red-900/30 transition">
          Logout
        </button>
      </div>
    </aside>
  );
}
