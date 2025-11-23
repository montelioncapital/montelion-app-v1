// app/AppShell.jsx
"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith("/dashboard");
  const isLanding = pathname === "/";

  // DASHBOARD + LANDING : plein écran, pas de centrage
  if (isDashboard || isLanding) {
    return (
      <div className="relative min-h-screen w-full">
        {children}
      </div>
    );
  }

  // TOUTES LES AUTRES PAGES : carte centrée
  return (
    <main
      className="
        relative w-full min-h-screen
        flex items-center justify-center
        px-4 sm:px-6 md:px-10
      "
    >
      <div className="w-full flex justify-center">
        {children}
      </div>
    </main>
  );
}
