// app/exchange/setup/page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

/* -------------------------------------------------------
   LISTE DES SECTIONS (texte uniquement)
-------------------------------------------------------- */

const SECTIONS = [
  {
    id: 1,
    title: "Create Your KuCoin Account",
    items: [
      <>
        Click your referral link:&nbsp;
        <a
          href="https://www.kucoin.com/r/rf/QBAA2LND"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#8fa8ff] hover:text-[#b6c6ff] underline underline-offset-2"
        >
          https://www.kucoin.com/r/rf/QBAA2LND
        </a>
      </>,
      "Choose to register using your email or phone number.",
      "Create a strong password.",
      "Enter the verification code sent to your email or phone.",
      "Your KuCoin account is now created.",
    ],
  },
  {
    id: 2,
    title: "Verify Your Identity (KYC)",
    items: [
      "Sign in to your KuCoin account.",
      "Click your profile icon (top-right corner).",
      "Navigate to Security → KYC Verification.",
      "Select “Individual Verification”.",
      <>
        Provide the required information:
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
          <li>Full name, address, date of birth</li>
          <li>ID document (passport, ID card…)</li>
          <li>Face verification if requested</li>
        </ul>
      </>,
      "Wait for KYC approval.",
    ],
  },
  {
    id: 3,
    title: "Enable Two-Factor Authentication (2FA)",
    items: [
      "Go to Account → Security → Google Authenticator / 2FA.",
      "Install Google Authenticator or Authy.",
      "Scan the QR code displayed by KuCoin.",
      "Enter the 6-digit code to confirm.",
      "Save your recovery key somewhere safe.",
    ],
    warning: "2FA is mandatory to protect your funds.",
  },
  {
    id: 4,
    title: "Deposit Funds Using Your Bank Card",
    items: [
      "In the main menu, click “Buy Crypto”.",
      "Select “Bank Card”.",
      <>
        Choose:
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400">
          <li>Currency: EUR</li>
          <li>Crypto: USDT (recommended)</li>
        </ul>
      </>,
      "Enter the amount.",
      "Confirm with 3D Secure.",
      "Your USDT arrives in your Main or Funding account.",
    ],
  },
  {
    id: 5,
    title: "Transfer Funds to the Futures Account",
    items: [
      "Go to Assets.",
      "Open your “Futures Account”.",
      "Click “Transfer”.",
      <>
        Select:
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400">
          <li>From: Main or Funding</li>
          <li>To: Futures</li>
        </ul>
      </>,
      "Choose USDT.",
      "Confirm the transfer.",
    ],
  },
  {
    id: 6,
    title: "Create an API Key for Automated Trading",
    items: [
      "Sign in to your KuCoin account.",
      "Go to your profile → “API Management”.",
      "Click “Create API”.",
      "Choose a name (e.g., “Montelion”).",
      "Create an API Passphrase and save it.",
      <>
        Enable ONLY these permissions:
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400">
          <li>General (Read)</li>
          <li>Trade</li>
          <li>Futures</li>
        </ul>
      </>,
      "Confirm with password, email code, and 2FA code.",
      "KuCoin will show your API Key, Secret Key (only once), and Passphrase.",
    ],
    warning: "Never enable Withdraw permission.",
  },
  {
    id: 7,
    title: "Save Your API Keys and Respect Trading Rules",
    items: [
      "Store your API Key, Secret Key, and API Passphrase in a secure place.",
      "You will provide these credentials to Montelion on the next page.",
      "Keep them available if support needs to verify them.",
    ],
    warning:
      "Once connected to Montelion, personal trading on this account is forbidden. Violations may lead to permanent account closure.",
  },
];

/* -------------------------------------------------------
   PAGE PRINCIPALE
-------------------------------------------------------- */

export default function ExchangeSetupPage() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ----------------------------------------------
     Charger la session utilisateur
  ---------------------------------------------- */
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

  /* ----------------------------------------------
     Quand l’utilisateur clique “I've created my API keys”
     → passer en STEP 12
     → rediriger vers /exchange/mt5
  ---------------------------------------------- */
  async function handleCreatedApiKeys() {
    if (!userId) {
      router.push("/login");
      return;
    }

    try {
      const { error } = await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 12, // 🔥 STEP 12 COMME DEMANDÉ
          completed: false,
        },
        { onConflict: "user_id" }
      );

      if (error) console.error("Error updating onboarding_state:", error);
    } catch (e) {
      console.error("Unexpected error:", e);
    }

    router.push("/account/mt5"); // 🔥 REDIRECTION CORRECTE
  }

  /* ----------------------------------------------
     Si la session charge encore
  ---------------------------------------------- */
  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section">
          <h1 className="mc-title mb-2">Connect Your Account</h1>
          <p className="text-slate-400">Loading…</p>
        </div>
      </div>
    );
  }

  /* ----------------------------------------------
     RENDER DE LA PAGE
  ---------------------------------------------- */
  return (
    <div className="mc-card">
      <div className="mc-section max-w-3xl mx-auto text-left">

        <h1 className="mc-title mb-3">Connect Your Account</h1>
        <p className="text-slate-400 mb-6">
          Follow these steps to prepare your KuCoin account and create a secure trading API key.
        </p>

        {/* WARNING BANNER */}
        <div className="mb-8 rounded-2xl border border-amber-500/60 bg-amber-500/10 px-4 py-3 text-xs text-amber-100 flex gap-3">
          <span className="mt-[2px] text-amber-300">
            <svg viewBox="0 0 24 24" className="h-4 w-4">
              <path d="M12 3L2.5 19h19L12 3z" fill="none" stroke="currentColor" strokeWidth="1.6" />
              <path d="M12 9v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <circle cx="12" cy="16" r="0.9" fill="currentColor" />
            </svg>
          </span>
          <div>
            <p className="font-medium mb-1.5">Always keep your API keys private.</p>
            <p className="text-amber-100/90">
              Never share your API keys in plain text. Montelion will never ask for your password.
            </p>
          </div>
        </div>

        {/* STEPS */}
        <div className="space-y-5 mb-10">
          {SECTIONS.map((s) => (
            <div key={s.id} className="rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">Step {s.id}</p>
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

        {/* FOOTER */}
        <div className="space-y-4">
          <p className="text-xs text-slate-500 max-w-md">
            Once your API keys are created, click below to connect your account securely.
          </p>

          <button onClick={handleCreatedApiKeys} className="mc-btn mc-btn-primary">
            I&apos;ve created my API keys
          </button>
        </div>
      </div>
    </div>
  );
}
