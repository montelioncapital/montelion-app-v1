// app/account/setup/page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/* -------------------------------------------------------
   IG MARKETS + MT5 — LISTE DES SECTIONS
-------------------------------------------------------- */

const SECTIONS = [
  {
    id: 1,
    title: "Create Your IG Markets Account",
    items: [
      <>
        Go to{" "}
        <a
          href="https://www.ig.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8fa8ff] hover:text-[#b6c6ff] underline underline-offset-2"
        >
          https://www.ig.com
        </a>{" "}
        and click <span className="italic">“Create live account”</span>.
      </>,
      "Open an individual personal trading account.",
      "Fill in your personal details.",
      "Create a strong password.",
      "Confirm your email if required.",
    ],
  },
  {
    id: 2,
    title: "Complete Identity Verification (KYC)",
    items: [
      "Sign in to your IG account.",
      "Upload your ID document (passport, ID card…).",
      "Upload a valid proof of address.",
      "Provide financial & personal information.",
      "Wait for IG approval.",
    ],
  },
  {
    id: 3,
    title: "Deposit Funds into Your IG Account",
    items: [
      "Go to the deposit section in your IG dashboard.",
      "Choose bank card or bank transfer.",
      "Deposit the required minimum amount.",
      "Wait for your funds to become available.",
    ],
  },
  {
    id: 4,
    title: "Download and Install MetaTrader 5 (MT5)",
    items: [
      "In your IG dashboard, locate the MT5 platform section.",
      "Download MT5 for Windows or macOS.",
      "Install and open MT5.",
    ],
  },
  {
    id: 5,
    title: "Find Your MT5 Login Details",
    items: [
      "Go to IG’s MT5 accounts section.",
      "Copy your MT5 login (account number).",
      "Copy the MT5 server name (e.g., IG-Live MT5).",
      "Copy or create your MT5 password.",
    ],
  },
  {
    id: 6,
    title: "Prepare These Details for Montelion",
    items: [
      "Your IG account must be verified & funded.",
      <>
        You will need the following:
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
          <li>MT5 Login (account number)</li>
          <li>MT5 Password</li>
          <li>MT5 Server</li>
        </ul>
      </>,
      "These details will be entered securely on the next page.",
    ],
    warning:
      "Personal trading on this MT5 account is forbidden once connected to Montelion. Violations may lead to permanent disconnection.",
  },
];

/* -------------------------------------------------------
   PAGE PRINCIPALE
-------------------------------------------------------- */

export default function ExchangeSetupPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger session
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data?.session?.user) {
        router.replace("/login");
        return;
      }
      setUserId(data.session.user.id);
      setLoading(false);
    })();
  }, [router]);

  async function handleContinue() {
    if (!userId) return router.push("/login");

    await supabase.from("onboarding_state").upsert(
      {
        user_id: userId,
        current_step: 12,
        completed: false,
      },
      { onConflict: "user_id" }
    );

    router.push("/account/mt5");
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center px-4">
        <div className="mc-card max-w-2xl w-full">
          <div className="mc-section">
            <h1 className="mc-title mb-2">Connect Your Account</h1>
            <p className="text-slate-400">Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center px-4 py-12 md:py-16">
      <div className="mc-card max-w-2xl w-full">
        <div className="mc-section max-w-xl mx-auto text-left">

          <h1 className="mc-title mb-3">Connect Your Account</h1>
          <p className="text-slate-400 mb-6">
            Follow these steps to set up your IG Markets account and prepare your MT5 login details.
          </p>

          {/* Warning */}
          <div className="mb-8 rounded-2xl border border-amber-500/60 bg-amber-500/10 px-4 py-3 text-xs text-amber-100 flex gap-3">
            <span className="mt-[2px] text-amber-300">
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path d="M12 3L2.5 19h19L12 3z" fill="none" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M12 9v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                <circle cx="12" cy="16" r="0.9" fill="currentColor"/>
              </svg>
            </span>
            <div>
              <p className="font-medium mb-1.5">Keep your MT5 credentials private.</p>
              <p className="text-amber-100/90">
                Only enter them inside the secure Montelion platform. Never share them by email or chat.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-5 mb-10">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 space-y-2"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Step {s.id}
                </p>
                <h2 className="text-sm font-semibold text-slate-50">{s.title}</h2>

                <ul className="mt-1 space-y-1.5 text-xs text-slate-200">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-slate-500/70 shrink-0" />
                      <div>{item}</div>
                    </li>
                  ))}
                </ul>

                {s.warning && (
                  <div className="mt-2 rounded-xl border border-rose-600/70 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
                    {s.warning}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <p className="text-xs text-slate-500 max-w-md mb-3">
            Once everything is completed, continue to the MT5 connection step.
          </p>

          <button onClick={handleContinue} className="mc-btn mc-btn-primary">
            Continue
          </button>

        </div>
      </div>
    </div>
  );
}
