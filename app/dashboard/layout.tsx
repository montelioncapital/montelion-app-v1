// app/dashboard/layout.tsx
"use client";

import React from "react";
import Sidebar from "./components/Sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

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

      {/* Sidebar commune à toutes les pages du /dashboard */}
      <Sidebar currentPath={pathname ?? ""} />

      {/* Zone principale où chaque page /dashboard/* va s'afficher */}
      <main className="relative z-10 flex-1 px-10 pt-8 pb-12">
        {children}
      </main>
    </div>
  );
}
