// app/dashboard/layout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const userName = "Demo User";
  const initials = "DU";

  return (
    <div className="flex min-h-screen bg-[#050608] text-slate-50 relative">
      {/* Glow de fond */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(38,100,236,0.35), transparent 60%), radial-gradient(circle at 100% 0%, rgba(38,100,236,0.2), transparent 55%)",
        }}
      />

      {/* Sidebar (desktop visible / mobile overlay) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Colonne principale */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* HEADER MOBILE */}
        <header className="flex items-center justify-between px-4 pt-4 pb-3 md:hidden bg-[#050608] border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-xs font-medium">
              {initials}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{userName}</div>
              <div className="text-[11px] text-slate-400">
                Private investor Montelion
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/40"
          >
            <span className="sr-only">Open menu</span>
            <div className="space-y-[3px]">
              <span className="block h-[2px] w-4 rounded bg-slate-200" />
              <span className="block h-[2px] w-4 rounded bg-slate-200" />
              <span className="block h-[2px] w-4 rounded bg-slate-200" />
            </div>
          </button>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 px-4 pt-2 pb-10 md:px-10 md:pt-8 md:pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
