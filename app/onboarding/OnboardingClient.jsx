"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function OnboardingClient() {
  const router = useRouter();

  // --- état global ---
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [step, setStep] = useState(1); // 1 = profil, 2 = téléphone

  const [userId, setUserId] = useState(null);

  // --- Step 1 : profil ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // YYYY-MM-DD

  // --- Step 2 : téléphone + OTP ---
  const [phoneInput, setPhoneInput] = useState(""); // ex: "6 12 34 56 78"
  const [sendingCode, setSendingCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  // Au chargement : vérifier la session + pré-remplir si profil existe
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
        // Pas connecté → retour à la page de login
        router.replace("/login");
        return;
      }

      const uid = session.user.id;
      setUserId(uid);

      // Récupérer le profil existant
      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("first_name, last_name, date_of_birth")
        .eq("id", uid)
        .maybeSingle();

      if (profErr && profErr.code !== "PGRST116") {
        console.error(profErr);
        setError(profErr.message || "Unable to load profile.");
        setLoading(false);
        return;
      }

      if (profile) {
        setFirstName(profile.first_name || "");
        setLastName(profile.last_name || "");
        setDob(profile.date_of_birth || "");
      }

      // Récupérer l'état d'onboarding pour savoir à quelle étape on en est
      const { data: obState, error: obErr } = await supabase
        .from("onboarding_state")
        .select("current_step, phone_e164")
        .eq("user_id", uid)
        .maybeSingle();

      if (!obErr && obState) {
        if (obState.current_step >= 2) {
          setStep(2);
          if (obState.phone_e164) {
            // on remet le numéro dans l'input en format FR simple
            const cleaned = obState.phone_e164.replace("+33", "0");
            setPhoneInput(cleaned);
          }
        }
      }

      setLoading(false);
    })();
  }, [router]);

  // -----------------------
  // UTIL : construire le numéro E.164 à partir de l'input FR
  // -----------------------
  function buildE164FromFrench(phoneRaw) {
    let digits = (phoneRaw || "").replace(/\D/g, "");
    if (!digits) return null;

    // Si commence par 0, on le retire (0X → +33X)
    if (digits.startsWith("0")) {
      digits = digits.slice(1);
    }

    return "+33" + digits;
  }

  // -----------------------
  // STEP 1 : submit profil
  // -----------------------
  async function handleSubmitProfile(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!firstName.trim() || !lastName.trim() || !dob) {
        setError("Please fill in all fields.");
        setSaving(false);
        return;
      }

      // 1) Upsert dans profiles
      const { error: upsertErr } = await supabase.from("profiles").upsert(
        {
          id: userId,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          date_of_birth: dob,
        },
        { onConflict: "id" }
      );

      if (upsertErr) throw upsertErr;

      // 2) Mettre à jour l'état d'onboarding (step 1 terminé → current_step = 2)
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

      setOk("Profile saved successfully.");
      setStep(2); // aller à l'étape téléphone
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong, please try again.");
    } finally {
      setSaving(false);
    }
  }

  // -----------------------
  // STEP 2 : envoyer le code SMS
  // -----------------------
  async function handleSendCode(e) {
    e.preventDefault();
    if (sendingCode || !userId) return;

    setError("");
    setOk("");
    setSendingCode(true);

    try {
      const e164 = buildE164FromFrench(phoneInput);
      if (!e164) {
        setError("Please enter a valid French mobile number.");
        setSendingCode(false);
        return;
      }

      // Appel à notre API /api/phone/send-code
      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: e164 }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Unable to send verification code.");
      }

      // Sauvegarder le numéro en DB (optionnel mais pratique)
      const { error: phoneErr } = await supabase
        .from("onboarding_state")
        .upsert(
          {
            user_id: userId,
            current_step: 2,
            completed: false,
            phone_e164: e164,
          },
          { onConflict: "user_id" }
        );
      if (phoneErr) throw phoneErr;

      setCodeSent(true);
      setOk("Verification code sent by SMS.");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to send SMS, please try again.");
    } finally {
      setSendingCode(false);
    }
  }

  // -----------------------
  // STEP 2 : vérifier le code OTP
  // -----------------------
  async function handleVerifyCode(e) {
    e.preventDefault();
    if (verifyingCode || !userId) return;

    const code = otpDigits.join("");
    if (code.length !== 6) {
      setError("Please enter the 6-digit code.");
      return;
    }

    setError("");
    setOk("");
    setVerifyingCode(true);

    try {
      const e164 = buildE164FromFrench(phoneInput);
      if (!e164) {
        setError("Phone number is missing or invalid.");
        setVerifyingCode(false);
        return;
      }

      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: e164, code }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok || data?.status !== "approved") {
        throw new Error(data?.error || "Invalid code, please try again.");
      }

      // Code validé → marquer l'onboarding comme complété (ou step 3, à toi de voir)
      const { error: onboardingErr } = await supabase
        .from("onboarding_state")
        .upsert(
          {
            user_id: userId,
            current_step: 3,
            completed: true,
          },
          { onConflict: "user_id" }
        );

      if (onboardingErr) throw onboardingErr;

      setOk("Phone number verified successfully.");
      // Ici tu peux rediriger vers le dashboard par exemple :
      // router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Verification failed, please try again.");
    } finally {
      setVerifyingCode(false);
    }
  }

  // Gestion des 6 inputs OTP
  function handleOtpChange(index, value) {
    const digit = value.replace(/\D/g, "").slice(0, 1);
    const next = [...otpDigits];
    next[index] = digit;
    setOtpDigits(next);

    if (digit && index < 5 && otpRefs.current[index + 1]) {
      otpRefs.current[index + 1].focus();
    }
  }

  function handleOtpKeyDown(index, e) {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      e.preventDefault();
      if (otpRefs.current[index - 1]) {
        otpRefs.current[index - 1].focus();
      }
    }
  }

  // -----------------------
  // RENDU
  // -----------------------
  if (loading) {
    return (
      <div className="mc-card">
        <div className="mc-section text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">
            ONBOARDING
          </p>
          <p className="text-slate-400">Loading your profile…</p>
        </div>
      </div>
    );
  }

  const isStep1 = step === 1;
  const isStep2 = step === 2;

  return (
    <div className="mc-card">
      <div className="mc-section text-left">
        {/* Petit header commun */}
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mb-1">
          ONBOARDING
        </p>
        <p className="text-xs text-slate-500 mb-6">
          {isStep1 ? "Step 1 of 2" : "Step 2 of 2"}
        </p>

        {/* Messages d'erreur / succès */}
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

        {/* STEP 1 : PROFIL */}
        {isStep1 && (
          <>
            <h1 className="mc-title mb-2">Welcome</h1>
            <p className="text-slate-400 mb-8">
              Choose how you’d like to be addressed.
            </p>

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
                disabled={saving}
              >
                {saving ? "Saving…" : "Continue"}
              </button>
            </form>
          </>
        )}

        {/* STEP 2 : TÉLÉPHONE + OTP */}
        {isStep2 && (
          <>
            <h1 className="mc-title mb-2">Enter your mobile number</h1>
            <p className="text-slate-400 mb-8">
              We’ll send you a 6-digit verification code to confirm your
              account.
            </p>

            <form className="space-y-6" onSubmit={handleSendCode}>
              {/* Numéro FR */}
              <div>
                <label className="block mb-2 text-sm text-slate-300">
                  Mobile number
                </label>
                <div className="flex gap-2">
                  <div className="w-20">
                    <div className="mc-input flex items-center justify-center text-sm text-slate-200">
                      <span className="mr-1">🇫🇷</span>
                      <span>+33</span>
                    </div>
                  </div>
                  <input
                    type="tel"
                    className="mc-input flex-1"
                    placeholder="6 12 34 56 78"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    required
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  You can enter your French number with or without the leading
                  0. We’ll send the code to +33… using SMS.
                </p>
              </div>

              <button
                type="submit"
                className="mc-btn mc-btn-primary mt-2 w-full"
                disabled={sendingCode}
              >
                {sendingCode ? "Sending…" : "Send OTP"}
              </button>
            </form>

            {/* Zone OTP uniquement si le code a été envoyé */}
            {codeSent && (
              <form
                onSubmit={handleVerifyCode}
                className="mt-10 space-y-6 border-t border-slate-800 pt-8"
              >
                <p className="text-slate-300">
                  Enter the 6-digit verification code we sent by SMS.
                </p>

                <div className="flex justify-between gap-2 max-w-md">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      className="mc-input w-10 sm:w-12 text-center text-lg tracking-[0.3em]"
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      ref={(el) => (otpRefs.current[idx] = el)}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="mc-btn mc-btn-primary w-full mt-2"
                  disabled={verifyingCode}
                >
                  {verifyingCode ? "Verifying…" : "Verify"}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
