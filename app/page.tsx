"use client";

import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="bg-[#050608] text-white min-h-screen">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo-montelion-02.svg" width={130} height={40} alt="Montelion" />
            <span className="text-[10px] tracking-[0.3em] text-slate-400">CAPITAL</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-10 text-sm text-slate-300">
            <a href="#product" className="hover:text-white">Product</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#performance" className="hover:text-white">Performance</a>
            <a href="#security" className="hover:text-white">Security</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="hidden md:flex px-4 py-2 rounded-xl border border-white/10 hover:bg-white/10 text-sm"
            >
              Launch App
            </a>
            <a
              href="#access"
              className="px-5 py-2 rounded-xl bg-[#2563eb] hover:bg-[#1e50c7] text-sm font-medium"
            >
              Request Access
            </a>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-sm text-emerald-400 mb-4">
              ● Live trading infrastructure for private investors
            </div>

            <h1 className="text-5xl font-bold leading-tight mb-4">
              Put your capital <br />
              <span className="text-[#5893FF]">on autopilot</span> with
              institutional-grade strategies.
            </h1>

            <p className="text-slate-400 text-lg max-w-lg mb-10">
              Montelion connects your exchange to an automated and monitored
              trading engine. You keep custody — we manage the execution,
              strategy, and risk.
            </p>

            <div className="flex gap-4">
              <a
                href="#access"
                className="px-6 py-3 rounded-xl bg-[#2563eb] hover:bg-[#1e50c7] font-medium"
              >
                Request a call
              </a>
              <a
                href="/dashboard"
                className="px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 font-medium"
              >
                View demo dashboard
              </a>
            </div>

            <div className="flex gap-20 mt-16">
              <div>
                <div className="text-xs text-slate-400 mb-1">AUM PROTECTED</div>
                <div className="text-sm font-medium">Your assets stay on your exchange</div>
              </div>

              <div>
                <div className="text-xs text-slate-400 mb-1">FEES</div>
                <div className="text-sm font-medium">Performance-based only</div>
              </div>
            </div>
          </div>

          {/* Demo Panel */}
          <div className="rounded-2xl border border-white/10 bg-[#0A0D10] p-6 shadow-xl shadow-black/50">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-white/5 rounded-xl flex items-center justify-center">
                  DU
                </div>
                <div>
                  <div className="text-sm font-medium">Demo Investor</div>
                  <div className="text-xs text-slate-400">Connected exchange: Bybit</div>
                </div>
              </div>

              <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400">
                Strategy: Active PNL
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-xs text-slate-400 mb-1">BALANCE</div>
                <div className="text-xl font-semibold">$206,190</div>
                <div className="text-emerald-400 text-xs mt-1">+ $3,240 today</div>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-xs text-slate-400 mb-1">PNL TODAY</div>
                <div className="text-xl font-semibold">+$210</div>
                <div className="text-emerald-400 text-xs mt-1">+0.32%</div>
              </div>
              <div className="rounded-xl border border-white/10 p-4">
                <div className="text-xs text-slate-400 mb-1">PNL THIS MONTH</div>
                <div className="text-xl font-semibold">+$3,250</div>
                <div className="text-emerald-400 text-xs mt-1">+4.7%</div>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 p-4">
              <div className="text-xs text-slate-400 mb-2 flex justify-between">
                <span>Equity curve (last 12 months)</span>
                <span className="text-emerald-400">+38.4% net</span>
              </div>

              <div className="h-40 rounded-xl bg-gradient-to-br from-[#2a4480] via-[#3b6be0] to-[#1f2b40] opacity-70 blur-[1px]" />
            </div>

            <div className="text-[11px] text-slate-500 flex justify-between mt-3">
              <span>Non-custodial • Disconnect anytime</span>
              <span>Made for private investors</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-10 mt-20 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} Montelion Capital — All rights reserved.
      </footer>
    </div>
  );
}
