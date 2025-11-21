// app/dashboard/layout.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#050608] text-slate-50 relative">
      {/* Glow de fond */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(38,100,236,0.35), transparent 60%), radial-gradient(circle at 100% 0%, rgba(38,100,236,0.2), transparent 55%)",
        }}
      />

      {/* Layout responsive : colonne sur mobile, row sur desktop */}
      <div className="relative z-10 flex flex-col md:flex-row">
        {/* Sidebar (gère lui-même mobile + desktop) */}
        <Sidebar currentPath={pathname} />

        {/* Contenu principal */}
        <main className="flex-1 px-4 pt-4 pb-20 md:px-10 md:pt-8 md:pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
