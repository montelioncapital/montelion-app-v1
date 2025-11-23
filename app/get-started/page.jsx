// app/get-started/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

const STEPS = [
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
  {
    id: 4,
    title: "Broker account",
    subtitle: "Create, fund and connect your MT5 account",
    bullets: [
      "Open your trading account with the selected broker",
      "Deposit funds on your own MT5 account",
      "Share your MT5 login details so Montelion can trade for you",
    ],
  },
  {
    id: 5,
    title: "Montelion review",
    subtitle: "Final checks & activation",
    bullets: [
      "Compliance review of your file",
      "Verification of your trading connection",
      "Your account goes live once validated",
    ],
  },
];

export default function GetStartedPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session + onboarding state
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

      const { data: onboard } = await supabase
        .from("onboarding_state")
        .select("current_step")
        .eq("user_id", uid)
        .maybeSingle();

      const step = onboard?.current_step ?? 0;
      setCurrentStep(step);

      if (step >= 10) {
        router.replace("/get-started/advanced");
        return;
      }

      setLoading(false);
    })();
  }, [router]);

  async function handleGetStarted() {
    if (!userId) {
      router.push("/login");
      return;
    }

    // Already started onboarding
    if (currentStep != null && currentStep > 0) {
      router.push("/onboarding");
      return;
    }

    // Initialize onboarding
    await supabase.from("onboarding_state").upsert(
      {
        user_id: userId,
        current_step: 1,
        completed: false,
      },
      { onConflict: "user_id" }
    );

    router.push("/onboarding");
  }

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="w-full flex justify-center px-4 py-10">
        <div className="mc-card">
          <div className="mc-section text-left">
            <h1 className="mc-title mb-2">Let&apos;s get you fully set up</h1>
            <p className="text-slate-400">Loading your journey…</p>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- PAGE ---------------- */
  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-3">Let&apos;s get you fully set up</h1>
          <p className="text-slate-400 mb-10">
            In a few minutes, you&apos;ll complete your onboarding so Montelion
            can manage your trading account while you stay in full control of
            your funds.
          </p>

          {/* TIMELINE */}
          <div className="space-y-5 mb-6">
            {STEPS.map((step, index) => {
              const isCompleted = step.id === 1;
              const isNext = step.id === 2;
              const isLast = index === STEPS.length - 1;

              return (
                <div key={step.id} className="grid grid-cols-[32px,1fr] gap-4">
                  {/* Left column */}
                  <div className="flex flex-col items-center">
                    <div
                      className={[
                        "flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold shadow-[0_0_0_1px_rgba(15,23,42,0.9)]",
                        isNext
                          ? "bg-[#2564ec] text-white border border-[#2564ec]"
                          : isCompleted
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/70"
                          : "bg-slate-900 text-slate-300 border border-slate-700",
                      ].join(" ")}
                    >
                      {isCompleted ? "✓" : step.id}
                    </div>

                    {!isLast && (
                      <div className="flex-1 w-px bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 mt-1" />
                    )}
                  </div>

                  {/* Step card */}
                  <div
                    className={[
                      "rounded-2xl border px-5 py-4 sm:py-5 bg-slate-900/40",
                      isNext
                        ? "border-[#2564ec]/80 shadow-[0_0_40px_rgba(37,100,236,0.2)]"
                        : isCompleted
                        ? "border-emerald-600/70"
                        : "border-slate-800/80",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-semibold text-slate-50">
                        {step.title}
                      </p>

                      {isNext && (
                        <span className="inline-flex items-center rounded-full bg-[#2564ec]/10 border border-[#2564ec]/60 px-2.5 py-[3px] text-[10px] font-medium text-[#7ea3ff]">
                          Next step
                        </span>
                      )}

                      {isCompleted && (
                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 border border-emerald-500/60 px-2.5 py-[3px] text-[10px] font-medium text-emerald-300">
                          Completed
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-slate-300 mb-3">
                      {step.subtitle}
                    </p>

                    <ul className="text-[11px] text-slate-500 space-y-1.5">
                      {step.bullets.map((b, i) => (
                        <li key={i}>• {b}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* BUTTON */}
          <button
            type="button"
            onClick={handleGetStarted}
            className="mc-btn mc-btn-primary inline-flex items-center justify-center"
          >
            Get started
          </button>
        </div>
      </div>
    </div>
  );
}
