"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function ContractPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [signing, setSigning] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");

      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();

      if (sessionErr || !sessionData?.session?.user) {
        router.replace("/login");
        return;
      }

      const userId = sessionData.session.user.id;

      // Charger profil
      const { data: prof, error: profErr } = await supabase
        .from("profiles")
        .select("first_name, last_name, date_of_birth, country")
        .eq("id", userId)
        .maybeSingle();

      if (profErr || !prof) {
        setError("Unable to load your profile for the contract.");
        setLoading(false);
        return;
      }

      // Charger adresse la plus récente
      const { data: addr, error: addrErr } = await supabase
        .from("addresses")
        .select("address_line, postal_code, city, country")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (addrErr || !addr) {
        setError("Unable to load your address for the contract.");
        setLoading(false);
        return;
      }

      setProfile(prof);
      setAddress(addr);
      setLoading(false);
    })();
  }, [router]);

  async function handleSign() {
    setError("");
    setSigning(true);
    try {
      const res = await fetch("/api/contracts/sign", {
        method: "POST",
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to sign contract.");
      }

      // Redirection vers page de remerciement
      router.push("/contract/signed");
    } catch (err) {
      setError(err.message || "Something went wrong while signing.");
    } finally {
      setSigning(false);
    }
  }

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section">
          <h1 className="mc-title mb-2">Contract</h1>
          <p className="text-slate-400">Preparing your contract…</p>
        </div>
      </div>
    );
  }

  if (!profile || !address) {
    return (
      <div className="mc-card">
        <div className="mc-section">
          <h1 className="mc-title mb-2">Contract</h1>
          <p className="text-rose-400 text-sm">
            We couldn&apos;t load the data required to generate your contract.
          </p>
        </div>
      </div>
    );
  }

  const fullName = `${profile.first_name || ""} ${
    profile.last_name || ""
  }`.trim();

  return (
    <div className="mc-card">
      <div className="mc-section max-w-2xl mx-auto text-left">
        <h1 className="mc-title mb-3">Management agreement</h1>
        <p className="text-slate-400 mb-6">
          Please review the information below and sign electronically to
          activate the next step of your onboarding.
        </p>

        {error && (
          <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        {/* Aperçu "HTML" du contrat */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 mb-6 text-sm leading-relaxed text-slate-100">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-2">
              Client information
            </p>
            <p>
              <span className="font-semibold">Name: </span>
              {fullName || "—"}
            </p>
            <p>
              <span className="font-semibold">Date of birth: </span>
              {profile.date_of_birth || "—"}
            </p>
            <p>
              <span className="font-semibold">Country: </span>
              {address.country || profile.country || "—"}
            </p>
            <p className="mt-1">
              <span className="font-semibold">Address: </span>
              {address.address_line || "—"},{" "}
              {address.postal_code} {address.city}
            </p>
          </div>

          <div className="h-px bg-slate-800 my-4" />

          <h2 className="text-base font-semibold mb-2 text-slate-50">
            Discretionary management mandate (demo)
          </h2>
          <p className="mb-3 text-slate-300">
            This is a fictive template to demonstrate how your final contract
            will be displayed and signed within Montelion. The production
            version will include detailed terms, fees and risk disclosures.
          </p>

          <ul className="list-disc list-inside text-slate-300 space-y-1 mb-4">
            <li>
              Montelion executes a trading strategy on your exchange account via
              a read-only API key (no withdrawals).
            </li>
            <li>
              You remain the sole owner and custodian of your assets at all
              times.
            </li>
            <li>
              You can revoke access whenever you wish by disabling the API key
              on your exchange.
            </li>
          </ul>

          <p className="text-xs text-slate-500 mt-4">
            By signing electronically, you confirm that the information above is
            accurate and that you agree to the terms of this mandate.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-xs text-slate-500">
            Your signature will generate a PDF copy of this contract, stored
            securely in your Montelion file.
          </p>

          <button
            type="button"
            className="mc-btn mc-btn-primary"
            onClick={handleSign}
            disabled={signing}
          >
            {signing ? "Signing…" : "Sign contract"}
          </button>
        </div>
      </div>
    </div>
  );
}
