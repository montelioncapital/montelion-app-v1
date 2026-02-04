// app/onboarding/OnboardingClient.jsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

// Types de doc d’identité affichés dans l’UI
const ID_DOC_TYPES = ["Passport", "Driving license", "National ID card"];

// mapping label UI -> valeur ENUM dans Postgres (kyc_doc_type)
const KYC_DOC_ENUM = {
  Passport: "passport",
  "Driving license": "driving_license",
  "National ID card": "national_id",
};

// Types de proof of address affichés dans l’UI
const POA_DOC_TYPES = [
  "Utility bill (water / electricity)",
  "Bank statement",
  "Phone / Internet bill",
  "Rental agreement",
  "Tax notice",
];

// Mapping label UI -> valeur ENUM pour doc_type dans proof_of_address
const POA_DOC_TYPE_DB_MAP = {
  "Utility bill (water / electricity)": "utility_bill",
  "Bank statement": "bank_statement",
  "Phone / Internet bill": "phone_or_internet_bill",
  "Rental agreement": "rental_agreement",
  "Tax notice": "tax_notice",
};

function sanitizeFileName(name) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
}

function supaErrMessage(err) {
  if (!err) return "";
  return err.message || err.error_description || String(err);
}

export default function OnboardingClient() {
  const router = useRouter();

  /**
   * Étapes:
   * 1 = profil
   * 4 = adresse
   * 5 = KYC identité
   * 6 = KYC proof of address
   * (0 est géré par /get-started)
   *
   * ✅ Step 2/3 (téléphone/OTP) supprimés.
   */
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [userId, setUserId] = useState(null);

  // Step 1 — profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");

  // Step 4 — address
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Step 5 — KYC identity
  const [idDocType, setIdDocType] = useState("Passport");
  const [idFrontFile, setIdFrontFile] = useState(null);
  const [idBackFile, setIdBackFile] = useState(null);

  // Step 6 — Proof of address
  const [poaDocType, setPoaDocType] = useState(
    "Utility bill (water / electricity)"
  );
  const [poaFile, setPoaFile] = useState(null);

  // -------------------------
  // Load session + pre-fill + read onboarding_state
  // -------------------------
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      setOk("");

      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();

      if (sessionErr) {
        setError(supaErrMessage(sessionErr) || "Unable to get session.");
        setLoading(false);
        return;
      }

      const session = sessionData?.session;
      if (!session?.user) {
        router.replace("/login");
        return;
      }

      const uid = session.user.id;
      setUserId(uid);

      // 1) Charger profil
      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("first_name, last_name, date_of_birth")
        .eq("id", uid)
        .maybeSingle();

      if (profErr && profErr.code !== "PGRST116") {
        setError(supaErrMessage(profErr) || "Unable to load profile.");
        setLoading(false);
        return;
      }

      if (profile) {
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setDob(profile.date_of_birth || "");
      }

      // 2) Lire l'état d'onboarding
      const { data: onboard, error: onboardErr } = await supabase
        .from("onboarding_state")
        .select("current_step")
        .eq("user_id", uid)
        .maybeSingle();

      if (!onboardErr && onboard?.current_step != null) {
        // current_step = 0 => /get-started
        if (onboard.current_step === 0) {
          setLoading(false);
          router.replace("/get-started");
          return;
        }

        // ✅ Migration: si quelqu’un est bloqué sur 2/3, on le passe à 4 (Address)
        if (onboard.current_step === 2 || onboard.current_step === 3) {
          await supabase.from("onboarding_state").upsert(
            { user_id: uid, current_step: 4, completed: false },
            { onConflict: "user_id" }
          );
          setStep(4);
        } else {
          setStep(onboard.current_step);
        }
      } else {
        setStep(1);
      }

      setLoading(false);
    })();
  }, [router]);

  // Small helper
  async function updateOnboardingStep(nextStep, completed = false) {
    if (!userId) {
      setStep(nextStep);
      return;
    }
    const { error: stErr } = await supabase.from("onboarding_state").upsert(
      {
        user_id: userId,
        current_step: nextStep,
        completed,
      },
      { onConflict: "user_id" }
    );

    if (stErr) {
      // pas bloquant, mais on log l'erreur
      console.error("updateOnboardingStep error:", stErr);
    }

    setStep(nextStep);
  }

  // -------------------------
  // Step 1 — Submit profile
  // -------------------------
  async function handleProfileSubmit(e) {
    e.preventDefault();
    if (saving || !userId) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!firstName.trim() || !lastName.trim() || !dob.trim()) {
        throw new Error("Please fill in all fields.");
      }

      const { error: upsertErr } = await supabase.from("profiles").upsert(
        {
          id: userId,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          date_of_birth: dob.trim(),
        },
        { onConflict: "id" }
      );

      if (upsertErr) throw upsertErr;

      // ✅ Avant: step 2 (phone)
      // ✅ Maintenant: step 4 (address)
      await updateOnboardingStep(4, false);
    } catch (err) {
      setError(supaErrMessage(err) || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  // -------------------------
  // Step 4 — Save Address
  // -------------------------
  async function handleAddressSubmit(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (
        !addressLine.trim() ||
        !city.trim() ||
        !postalCode.trim() ||
        !country.trim()
      ) {
        throw new Error("Please fill in all fields.");
      }

      const { error: addrErr } = await supabase.from("addresses").insert({
        user_id: userId,
        address_line: addressLine.trim(),
        city: city.trim(),
        postal_code: postalCode.trim(),
        country: country.trim(),
      });

      if (addrErr) throw addrErr;

      await updateOnboardingStep(5, false);
    } catch (err) {
      setError(
        supaErrMessage(err) ||
          "Something went wrong while saving your address (check RLS/policies in Supabase)."
      );
    } finally {
      setSaving(false);
    }
  }

  // -------------------------
  // Step 5 — KYC Identity
  // -------------------------
  const isPassport = idDocType === "Passport";

  async function handleKycIdentitySubmit(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!idFrontFile) {
        throw new Error("Please upload the front side of your document.");
      }
      if (!isPassport && !idBackFile) {
        throw new Error("Please upload the back side of your document.");
      }

      const bucket = "kyc";

      // FRONT
      const safeFrontName = sanitizeFileName(idFrontFile.name);
      const frontPath = `identity/${userId}/front-${Date.now()}-${safeFrontName}`;

      const { error: upFrontErr } = await supabase.storage
        .from(bucket)
        .upload(frontPath, idFrontFile, { upsert: true });

      if (upFrontErr) throw upFrontErr;

      let backPath = null;

      if (!isPassport) {
        const safeBackName = sanitizeFileName(idBackFile.name);
        backPath = `identity/${userId}/back-${Date.now()}-${safeBackName}`;

        const { error: upBackErr } = await supabase.storage
          .from(bucket)
          .upload(backPath, idBackFile, { upsert: true });

        if (upBackErr) throw upBackErr;
      }

      const docTypeDb = KYC_DOC_ENUM[idDocType];

      // ✅ IMPORTANT : bonne table = kyc_identities (pluriel)
      const { error: kycErr } = await supabase.from("kyc_identities").upsert(
        {
          user_id: userId,
          doc_type: docTypeDb,
          front_url: frontPath,
          back_url: backPath,
          status: "pending",
        },
        { onConflict: "user_id" }
      );

      if (kycErr) throw kycErr;

      await updateOnboardingStep(6, false);
      setOk("Your identity document has been submitted.");
    } catch (err) {
      setError(supaErrMessage(err) || "Something went wrong while uploading your ID.");
    } finally {
      setSaving(false);
    }
  }

  // -------------------------
  // Step 6 — Proof of Address
  // -------------------------
  async function handlePoaSubmit(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!poaFile) throw new Error("Please upload your document.");

      const bucket = "kyc";
      const safeName = sanitizeFileName(poaFile.name);
      const poaPath = `proof_of_address/${userId}/${Date.now()}-${safeName}`;

      const { error: upErr } = await supabase.storage
        .from(bucket)
        .upload(poaPath, poaFile, { upsert: true });

      if (upErr) throw upErr;

      const docTypeDb = POA_DOC_TYPE_DB_MAP[poaDocType];

      const { error: poaErr } = await supabase.from("proof_of_address").upsert(
        {
          user_id: userId,
          doc_type: docTypeDb,
          file_url: poaPath,
          status: "pending",
        },
        { onConflict: "user_id" }
      );

      if (poaErr) throw poaErr;

      // On passe à l'étape "contrat"
      await updateOnboardingStep(7, false);
      setOk("Your proof of address has been submitted.");
      router.push("/contract/ready");
    } catch (err) {
      setError(
        supaErrMessage(err) ||
          "Something went wrong while uploading your proof of address."
      );
    } finally {
      setSaving(false);
    }
  }

  // -------------------------
  // Simple Dropzone component
  // -------------------------
  function FileDropzone({ label, file, onFileChange, required }) {
    return (
      <div>
        {label && (
          <div className="mb-1 text-xs text-slate-400">
            {label} {required && <span className="text-rose-400">*</span>}
          </div>
        )}
        <label className="block border border-dashed border-slate-600/70 rounded-xl px-4 py-6 text-center text-sm text-slate-400 hover:border-slate-300 hover:bg-slate-900/40 cursor-pointer transition">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) onFileChange(f);
            }}
          />
          {file ? (
            <span className="text-slate-100">{file.name}</span>
          ) : (
            <>
              <div>Drag &amp; drop image here</div>
              <div className="text-xs text-slate-500 mt-1">or click to browse</div>
            </>
          )}
        </label>
      </div>
    );
  }

  // -------------------------
  // RENDER
  // -------------------------
  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Welcome</h1>
          <p className="text-slate-400">Loading your profile…</p>
        </div>
      </div>
    );
  }

  // STEP 1 — PROFILE
  if (step === 1) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Welcome</h1>
          <p className="text-slate-400 mb-8">
            Choose how you’d like to be addressed.
          </p>

          {error && (
            <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">First name</label>
              <input
                type="text"
                className="mc-input"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Last name</label>
              <input
                type="text"
                className="mc-input"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm">Date of birth</label>
              <input
                type="text"
                className="mc-input"
                placeholder="YYYY-MM-DD"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="mc-btn mc-btn-primary mt-4"
              disabled={saving}
            >
              {saving ? "Saving…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // STEP 4 — ADDRESS
  if (step === 4) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Address</h1>
          <p className="text-slate-400 mb-8">Tell us where you currently live.</p>

          {error && (
            <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleAddressSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">Address</label>
              <input
                type="text"
                className="mc-input"
                value={addressLine}
                onChange={(e) => setAddressLine(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block mb-2 text-sm">City</label>
                <input
                  type="text"
                  className="mc-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="w-40">
                <label className="block mb-2 text-sm">Postal code</label>
                <input
                  type="text"
                  className="mc-input"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm">Country</label>
              <input
                type="text"
                className="mc-input"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="mc-btn mc-btn-primary mt-4"
              disabled={saving}
            >
              {saving ? "Saving…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // STEP 5 — KYC IDENTITY
  if (step === 5) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">KYC (Identity)</h1>
          <p className="text-slate-400 mb-8">
            Select an ID document and upload the required images.
          </p>

          {error && (
            <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
              {error}
            </div>
          )}
          {ok && (
            <div className="mb-4 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-3 py-2 rounded-lg">
              {ok}
            </div>
          )}

          <form onSubmit={handleKycIdentitySubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">Document type</label>
              <select
                className="mc-input"
                value={idDocType}
                onChange={(e) => {
                  setIdDocType(e.target.value);
                  setIdBackFile(null);
                }}
              >
                {ID_DOC_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <FileDropzone
              label="Front side (required)"
              file={idFrontFile}
              onFileChange={setIdFrontFile}
              required
            />

            {!isPassport && (
              <FileDropzone
                label="Back side (required)"
                file={idBackFile}
                onFileChange={setIdBackFile}
                required
              />
            )}

            <button
              type="submit"
              className="mc-btn mc-btn-primary mt-4"
              disabled={saving}
            >
              {saving ? "Saving…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // STEP 6 — PROOF OF ADDRESS
  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        <h1 className="mc-title mb-2">Proof of address</h1>
        <p className="text-slate-400 mb-8">
          Select one document and upload a copy.
        </p>

        {error && (
          <div className="mb-4 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
            {error}
          </div>
        )}
        {ok && (
          <div className="mb-4 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-3 py-2 rounded-lg">
            {ok}
          </div>
        )}

        <form onSubmit={handlePoaSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Document type</label>
            <select
              className="mc-input"
              value={poaDocType}
              onChange={(e) => setPoaDocType(e.target.value)}
            >
              {POA_DOC_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <FileDropzone
            label="Document (required)"
            file={poaFile}
            onFileChange={setPoaFile}
            required
          />

          <button
            type="submit"
            className="mc-btn mc-btn-primary mt-4"
            disabled={saving}
          >
            {saving ? "Saving…" : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
