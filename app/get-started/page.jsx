"use client";

import { useRouter } from "next/navigation";

export default function GetStartedPage() {
  const router = useRouter();

  return (
    <div className="mc-card">
      <div className="mc-section text-left space-y-10">
        {/* Titre */}
        <div>
          <h1 className="mc-title mb-3">Let’s get you fully set up</h1>
          <p className="text-slate-400 text-base leading-relaxed max-w-xl">
            In a few minutes, you&apos;ll be ready to let Montelion trade on
            your exchange account while you keep full control of your funds.
          </p>
        </div>

        {/* Étapes en vertical */}
        <div className="space-y-6">
          {/* Étape 1 */}
          <div className="border border-slate-700/50 bg-slate-900/40 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-blue-400 text-lg font-semibold mt-1">1</div>
              <div>
                <h3 className="text-slate-200 font-semibold mb-1">
                  Personal onboarding
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We collect your basic details, verify your phone, address and
                  identity to comply with regulations.
                </p>
                <ul className="mt-3 text-sm text-slate-500 space-y-1">
                  <li>• Profile &amp; date of birth</li>
                  <li>• Phone verification (SMS)</li>
                  <li>• Address &amp; KYC documents</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Étape 2 */}
          <div className="border border-slate-700/50 bg-slate-900/40 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-purple-400 text-lg font-semibold mt-1">2</div>
              <div>
                <h3 className="text-slate-200 font-semibold mb-1">
                  Sign your mandate
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  You review and e-sign the discretionary management agreement
                  that defines our responsibilities and fees.
                </p>
                <ul className="mt-3 text-sm text-slate-500 space-y-1">
                  <li>• Clear terms &amp; risk disclosure</li>
                  <li>• Digital signature in a few clicks</li>
                  <li>• You can revoke the mandate at any time</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Étape 3 */}
          <div className="border border-slate-700/50 bg-slate-900/40 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-emerald-400 text-lg font-semibold mt-1">
                3
              </div>
              <div>
                <h3 className="text-slate-200 font-semibold mb-1">
                  Connect your exchange
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We guide you step-by-step to open your account, deposit funds
                  and create a read-only trading API.
                </p>
                <ul className="mt-3 text-sm text-slate-500 space-y-1">
                  <li>• Tutorial for your chosen exchange</li>
                  <li>• You keep custody of your assets</li>
                  <li>• Access can be revoked at any time</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Temps moyen */}
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-emerald-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>
            Average time to complete:{" "}
            <span className="text-slate-200 font-medium">5–10 minutes</span>
          </span>
        </div>

        {/* Bouton Get started */}
        <button
          type="button"
          className="mc-btn mc-btn-primary w-full py-3"
          onClick={() => router.push("/onboarding")}
        >
          Get started
        </button>
      </div>
    </div>
  );
}
