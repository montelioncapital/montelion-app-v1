// app/contract/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function ContractPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);

  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState(null);

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Charger les infos + vérifier l'auth
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData?.session;

      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const userId = session.user.id;

      const [
        { data: profileData, error: profileErr },
        { data: addressData, error: addrErr },
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

      if (profileErr || addrErr) {
        console.error("contract load error", { profileErr, addrErr });
        setError("Unable to load your information.");
        setLoading(false);
        return;
      }

      setProfile(profileData);
      setAddress(addressData);
      setLoading(false);
    })();
  }, [router]);

  async function handleSign() {
    setError("");
    setSuccess("");

    if (!acceptTerms) {
      setError(
        "Please confirm that you have read and accept the terms of the agreement."
      );
      return;
    }

    setSigning(true);
    try {
      const res = await fetch("/api/contracts/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // plus de signatureDataUrl
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("sign error:", json);
        setError(json.error || "Failed to sign contract.");
        return;
      }

      setSuccess("Your contract has been signed successfully.");
      // petite pause pour que le message soit visible
      setTimeout(() => {
        router.push("/contract/signed");
      }, 800);
    } catch (e) {
      console.error(e);
      setError("Unexpected error while signing the contract.");
    } finally {
      setSigning(false);
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

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-4">Contract</h1>
        <p className="text-slate-400 mb-6">
          Please review the summary of your information below, then sign the
          discretionary management agreement.
        </p>

        {/* Messages */}
        {error && (
          <div className="mb-4 rounded-md border border-red-700/70 bg-red-950/30 px-4 py-2 text-sm text-red-200">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 rounded-md border border-emerald-700/70 bg-emerald-950/30 px-4 py-2 text-sm text-emerald-200">
            {success}
          </div>
        )}

        {/* Client details */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4 mb-5">
          <h2 className="text-sm font-semibold text-slate-100 mb-3">
            Client details
          </h2>
          <dl className="space-y-1.5 text-sm text-slate-300">
            <div className="flex gap-2">
              <dt className="w-32 text-slate-500">Name:</dt>
              <dd>
                {profile
                  ? `${profile.first_name} ${profile.last_name}`.trim()
                  : "—"}
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-32 text-slate-500">Date of birth:</dt>
              <dd>{profile?.date_of_birth || "—"}</dd>
            </div>
            <div className="flex gap-2">
              <dt className="w-32 text-slate-500">Address:</dt>
              <dd>
                {address
                  ? `${address.address_line}, ${address.postal_code} ${address.city}, ${address.country}`
                  : "—"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Summary block */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4 mb-6">
          <h2 className="text-sm font-semibold text-slate-100 mb-3">
            Discretionary Management Agreement (summary)
          </h2>
          <p className="text-sm text-slate-300 mb-2">
            By signing this agreement, you authorise Montelion Capital to manage
            your exchange account on a discretionary basis, within the
            investment mandate and risk limits defined in the full contract. You
            retain full custody of your assets at all times and can revoke API
            access whenever you wish.
          </p>
          <p className="text-sm text-slate-300">
            The full legal text will be generated as a PDF and stored securely
            once you sign. You will be able to download a copy for your records.
          </p>
        </div>

        {/* Accept terms */}
        <div className="mb-6">
          <label className="flex items-start gap-2 text-sm text-slate-300 cursor-pointer">
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

          <p className="mt-2 text-xs text-slate-500">
            By clicking{" "}
            <span className="font-medium text-slate-300">
              “Sign contract”
            </span>
            , you electronically sign the agreement. Your full name will appear
            as the signature in the generated PDF.
          </p>
        </div>

        {/* Bouton */}
        <button
          type="button"
          onClick={handleSign}
          disabled={signing}
          className="mc-btn mc-btn-primary inline-flex items-center justify-center disabled:opacity-60"
        >
          {signing ? "Signing…" : "Sign contract"}
        </button>
      </div>
    </div>
  );
}
