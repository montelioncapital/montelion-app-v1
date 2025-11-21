// app/dashboard/components/Sidebar.tsx
"use client";

import React from "react";
import Link from "next/link";

const brandBlue = "#2664EC";

/* -------------------- SVG ICONS -------------------- */

type IconProps = React.SVGProps<SVGSVGElement>;

const IconDashboard: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    {...props}
  >
    <path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z" />
  </svg>
);

const IconUser: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    {...props}
  >
    <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm7 8v-1.2A4.8 4.8 0 0 0 14.2 14H9.8A4.8 4.8 0 0 0 5 18.8V20Z" />
  </svg>
);

const IconCommission: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    {...props}
  >
    <path d="M4 5h16M4 12h10M4 19h7" />
    <circle cx="18" cy="12" r="2" />
  </svg>
);

const IconRules: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    {...props}
  >
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h5M8 16h4" />
  </svg>
);

const IconTutorial: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    {...props}
  >
    <path d="M4 5a2 2 0 0 1 2-2h12v16h-2" />
    <path d="M6 7h8v14l-4-2-4 2V7Z" />
  </svg>
);

const IconAbout: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    {...props}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const IconMenu: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    {...props}
  >
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const IconClose: React.FC<IconProps> = (props) => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    {...props}
  >
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

/* -------------------- TYPES -------------------- */

type MenuItem = {
  label: string;
  path: string;
  Icon: React.ComponentType<IconProps>;
};

type SidebarProps = {
  currentPath: string;
};

/* -------------------- CONSTANTES -------------------- */

const userName = "Demo User";
const userInitials = "DU";

const menuItems: MenuItem[] = [
  { label: "Dashboard", path: "/dashboard", Icon: IconDashboard },
  { label: "Account", path: "/dashboard/account", Icon: IconUser },
  { label: "Commission", path: "/dashboard/commission", Icon: IconCommission },
  { label: "Rules", path: "/dashboard/rules", Icon: IconRules },
  { label: "Tutorial", path: "/dashboard/tutorial", Icon: IconTutorial },
  { label: "About", path: "/dashboard/about", Icon: IconAbout },
];

/* -------------------- COMPONENT -------------------- */

const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const isActive = (path: string) =>
    currentPath === path || currentPath.startsWith(path + "/");

  /* ----- BOUTONS BAS ----- */
  const bottomButtons = (
    <div className="px-5 pb-6 space-y-3">
      <button className="w-full rounded-xl border border-white/10 bg-[#0c1117] py-2 text-sm hover:bg-white/10 transition-colors">
        Contact Support
      </button>
      <button className="w-full rounded-xl border border-red-800/30 bg-red-900/20 py-2 text-sm text-red-300 hover:bg-red-900/30 transition-colors">
        Logout
      </button>
    </div>
  );

  /* ----- LISTE DES LIENS ----- */
  const links = (
    <nav className="flex-1 px-5 space-y-1">
      {menuItems.map(({ label, path, Icon }) => {
        const active = isActive(path);
        return (
          <Link
            key={path}
            href={path}
            className={[
              "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
              active
                ? "bg-[#0a0f14] border border-white/10 text-white"
                : "text-slate-400 hover:bg-white/5",
            ].join(" ")}
            onClick={() => setMobileOpen(false)}
          >
            <Icon />
            <span className="tracking-[0.16em] text-[11px] uppercase">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );

  /* -------------------- RENDER -------------------- */

  return (
    <>
      {/* ----- MOBILE TOP BAR ----- */}
      <div className="md:hidden sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-[#050608]/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-xs font-semibold">
            {userInitials}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{userName}</div>
            <div className="text-[11px] text-slate-400">
              Private investor Montelion
            </div>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/30 text-slate-200"
          aria-label="Open menu"
        >
          {mobileOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* ----- MOBILE DRAWER ----- */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/60">
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#050708] border-r border-white/5 flex flex-col">
            {/* User header */}
            <div className="px-6 pt-6 pb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-sm font-semibold">
                {userInitials}
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">{userName}</div>
                <div className="text-xs text-slate-400">
                  Private investor Montelion
                </div>
              </div>
            </div>

            {links}

            {bottomButtons}
          </div>

          {/* zone cliquable pour fermer */}
          <button
            className="absolute inset-0"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          />
        </div>
      )}

      {/* ----- DESKTOP SIDEBAR ----- */}
      <aside className="hidden md:flex relative z-20 w-72 flex-col border-r border-white/5 bg-[#050708]">
        {/* USER */}
        <div className="px-6 pt-6 pb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-sm font-semibold">
            {userInitials}
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">{userName}</div>
            <div className="text-xs text-slate-400">
              Private investor Montelion
            </div>
          </div>
        </div>

        {links}

        {bottomButtons}
      </aside>
    </>
  );
};

export default Sidebar;
