// app/get-started/advanced/page.jsx
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

export default function GetStartedAdvancedPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [currentStep, setCurrentStep] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger la session + current_step
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

      setCurrentStep(onboard?.current_step ?? 0);
      setLoading(false);
    })();
  }, [router]);

  async function handleContinue() {
    if (!userId) {
      router.push("/login");
      return;
    }

    const targetStep = 10;

    // Si l'utilisateur n'est pas encore à 10, on force current_step = 10
    if (currentStep == null || currentStep < targetStep) {
      await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: targetStep,
          completed: false,
        },
        { onConflict: "user_id" }
      );
    }

    router.push("/onboarding");
  }

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Let&apos;s continue your setup</h1>
          <p className="text-slate-400">Loading your journey…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Let&apos;s continue your setup</h1>
        <p className="text-slate-400 mb-10">
          Your contract is now signed. Next, you&apos;ll connect your exchange
          account so Montelion can trade while you keep full control of your funds.
        </p>

        {/* Timeline verticale */}
        <div className="space-y-5 mb-8">
          {STEPS.map((step, index) => {
            // 👉 jusqu'à l'étape 3 (Contract) = Completed
            const isCompleted = step.id <= 3;
            // 👉 étape suivante = Exchange setup
            const isNext = step.id === 4;
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
                    <div className="flex-1 w-px bg-gradient-to-b from-slate-700/80 via-slate-800/80 to-slate-900 mt-1" />
                  )}
                </div>

                {/* Carte étape */}
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
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <div className="text-sm font-semibold text-slate-50">
                      {step.title}
                    </div>

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

        {/* Bas de page : temps moyen + bouton */}
        <div className="space-y-4">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/60 text-[10px] text-emerald-400">
              ✓
            </span>
            <span>
              Average time to complete the remaining steps:{" "}
              <span className="text-slate-300 font-medium">5–10 minutes</span>
            </span>
          </div>

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
