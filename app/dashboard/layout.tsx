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

      {/* SIDEBAR FIXE (DESKTOP) */}
      <Sidebar />

      {/* PAGE */}
      <div className="relative z-10 flex-1 flex flex-col">

        {/* HEADER MOBILE */}
        <header className="flex items-center justify-between px-4 pt-6 pb-4 md:hidden bg-[#050608]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0f171d] border border-white/10 text-xs font-medium">
              {initials}
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">{userName}</div>
              <div className="text-xs text-slate-400">Private investor Montelion</div>
            </div>
          </div>

          {/* Bouton burger */}
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-black/40"
          >
            <div className="space-y-[4px]">
              <span className="block h-[2px] w-5 rounded bg-slate-200"></span>
              <span className="block h-[2px] w-5 rounded bg-slate-200"></span>
              <span className="block h-[2px] w-5 rounded bg-slate-200"></span>
            </div>
          </button>
        </header>

        {/* SIDEBAR OVERLAY MOBILE */}
        {isSidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div className="w-72 h-full">
              <Sidebar />
            </div>
            <button className="flex-1 bg-black/40" onClick={() => setIsSidebarOpen(false)} />
          </div>
        )}

        {/* CONTENU */}
        <main className="flex-1 px-4 pt-10 pb-12 md:px-10 md:pt-8">
          {children}
        </main>
      </div>
    </div>
  );
}
