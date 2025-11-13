"use client";

import { useRouter } from "next/navigation";

export default function GetStartedPage() {
  const router = useRouter();

  return (
    <div className="w-full flex justify-center pt-24 px-4">
      <div className="mc-card max-w-2xl w-full">
        <div className="mc-section">

          {/* Title */}
          <h1 className="mc-title mb-3">Let’s get you fully set up</h1>
          <p className="text-slate-400 mb-12 max-w-xl">
            In a few minutes, you'll be ready to let Montelion trade on your exchange
            account while you keep full control of your funds.
          </p>

          {/* STEPS CONTAINER */}
          <div className="relative pl-10 space-y-8">

            {/* Vertical line */}
            <div className="absolute left-5 top-3 bottom-3 w-[2px] bg-slate-800"></div>

            {/* STEP 1 */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              {/* Number circle */}
              <div className="absolute -left-5 top-6 flex items-center justify-center h-10 w-10 
                rounded-full border border-[#2564EC] bg-[#2564EC] text-white text-sm font-semibold">
                1
              </div>

              <h2 className="text-slate-200 font-semibold">Start</h2>
              <p className="text-slate-400 text-sm mb-3">
                You're creating your Montelion account
              </p>

              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Private invitation validated</li>
                <li>• Secure login with email & password</li>
                <li>• Preparing your account for activation</li>
              </ul>
            </div>

            {/* STEP 2 */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="absolute -left-5 top-6 flex items-center justify-center h-10 w-10 
                rounded-full border border-slate-700 bg-slate-800 text-white text-sm font-semibold">
                2
              </div>

              <h2 className="text-slate-200 font-semibold">Onboarding</h2>
              <p className="text-slate-400 text-sm mb-3">
                Personal & regulatory information
              </p>

              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Profile & date of birth</li>
                <li>• Phone verification (SMS)</li>
                <li>• Address & KYC documents</li>
              </ul>
            </div>

            {/* STEP 3 */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="absolute -left-5 top-6 flex items-center justify-center h-10 w-10 
                rounded-full border border-slate-700 bg-slate-800 text-white text-sm font-semibold">
                3
              </div>

              <h2 className="text-slate-200 font-semibold">Contract</h2>
              <p className="text-slate-400 text-sm mb-3">
                Sign your management mandate
              </p>

              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Clear terms & risk disclosure</li>
                <li>• Digital signature in a few clicks</li>
                <li>• You can revoke the mandate at any time</li>
              </ul>
            </div>

            {/* STEP 4 */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="absolute -left-5 top-6 flex items-center justify-center h-10 w-10 
                rounded-full border border-slate-700 bg-slate-800 text-white text-sm font-semibold">
                4
              </div>

              <h2 className="text-slate-200 font-semibold">Exchange setup</h2>
              <p className="text-slate-400 text-sm mb-3">
                Connect your trading account securely
              </p>

              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Step-by-step tutorial</li>
                <li>• Deposit & API connection</li>
                <li>• You keep full custody of your assets</li>
              </ul>
            </div>

            {/* STEP 5 */}
            <div className="relative rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
              <div className="absolute -left-5 top-6 flex items-center justify-center h-10 w-10 
                rounded-full border border-slate-700 bg-slate-800 text-white text-sm font-semibold">
                5
              </div>

              <h2 className="text-slate-200 font-semibold">Validation</h2>
              <p className="text-slate-400 text-sm mb-3">
                Final compliance & account activation
              </p>

              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Document review</li>
                <li>• Strategy assignment</li>
                <li>• Activation of your Montelion account</li>
              </ul>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-12 flex flex-col items-center gap-6">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full 
                bg-emerald-500/10 border border-emerald-500/60 text-[10px] text-emerald-400">
                ✓
              </span>
              <span>
                Average time to complete:{" "}
                <span className="text-slate-300 font-medium">5–10 minutes</span>
              </span>
            </div>

            <button
              type="button"
              className="mc-btn mc-btn-primary px-6"
              onClick={() => router.push("/onboarding")}
            >
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
