// app/AppShell.jsx
"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname?.startsWith("/dashboard");
  const isLanding = pathname === "/";

  /**
   * FULLSCREEN PAGES (no centering)
   */
  if (isDashboard || isLanding) {
    return (
      <div className="relative min-h-screen w-full">
        {children}
      </div>
    );
  }

  /**
   * ALL OTHER PAGES → CENTERED ON SCREEN
   *
   * ✔ items-center → centre vertical
   * ✔ justify-center → centre horizontal
   * ✔ min-h-screen → prend toute la hauteur
   * ✔ overflow-y-auto → scroll si le contenu dépasse
   * ✔ px-4 → padding mobile
   */
  return (
    <main className="
      relative w-full min-h-screen
      flex items-center justify-center
      px-4 sm:px-6 md:px-10
      overflow-y-auto
    ">
      {children}
    </main>
  );
}
