"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ContractPage() {
  const [profile, setProfile] = useState(null);
  const [accept, setAccept] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("full_name, dob, address")
        .eq("id", user.id)
        .single();

      setProfile(data);
    })();
  }, []);

  async function handleSign() {
    if (!accept) return;

    // redirect to signing flow or backend signature logic
    window.location.href = "/contract/signed";
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 mt-20 mb-20">
      <div className="mc-card max-w-2xl w-full">
        <div className="mc-section text-left">

          {/* TITLE */}
          <h1 className="mc-title mb-4">Contract</h1>
          <p className="text-slate-400 mb-10">
            Please review the summary of your information below, then sign the discretionary management agreement.
          </p>

          {/* CLIENT DETAILS */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 mb-8">
            <h2 className="text-slate-200 font-semibold mb-3">Client details</h2>
            <p><span className="font-medium">Name:</span> {profile.full_name}</p>
            <p><span className="font-medium">Date of birth:</span> {profile.dob}</p>
            <p><span className="font-medium">Address:</span> {profile.address}</p>
          </div>

          {/* AGREEMENT */}
          <div className="rounded-xl border border-white/5 bg-white/[0.02] p-5 mb-8">
            <h2 className="text-slate-200 font-semibold mb-3">
              Discretionary Management Agreement
            </h2>

            <p className="text-slate-300 mb-4">
              By signing this agreement, you authorize Montelion Capital to manage your exchange account on a discretionary basis,
              within the investment mandate defined in the contract. You retain full control of your assets at all times and may revoke
              API access whenever you wish.
            </p>

            <p className="text-slate-300 mb-4">
              You can read the full management mandate{" "}
              <a
                href="/legal/INVESTMENT-MANAGEMENT-AGREEMENT.pdf"
                target="_blank"
                rel="noreferrer"
                className="text-blue-300 underline"
              >
                here (PDF)
              </a>.
            </p>

            <p className="text-slate-400">
              The full legal text will be generated as a PDF and stored securely once you sign.
              You will be able to download a copy for your records.
            </p>
          </div>

          {/* ORANGE WARNING BLOCK */}
          <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 p-5 mb-8">
            <h3 className="text-orange-300 font-semibold mb-2">Important notices</h3>
            <ul className="list-disc list-inside text-orange-200 text-sm space-y-2">
              <li>Montelion Capital cannot withdraw funds from your exchange account under any circumstances.</li>
              <li>You may not use your connected exchange account for personal or manual trading during discretionary management.</li>
              <li>Trading involves financial risks, including potential partial or total loss of capital.</li>
              <li>Any violation of the agreement may result in immediate account termination and potential legal action.</li>
            </ul>
          </div>

          {/* ACCEPT TERMS */}
          <div className="flex items-start space-x-3 mb-6">
            <input
              type="checkbox"
              checked={accept}
              onChange={() => setAccept(!accept)}
              className="mt-1 h-4 w-4"
            />
            <label className="text-slate-300 text-sm">
              I confirm that I have read and accept the terms of the discretionary management agreement and the related risk disclosures.
            </label>
          </div>

          <p className="text-slate-500 text-xs mb-6">
            By clicking “Sign contract”, you electronically sign the agreement. Your name will appear as the signature in the generated PDF.
          </p>

          {/* SIGN BUTTON */}
          <button
            className={`mc-btn mc-btn-primary w-full ${!accept ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!accept}
            onClick={handleSign}
          >
            Sign contract
          </button>
        </div>
      </div>
    </div>
  );
}
