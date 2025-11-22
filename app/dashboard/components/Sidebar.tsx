"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

/* -------------------- ICONS -------------------- */

type IconProps = { className?: string };

const IconDashboard = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z" />
  </svg>
);

const IconUser = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm6 8v-1a6 6 0 0 0-12 0v1Z" />
  </svg>
);

const IconCommission = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path d="M4 5h16M4 12h16M4 19h16" />
  </svg>
);

const IconRules = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path d="M6 4h11l3 4v12H6z" />
    <path d="M9 9h6M9 13h6M9 17h4" />
  </svg>
);

const IconTutorial = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <path d="M4 5h16v14H4z" />
    <path d="m10 9 4 3-4 3V9z" />
  </svg>
);

const IconAbout = ({ className = "w-4 h-4" }: IconProps) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.6}
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

/* -------------------- MENU DATA -------------------- */

const menuItems = [
  { label: "DASHBOARD", path: "/dashboard", Icon: IconDashboard },
  { label: "ACCOUNT", path: "/dashboard/account", Icon: IconUser },
  { label: "COMMISSION", path: "/dashboard/commission", Icon: IconCommission },
  { label: "RULES", path: "/dashboard/rules", Icon: IconRules },
  { label: "TUTORIAL", path: "/dashboard/tutorial", Icon: IconTutorial },
  { label: "ABOUT", path: "/dashboard/about", Icon: IconAbout },
];

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

/* -------------------- COMPONENT -------------------- */

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname() ?? "";
  const initials = "DU";
  const userName = "Demo User";

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* USER */}
      <div className="px-6 pt-6 pb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-sm font-medium">
          {initials}
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">{userName}</div>
          <div className="text-xs text-slate-400">
            Private investor Montelion
          </div>
        </div>
      </div>

      {/* fine separator */}
      <div className="mx-5 mb-4 h-px bg-white/10" />

      {/* MENU */}
      <nav className="flex-1 px-5 space-y-1">
        {menuItems.map(({ label, path, Icon }) => {
          const isActive =
            pathname === path ||
            (label === "DASHBOARD" && pathname === "/dashboard");

          return (
            <Link
              key={path}
              href={path}
              onClick={onClose}
              className={[
                "flex items-center w-full gap-3 rounded-xl px-[13.5px] py-[9.5px] text-left text-[13px] tracking-[0.18em] transition-colors",
                isActive
                  ? "border border-white/10 bg-[#0c1117] text-white"
                  : "border border-transparent text-slate-400 hover:bg-white/5",
              ].join(" ")}
            >
              <Icon className="w-[15px] h-[15px]" />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* BOTTOM BUTTONS (plus petits : hauteur + police réduites) */}
      <div className="px-5 pb-6 space-y-3">
        <button className="w-full rounded-xl border border-white/10 bg-[#0c1117] py-[6px] text-[12px] hover:bg-white/10">
          Contact Support
        </button>
        <button className="w-full rounded-xl border border-red-800/30 bg-red-900/20 py-[6px] text-[12px] text-red-300 hover:bg-red-900/30">
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop : FIXED */}
      <aside className="hidden md:block fixed inset-y-0 left-0 z-20 w-72 bg-[#050708] border-r border-white/5">
        <SidebarContent />
      </aside>

      {/* Mobile */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="h-full w-72 bg-[#050708] border-r border-white/5 shadow-2xl shadow-black/60">
            <SidebarContent />
          </div>
          <button
            className="flex-1 bg-black/40"
            aria-label="Close navigation"
            onClick={onClose}
          />
        </div>
      )}
    </>
  );
}
