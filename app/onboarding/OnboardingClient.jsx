"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function OnboardingClient() {
  const router = useRouter();

  // Steps:
  // 1 = profile
  // 2 = phone
  // 3 = otp
  // 4 = address
  // 5 = kyc identity
  // 6 = proof of address
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
  const [otpStatus, setOtpStatus] = useState(""); // "", "success", "error"

  // Resend timer
  const [timer, setTimer] = useState(60);

  // Step 4 — Address
  const [addressLine, setAddressLine] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // Step 5 — KYC Identity
  const [kycDocType, setKycDocType] = useState("passport");
  const [kycFrontFile, setKycFrontFile] = useState(null);
  const [kycBackFile, setKycBackFile] = useState(null);
  const [uploadingKyc, setUploadingKyc] = useState(false);

  // Step 6 — Proof of address
  const [poaDocType, setPoaDocType] = useState("utility_bill");
  const [poaFile, setPoaFile] = useState(null);
  const [uploadingPoa, setUploadingPoa] = useState(false);

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
  // Load session + pre-fill profile
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

      if (!profErr && profile) {
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setDob(profile.date_of_birth || "");
        if (profile.phone_e164) setPhoneE164(profile.phone_e164);
      }

      setLoading(false);
    })();
  }, [router]);

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

      await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 2,
          completed: false,
        },
        { onConflict: "user_id" }
      );

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
        body: JSON.stringify({ phone: full }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to send code.");

      // Log sending in phone_verifications
      await supabase.from("phone_verifications").insert({
        user_id: userId,
        phone_e164: full,
        status: "code_sent",
      });

      await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 3,
          completed: false,
        },
        { onConflict: "user_id" }
      );

      setOtp("");
      setOtpStatus("");
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
    setOtpStatus("");

    try {
      if (!/^\d{6}$/.test(otp)) {
        setOtpStatus("error");
        throw new Error("Please enter the 6-digit code.");
      }

      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phoneE164, code: otp }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setOtpStatus("error");
        throw new Error(data.error || "Invalid or expired code.");
      }

      // Mark as verified in DB
      const nowIso = new Date().toISOString();

      await supabase
        .from("profiles")
        .update({
          phone_e164: phoneE164,
          phone_verified_at: nowIso,
        })
        .eq("id", userId);

      await supabase.from("phone_verifications").insert({
        user_id: userId,
        phone_e164: phoneE164,
        status: "verified",
      });

      await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 4,
          completed: false,
        },
        { onConflict: "user_id" }
      );

      setOtpStatus("success");

      // Petite pause pour voir le vert, puis étape Adresse
      setTimeout(() => {
        setStep(4);
        setOtpStatus("");
      }, 700);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setVerifying(false);
    }
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
  // Step 1 : PROFILE
  // -------------------------
  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">Loading…</div>
      </div>
    );
  }

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

            <button type="submit" className="mc-btn mc-btn-primary mt-4">
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
                {/* Dial code selector, same height as input */}
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
    const canSubmit = otp.length === 6 && !verifying;
    let otpClass =
      "mc-input tracking-[0.3em] text-center transition-colors duration-150";
    if (otpStatus === "success") {
      otpClass += " border-emerald-500/80 ring-emerald-500/40";
    } else if (otpStatus === "error") {
      otpClass += " border-rose-500/80 ring-rose-500/30";
    }

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

          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm">6-digit code</label>
              <input
                type="text"
                className={otpClass}
                placeholder="••••••"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ""));
                  setOtpStatus("");
                  setError("");
                }}
                maxLength={6}
                required
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                className={`mc-btn mc-btn-primary ${
                  !canSubmit ? "opacity-60 cursor-not-allowed" : ""
                }`}
                disabled={!canSubmit}
              >
                {verifying ? "Checking…" : "Continue"}
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
  async function handleAddressSubmit(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!addressLine.trim() || !city.trim() || !postalCode.trim() || !country.trim()) {
        throw new Error("Please fill in all fields.");
      }

      // IMPORTANT: colonne = address_line (pas line1)
      const { error: addrErr } = await supabase.from("addresses").insert({
        address_line: addressLine.trim(),
        city: city.trim(),
        postal_code: postalCode.trim(),
        country: country.trim(),
      });
      if (addrErr) throw addrErr;

      await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 5,
          completed: false,
        },
        { onConflict: "user_id" }
      );

      setStep(5);
    } catch (err) {
      setError(err.message || "Unable to save address.");
    } finally {
      setSaving(false);
    }
  }

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
  // Step 5 : KYC IDENTITY
  // -------------------------
  async function handleKycSubmit(e) {
    e.preventDefault();
    if (!userId || uploadingKyc) return;

    setError("");
    setOk("");
    setUploadingKyc(true);

    try {
      if (!kycFrontFile) {
        throw new Error("Please upload at least the front side of your document.");
      }

      // Ici on se contente d’appeler une API interne.
      // Cette API fera l’upload vers Supabase Storage + insertion dans kyc_identities.
      const formData = new FormData();
      formData.append("docType", kycDocType);
      formData.append("front", kycFrontFile);
      if (kycBackFile) formData.append("back", kycBackFile);

      const res = await fetch("/api/kyc/identity", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to upload identity.");

      await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 6,
          completed: false,
        },
        { onConflict: "user_id" }
      );

      setStep(6);
    } catch (err) {
      setError(err.message || "Something went wrong while uploading identity.");
    } finally {
      setUploadingKyc(false);
    }
  }

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
              <div>
                <label className="block mb-2 text-sm">Front side</label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setKycFrontFile(e.target.files?.[0] || null)}
                  className="mc-input cursor-pointer"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm">
                  Back side <span className="text-slate-500">(optional)</span>
                </label>
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) => setKycBackFile(e.target.files?.[0] || null)}
                  className="mc-input cursor-pointer"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mc-btn mc-btn-primary mt-4"
              disabled={uploadingKyc}
            >
              {uploadingKyc ? "Uploading…" : "Continue"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // -------------------------
  // Step 6 : PROOF OF ADDRESS
  // -------------------------
  async function handlePoaSubmit(e) {
    e.preventDefault();
    if (!userId || uploadingPoa) return;

    setError("");
    setOk("");
    setUploadingPoa(true);

    try {
      if (!poaFile) {
        throw new Error("Please upload a proof of address document.");
      }

      const formData = new FormData();
      formData.append("docType", poaDocType);
      formData.append("file", poaFile);

      const res = await fetch("/api/kyc/proof-of-address", {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Failed to upload proof of address.");

      await supabase.from("onboarding_state").upsert(
        {
          user_id: userId,
          current_step: 6,
          completed: true,
        },
        { onConflict: "user_id" }
      );

      setOk("Your onboarding information has been submitted.");
      // Pas de redirection vers le dashboard ici, on fera la page suivante plus tard.
    } catch (err) {
      setError(err.message || "Something went wrong while uploading the document.");
    } finally {
      setUploadingPoa(false);
    }
  }

  // Step 6 UI
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
              <option value="utility_bill">Utility bill (water / electricity)</option>
              <option value="bank_statement">Bank statement</option>
              <option value="phone_internet_bill">Phone / Internet bill</option>
              <option value="rental_agreement">Rental agreement</option>
              <option value="tax_notice">Tax notice</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm">Upload document</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={(e) => setPoaFile(e.target.files?.[0] || null)}
              className="mc-input cursor-pointer"
              required
            />
          </div>

          <button
            type="submit"
            className="mc-btn mc-btn-primary mt-4"
            disabled={uploadingPoa}
          >
            {uploadingPoa ? "Uploading…" : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
