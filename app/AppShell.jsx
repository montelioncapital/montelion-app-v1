// app/AppShell.jsx
"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname() || "";

  const isDashboard = pathname.startsWith("/dashboard");
  const isLanding = pathname === "/";

  // Routes que tu veux vraiment CENTRER (cartes / formulaires)
  const centeredPrefixes = [
    "/login",
    "/auth/login",
    "/auth/forgot-password",
    "/get-started",
    "/onboarding",
    "/contract",
    "/contract/ready",
    "/contract/signed",
    "/account/setup",
    "/account/mt5",
  ];

  const isCenteredPage = centeredPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  /**
   * 1) DASHBOARD + LANDING → plein écran, pas de centrage
   */
  if (isDashboard || isLanding) {
    return (
      <div className="relative w-full app-viewport overflow-y-auto">
        <div className="relative z-10">{children}</div>
      </div>
    );
  }

  /**
   * 2) PAGES COMPACTES → centrées verticalement/horizontalement
   */
  if (isCenteredPage) {
    return (
      <main className="relative w-full app-viewport flex items-center justify-center px-4 sm:px-6 md:px-10 overflow-y-auto">
        <div className="relative z-10 w-full flex justify-center">
          {children}
        </div>
      </main>
    );
  }

  /**
   * 3) TOUTES LES AUTRES PAGES (ex: /get-started/review)
   *    → layout plein écran scrollable, contenu en haut
   */
  return (
    <main className="relative w-full app-viewport px-4 sm:px-6 md:px-10 overflow-y-auto">
      <div className="relative z-10 w-full max-w-5xl mx-auto">
        {children}
      </div>
    </main>
  );
}
