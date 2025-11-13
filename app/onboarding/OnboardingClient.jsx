"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

const ID_DOC_TYPES = ["Passport", "Driving license", "National ID card"];

const POA_DOC_TYPES = [
  "Utility bill (water / electricity)",
  "Bank statement",
  "Phone / Internet bill",
  "Rental agreement",
  "Tax notice",
];

export default function OnboardingClient() {
  const router = useRouter();

  // 1 = profile, 2 = phone, 3 = otp, 4 = address, 5 = kyc identity, 6 = kyc proof of address
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

  // Step 2 — phone
  const [dialCode, setDialCode] = useState("+33");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [phoneE164, setPhoneE164] = useState("");
  const [sendingCode, setSendingCode] = useState(false);

  // Step 3 — OTP
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [timer, setTimer] = useState(60);

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

  const DIAL_CODES = [
    "+1",
    "+44",
    "+33",
    "+49",
    "+39",
    "+34",
    "+31",
    "+46",
    "+41",
    "+81",
    "+82",
    "+86",
    "+91",
    "+55",
    "+52",
    "+61",
    "+7",
    "+27",
    "+65",
    "+971",
  ];

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
        setError(sessionErr.message || "Unable to get session.");
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
        .select("first_name, last_name, date_of_birth, phone_e164")
        .eq("id", uid)
        .maybeSingle();

      if (profErr && profErr.code !== "PGRST116") {
        setError(profErr.message || "Unable to load profile.");
        setLoading(false);
        return;
      }

      if (profile) {
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setDob(profile.date_of_birth || "");
        if (profile.phone_e164) {
          setPhoneE164(profile.phone_e164);
        }
      }

      // 2) Lire l'état d'onboarding
      const { data: onboard, error: onboardErr } = await supabase
        .from("onboarding_state")
        .select("current_step")
        .eq("user_id", uid)
        .maybeSingle();

      if (!onboardErr && onboard?.current_step) {
        setStep(onboard.current_step);
      } else {
        setStep(1);
      }

      setLoading(false);
    })();
  }, [router]);

  // -------------------------
  // OTP timer countdown
  // -------------------------
  useEffect(() => {
    if (step !== 3) return;
    if (timer <= 0) return;

    const t = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(t);
  }, [step, timer]);

  // Small helper
  async function updateOnboardingStep(nextStep, completed = false) {
    if (!userId) return;
    await supabase.from("onboarding_state").upsert(
      {
        user_id: userId,
        current_step: nextStep,
        completed,
      },
      { onConflict: "user_id" }
    );
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

      await updateOnboardingStep(2, false);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  // -------------------------
  // Step 2 — Send code SMS
  // -------------------------
  async function handleSendCode(e) {
    e.preventDefault();
    if (sendingCode || !userId) return;

    setError("");
    setOk("");
    setSendingCode(true);

    try {
      const local = phoneLocal.replace(/\D/g, "");
      if (!local) throw new Error("Please enter your mobile number.");

      const full = `${dialCode}${local}`;
      setPhoneE164(full);

      await supabase.from("phone_verifications").insert({
        user_id: userId,
        phone_e164: full,
        status: "code_sent",
      });

      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: full }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send code.");

      setOk("A verification code has been sent by SMS.");

      await updateOnboardingStep(3, false);
      setTimer(60);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSendingCode(false);
    }
  }

  // -------------------------
  // Step 3 — Verify OTP
  // -------------------------
  async function handleVerifyCode(e) {
    e.preventDefault();
    if (verifying || !userId) return;

    setError("");
    setOk("");
    setVerifying(true);

    try {
      if (!/^\d{6}$/.test(otp)) throw new Error("Please enter a 6-digit code.");

      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneE164, code: otp }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Invalid or expired code.");

      await supabase
        .from("phone_verifications")
        .update({ status: "verified" })
        .eq("phone_e164", phoneE164);

      await supabase
        .from("profiles")
        .update({
          phone_e164: phoneE164,
          phone_verified_at: new Date().toISOString(),
        })
        .eq("id", userId);

      setOk("Your phone number has been verified.");
      await updateOnboardingStep(4, false);
    } catch (err) {
      setError(
        err.message || "Something went wrong while verifying the code."
      );
    } finally {
      setVerifying(false);
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
        err.message ||
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
      let frontPath = null;
      let backPath = null;

      // FRONT
      const safeFrontName = sanitizeFileName(idFrontFile.name);
      frontPath = `identity/${userId}/front-${Date.now()}-${safeFrontName}`;

      const { error: frontUploadErr } = await supabase.storage
        .from(bucket)
        .upload(frontPath, idFrontFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (frontUploadErr) throw frontUploadErr;

      // BACK (only if non-passport)
      if (!isPassport && idBackFile) {
        const safeBackName = sanitizeFileName(idBackFile.name);
        backPath = `identity/${userId}/back-${Date.now()}-${safeBackName}`;

        const { error: backUploadErr } = await supabase.storage
          .from(bucket)
          .upload(backPath, idBackFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (backUploadErr) throw backUploadErr;
      }
      
let backPath: string | null = null;
      // Enregistrer en DB dans kyc_identities
      const payload: any = {
        user_id: userId,
        doc_type: idDocType,   // ⚠️ colonne Supabase = doc_type
        front_url: frontPath,  // ⚠️ colonne Supabase = front_url
        status: "submitted",
      };

      // Pour permis / CNI on a aussi un verso
      if (!isPassport && backPath) {
        payload.back_url = backPath; // ⚠️ colonne Supabase = back_url
      }

      const { error: kycErr } = await supabase
        .from("kyc_identities")
        .upsert(payload, { onConflict: "user_id" });

      if (kycErr) throw kycErr;

      await updateOnboardingStep(6, false);
    } catch (err: any) {
      setError(
        err.message ||
          "Something went wrong while uploading your identity document."
      );
    } finally {
      setSaving(false);
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
      if (!poaFile) {
        throw new Error("Please upload a proof of address document.");
      }

      const bucket = "kyc";
      const safePoaName = sanitizeFileName(poaFile.name);
      const poaPath = `proof-of-address/${userId}/${Date.now()}-${safePoaName}`;

      const { error: poaUploadErr } = await supabase.storage
        .from(bucket)
        .upload(poaPath, poaFile, {
          cacheControl: "3600",
          upsert: false,
        });

      if (poaUploadErr) throw poaUploadErr;

      const { error: poaErr } = await supabase
        .from("proof_of_address")
        .upsert(
          {
            user_id: userId,
            document_type: poaDocType,
            file_path: poaPath,
            status: "submitted",
          },
          { onConflict: "user_id" }
        );

      if (poaErr) throw poaErr;

      await updateOnboardingStep(6, true);
      setOk("Your KYC documents have been submitted.");
      // plus tard: router.push("/dashboard") par ex
    } catch (err) {
      setError(
        err.message ||
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
              <div className="text-xs text-slate-500 mt-1">
                or click to browse
              </div>
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

  // STEP 2 — PHONE NUMBER
  if (step === 2) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Enter your mobile number</h1>
          <p className="text-slate-400 mb-8">
            We’ll send you a 6-digit verification code to confirm your account.
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

          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">Mobile number</label>

              <div className="flex gap-2">
                <div className="relative w-24">
                  <select
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  >
                    {DIAL_CODES.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>

                  <div className="mc-input w-full h-full flex items-center justify-center gap-1">
                    <span>{dialCode}</span>
                    <span className="text-[9px] leading-none">▼</span>
                  </div>
                </div>

                <input
                  type="tel"
                  className="mc-input flex-1"
                  placeholder="Your mobile number"
                  value={phoneLocal}
                  onChange={(e) => setPhoneLocal(e.target.value)}
                  required
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Enter your full mobile number without spaces.
              </p>
            </div>

            <button
              type="submit"
              className="mc-btn mc-btn-primary mt-4"
              disabled={sendingCode}
            >
              {sendingCode ? "Sending…" : "Send OTP"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // STEP 3 — OTP
  if (step === 3) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Enter 6-digit verification code</h1>
          <p className="text-slate-400 mb-8">
            Please enter the 6-digit code we sent to{" "}
            <span className="font-medium text-slate-100">
              {phoneE164 || `${dialCode}${phoneLocal}`}
            </span>
            .
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

          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">6-digit code</label>
              <input
                type="text"
                className="mc-input tracking-[0.3em] text-center"
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                required
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className="mc-btn mc-btn-primary"
                disabled={verifying}
              >
                {verifying ? "Verifying…" : "Verify"}
              </button>

              <button
                type="button"
                disabled={timer > 0}
                onClick={() => {
                  setStep(2);
                }}
                className={`mc-btn border text-sm ${
                  timer > 0
                    ? "border-slate-700 text-slate-600 cursor-not-allowed bg-transparent"
                    : "border-slate-500 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {timer > 0 ? `Resend code in ${timer}s` : "Resend code"}
              </button>
            </div>
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
          <p className="text-slate-400 mb-8">
            Tell us where you currently live.
          </p>

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

            {/* Back side only for non-passport */}
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
            {saving ? "Submitting…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---------- filename sanitizer (no TS types here) ----------
function sanitizeFileName(name) {
  return (
    name
      // enlever les accents
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      // garder uniquement lettres / chiffres / . - _
      .replace(/[^a-zA-Z0-9.\-_]/g, "_")
  );
}
