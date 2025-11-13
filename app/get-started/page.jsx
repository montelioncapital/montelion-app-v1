// app/get-started/page.jsx
"use client";

import Link from "next/link";

const STEPS = [
  {
    id: 1,
    title: "Start",
    subtitle: "You’ve just unlocked your Montelion access",
    bullets: [
      "Private invitation validated",
      "Secure login with email & password",
      "Preparing your account for activation",
    ],
  },
  {
    id: 2,
    title: "Onboarding",
    subtitle: "Personal & regulatory information",
    bullets: [
      "Profile & date of birth",
      "Phone verification (SMS)",
      "Address & KYC documents",
    ],
  },
  {
    id: 3,
    title: "Contract",
    subtitle: "Sign your management mandate",
    bullets: [
      "Clear terms & risk disclosure",
      "Digital signature in a few clicks",
      "You can download the mandate at any time",
    ],
  },
  {
    id: 4,
    title: "Exchange setup",
    subtitle: "Connect your trading account",
    bullets: [
      "Tutorial for the chosen exchange",
      "Deposit funds on your own account",
      "Create a read-only API key (no withdrawals)",
    ],
  },
  {
    id: 5,
    title: "Montelion review",
    subtitle: "Final checks & activation",
    bullets: [
      "Compliance review of your file",
      "Verification of your API connection",
      "Your account goes live once validated",
    ],
  },
];

export default function GetStartedPage() {
  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Let&apos;s get you fully set up</h1>
        <p className="text-slate-400 mb-10">
          In a few minutes, you&apos;ll be ready to let Montelion trade on your
          exchange account while you keep full control of your funds.
        </p>

        {/* Timeline verticale */}
        <div className="space-y-5 mb-8">
          {STEPS.map((step, index) => {
            const isCurrent = index === 0;
            const isLast = index === STEPS.length - 1;

            return (
              <div
                key={step.id}
                className="grid grid-cols-[32px,1fr] gap-4 items-stretch"
              >
                {/* Colonne pastille + ligne */}
                <div className="flex flex-col items-center">
                  <div
                    className={[
                      "flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold shadow-[0_0_0_1px_rgba(15,23,42,0.9)]",
                      isCurrent
                        ? "bg-[#2564EC] text-white border border-[#2564EC]"
                        : "bg-slate-900 text-white border border-slate-700",
                    ].join(" ")}
                  >
                    {step.id}
                  </div>

                  {!isLast && (
                    <div className="flex-1 w-px bg-gradient-to-b from-slate-700/80 via-slate-800/80 to-slate-900 mt-1" />
                  )}
                </div>

                {/* Carte étape */}
                <div
                  className={[
                    "rounded-2xl border px-5 py-4 sm:py-5",
                    "bg-slate-900/40",
                    isCurrent
                      ? "border-[#2564EC] shadow-[0_0_40px_rgba(37,100,236,0.25)]"
                      : "border-slate-800/80",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div className="text-sm font-semibold text-slate-50">
                      {step.title}
                    </div>

                    {isCurrent && (
                      <span className="inline-flex items-center rounded-full bg-[#2564EC]/10 border border-[#2564EC]/40 px-2.5 py-[3px] text-[10px] font-medium text-[#2564EC]">
                        You&apos;re here
                      </span>
                    )}
                  </div>

                  <div className="text-sm text-slate-300 mb-3">
                    {step.subtitle}
                  </div>

                  <ul className="text-[11px] text-slate-500 space-y-1.5">
                    {step.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bas de page */}
        <div className="space-y-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/60 text-[10px] text-emerald-400">
              ✓
            </span>
            <span>
              Average time to complete:{" "}
              <span className="text-slate-300 font-medium">5–10 minutes</span>
            </span>
          </div>

          <Link
            href="/onboarding"
            className="mc-btn mc-btn-primary inline-flex items-center justify-center"
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
