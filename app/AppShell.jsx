// app/AppShell.jsx
"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith("/dashboard");
  const isLanding = pathname === "/";

  /**
   * DASHBOARD + LANDING
   * -> plein écran, pas de centrage
   */
  if (isDashboard || isLanding) {
    return (
      <div className="relative w-full app-viewport overflow-y-auto">
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  /**
   * TOUTES LES AUTRES PAGES (login, onboarding, contract, setup, mt5, review, etc.)
   * -> centrées au milieu de l'écran
   *
   * - app-viewport : vraie hauteur viewport (100dvh/100svh)
   * - flex + items-center + justify-center : centrage H/V
   * - overflow-y-auto : scroll uniquement si le contenu dépasse
   */
  return (
    <main className="relative w-full app-viewport flex items-center justify-center px-4 sm:px-6 md:px-10 overflow-y-auto">
      <div className="relative z-10 w-full flex justify-center">
        {children}
      </div>
    </main>
  );
}
