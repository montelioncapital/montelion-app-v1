// app/exchange/setup/page.jsx
"use client";

import Link from "next/link";

const SECTIONS = [
  {
    id: 1,
    title: "Create Your KuCoin Account",
    items: [
      <>
        Click your personal referral link:&nbsp;
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
      "Create a strong and secure password.",
      "Enter the verification code sent to your email or phone.",
      "Your account is now created.",
    ],
  },
  {
    id: 2,
    title: "Verify Your Identity (KYC)",
    items: [
      "Sign in to your KuCoin account.",
      "Click your profile icon (top-right corner).",
      "Navigate to Security → KYC / Identity Verification.",
      "Select “Individual Verification”.",
      <>
        Provide the required information:
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
          <li>Full name, address, date of birth</li>
          <li>Identity document (ID card, passport, etc.)</li>
          <li>Facial verification if requested</li>
        </ul>
      </>,
      "Wait for KYC approval.",
    ],
    note:
      "KYC is required to increase your limits and access all KuCoin services.",
  },
  {
    id: 3,
    title: "Enable Two-Factor Authentication (2FA)",
    items: [
      "Go to Account → Security → Google Authenticator / 2FA.",
      "Install Google Authenticator or Authy on your phone.",
      "Scan the QR code displayed by KuCoin.",
      "Enter the 6-digit code to confirm activation.",
      "Store your recovery key safely—this is essential.",
    ],
    warning:
      "2FA is mandatory to protect your account and secure your funds.",
  },
  {
    id: 4,
    title: "Deposit Funds Using Your Bank Card",
    items: [
      "In the main menu, click “Buy Crypto”.",
      "Select “Bank Card”.",
      <>
        Choose:
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
          <li>Currency: EUR</li>
          <li>Crypto: USDT (recommended for Futures)</li>
        </ul>
      </>,
      "Enter the amount you want to deposit.",
      "Enter your card information.",
      "Confirm the payment via your bank's 3D Secure system.",
      "Your USDT will arrive in your Main or Funding account.",
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
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
          <li>From: Funding or Main</li>
          <li>To: Futures Account</li>
        </ul>
      </>,
      "Choose USDT.",
      "Confirm the transfer.",
      "Your funds are now ready to be used for Futures trading.",
    ],
  },
  {
    id: 6,
    title: "Create an API Key for Automated Trading",
    items: [
      "Sign in to your KuCoin account.",
      "Click your profile icon → “API Management”.",
      "Click “Create API”.",
      'Choose a name for your API key (e.g., “Montelion”).',
      "Create an API Passphrase and keep it safe.",
      <>
        Enable only these permissions:
        <ul className="mt-1 list-disc list-inside text-[11px] text-slate-400 space-y-0.5">
          <li>General (Read)</li>
          <li>Trade</li>
          <li>Futures</li>
        </ul>
      </>,
      "Confirm using your password, email code, and 2FA code.",
      "KuCoin will then display: API Key, Secret Key (shown only once), and API Passphrase.",
    ],
    warning:
      "Never enable the Withdraw permission. Keep your API access restricted.",
  },
  {
    id: 7,
    title: "Save Your API Keys and Respect Trading Rules",
    items: [
      "Carefully store your API Key, Secret Key, and API Passphrase in a secure place (for example, a password manager or encrypted document).",
      "When you click “I’ve created my API keys”, you will need to provide these credentials so that Montelion can trade on your KuCoin Futures account on your behalf.",
      "Make sure you can always retrieve this information if requested by Montelion support.",
    ],
    warning:
      "Once your API key is activated and connected to Montelion, it is strictly forbidden for you to use this KuCoin account for your own personal trades. If you perform personal trades on this connected account, your account may be closed permanently and your access to Montelion services may be terminated without notice.",
  },
];

export default function ExchangeSetupPage() {
  return (
    <div className="mc-card">
      <div className="mc-section max-w-3xl mx-auto text-left">
        
        {/* HEADER */}
        <h1 className="mc-title mb-3">Connect Your Account</h1>
        <p className="text-slate-400 text-sm mb-6">
          Follow these steps carefully to create your KuCoin account, secure
          your access, deposit funds, and generate a safe API key. For the best
          experience, we recommend completing this setup on a computer.
        </p>

        {/* SECURITY NOTICE */}
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
            <p className="font-medium mb-1.5">Always keep your API keys private.</p>
            <p className="text-amber-100/90">
              Never share your API keys in plain text. Montelion will never ask
              for your password.
            </p>
          </div>
        </div>

        {/* STEPS */}
        <div className="space-y-5 mb-10">
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 space-y-2"
            >
              <div className="space-y-1 mb-1.5">
                <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                  Step {section.id}
                </p>
                <h2 className="text-sm font-semibold text-slate-50">
                  {section.title}
                </h2>
              </div>

              <ul className="mt-1 space-y-1.5 text-xs text-slate-200">
                {section.items.map((item, i) => (
                  <li key={i} className="flex gap-2">
                    {/* ✔ SAME SIZE AS BEFORE + PERFECTLY ROUND + NOT SQUISHED */}
                    <span className="mt-[6px] h-[4px] w-[4px] rounded-full bg-slate-500/70 shrink-0" />
                    <div className="flex-1">{item}</div>
                  </li>
                ))}
              </ul>

              {section.note && (
                <div className="mt-2 rounded-xl border border-slate-700/70 bg-slate-950/80 px-3 py-2 text-[11px] text-slate-300">
                  {section.note}
                </div>
              )}

              {section.warning && (
                <div className="mt-2 rounded-xl border border-rose-600/70 bg-rose-500/10 px-3 py-2 text-[11px] text-rose-100">
                  {section.warning}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="space-y-4">
          <p className="text-xs text-slate-500 max-w-md">
            Once you have completed all steps and retrieved your API Key,
            Secret Key, and Passphrase, you will be able to securely connect
            your KuCoin Futures account to your Montelion dashboard.
          </p>

          <div className="flex gap-3 flex-wrap">
            <Link
              href="/get-started/advanced"
              className="mc-btn border border-slate-600/70 bg-slate-900/80 text-slate-100 hover:bg-slate-800/80"
            >
              Back to overview
            </Link>

            <button type="button" className="mc-btn mc-btn-primary">
              I&apos;ve created my API keys
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
