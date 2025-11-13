"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "../lib/supabaseBrowser";

const supabase = createBrowserSupabaseClient();

export default function OnboardingClient() {
  const router = useRouter();

  // --- global ---
  const [userId, setUserId] = useState(null);
  const [step, setStep] = useState(1); // 1 = profil, 2 = téléphone
  const [loadingInit, setLoadingInit] = useState(true);
  const [globalError, setGlobalError] = useState(null);

  // --- step 1: profile ---
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);

  // --- step 2: phone ---
  const [countryCode, setCountryCode] = useState("+33");
  const [localPhone, setLocalPhone] = useState(""); // ex: 612345678
  const [fullPhone, setFullPhone] = useState(""); // E.164 +336...
  const [phoneMessage, setPhoneMessage] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const [sendingCode, setSendingCode] = useState(false);
  const [codeScreen, setCodeScreen] = useState(false); // false = enter phone, true = enter code

  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [verifyingCode, setVerifyingCode] = useState(false);

  // --------------------------------------------------
  // Initialisation : récupérer user + profil + onboarding_state
  // --------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const { data: authData, error: authError } =
          await supabase.auth.getUser();

        if (authError || !authData.user) {
          router.push("/login");
          return;
        }

        const uid = authData.user.id;
        if (cancelled) return;

        setUserId(uid);

        // Profil
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name,last_name,date_of_birth")
          .eq("id", uid)
          .maybeSingle();

        if (profileError && profileError.code !== "PGRST116") {
          console.error(profileError);
        } else if (profile) {
          setFirstName(profile.first_name || "");
          setLastName(profile.last_name || "");
          setDob(profile.date_of_birth || "");
        }

        // Onboarding state
        const { data: obState, error: obError } = await supabase
          .from("onboarding_state")
          .select("current_step")
          .eq("user_id", uid)
          .maybeSingle();

        if (obError && obError.code !== "PGRST116") {
          console.error(obError);
        } else if (obState && obState.current_step >= 2) {
          setStep(2);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setGlobalError("Unexpected error while loading onboarding.");
        }
      } finally {
        if (!cancelled) setLoadingInit(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

  // --------------------------------------------------
  // Helpers
  // --------------------------------------------------
  function makeE164Phone(cc, local) {
    const digits = local.replace(/[^\d]/g, "");
    if (!digits) return "";
    if (cc === "+33" && digits.startsWith("0")) {
      return cc + digits.substring(1);
    }
    return cc + digits;
  }

  function codeToString(digits) {
    return digits.join("");
  }

  // --------------------------------------------------
  // Step 1: enregistrer le profil
  // --------------------------------------------------
  async function handleProfileSubmit(e) {
    e.preventDefault();
    if (!userId) return;

    setSavingProfile(true);
    setProfileSaved(false);
    setGlobalError(null);

    try {
      const { error } = await supabase.from("profiles").upsert(
        {
          id: userId,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          date_of_birth: dob || null,
        },
        { onConflict: "id" }
      );

      if (error) throw error;

      await supabase
        .from("onboarding_state")
        .upsert(
          { user_id: userId, current_step: 2, completed: false },
          { onConflict: "user_id" }
        );

      setProfileSaved(true);
      setStep(2);
    } catch (err) {
      console.error(err);
      setGlobalError("Unable to save your profile. Please try again.");
    } finally {
      setSavingProfile(false);
    }
  }

  // --------------------------------------------------
  // Step 2: envoyer le SMS
  // --------------------------------------------------
  async function handleSendCode(e) {
    e.preventDefault();
    setPhoneMessage(null);
    setPhoneError(null);

    const e164 = makeE164Phone(countryCode, localPhone);
    if (!e164.startsWith("+") || e164.length < 8) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    setSendingCode(true);
    try {
      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: e164 }),
      });

      const text = await res.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server.");
      }

      if (!res.ok || !data.ok) {
        const msg =
          (data && (data.error || data.message)) ||
          "Unable to send verification code. Please try again.";
        setPhoneError(msg);
        return;
      }

      setFullPhone(e164);
      setPhoneMessage("A verification code has been sent to your phone.");
      setCodeScreen(true);
    } catch (err) {
      console.error(err);
      setPhoneError("Network error while sending code.");
    } finally {
      setSendingCode(false);
    }
  }

  // --------------------------------------------------
  // Step 2: vérifier le code
  // --------------------------------------------------
  async function handleVerifyCode(e) {
    e.preventDefault();
    setPhoneError(null);

    const code = codeToString(codeDigits);
    if (code.length !== 6) {
      setPhoneError("Please enter the 6-digit code.");
      return;
    }

    setVerifyingCode(true);
    try {
      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone, code }),
      });

      const text = await res.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Invalid response from server.");
      }

      if (!res.ok || !data.ok) {
        const msg =
          (data && (data.error || data.message)) ||
          "The code is invalid or expired. Please try again.";
        setPhoneError(msg);
        return;
      }

      // Onboarding step suivant (pour plus tard)
      if (userId) {
        await supabase
          .from("onboarding_state")
          .upsert(
            { user_id: userId, current_step: 3, completed: false },
            { onConflict: "user_id" }
          );
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setPhoneError("Network error while verifying code.");
    } finally {
      setVerifyingCode(false);
    }
  }

  // --------------------------------------------------
  // Render helpers UI
  // --------------------------------------------------
  const disabledProfile =
    !firstName.trim() || !lastName.trim() || savingProfile || loadingInit;

  const e164Preview = makeE164Phone(countryCode, localPhone);

  function renderCodeInputs() {
    return (
      <div className="flex gap-3 justify-between">
        {codeDigits.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            className="w-12 h-12 rounded-xl border border-slate-700 bg-slate-900/80 text-center text-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={digit}
            onChange={(e) => {
              const v = e.target.value.replace(/[^\d]/g, "").slice(0, 1);
              const next = [...codeDigits];
              next[idx] = v;
              setCodeDigits(next);

              if (v && idx < 5) {
                const nextInput = document.getElementById(
                  `otp-${idx + 1}`
                );
                if (nextInput) {
                  nextInput.focus();
                }
              }
            }}
            id={`otp-${idx}`}
          />
        ))}
      </div>
    );
  }

  // --------------------------------------------------
  // Render global
  // --------------------------------------------------
  if (loadingInit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-300">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl bg-slate-900/80 border border-slate-800 shadow-2xl p-8">
        {/* Badge / Step info */}
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mb-2">
            Onboarding
          </p>
          <p className="text-xs text-slate-500">
            Step {step === 1 ? "1 of 5" : codeScreen ? "2 of 2" : "1 of 2"}
          </p>
        </div>

        {globalError && (
          <div className="mb-4 rounded-xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {globalError}
          </div>
        )}

        {step === 1 ? (
          /* ------------- STEP 1 : PROFILE ------------- */
          <form onSubmit={handleProfileSubmit} className="space-y-6">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1">
                Welcome
              </h1>
              <p className="text-sm text-slate-400">
                Choose how you&apos;d like to be addressed.
              </p>
            </div>

            {profileSaved && (
              <div className="rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
                Profile saved successfully.
              </div>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  First name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Last name
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">
                  Date of birth
                </label>
                <input
                  type="date"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={disabledProfile}
              className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-3 py-2.5 text-sm font-medium text-white shadow hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
            >
              {savingProfile ? "Saving..." : "Continue"}
            </button>
          </form>
        ) : (
          /* ------------- STEP 2 : PHONE (Twilio) ------------- */
          <div className="space-y-6">
            {!codeScreen ? (
              /* ------ screen 1: enter mobile number ------ */
              <form onSubmit={handleSendCode} className="space-y-6">
                <div>
                  <p className="text-xs text-emerald-400 mb-1">Step 1 of 2</p>
                  <h1 className="text-2xl font-semibold text-white mb-1">
                    Enter your mobile number
                  </h1>
                  <p className="text-sm text-slate-400">
                    We&apos;ll send you a 6-digit verification code to confirm
                    your account.
                  </p>
                </div>

                {phoneError && (
                  <div className="rounded-xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {phoneError}
                  </div>
                )}
                {phoneMessage && (
                  <div className="rounded-xl border border-emerald-500/60 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
                    {phoneMessage}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-300">
                    Mobile number
                  </label>
                  <div className="flex gap-2">
                    <select
                      className="w-24 rounded-xl border border-slate-700 bg-slate-900/70 px-2 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                    >
                      <option value="+33">🇫🇷 +33</option>
                      <option value="+41">🇨🇭 +41</option>
                      <option value="+44">🇬🇧 +44</option>
                      <option value="+1">🇺🇸 +1</option>
                    </select>
                    <input
                      type="tel"
                      placeholder="6 12 34 56 78"
                      className="flex-1 rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={localPhone}
                      onChange={(e) => setLocalPhone(e.target.value)}
                    />
                  </div>
                  {e164Preview && (
                    <p className="text-[11px] text-slate-500">
                      We will send the code to{" "}
                      <span className="text-slate-300 font-medium">
                        {e164Preview}
                      </span>
                      .
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={sendingCode || !localPhone}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-3 py-2.5 text-sm font-medium text-slate-950 shadow hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                >
                  {sendingCode ? "Sending..." : "Send OTP"}
                </button>
              </form>
            ) : (
              /* ------ screen 2: enter 6-digit code ------ */
              <form onSubmit={handleVerifyCode} className="space-y-6">
                <div>
                  <p className="text-xs text-emerald-400 mb-1">Step 2 of 2</p>
                  <h1 className="text-2xl font-semibold text-white mb-1">
                    Enter 6-digit verification code
                  </h1>
                  <p className="text-sm text-slate-400">
                    Please enter the 6-digit code we sent to{" "}
                    <span className="font-medium text-slate-200">
                      {fullPhone}
                    </span>
                    .
                  </p>
                </div>

                {phoneError && (
                  <div className="rounded-xl border border-red-500/60 bg-red-500/10 px-3 py-2 text-xs text-red-200">
                    {phoneError}
                  </div>
                )}

                <div className="space-y-3">
                  {renderCodeInputs()}
                  <p className="text-[11px] text-slate-500">
                    Didn&apos;t receive the code? Wait a few seconds and check
                    your SMS or try again.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={verifyingCode}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-3 py-2.5 text-sm font-medium text-slate-950 shadow hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-slate-700"
                >
                  {verifyingCode ? "Verifying..." : "Verify"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setCodeScreen(false);
                    setCodeDigits(["", "", "", "", "", ""]);
                    setPhoneError(null);
                    setPhoneMessage(null);
                  }}
                  className="w-full text-center text-xs text-slate-400 hover:text-slate-200"
                >
                  ← Change phone number
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
