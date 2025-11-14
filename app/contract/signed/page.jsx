// app/contract/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function ContractPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const [clientData, setClientData] = useState(null);

  // Charger les infos client (profil + adresse) pour affichage
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      setSuccess("");

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        setError("Not authenticated.");
        setLoading(false);
        return;
      }

      const userId = session.user.id;

      const [
        { data: profile, error: profileErr },
        { data: address, error: addrErr },
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("first_name, last_name, date_of_birth")
          .eq("id", userId)
          .maybeSingle(),
        supabase
          .from("addresses")
          .select("address_line, city, postal_code, country")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
      ]);

      if (profileErr || addrErr || !profile || !address) {
        console.error("contract page data error", {
          profileErr,
          addrErr,
          profile,
          address,
        });
        setError(
          "We couldn't load the data required to generate your contract."
        );
        setLoading(false);
        return;
      }

      setClientData({ profile, address });
      setLoading(false);
    })();
  }, []);

  async function handleSign() {
    setError("");
    setSuccess("");

    if (!acceptTerms) {
      setError("Please confirm you accept the terms before signing.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/contracts/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}), // plus de signature manuelle
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("sign contract error", json);
        setError(json.error || "Failed to sign contract.");
        setSubmitting(false);
        return;
      }

      setSuccess("Your contract has been signed successfully.");
      setError("");

      // On peut rediriger ensuite si tu veux
      // router.push("/contract/signed");
    } catch (e) {
      console.error(e);
      setError("Unexpected error while signing the contract.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Contract</h1>
          <p className="text-slate-400">Loading your information…</p>
        </div>
      </div>
    );
  }

  const profile = clientData?.profile;
  const address = clientData?.address;

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-4">Contract</h1>
        <p className="text-slate-400 mb-6">
          Please review the summary of your information below, then sign
          the discretionary management agreement.
        </p>

        {/* Messages */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200">
            {success}
          </div>
        )}

        {/* Client details */}
        <div className="mb-4 rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4">
          <div className="mb-3 text-sm font-semibold text-slate-200">
            Client details
          </div>
          <div className="space-y-1.5 text-sm text-slate-300">
            <div>
              <span className="text-slate-500">Name:&nbsp;</span>
              <span>
                {profile?.first_name} {profile?.last_name}
              </span>
            </div>
            <div>
              <span className="text-slate-500">Date of birth:&nbsp;</span>
              <span>{profile?.date_of_birth}</span>
            </div>
            <div>
              <span className="text-slate-500">Address:&nbsp;</span>
              <span>
                {address?.address_line}, {address?.postal_code}{" "}
                {address?.city}, {address?.country}
              </span>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4">
          <div className="mb-3 text-sm font-semibold text-slate-200">
            Discretionary Management Agreement (summary)
          </div>
          <p className="text-sm text-slate-300 mb-2">
            By signing this agreement, you authorise Montelion Capital to manage
            your exchange account on a discretionary basis, within the
            investment mandate and risk limits defined in the full contract. You
            retain full custody of your assets at all times and can revoke API
            access whenever you wish.
          </p>
          <p className="text-xs text-slate-500">
            The full legal text will be generated as a PDF and stored securely
            once you sign. You will be able to download a copy for your records.
          </p>
        </div>

        {/* Accept terms */}
        <div className="mb-6 space-y-3">
          <label className="flex items-start gap-2 text-sm text-slate-300">
            <input
              type="checkbox"
              className="mt-[3px] h-4 w-4 rounded border-slate-600 bg-slate-900 text-[#2564ec] focus:ring-[#2564ec]"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span>
              I confirm that I have read and accept the terms of the
              discretionary management agreement and the related risk
              disclosures.
            </span>
          </label>

          {/* On ne montre plus le canvas de signature */}
          <div className="text-xs text-slate-500">
            By clicking{" "}
            <span className="text-slate-300 font-medium">Sign contract</span>,
            you electronically sign the agreement with your legal name.
          </div>
        </div>

        {/* Bouton */}
        <button
          type="button"
          onClick={handleSign}
          disabled={submitting}
          className="mc-btn mc-btn-primary inline-flex items-center justify-center disabled:opacity-60"
        >
          {submitting ? "Signing…" : "Sign contract"}
        </button>
      </div>
    </div>
  );
}
