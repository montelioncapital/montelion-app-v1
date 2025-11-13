"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function OnboardingClient() {
  const router = useRouter();

  // Step: 1 = profile, 2 = phone, 3 = otp, 4 = address, 5 = kyc identity, 6 = kyc address
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

  // Resend timer
  const [timer, setTimer] = useState(60);

  // Step 4 — address
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Step 5 — KYC Identity
  const [kycDocType, setKycDocType] = useState("passport");
  const [kycFrontFile, setKycFrontFile] = useState(null);
  const [kycBackFile, setKycBackFile] = useState(null);

  // Step 6 — Proof of address
  const [poaDocType, setPoaDocType] = useState("utility_bill");
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

      const { error: onboardErr } = await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 2,
          completed: false,
        },
        { onConflict: "user_id" }
      );
      if (onboardErr) throw onboardErr;

      setStep(2);
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

      const { error: onboardErr } = await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 3,
          completed: false,
        },
        { onConflict: "user_id" }
      );
      if (onboardErr) throw onboardErr;

      setTimer(60);
      setStep(3);
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

      const { error: onboardErr } = await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 4, // next: address
          completed: false,
        },
        { onConflict: "user_id" }
      );
      if (onboardErr) throw onboardErr;

      setOk("Your phone number has been verified.");
      setStep(4);
    } catch (err) {
      setError(err.message || "Something went wrong while verifying the code.");
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

      // ➜ Go to KYC Identity (step 5)
      const { error: onboardErr } = await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 5,
          completed: false,
        },
        { onConflict: "user_id" }
      );
      if (onboardErr) throw onboardErr;

      setOk("Your address has been saved.");
      setStep(5);
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
  // Step 5 — Save KYC Identity
  // -------------------------
  async function handleKycIdentitySubmit(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!kycDocType || !kycFrontFile) {
        throw new Error("Please select a document and upload the front side.");
      }

      const { error: kycErr } = await supabase.from("kyc_identities").insert({
        user_id: userId,
        document_type: kycDocType, // e.g. passport / driving_license / national_id
        front_file_name: kycFrontFile.name || null,
        back_file_name: kycBackFile ? kycBackFile.name : null,
        status: "submitted",
      });

      if (kycErr) throw kycErr;

      const { error: onboardErr } = await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 6, // next: proof of address
          completed: false,
        },
        { onConflict: "user_id" }
      );
      if (onboardErr) throw onboardErr;

      setOk("Your identity document has been submitted.");
      setStep(6);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while saving your identity document."
      );
    } finally {
      setSaving(false);
    }
  }

  // -------------------------
  // Step 6 — Save Proof of Address
  // -------------------------
  async function handleProofOfAddressSubmit(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!poaDocType || !poaFile) {
        throw new Error("Please select a document and upload a file.");
      }

      const { error: poaErr } = await supabase.from("proof_of_address").insert({
        user_id: userId,
        document_type: poaDocType, // e.g. utility_bill / bank_statement / etc.
        file_name: poaFile.name || null,
        status: "submitted",
      });

      if (poaErr) throw poaErr;

      const { error: onboardErr } = await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 6,
          completed: true,
        },
        { onConflict: "user_id" }
      );
      if (onboardErr) throw onboardErr;

      setOk("Your proof of address has been submitted.");
      // On reste sur cette page pour l’instant, la page suivante sera faite plus tard
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while saving your proof of address."
      );
    } finally {
      setSaving(false);
    }
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
          {ok && (
            <div className="mb-4 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-3 py-2 rounded-lg">
              {ok}
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
                value={kycDocType}
                onChange={(e) => setKycDocType(e.target.value)}
              >
                <option value="passport">Passport</option>
                <option value="driving_license">Driving license</option>
                <option value="national_id">National ID card</option>
              </select>
            </div>

            {/* Front side */}
            <div>
              <label className="block mb-2 text-sm">
                Front side (required)
              </label>
              <label
                htmlFor="kyc-front"
                className="mc-input flex flex-col items-center justify-center border-dashed border border-slate-600 cursor-pointer text-sm text-slate-400 py-6"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) setKycFrontFile(file);
                }}
              >
                {kycFrontFile ? (
                  <span className="text-slate-100">
                    {kycFrontFile.name}
                  </span>
                ) : (
                  <>
                    <span>Drag & drop image here</span>
                    <span className="text-xs text-slate-500">
                      or click to browse
                    </span>
                  </>
                )}
              </label>
              <input
                id="kyc-front"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setKycFrontFile(file);
                }}
              />
            </div>

            {/* Back side (optional, depending on document) */}
            <div>
              <label className="block mb-2 text-sm">
                Back side (optional)
              </label>
              <label
                htmlFor="kyc-back"
                className="mc-input flex flex-col items-center justify-center border-dashed border border-slate-600 cursor-pointer text-sm text-slate-400 py-6"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) setKycBackFile(file);
                }}
              >
                {kycBackFile ? (
                  <span className="text-slate-100">
                    {kycBackFile.name}
                  </span>
                ) : (
                  <>
                    <span>Drag & drop image here</span>
                    <span className="text-xs text-slate-500">
                      or click to browse
                    </span>
                  </>
                )}
              </label>
              <input
                id="kyc-back"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setKycBackFile(file);
                }}
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

        <form onSubmit={handleProofOfAddressSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Document type</label>
            <select
              className="mc-input"
              value={poaDocType}
              onChange={(e) => setPoaDocType(e.target.value)}
            >
              <option value="utility_bill">
                Utility bill (water / electricity)
              </option>
              <option value="bank_statement">Bank statement</option>
              <option value="phone_internet_bill">Phone / Internet bill</option>
              <option value="rental_agreement">Rental agreement</option>
              <option value="tax_notice">Tax notice</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">Document file</label>
            <label
              htmlFor="poa-file"
              className="mc-input flex flex-col items-center justify-center border-dashed border border-slate-600 cursor-pointer text-sm text-slate-400 py-6"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) setPoaFile(file);
              }}
            >
              {poaFile ? (
                <span className="text-slate-100">{poaFile.name}</span>
              ) : (
                <>
                  <span>Drag & drop file here</span>
                  <span className="text-xs text-slate-500">
                    or click to browse
                  </span>
                </>
              )}
            </label>
            <input
              id="poa-file"
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPoaFile(file);
              }}
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
