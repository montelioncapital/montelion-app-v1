import React from "react";
import Sidebar from "./components/Sidebar";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "/dashboard";

  return (
    <div className="flex min-h-screen w-full bg-[#03060a]">
      {/* SIDEBAR → NOW WITH currentPath */}
      <Sidebar currentPath={pathname} />

      {/* MAIN */}
      <main className="relative z-10 flex-1 px-10 pt-8 pb-12">
        {children}
      </main>
    </div>
  );
}
