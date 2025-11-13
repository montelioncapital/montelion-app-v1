"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

// Les indicatifs les plus utilisés (sans nom de pays)
const POPULAR_DIAL_CODES = [
  "+1",
  "+20",
  "+27",
  "+30",
  "+31",
  "+32",
  "+33",
  "+34",
  "+39",
  "+44",
  "+49",
  "+55",
  "+61",
  "+62",
  "+63",
  "+81",
  "+82",
  "+86",
  "+90",
  "+91",
];

export default function OnboardingClient() {
  const router = useRouter();

  // Step global :
  // 1 = profil
  // 2 = numéro de téléphone
  // 3 = saisie OTP
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  const [globalError, setGlobalError] = useState("");

  const [userId, setUserId] = useState(null);

  // ---- Profil (Step 1) ----
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // YYYY-MM-DD

  // ---- Téléphone (Step 2) ----
  const [dialCode, setDialCode] = useState("+33");
  const [phone, setPhone] = useState("");
  const [sendingCode, setSendingCode] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("");

  // ---- OTP (Step 3) ----
  const [otpCode, setOtpCode] = useState("");
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const [otpError, setOtpError] = useState("");

  // Timer pour le bouton "Resend code"
  const [resendTimer, setResendTimer] = useState(0); // en secondes

  // Charger la session + pré-remplir le profil / état d'onboarding
  useEffect(() => {
    (async () => {
      setLoading(true);
      setGlobalError("");

      const { data: sessionData, error: sessionErr } =
        await supabase.auth.getSession();

      if (sessionErr) {
        setGlobalError(sessionErr.message || "Unable to get session.");
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

      // Profil
      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select(
          "first_name, last_name, date_of_birth, phone_dial_code, phone_number"
        )
        .eq("id", uid)
        .maybeSingle();

      if (profErr && profErr.code !== "PGRST116") {
        console.error(profErr);
        setGlobalError(profErr.message || "Unable to load profile.");
        setLoading(false);
        return;
      }

      if (profile) {
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setDob(profile.date_of_birth || "");
        if (profile.phone_dial_code) setDialCode(profile.phone_dial_code);
        if (profile.phone_number) setPhone(profile.phone_number);
      }

      // Onboarding state (pour reprendre là où on en est)
      const { data: obState, error: obErr } = await supabase
        .from("onboarding_state")
        .select("current_step, completed")
        .eq("user_id", uid)
        .maybeSingle();

      if (!obErr && obState) {
        if (obState.completed) {
          // Tout est déjà ok → par exemple, rediriger vers le dashboard
          // router.replace("/");
        } else if (obState.current_step >= 3) {
          setStep(3);
        } else if (obState.current_step >= 2) {
          setStep(2);
        } else {
          setStep(1);
        }
      }

      setLoading(false);
    })();
  }, [router]);

  // Timer du bouton "Resend code"
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => {
      setResendTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

  // -----------------------------
  // Step 1 : sauver le profil
  // -----------------------------
  async function handleSubmitProfile(e) {
    e.preventDefault();
    if (!userId || savingProfile) return;

    setGlobalError("");
    setSavingProfile(true);

    try {
      if (!firstName.trim() || !lastName.trim() || !dob) {
        setGlobalError("Please fill in all fields.");
        setSavingProfile(false);
        return;
      }

      // Upsert profil
      const { error: upsertErr } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            date_of_birth: dob,
          },
          { onConflict: "id" }
        );

      if (upsertErr) throw upsertErr;

      // Onboarding : step 2
      const { error: onboardingErr } = await supabase
        .from("onboarding_state")
        .upsert(
          {
            user_id: userId,
            current_step: 2,
            completed: false,
          },
          { onConflict: "user_id" }
        );

      if (onboardingErr) throw onboardingErr;

      setStep(2);
    } catch (err) {
      console.error(err);
      setGlobalError(err.message || "Something went wrong, please try again.");
    } finally {
      setSavingProfile(false);
    }
  }

  // -----------------------------
  // Step 2 : envoyer le code SMS
  // -----------------------------
  function buildE164() {
    const digits = (phone || "").replace(/\D/g, "");
    const code = dialCode.replace(/[^\d+]/g, "");
    return `${code}${digits}`;
  }

  async function handleSendCode(e) {
    e.preventDefault();
    if (sendingCode) return;

    setGlobalError("");
    setPhoneMessage("");
    setOtpMessage("");
    setOtpError("");

    const digits = (phone || "").replace(/\D/g, "");
    if (!digits) {
      setGlobalError("Please enter your mobile number.");
      return;
    }

    const e164 = buildE164();
    setSendingCode(true);

    try {
      // Sauvegarder le téléphone dans le profil
      const { error: profErr } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            phone_dial_code: dialCode,
            phone_number: digits,
            phone_e164: e164,
          },
          { onConflict: "id" }
        );

      if (profErr) throw profErr;

      // Appel à notre route API pour Twilio
      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: e164 }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to send verification code.");
      }

      setPhoneMessage("A 6-digit verification code has been sent by SMS.");
      setStep(3);
      setResendTimer(60); // 60 secondes avant de pouvoir renvoyer
      setOtpCode("");
    } catch (err) {
      console.error(err);
      setGlobalError(err.message || "Failed to send verification code.");
    } finally {
      setSendingCode(false);
    }
  }

  // -----------------------------
  // Step 3 : vérifier le code
  // -----------------------------
  async function handleVerifyCode(e) {
    e.preventDefault();
    if (verifyingCode) return;

    setOtpError("");
    setOtpMessage("");
    setGlobalError("");

    const code = (otpCode || "").trim();
    if (!code || code.length !== 6) {
      setOtpError("Please enter the 6-digit code.");
      return;
    }

    const e164 = buildE164();
    setVerifyingCode(true);

    try {
      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: e164, code }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Invalid verification code.");
      }

      // Mise à jour onboarding : terminé
      const { error: obErr } = await supabase
        .from("onboarding_state")
        .upsert(
          {
            user_id: userId,
            current_step: 3,
            completed: true,
          },
          { onConflict: "user_id" }
        );

      if (obErr) throw obErr;

      setOtpMessage("Your phone number has been verified.");
      // Exemple : redirection vers / après quelques secondes
      // router.replace("/");
    } catch (err) {
      console.error(err);
      setOtpError(err.message || "Failed to verify code.");
    } finally {
      setVerifyingCode(false);
    }
  }

  async function handleResendCode() {
    if (resendTimer > 0 || sendingCode) return;
    // On réutilise la même logique que handleSendCode, mais sans changer de step
    setOtpError("");
    setOtpMessage("");
    setGlobalError("");

    const digits = (phone || "").replace(/\D/g, "");
    if (!digits) {
      setGlobalError("Please enter your mobile number.");
      setStep(2);
      return;
    }

    const e164 = buildE164();
    setSendingCode(true);

    try {
      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: e164 }),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to resend verification code.");
      }

      setOtpMessage("A new verification code has been sent by SMS.");
      setResendTimer(60);
    } catch (err) {
      console.error(err);
      setGlobalError(err.message || "Failed to resend verification code.");
    } finally {
      setSendingCode(false);
    }
  }

  // -----------------------------
  // Rendering
  // -----------------------------
  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <h1 className="mc-title mb-2">Onboarding</h1>
          <p className="text-slate-400">Loading your profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mc-card">
      <div className="mc-section text-left space-y-8">
        {/* Erreur globale */}
        {globalError && (
          <div className="mb-2 text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
            {globalError}
          </div>
        )}

        {step === 1 && (
          <>
            <div>
              <h1 className="mc-title mb-2">Welcome</h1>
              <p className="text-slate-400">
                Choose how you’d like to be addressed.
              </p>
            </div>

            <form onSubmit={handleSubmitProfile} className="space-y-6">
              {/* First name */}
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  First name
                </label>
                <input
                  type="text"
                  className="mc-input"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoComplete="given-name"
                  required
                />
              </div>

              {/* Last name */}
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  Last name
                </label>
                <input
                  type="text"
                  className="mc-input"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  autoComplete="family-name"
                  required
                />
              </div>

              {/* Date of birth */}
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  Date of birth
                </label>
                <input
                  type="date"
                  className="mc-input"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="mc-btn mc-btn-primary mt-4"
                disabled={savingProfile}
              >
                {savingProfile ? "Saving…" : "Continue"}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <h1 className="mc-title mb-2">Enter your mobile number</h1>
              <p className="text-slate-400">
                We’ll send you a 6-digit verification code to confirm your
                account.
              </p>
            </div>

            <form onSubmit={handleSendCode} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  Mobile number
                </label>
                <div className="flex gap-3">
                  {/* Sélecteur centré avec flèche custom */}
                  <div className="relative">
                    <select
                      className="mc-input w-24 pr-8 text-center appearance-none"
                      value={dialCode}
                      onChange={(e) => setDialCode(e.target.value)}
                    >
                      {POPULAR_DIAL_CODES.map((code) => (
                        <option key={code} value={code}>
                          {code}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500 text-xs">
                      ▾
                    </span>
                  </div>

                  <input
                    type="tel"
                    className="mc-input flex-1"
                    placeholder="Your mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Enter your full mobile number without spaces. We’ll send the
                  verification code to this number by SMS.
                </p>
              </div>

              {phoneMessage && (
                <div className="text-sm text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-3 py-2 rounded-lg">
                  {phoneMessage}
                </div>
              )}

              <button
                type="submit"
                className="mc-btn mc-btn-primary mt-4"
                disabled={sendingCode}
              >
                {sendingCode ? "Sending…" : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <h1 className="mc-title mb-2">Enter 6-digit verification code</h1>
              <p className="text-slate-400">
                Please enter the 6-digit code we sent to{" "}
                <span className="font-medium text-slate-100">
                  {buildE164()}
                </span>
                .
              </p>
            </div>

            {otpMessage && (
              <div className="text-sm text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-3 py-2 rounded-lg">
                {otpMessage}
              </div>
            )}
            {otpError && (
              <div className="text-sm text-rose-400 bg-rose-950/40 border border-rose-900/40 px-3 py-2 rounded-lg">
                {otpError}
              </div>
            )}

            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  6-digit code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  className="mc-input tracking-[0.5em] text-center"
                  value={otpCode}
                  onChange={(e) =>
                    setOtpCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="••••••"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="mc-btn mc-btn-primary"
                  disabled={verifyingCode}
                >
                  {verifyingCode ? "Verifying…" : "Verify"}
                </button>

                <button
                  type="button"
                  onClick={handleResendCode}
                  className={`mc-btn border border-slate-600/60 bg-slate-900/60 text-slate-400 ${
                    resendTimer > 0 || sendingCode
                      ? "opacity-60 cursor-not-allowed"
                      : "hover:bg-slate-800"
                  }`}
                  disabled={resendTimer > 0 || sendingCode}
                >
                  {resendTimer > 0
                    ? `Resend code in ${resendTimer}s`
                    : "Resend code"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
