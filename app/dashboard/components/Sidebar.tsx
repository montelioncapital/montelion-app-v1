"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const brandBlue = "#2664EC";

type IconProps = { className?: string };

const IconDashboard = ({ className }: IconProps) => (
  <svg
    className={className ?? "w-5 h-5"}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z" />
  </svg>
);

const IconUser = ({ className }: IconProps) => (
  <svg
    className={className ?? "w-5 h-5"}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm7 9v-1a6 6 0 0 0-12 0v1Z" />
  </svg>
);

const IconCommission = ({ className }: IconProps) => (
  <svg
    className={className ?? "w-5 h-5"}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const IconRules = ({ className }: IconProps) => (
  <svg
    className={className ?? "w-5 h-5"}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M6 3h12v18H6zM9 7h6M9 12h6M9 17h4" />
  </svg>
);

const IconTutorial = ({ className }: IconProps) => (
  <svg
    className={className ?? "w-5 h-5"}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <path d="M4 4h16v16H4zM4 9h16" />
  </svg>
);

const IconAbout = ({ className }: IconProps) => (
  <svg
    className={className ?? "w-5 h-5"}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

type MenuItem = {
  label: string;
  path: string;
  Icon: React.ComponentType<IconProps>;
};

const menu: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard", Icon: IconDashboard },
  { label: "Account", path: "/dashboard/account", Icon: IconUser },
  { label: "Commission", path: "/dashboard/commission", Icon: IconCommission },
  { label: "Rules", path: "/dashboard/rules", Icon: IconRules },
  { label: "Tutorial", path: "/dashboard/tutorial", Icon: IconTutorial },
  { label: "About", path: "/dashboard/about", Icon: IconAbout },
];

const userName = "Demo User";
const initials = "DU";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isActive = (path: string) => pathname === path;

  // Fermer le menu mobile quand la route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* ----- Desktop sidebar (md et +) ----- */
  const desktopSidebar = (
    <aside className="hidden md:flex w-72 flex-col border-r border-white/5 bg-[#050708] relative z-20">
      {/* USER */}
      <div className="px-6 pt-6 pb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-sm font-medium">
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
          const active = isActive(item.path);
          return (
            <Link key={item.label} href={item.path}>
              <button
                className={[
                  "flex items-center w-full gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                  active
                    ? "bg-[#0a0f14] border border-white/10 text-slate-50"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5",
                ].join(" ")}
              >
                <item.Icon className="w-5 h-5" />
                <span className="text-sm tracking-[0.18em] uppercase">
                  {item.label}
                </span>
              </button>
            </Link>
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

  /* ----- Contenu du menu (réutilisé pour le drawer mobile) ----- */
  const menuContent = (
    <>
      {/* USER */}
      <div className="px-4 pt-6 pb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-sm font-medium">
          {initials}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{userName}</div>
          <div className="text-xs text-slate-400">Private investor Montelion</div>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 px-4 space-y-1">
        {menu.map((item) => {
          const active = isActive(item.path);
          return (
            <Link key={item.label} href={item.path}>
              <button
                className={[
                  "flex items-center w-full gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                  active
                    ? "bg-[#0a0f14] border border-white/10 text-slate-50"
                    : "text-slate-400 hover:text-slate-100 hover:bg-white/5",
                ].join(" ")}
              >
                <item.Icon className="w-5 h-5" />
                <span className="text-sm tracking-[0.18em] uppercase">
                  {item.label}
                </span>
              </button>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM BUTTONS */}
      <div className="px-4 pb-6 space-y-3">
        <button className="w-full rounded-xl border border-white/10 bg-[#0c1117] py-2 text-sm hover:bg-white/10">
          Contact Support
        </button>
        <button className="w-full rounded-xl border border-red-800/30 bg-red-900/20 py-2 text-sm text-red-300 hover:bg-red-900/30">
          Logout
        </button>
      </div>
    </>
  );

  /* ----- Mobile controls + drawer ----- */
  const mobileSidebar = (
    <>
      {/* Petit bloc user + burger (fixe en bas à gauche) */}
      <div className="md:hidden fixed left-0 bottom-6 z-30 flex items-center gap-3 px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f171d] border border-white/10 text-sm font-medium text-slate-50">
          {initials}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-100">{userName}</span>
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/40"
          >
            {/* icône burger */}
            <span className="block w-4 h-[1px] bg-slate-200 mb-[3px]" />
            <span className="block w-4 h-[1px] bg-slate-200 mb-[3px]" />
            <span className="block w-4 h-[1px] bg-slate-200" />
          </button>
        </div>
      </div>

      {/* Drawer plein écran */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* fond sombre */}
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* panneau latéral */}
        <div
          className={`absolute inset-y-0 left-0 w-72 bg-[#050708] border-r border-white/5 flex flex-col transition-transform ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {menuContent}
        </div>
      </div>
    </>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default Sidebar;
