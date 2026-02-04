// app/dashboard/page.jsx
"use client";

import { useMemo } from "react";
import Link from "next/link";

export default function DashboardFinalizingPage() {
  const april2025 = useMemo(() => "April 2025", []);

  return (
    <div className="relative z-10 flex min-h-[calc(100vh-40px)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-[#05070b]/80 p-6 shadow-[0_0_0_1px_rgba(15,23,42,0.65)] backdrop-blur">
        {/* Blue gradient line (same vibe as your cards) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] rounded-b-2xl bg-[linear-gradient(to_right,#020617_0%,#020617_20%,#2564ec_50%,#020617_80%,#020617_100%)]" />

        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
            <span className="text-lg">⏳</span>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              Dashboard under finalization
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              We’re putting the finishing touches on your Montelion dashboard.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-slate-200">
              In the meantime, you can view your trading performance directly in{" "}
              <span className="font-medium text-white">MetaTrader 5 (MT5)</span>.
            </p>
            <p className="mt-2 text-xs text-slate-400">
              Your Montelion dashboard will be finalized by{" "}
              <span className="text-emerald-300 font-medium">{april2025}</span>.
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#070a12] p-4">
            <div className="text-xs font-medium text-slate-400">What you can do now</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li className="flex gap-2">
                <span className="text-slate-500">•</span>
                <span>Check your balance, equity and history inside MT5.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-500">•</span>
                <span>Track daily and monthly performance from your terminal.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-slate-500">•</span>
                <span>Come back here soon for the full Montelion dashboard experience.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* MT5 doesn't have a universal web link; keep it as guidance */}
          <a
            href="https://www.metatrader5.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            Open MetaTrader 5
          </a>

          <Link
            href="/account"
            className="inline-flex h-10 items-center justify-center rounded-xl bg-[#2564ec] px-4 text-sm font-semibold text-white hover:opacity-95 transition"
          >
            Go to Account
          </Link>
        </div>

        <div className="mt-6 text-center text-xs text-slate-500">
          Thank you for your patience — we’re building something solid.
        </div>
      </div>
    </div>
  );
}
