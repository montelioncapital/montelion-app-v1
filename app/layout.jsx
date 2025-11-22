// app/dashboard/layout.tsx
"use client";

import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Image from "next/image";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

      {/* Sidebar : fixe sur desktop, overlay sur mobile (géré dans le composant) */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Colonne principale */}
      <div className="relative z-10 flex flex-1 flex-col">
        {/* HEADER MOBILE */}
        <header className="flex items-center justify-between px-4 pt-4 pb-3 md:hidden">
          {/* Logo Montelion (version blanche, recadrée sur la partie droite du SVG) */}
          <div className="flex items-center">
            <div className="relative h-7 w-40 overflow-hidden">
              <Image
                src="/logo-montelion.svg"
                alt="Montelion Capital"
                fill
                priority
                className="object-contain object-right"
              />
            </div>
          </div>

          {/* Bouton burger pour ouvrir le menu */}
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
        <main className="flex-1 px-4 pt-4 pb-10 md:px-10 md:pt-8 md:pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
