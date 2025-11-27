// app/account/setup/page.jsx  (ou app/exchange/setup/page.jsx selon ton arbo)
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/* -------------------------------------------------------
   LISTE DES SECTIONS – IG MARKETS + MT5
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
      "Choose to open a trading account in your own name (individual account).",
      "Fill in your personal details (name, email, phone, country of residence).",
      "Create a strong password and confirm your registration.",
      "Confirm your email if IG asks you to validate it.",
    ],
  },
  {
    id: 2,
    title: "Complete Identity Verification (KYC)",
    items: [
      "Sign in to your IG account.",
      "Go to your account area and follow the steps for identity verification (KYC).",
      "Upload your identity document (passport, ID card or driver’s license).",
      "Upload a recent proof of address (utility bill, bank statement, tax notice…).",
      "Fill in any additional information requested by IG (employment, income, experience).",
      "Wait for IG to validate your documents and activate your live account.",
    ],
  },
  {
    id: 3,
    title: "Deposit Funds to Your IG Account",
    items: [
      "Once your account is approved, sign in to the IG client area.",
      "Go to the section for deposits or “Add funds”.",
      "Choose your preferred payment method (bank card or bank transfer).",
      "Select the account you want to fund (your main trading account).",
      "Deposit the amount required for your Montelion mandate.",
      "Wait for the funds to appear and be available for trading.",
    ],
  },
  {
    id: 4,
    title: "Download and Install MetaTrader 5 (MT5)",
    items: [
      "From the IG platform area, go to the section for trading platforms or MetaTrader 5.",
      "Download the MT5 platform for your device (Windows / macOS).",
      "Run the installer and follow the steps to complete the installation.",
      "Open MT5 once the installation is finished.",
    ],
  },
  {
    id: 5,
    title: "Find Your MT5 Login Details",
    items: [
      "Log in to your IG client area in your browser.",
      "Go to the section where your MT5 account is displayed (MetaTrader / MT5 accounts).",
      "Locate your MT5 account number and note it down.",
      "Check the MT5 server name indicated by IG (for example “IG-Live MT5” or similar).",
      "If IG provides an investor/read-only password, keep it accessible. Otherwise, you will use your main MT5 trading password.",
    ],
  },
  {
    id: 6,
    title: "Prepare the Details for Montelion",
    items: [
      "Make sure your IG live account is funded and fully verified.",
      "Have these details ready for the next step:",
      <>
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
          <li>MT5 login (account number)</li>
          <li>MT5 password (trading or investor, as requested by Montelion)</li>
          <li>MT5 server name</li>
        </ul>
      </>,
      "On the next page, you will enter these credentials securely so Montelion can connect and manage your trading.",
    ],
    warning:
      "Once your account is connected to Montelion, personal trading from your side on this MT5 account is not allowed. Any violation may lead to permanent disconnection of the account.",
  },
];

/* -------------------------------------------------------
   PAGE PRINCIPALE
-------------------------------------------------------- */

export default function ExchangeSetupPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charger la session utilisateur
  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      setUserId(session.user.id);
      setLoading(false);
    })();
  }, [router]);

  // Quand l’utilisateur a terminé la préparation IG / MT5
  async function handlePreparedAccount() {
    if (!userId) {
      router.push("/login");
      return;
    }

    try {
      const { error } = await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 12,
          completed: false,
        },
        { onConflict: "user_id" }
      );

      if (error) console.error("Error updating onboarding_state:", error);
    } catch (e) {
      console.error("Unexpected error:", e);
    }

    router.push("/account/mt5");
  }

  // Loading
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

  // Render principal
  return (
    <div className="min-h-screen w-full flex justify-center px-4 md:px-0 py-10 md:py-16">
      <div className="mc-card max-w-2xl w-full">
        <div className="mc-section max-w-3xl mx-auto text-left">
          <h1 className="mc-title mb-3">Connect Your Account</h1>
          <p className="text-slate-400 mb-6">
            Follow these steps to set up your IG Markets account, fund it, and
            prepare your MT5 login details so Montelion can connect and manage
            your trading.
          </p>

          {/* WARNING BANNER */}
          <div className="mb-8 rounded-2xl border border-amber-500/60 bg-amber-500/10 px-4 py-3 text-xs text-amber-100 flex gap-3">
            <span className="mt-[2px] text-amber-300">
              <svg viewBox="0 0 24 24" className="h-4 w-4">
                <path
                  d="M12 3L2.5 19h19L12 3z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="M12 9v5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="12" cy="16" r="0.9" fill="currentColor" />
              </svg>
            </span>
            <div>
              <p className="font-medium mb-1.5">
                Keep your IG and MT5 credentials private.
              </p>
              <p className="text-amber-100/90">
                You will only enter your MT5 details inside the secure
                Montelion platform. Never share your passwords by email, chat or
                screenshots.
              </p>
            </div>
          </div>

          {/* STEPS */}
          <div className="space-y-5 mb-10">
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                className="rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 space-y-2"
              >
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Step {s.id}
                </p>
                <h2 className="text-sm font-semibold text-slate-50">
                  {s.title}
                </h2>

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

          {/* FOOTER */}
          <div className="space-y-4">
            <p className="text-xs text-slate-500 max-w-md">
              Once your IG account is verified, funded and your MT5 login
              details are ready, click below to move on to the secure
              connection step.
            </p>

            <button
              onClick={handlePreparedAccount}
              className="mc-btn mc-btn-primary"
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
