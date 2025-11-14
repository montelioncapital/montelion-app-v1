// app/contract/page.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function ContractPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState(null);
  const [kyc, setKyc] = useState(null);
  const [poa, setPoa] = useState(null);

  const [hasAccepted, setHasAccepted] = useState(false);

  // ----------------- LOAD DATA -----------------
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      setOk("");

      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();

      if (sessionErr) {
        console.error("session error", sessionErr);
        setError("We couldn't verify your session. Please sign in again.");
        setLoading(false);
        return;
      }

      const session = sessionData?.session;
      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const userId = session.user.id;

      const [
        { data: profileData, error: profileErr },
        { data: addrData, error: addrErr },
        { data: kycData, error: kycErr },
        { data: poaData, error: poaErr },
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("first_name, last_name, date_of_birth, phone_e164")
          .eq("id", userId)
          .maybeSingle(),
        supabase
          .from("addresses")
          .select("address_line, city, postal_code, country")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        supabase
          .from("kyc_identities")
          .select("doc_type")
          .eq("user_id", userId)
          .maybeSingle(),
        supabase
          .from("proof_of_address")
          .select("doc_type")
          .eq("user_id", userId)
          .maybeSingle(),
      ]);

      if (profileErr || addrErr || kycErr || poaErr) {
        console.error("contract data errors", {
          profileErr,
          addrErr,
          kycErr,
          poaErr,
        });
        setError(
          "We couldn't load the data required to generate your contract."
        );
        setLoading(false);
        return;
      }

      if (!profileData || !addrData || !kycData || !poaData) {
        console.warn("missing data", {
          profileData,
          addrData,
          kycData,
          poaData,
        });
        setError(
          "We couldn't load the data required to generate your contract."
        );
        setLoading(false);
        return;
      }

      setProfile(profileData);
      setAddress(addrData);
      setKyc(kycData);
      setPoa(poaData);
      setLoading(false);
    })();
  }, [router]);

  // ----------------- SIGN CONTRACT -----------------
  async function handleSign() {
    setError("");
    setOk("");
    setSigning(true);

    try {
      // 1) Récupérer le access_token de la session actuelle
      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();

      if (sessionErr) {
        console.error("session error in handleSign:", sessionErr);
        throw new Error("Not authenticated.");
      }

      const accessToken = sessionData?.session?.access_token;
      if (!accessToken) {
        throw new Error("Not authenticated.");
      }

      // 2) Appeler l’API en lui envoyant le token
      const res = await fetch("/api/contracts/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acceptedTerms: hasAccepted,
          accessToken,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        console.error("sign error", data);
        throw new Error(data.error || "Unable to sign your contract.");
      }

      setOk("Your contract has been signed successfully.");
      // plus tard: router.push("/exchange-setup");
    } catch (err) {
      setError(err.message || "Something went wrong while signing.");
    } finally {
      setSigning(false);
    }
  }

  // ----------------- RENDER -----------------
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

  if (error && !profile) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Contract</h1>
          <p className="text-rose-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  const fullName = `${profile.first_name || ""} ${
    profile.last_name || ""
  }`.trim();

  const signDisabled = signing || !hasAccepted;

  return (
    <div className="mc-card">
      <div className="mc-section text-left max-w-2xl mx-auto">
        <h1 className="mc-title mb-3">Contract</h1>
        <p className="text-slate-400 mb-6">
          Please review the summary of your information below, then sign the
          discretionary management agreement.
        </p>

        {ok && (
          <div className="mb-4 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-3 py-2 rounded-lg">
            {ok}
          </div>
        )}
        {/* On n’affiche pas "Not authenticated." dans la bannière si on a quand même les données */}
        {error && profile && error !== "Not authenticated." && (
          <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Résumé client */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-5 py-4 mb-6 space-y-2 text-sm text-slate-200">
          <div className="font-semibold text-slate-50">Client details</div>
          <div>
            <span className="text-slate-500 mr-2">Name:</span>
            {fullName}
          </div>
          <div>
            <span className="text-slate-500 mr-2">Date of birth:</span>
            {profile.date_of_birth}
          </div>
          <div>
            <span className="text-slate-500 mr-2">Address:</span>
            {address.address_line}, {address.postal_code} {address.city},{" "}
            {address.country}
          </div>
        </div>

        {/* Texte contrat */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 mb-6 text-sm text-slate-300 space-y-3">
          <p className="font-semibold text-slate-100">
            Discretionary Management Agreement
          </p>

          <p className="text-slate-400 text-xs leading-relaxed">
            By signing this agreement, you authorise Montelion Capital to manage
            your exchange account on a discretionary basis, within the
            investment mandate and risk limits defined in the full contract. You
            retain full custody of your assets at all times and can revoke API
            access whenever you wish.
          </p>

          <p className="text-slate-500 text-xs">
            You can read the full management mandate{" "}
            <a
              href="/legal/montelion-discretionary-mandate.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-200 underline underline-offset-2 hover:text-white"
            >
              here (PDF)
            </a>
            .
          </p>

          <p className="text-slate-500 text-xs">
            The full legal text will be generated as a PDF and stored securely
            once you sign. You will be able to download a copy for your records.
          </p>
        </div>

        {/* Checkbox acceptation */}
        <label className="flex items-start gap-3 mb-2 text-xs text-slate-300 cursor-pointer select-none">
          <input
            type="checkbox"
            className="mt-[2px] h-4 w-4 rounded border-slate-600 bg-slate-900 text-blue-500 focus:ring-0"
            checked={hasAccepted}
            onChange={(e) => setHasAccepted(e.target.checked)}
          />
          <span>
            I confirm that I have read and accept the terms of the discretionary
            management agreement and the related risk disclosures.
          </span>
        </label>

        <p className="mb-6 text-[11px] text-slate-500">
          By clicking <span className="font-semibold">“Sign contract”</span>,
          you electronically sign the agreement. Your name will appear as the
          signature in the generated PDF.
        </p>

        <button
          type="button"
          onClick={handleSign}
          disabled={signDisabled}
          className={`mc-btn mc-btn-primary ${
            signDisabled ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {signing ? "Signing…" : "Sign contract"}
        </button>
      </div>
    </div>
  );
}
