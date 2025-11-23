// app/AppShell.jsx
"use client";

import { usePathname } from "next/navigation";

export default function AppShell({ children }) {
  const pathname = usePathname();

  const isDashboard = pathname.startsWith("/dashboard");
  const isLanding = pathname === "/";

  if (isDashboard || isLanding) {
    // FULL SCREEN SPECIAL PAGES
    return (
      <div className="relative min-h-screen w-full">
        {children}
      </div>
    );
  }

  // ALL OTHER PAGES (login, KYC, forgot-password, etc.)
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center px-4 md:px-10">
      {children}
    </div>
  );
}
