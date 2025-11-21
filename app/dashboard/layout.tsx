// app/dashboard/layout.tsx
"use client";

import { Sidebar } from "./components/Sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#050608] text-slate-50">
      {/* BACKGROUND GLOW */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(38,100,236,0.35), transparent 60%), radial-gradient(circle at 100% 0%, rgba(38,100,236,0.2), transparent 55%)",
        }}
      />

      {/* SIDEBAR */}
      <Sidebar activePath={pathname} />

      {/* MAIN CONTENT */}
      <main className="flex-1 px-10 pt-8 pb-12 relative z-10">
        {children}
      </main>
    </div>
  );
}
