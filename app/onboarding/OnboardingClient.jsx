"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function OnboardingClient() {
  const router = useRouter();

  // Steps:
  // 1 = profile
  // 2 = phone number (send code)
  // 3 = OTP verification
  // 4 = address
  // 5 = KYC identity
  // 6 = proof of address (last step for now)
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
  const [otpStatus, setOtpStatus] = useState("idle"); // idle | checking | valid | invalid
  const [verifying, setVerifying] = useState(false);

  // Resend timer
  const [timer, setTimer] = useState(60);

  // Step 4 — address
  const [addressLine1, setAddressLine1] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [savingAddress, setSavingAddress] = useState(false);

  // Step 5 — KYC identity
  const [kycDocType, setKycDocType] = useState("passport");
  const [kycSaving, setKycSaving] = useState(false);
  const [kycFrontFileName, setKycFrontFileName] = useState("");
  const [kycBackFileName, setKycBackFileName] = useState("");

  // Step 6 — Proof of address
  const [proofDocType, setProofDocType] = useState("utility_bill");
  const [proofSaving, setProofSaving] = useState(false);
  const [proofFileName, setProofFileName] = useState("");

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
  // Load session + pre-fill profile (and basic address if needed)
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

      // Profile
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

      // Address (optional prefill if exists)
      const { data: address } = await supabase
        .from("addresses")
        .select("line1, city, postal_code, country")
        .eq("user_id", uid)
        .maybeSingle();

      if (address) {
        setAddressLine1(address.line1 || "");
        setCity(address.city || "");
        setPostalCode(address.postal_code || "");
        setCountry(address.country || "");
      }

      // Onboarding state (to restore step later if needed)
      const { data: onboarding } = await supabase
        .from("onboarding_state")
        .select("current_step, completed")
        .eq("user_id", uid)
        .maybeSingle();

      if (onboarding && !onboarding.completed) {
        setStep(onboarding.current_step || 1);
      }

      setLoading(false);
    })();
  }, [router]);

  // Helper: update onboarding_state
  async function updateOnboardingStep(nextStep, completed = false) {
    if (!userId) return;
    await supabase
      .from("onboarding_state")
      .upsert(
        {
          user_id: userId,
          current_step: nextStep,
          completed,
        },
        { onConflict: "user_id" }
      );
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

      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: full, userId }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send code.");

      // Keep track of verification attempt
      await supabase.from("phone_verifications").insert({
        user_id: userId,
        phone_e164: full,
        status: "code_sent",
      });

      await updateOnboardingStep(3, false);
      setStep(3);
      setTimer(60);
      setOtp("");
      setOtpStatus("idle");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSendingCode(false);
    }
  }

  // -------------------------
  // Step 3 — Verify OTP (auto when 6 digits)
  // -------------------------
  useEffect(() => {
    // Only run on OTP step
    if (step !== 3) return;

    // Reset status while typing
    if (otp.length < 6) {
      setOtpStatus("idle");
      return;
    }

    if (otp.length === 6) {
      verifyOtpCode(otp);
    }
  }, [otp, step]); // eslint-disable-line react-hooks/exhaustive-deps

  async function verifyOtpCode(code) {
    if (verifying || !userId || !phoneE164) return;

    setError("");
    setOk("");
    setVerifying(true);
    setOtpStatus("checking");

    try {
      if (!/^\d{6}$/.test(code)) {
        throw new Error("Please enter the 6-digit code.");
      }

      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneE164, code }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setOtpStatus("invalid");
        throw new Error(data.error || "Invalid or expired code.");
      }

      // Mark as verified in phone_verifications
      await supabase.from("phone_verifications").insert({
        user_id: userId,
        phone_e164: phoneE164,
        status: "verified",
      });

      // Update profile with phone and verified timestamp
      await supabase
        .from("profiles")
        .update({
          phone_e164: phoneE164,
          phone_verified_at: new Date().toISOString(),
        })
        .eq("id", userId);

      await updateOnboardingStep(3, false);
      setOtpStatus("valid");
      setOk("Phone number verified.");
    } catch (err) {
      setError(err.message || "Something went wrong while verifying the code.");
    } finally {
      setVerifying(false);
    }
  }

  // User clicks "Continue" after OTP is valid
  async function handleOtpContinue() {
    if (otpStatus !== "valid" || !userId) return;
    setError("");
    setOk("");

    await updateOnboardingStep(4, false);
    setStep(4);
  }

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
  // Step 4 — Address
  // -------------------------
  async function handleAddressSubmit(e) {
    e.preventDefault();
    if (!userId || savingAddress) return;

    setError("");
    setOk("");
    setSavingAddress(true);

    try {
      if (!addressLine1.trim() || !city.trim() || !postalCode.trim() || !country.trim()) {
        throw new Error("Please fill in all address fields.");
      }

      const { error: addrErr } = await supabase.from("addresses").upsert(
        {
          user_id: userId,
          line1: addressLine1.trim(),
          city: city.trim(),
          postal_code: postalCode.trim(),
          country: country.trim(),
        },
        { onConflict: "user_id" }
      );

      if (addrErr) throw addrErr;

      await updateOnboardingStep(5, false);
      setStep(5);
    } catch (err) {
      setError(err.message || "Something went wrong while saving address.");
    } finally {
      setSavingAddress(false);
    }
  }

  // -------------------------
  // Step 5 — KYC Identity
  // -------------------------
  async function handleKycSubmit(e) {
    e.preventDefault();
    if (!userId || kycSaving) return;

    setError("");
    setOk("");
    setKycSaving(true);

    try {
      if (!kycDocType) {
        throw new Error("Please select an identity document.");
      }

      // For now we only store metadata (document_type, status).
      const { error: kycErr } = await supabase.from("kyc_identities").upsert(
        {
          user_id: userId,
          document_type: kycDocType,
          status: "pending",
        },
        { onConflict: "user_id" }
      );

      if (kycErr) throw kycErr;

      await updateOnboardingStep(6, false);
      setStep(6);
    } catch (err) {
      setError(err.message || "Something went wrong while saving identity.");
    } finally {
      setKycSaving(false);
    }
  }

  // -------------------------
  // Step 6 — Proof of address
  // -------------------------
  async function handleProofSubmit(e) {
    e.preventDefault();
    if (!userId || proofSaving) return;

    setError("");
    setOk("");
    setProofSaving(true);

    try {
      if (!proofDocType) {
        throw new Error("Please select a proof-of-address document.");
      }

      const { error: proofErr } = await supabase.from("proof_of_address").upsert(
        {
          user_id: userId,
          document_type: proofDocType,
          status: "pending",
        },
        { onConflict: "user_id" }
      );

      if (proofErr) throw proofErr;

      await updateOnboardingStep(7, true);
      setOk("Onboarding completed (we'll review your documents).");
      // No redirect yet: next page will be built later.
    } catch (err) {
      setError(err.message || "Something went wrong while saving proof.");
    } finally {
      setProofSaving(false);
    }
  }

  // =====================================================================================
  // RENDER
  // =====================================================================================

  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">Loading…</div>
      </div>
    );
  }

  // -------------------------
  // Step 1 : PROFILE
  // -------------------------
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

  // -------------------------
  // Step 2 : PHONE NUMBER
  // -------------------------
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

          <form onSubmit={handleSendCode} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">Mobile number</label>

              <div className="flex gap-2">
                {/* Dial code selector – same height as input */}
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

  // -------------------------
  // Step 3 : OTP
  // -------------------------
  if (step === 3) {
    const baseOtpClasses = "mc-input tracking-[0.3em] text-center";
    const otpVariantClasses =
      otpStatus === "valid"
        ? " border-emerald-500/70 bg-emerald-500/10"
        : otpStatus === "invalid"
        ? " border-rose-500/70 bg-rose-500/10"
        : "";

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

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">6-digit code</label>
              <input
                type="text"
                className={baseOtpClasses + otpVariantClasses}
                placeholder="••••••"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                required
                autoComplete="one-time-code"
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="button"
                className="mc-btn mc-btn-primary"
                disabled={otpStatus !== "valid"}
                onClick={handleOtpContinue}
              >
                {otpStatus === "checking" || verifying
                  ? "Checking…"
                  : "Continue"}
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

  // -------------------------
  // Step 4 : ADDRESS
  // -------------------------
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
                placeholder="Street and number"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
                required
              />
            </div>

            <div className="flex gap-3">
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
              disabled={savingAddress}
            >
              {savingAddress ? "Saving…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------
  // Step 5 : KYC IDENTITY
  // -------------------------
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

          <form onSubmit={handleKycSubmit} className="space-y-6">
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

            <div className="space-y-3">
              <label className="block mb-1 text-sm">
                Front side (drag &amp; drop)
              </label>
              <div
                className="mc-input flex h-32 items-center justify-center border-dashed border-slate-700 cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) setKycFrontFileName(file.name);
                }}
              >
                {kycFrontFileName || "Drop front image here or click to select"}
              </div>

              <label className="block mb-1 text-sm">
                Back side (drag &amp; drop)
              </label>
              <div
                className="mc-input flex h-32 items-center justify-center border-dashed border-slate-700 cursor-pointer"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) setKycBackFileName(file.name);
                }}
              >
                {kycBackFileName || "Drop back image here or click to select"}
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Upload clear photos of your document. We’ll review and confirm
                your identity.
              </p>
            </div>

            <button
              type="submit"
              className="mc-btn mc-btn-primary mt-4"
              disabled={kycSaving}
            >
              {kycSaving ? "Saving…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------
  // Step 6 : PROOF OF ADDRESS
  // -------------------------
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

        <form onSubmit={handleProofSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm">Document type</label>
            <select
              className="mc-input"
              value={proofDocType}
              onChange={(e) => setProofDocType(e.target.value)}
            >
              <option value="utility_bill">Utility bill (water / electricity)</option>
              <option value="bank_statement">Bank statement</option>
              <option value="phone_internet_bill">Phone / Internet bill</option>
              <option value="rental_agreement">Rental agreement</option>
              <option value="tax_notice">Tax notice</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="block mb-1 text-sm">Document file</label>
            <div
              className="mc-input flex h-32 items-center justify-center border-dashed border-slate-700 cursor-pointer"
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const file = e.dataTransfer.files?.[0];
                if (file) setProofFileName(file.name);
              }}
            >
              {proofFileName || "Drop your document here or click to select"}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              The document must clearly show your full name, address, and date.
            </p>
          </div>

          <button
            type="submit"
            className="mc-btn mc-btn-primary mt-4"
            disabled={proofSaving}
          >
            {proofSaving ? "Saving…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
