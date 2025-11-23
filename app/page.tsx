// app/page.jsx
"use client";

import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#020617]">
      <Link
        href="/login"
        className="px-8 py-4 rounded-xl text-lg font-semibold text-white 
        bg-gradient-to-r from-blue-600 to-indigo-500 
        shadow-[0_10px_40px_rgba(37,99,235,0.35)]
        hover:opacity-90 transition"
      >
        Login
      </Link>
    </main>
  );
}
