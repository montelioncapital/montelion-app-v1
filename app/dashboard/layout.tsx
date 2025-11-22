"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Image from "next/image";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="relative flex min-h-screen items-stretch bg-[#050608] text-slate-50">
      {/* Glow de fond */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(38,100,236,0.35), transparent 60%), radial-gradient(circle at 100% 0%, rgba(38,100,236,0.2), transparent 55%)",
        }}
      />

      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Colonne principale */}
      <div className="relative z-10 flex-1 flex flex-col">

        {/* HEADER MOBILE */}
        <header className="flex items-center justify-between px-4 pt-4 pb-3 md:hidden bg-[#050708]">

          {/* --- LOGO MONTELION --- */}
          <div className="flex items-center">
            <Image
              src="/logo-montelion-02.svg"
              alt="Montelion Logo"
              width={140}
              height={40}
              priority
            />
          </div>

          {/* Bouton ouverture menu */}
          <button
            type="button"
            aria-label="Open navigation"
            onClick={() => setIsSidebarOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-black/40"
          >
            <div className="space-y-[3px]">
              <span className="block h-[2px] w-4 rounded bg-slate-200" />
              <span className="block h-[2px] w-4 rounded bg-slate-200" />
              <span className="block h-[2px] w-4 rounded bg-slate-200" />
            </div>
          </button>
        </header>

        {/* CONTENU PRINCIPAL */}
        <main className="flex-1 px-4 pt-6 pb-10 md:px-10 md:pt-8 md:pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
