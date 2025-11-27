// app/account/setup/page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/* -------------------------------------------------------
   IG MARKETS STEPS
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
      "Log in to your IG account.",
      "Upload your ID document (passport, ID card…).",
      "Upload a valid proof of address.",
      "Provide financial & personal information.",
      "Wait for IG approval.",
    ],
  },
  {
    id: 3,
    title: "Deposit Funds",
    items: [
      "Go to the Deposit section.",
      "Choose bank card or bank transfer.",
      "Deposit the required amount.",
      "Wait for funds to appear in your balance.",
    ],
  },
  {
    id: 4,
    title: "Install MetaTrader 5 (MT5)",
    items: [
      "Go to the MT5 section inside your IG dashboard.",
      "Download MT5 (Windows / macOS).",
      "Install and open MetaTrader 5.",
    ],
  },
  {
    id: 5,
    title: "Find Your MT5 Login Details",
    items: [
      "Get your MT5 login (account number).",
      "Find the MT5 server name (example: IG-Live MT5).",
      "Copy or create your MT5 password.",
    ],
  },
  {
    id: 6,
    title: "Prepare Your Credentials for Montelion",
    items: [
      "Your IG account must be fully verified.",
      "Your IG account must be funded.",
      <>
        You will need:
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-1">
          <li>MT5 Login</li>
          <li>MT5 Password</li>
          <li>MT5 Server</li>
        </ul>
      </>,
    ],
    warning:
      "Once connected to Montelion, personal trading on this account is forbidden. Violations may lead to account closure.",
  },
];

/* -------------------------------------------------------
   PAGE
-------------------------------------------------------- */
export default function AccountSetupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

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
      <div className="w-full flex justify-center px-4 py-10">
        <div className="mc-card">
          <div className="mc-section text-left">
            <h1 className="mc-title">Connect Your Account</h1>
            <p className="text-slate-400 mt-2">Loading…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center px-4 py-10">
      <div className="mc-card">
        <div className="mc-section text-left">

          <h1 className="mc-title mb-3">Connect Your Account</h1>
          <p className="text-slate-400 mb-10 max-w-lg">
            Follow these steps to set up your IG Markets account and prepare
            your MT5 login details.
          </p>

          {/* Warning */}
          <div className="mb-8 rounded-xl border border-amber-500/60 bg-amber-500/10 px-4 py-3 text-xs text-amber-100 flex gap-3">
            <span className="mt-[2px] text-amber-300">
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  d="M12 3L2.5 19h19L12 3z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12 9v5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <circle cx="12" cy="16" r="0.9" fill="currentColor" />
              </svg>
            </span>
            <div>
              <p className="font-medium mb-1">Keep your MT5 credentials private.</p>
              <p className="text-amber-100/90">
                Only enter them inside the Montelion platform.
              </p>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-5 mb-8">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-5 space-y-3"
              >
                <p className="text-[10px] uppercase tracking-widest text-slate-500">
                  Step {s.id}
                </p>

                <h2 className="text-sm font-semibold text-slate-50">
                  {s.title}
                </h2>

                <ul className="space-y-2 text-xs text-slate-200">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex gap-2 leading-relaxed">
                      <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-slate-500/70" />
                      <div>{item}</div>
                    </li>
                  ))}
                </ul>

                {s.warning && (
                  <div className="rounded-xl border border-rose-500/60 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-200">
                    {s.warning}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Button */}
          <button
            onClick={handleContinue}
            className="mc-btn mc-btn-primary"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
