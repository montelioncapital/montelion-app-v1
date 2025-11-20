// app/get-started/review/page.jsx
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
      "Personal details and residency",
      "Phone number and email verification",
      "KYC identity and proof of address",
    ],
  },
  {
    id: 3,
    title: "Contract",
    subtitle: "Mandate & legal framework",
    bullets: [
      "Review of the discretionary mandate",
      "Electronic signature of the contract",
      "Legal framework for Montelion to trade",
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
      "Verification of your trading connection",
      "Your account goes live once validated",
    ],
  },
];

const CURRENT_STEP_ID = 5;

export default function ReviewPage() {
  const router = useRouter();
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

      // 1) Récupérer le statut du profil
      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("status")
        .eq("id", uid)
        .maybeSingle();

      if (profErr) {
        console.error("Error loading profile status:", profErr);
      }

      // 👉 Si le profil est ACTIF, on envoie directement au dashboard
      if (profile?.status === "active") {
        router.replace("/dashboard");
        return;
      }

      // 2) Vérifier qu'il a bien fait tout l'onboarding avant review
      const { data: onboard, error: onboardErr } = await supabase
        .from("onboarding_state")
        .select("current_step, completed")
        .eq("user_id", uid)
        .maybeSingle();

      if (onboardErr) {
        console.error("Error fetching onboarding_state:", onboardErr);
        router.replace("/get-started");
        return;
      }

      const currentStep = onboard?.current_step ?? 0;

      if (currentStep < 13) {
        router.replace("/get-started/advanced");
        return;
      }

      if (onboard?.completed) {
        router.replace("/dashboard");
        return;
      }

      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Montelion review</h1>
          <p className="text-slate-400">Loading your journey…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Your account is under review</h1>
        <p className="text-slate-400 mb-10">
          You&apos;ve completed all onboarding steps. Montelion is now reviewing
          your file and your trading connection. You&apos;ll be notified as soon
          as your account is activated.
        </p>

        {/* Timeline */}
        <div className="space-y-5 mb-10">
          {STEPS.map((step, index) => {
            const isCurrent = step.id === CURRENT_STEP_ID;
            const isCompleted = step.id < CURRENT_STEP_ID;
            const isLast = index === STEPS.length - 1;

            return (
              <div
                key={step.id}
                className="grid grid-cols-[32px,1fr] gap-4 items-stretch"
              >
                {/* Colonne gauche : pastille + trait */}
                <div className="flex flex-col items-center">
                  <div
                    className={[
                      "flex items-center justify-center h-7 w-7 rounded-full text-xs font-semibold border shadow-[0_0_0_1px_rgba(15,23,42,0.9)]",
                      isCurrent
                        ? "bg-[#2564ec] text-white border-[#2564ec]"
                        : isCompleted
                        ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/70"
                        : "bg-slate-900 text-slate-400 border-slate-700",
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
                    isCurrent
                      ? "border-[#2564ec]/80 shadow-[0_0_30px_rgba(37,100,236,0.25)]"
                      : isCompleted
                      ? "border-emerald-700/70"
                      : "border-slate-800/80",
                  ].join(" ")}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2.5">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                        Step {step.id}
                      </p>
                      <h2 className="text-sm font-semibold text-slate-50">
                        {step.title}
                      </h2>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {step.subtitle}
                      </p>
                    </div>

                    {isCurrent && (
                      <span className="inline-flex items-center rounded-full border border-amber-500/70 bg-amber-500/10 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                        In review
                      </span>
                    )}

                    {isCompleted && !isCurrent && (
                      <span className="inline-flex items-center rounded-full border border-emerald-500/50 bg-emerald-500/5 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                        Completed
                      </span>
                    )}
                  </div>

                  <ul className="mt-1 space-y-1.5 text-xs text-slate-200">
                    {step.bullets.map((bullet, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-slate-500/70 shrink-0" />
                        <span className="flex-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message bas de page */}
        <div className="space-y-2 text-xs text-slate-400">
          <p>
            You don&apos;t have anything else to do for now. Montelion&apos;s
            team will perform the final compliance and connection checks.
          </p>
          <p>
            Once your account is activated, you&apos;ll receive a confirmation
            by email and inside your Montelion dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
