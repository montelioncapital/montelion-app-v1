// app/AppShell.jsx
"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  // DASHBOARD : full screen, pas de centrage
  if (isDashboard) {
    return (
      <div className="relative min-h-screen w-full">
        {children}
      </div>
    );
  }

  // AUTRES PAGES (landing, login, etc.) : plus de flex-center, on laisse la page
  // gérer son header et sa mise en page normalement
  return (
    <div className="relative min-h-screen w-full">
      {children}
    </div>
  );
}
