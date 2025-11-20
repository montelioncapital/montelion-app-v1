// app/AppShell.jsx
"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");

  if (isDashboard) {
    // DASHBOARD : full screen, pas de centrage
    return (
      <div className="relative min-h-screen w-full">
        {children}
      </div>
    );
  }

  // AUTRES PAGES (login, onboarding, etc.) : centrées
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-10">
      {children}
    </div>
  );
}
