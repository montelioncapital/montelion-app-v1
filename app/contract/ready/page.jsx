// app/contract/ready/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

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

const CURRENT_STEP_ID = 3;

export default function ContractReadyPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
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

      const { data: onboard } = await supabase
        .from("onboarding_state")
        .select("current_step, completed")
        .eq("user_id", uid)
        .maybeSingle();

      if (!onboard) {
        router.replace("/get-started");
        return;
      }

      if (onboard.completed) {
        router.replace("/");
        return;
      }

      const step = onboard.current_step ?? 0;

      if (step < 6) {
        router.replace("/onboarding");
        return;
      }

      if (step >= 8) {
        router.replace("/contract");
        return;
      }

      setCurrentStep(step);
      setLoading(false);
    })();
  }, [router]);

  async function handleContinue() {
    if (!userId) {
      router.push("/login");
      return;
    }

    await supabase.from("onboarding_state").upsert(
      {
        user_id: userId,
        current_step: 8,
        completed: false,
      },
      { onConflict: "user_id" }
    );

    router.push("/contract");
  }

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="w-full flex justify-center px-4 py-10">
        <div className="mc-card">
          <div className="mc-section text-left">
            <h1 className="mc-title mb-2">Your contract is almost ready</h1>
            <p className="text-slate-400">Loading your progress…</p>
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
          <h1 className="mc-title mb-3">Your contract is almost ready</h1>
          <p className="text-slate-400 mb-10">
            Review the timeline below to see where you are in your onboarding
            before you access and sign your management mandate.
          </p>

          {/* TIMELINE */}
          <div className="space-y-5 mb-8">
            {STEPS.map((step, index) => {
              const isCurrent = step.id === CURRENT_STEP_ID;
              const isCompleted = step.id < CURRENT_STEP_ID;
              const isLast = index === STEPS.length - 1;

              return (
                <div key={step.id} className="grid grid-cols-[32px,1fr] gap-4">
                  {/* Left column */}
                  <div className="flex flex-col items-center">
                    <div
                      className={[
                        "flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold shadow-[0_0_0_1px_rgba(15,23,42,0.9)]",
                        isCurrent
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
                      isCurrent
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

                      {isCurrent && (
                        <span className="inline-flex items-center rounded-full bg-[#2564ec]/10 border border-[#2564ec]/60 px-2.5 py-[3px] text-[10px] font-medium text-[#7ea3ff]">
                          You&apos;re here
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
            onClick={handleContinue}
            className="mc-btn mc-btn-primary inline-flex items-center justify-center"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
