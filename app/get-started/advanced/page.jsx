"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

const SECTIONS = [
  {
    id: 1,
    title: "Start",
    subtitle: "You’ve just unlocked your Montelion access",
    bullets: [
      "Private invitation validated",
      "Secure login with email & password",
      "First access to your Montelion journey",
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
];

export default function GetStartedAdvancedPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const uid = session.user.id;
      setUserId(uid);

      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Let&apos;s continue your setup</h1>
          <p className="text-slate-400">Loading…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">

        <h1 className="mc-title mb-3">Let&apos;s continue your setup</h1>
        <p className="text-slate-400 mb-10">
          Your contract is now signed. Next, you&apos;ll connect your exchange account
          so Montelion can trade while you keep full control of your funds.
        </p>

        {/* TIMELINE */}
        <div className="space-y-8">

          {SECTIONS.map((section, index) => {
            const isLast = index === SECTIONS.length - 1;

            return (
              <div
                key={section.id}
                className="grid grid-cols-[32px,1fr] gap-4 items-stretch"
              >
                {/* LEFT COLUMN — CHECKMARK + LINE */}
                <div className="flex flex-col items-center">
                  <div
                    className="flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold
                    bg-emerald-500/20 text-emerald-300 border border-emerald-500/70"
                  >
                    ✓
                  </div>

                  {!isLast && (
                    <div className="flex-1 w-px bg-gradient-to-b from-emerald-700/70 via-emerald-800/70 to-emerald-900 mt-1" />
                  )}
                </div>

                {/* RIGHT COLUMN — CARD */}
                <div className="rounded-2xl border px-5 py-4 sm:py-5 bg-slate-900/40 border-emerald-600/70">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div className="text-sm font-semibold text-slate-50">
                      {section.title}
                    </div>

                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 
                      border border-emerald-500/60 px-2.5 py-[3px] 
                      text-[10px] font-medium text-emerald-300">
                      Completed
                    </span>
                  </div>

                  <div className="text-sm text-slate-300 mb-3">
                    {section.subtitle}
                  </div>

                  <ul className="text-[11px] text-slate-500 space-y-1.5">
                    {section.bullets.map((b) => (
                      <li key={b}>• {b}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* BUTTON → EXCHANGE SETUP */}
        <div className="mt-10">
          <button
            type="button"
            onClick={() => router.push("/exchange")}
            className="mc-btn mc-btn-primary inline-flex items-center justify-center w-full"
          >
            Continue
          </button>
        </div>

      </div>
    </div>
  );
}
