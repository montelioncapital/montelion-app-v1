"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "../lib/supabaseBrowser";

const supabase = createBrowserSupabaseClient();

const TOTAL_STEPS = 5;

export default function OnboardingClient() {
  const router = useRouter();

  // Step global : 1 = profil, 2 = phone, 3 = code
  const [step, setStep] = useState(1);

  // Profil
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd
  const [savingProfile, setSavingProfile] = useState(false);

  // Phone
  const [phoneLocal, setPhoneLocal] = useState(""); // ex: 6 12 34 56 78
  const [sendingCode, setSendingCode] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [phoneInfo, setPhoneInfo] = useState("");

  // Code
  const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [codeError, setCodeError] = useState("");
  const codeInputsRef = useRef([]);

  // Global
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [globalError, setGlobalError] = useState("");

  // ---------------------------------------------------------------------------
  // INITIAL LOAD (profil + onboarding_state)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          router.push("/login");
          return;
        }

        // Profil
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name,last_name,date_of_birth")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) {
          console.error(profileError);
        }

        if (!cancelled && profile) {
          setFirstName(profile.first_name || "");
          setLastName(profile.last_name || "");
          setDob(profile.date_of_birth || "");
        }

        // Onboarding state
        const { data: obState, error: obError } = await supabase
          .from("onboarding_state")
          .select("current_step")
          .eq("id", user.id)
          .maybeSingle();

        if (obError) {
          console.error(obError);
        }

        if (!cancelled) {
          if (obState && obState.current_step >= 3) {
            // Téléphone déjà vérifié → on peut envoyer vers la suite (pour l’instant home)
            router.push("/");
          } else if (obState && obState.current_step >= 2) {
            setStep(2);
          } else {
            setStep(1);
          }
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setGlobalError(
            "Unexpected error while loading your onboarding data. Please retry."
          );
        }
      } finally {
        if (!cancelled) setLoadingInitial(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [router]);

  // ---------------------------------------------------------------------------
  // HELPERS DESIGN / LAYOUT
  // ---------------------------------------------------------------------------
  function CardLayout({ children }) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <div className="w-full max-w-3xl px-4">
          <div className="mx-auto w-full max-w-lg rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl px-8 py-10 sm:px-10 sm:py-12">
            <div className="mb-8">
              <p className="text-[11px] tracking-[0.3em] text-slate-500 uppercase">
                Onboarding
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Step {step} of {TOTAL_STEPS}
              </p>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  }

  function PrimaryButton({ children, className = "", ...props }) {
    return (
      <button
        {...props}
        className={`w-full h-11 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-sm font-medium text-white flex items-center justify-center transition ${className}`}
      >
        {children}
      </button>
    );
  }

  function Input({ label, type = "text", ...props }) {
    return (
      <div className="space-y-2">
        <label className="text-sm text-slate-300">{label}</label>
        <input
          type={type}
          className="w-full h-11 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
          {...props}
        />
      </div>
    );
  }

  // ---------------------------------------------------------------------------
  // STEP 1: PROFILE
  // ---------------------------------------------------------------------------
  async function handleSaveProfile(e) {
    e.preventDefault();
    setGlobalError("");

    if (!firstName.trim() || !lastName.trim() || !dob) {
      setGlobalError("Please fill in all the fields.");
      return;
    }

    setSavingProfile(true);
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        router.push("/login");
        return;
      }

      // Upsert profil
      const { error: upsertError } = await supabase.from("profiles").upsert(
        {
          id: user.id,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          date_of_birth: dob,
        },
        { onConflict: "id" }
      );

      if (upsertError) {
        console.error(upsertError);
        setGlobalError("Could not save your profile. Please retry.");
        return;
      }

      // Mettre à jour onboarding_state (step >= 2)
      await supabase.from("onboarding_state").upsert(
        {
          id: user.id,
          current_step: 2,
        },
        { onConflict: "id" }
      );

      setStep(2);
    } catch (e) {
      console.error(e);
      setGlobalError("Unexpected error while saving your profile.");
    } finally {
      setSavingProfile(false);
    }
  }

  function renderProfileStep() {
    return (
      <CardLayout>
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-semibold text-slate-50">Welcome</h1>
            <p className="mt-2 text-sm text-slate-400">
              Choose how you&apos;d like to be addressed.
            </p>
          </div>

          {globalError && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {globalError}
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <Input
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
            <Input
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
            />
            <Input
              label="Date of birth"
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />

            <PrimaryButton type="submit" disabled={savingProfile}>
              {savingProfile ? "Saving..." : "Continue"}
            </PrimaryButton>
          </form>
        </div>
      </CardLayout>
    );
  }

  // ---------------------------------------------------------------------------
  // STEP 2: PHONE NUMBER
  // ---------------------------------------------------------------------------
  function normalizedPhone() {
    // On force +33 et on garde seulement les chiffres du champ local
    const digits = phoneLocal.replace(/\D/g, "");
    if (!digits) return "";
    return `+33${digits}`;
  }

  async function handleSendCode(e) {
    e.preventDefault();
    setPhoneError("");
    setPhoneInfo("");
    setGlobalError("");

    const e164 = normalizedPhone();
    if (!e164 || e164.length < 8) {
      setPhoneError("Please enter a valid French mobile number.");
      return;
    }

    setSendingCode(true);
    try {
      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: e164 }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("send-code error", data);
        setPhoneError(data.error || "Could not send the code. Please retry.");
        return;
      }

      // Mise à jour onboarding_state step >= 3
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("onboarding_state").upsert(
          {
            id: user.id,
            current_step: 3,
          },
          { onConflict: "id" }
        );
      }

      setPhoneInfo(`We sent the code to ${e164}.`);
      setStep(3);

      // focus premier input code
      setTimeout(() => {
        if (codeInputsRef.current[0]) {
          codeInputsRef.current[0].focus();
        }
      }, 50);
    } catch (e2) {
      console.error(e2);
      setPhoneError("Unexpected error while sending the code.");
    } finally {
      setSendingCode(false);
    }
  }

  function renderPhoneStep() {
    const e164 = normalizedPhone();

    return (
      <CardLayout>
        <div className="space-y-8">
          <div>
            <p className="text-xs text-emerald-400 font-medium mb-1">
              Step 2 of 5
            </p>
            <h1 className="text-2xl font-semibold text-slate-50">
              Enter your mobile number
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              We&apos;ll send you a 6-digit verification code to confirm your
              account.
            </p>
          </div>

          {phoneError && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {phoneError}
            </div>
          )}
          {phoneInfo && (
            <div className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-200">
              {phoneInfo}
            </div>
          )}

          <form onSubmit={handleSendCode} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm text-slate-300">Mobile number</label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 h-11 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-100">
                  <span className="text-lg">🇫🇷</span>
                  <span className="text-slate-300">+33</span>
                </div>
                <input
                  className="flex-1 h-11 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                  placeholder="6 12 34 56 78"
                  value={phoneLocal}
                  onChange={(e) => setPhoneLocal(e.target.value)}
                />
              </div>
              {e164 && (
                <p className="mt-1 text-xs text-slate-500">
                  We will send the code to{" "}
                  <span className="text-slate-200 font-medium">{e164}</span>.
                </p>
              )}
            </div>

            <PrimaryButton type="submit" disabled={sendingCode}>
              {sendingCode ? "Sending..." : "Send OTP"}
            </PrimaryButton>
          </form>
        </div>
      </CardLayout>
    );
  }

  // ---------------------------------------------------------------------------
  // STEP 3: VERIFICATION CODE
  // ---------------------------------------------------------------------------
  function handleDigitChange(index, value) {
    if (!/^\d?$/.test(value)) return;
    const updated = [...codeDigits];
    updated[index] = value;
    setCodeDigits(updated);

    if (value && index < codeDigits.length - 1) {
      const next = codeInputsRef.current[index + 1];
      if (next) next.focus();
    }
  }

  function handleDigitKeyDown(index, event) {
    if (event.key === "Backspace" && !codeDigits[index] && index > 0) {
      const prev = codeInputsRef.current[index - 1];
      if (prev) prev.focus();
    }
  }

  async function handleVerifyCode(e) {
    e.preventDefault();
    setCodeError("");
    setGlobalError("");

    const code = codeDigits.join("");
    if (code.length !== 6) {
      setCodeError("Please enter the 6-digit code.");
      return;
    }

    setVerifyingCode(true);
    try {
      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error("verify-code error", data);
        setCodeError(data.error || "The code is invalid or expired.");
        return;
      }

      // Mise à jour onboarding_state step >= 5
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("onboarding_state").upsert(
          {
            id: user.id,
            current_step: 5,
          },
          { onConflict: "id" }
        );
      }

      router.push("/");
    } catch (e2) {
      console.error(e2);
      setCodeError("Unexpected error while verifying the code.");
    } finally {
      setVerifyingCode(false);
    }
  }

  function renderCodeStep() {
    return (
      <CardLayout>
        <div className="space-y-8">
          <div>
            <p className="text-xs text-emerald-400 font-medium mb-1">
              Step 3 of 5
            </p>
            <h1 className="text-2xl font-semibold text-slate-50">
              Enter 6-digit verification code
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Please enter the 6-digit code we sent to your phone number.
            </p>
          </div>

          {codeError && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
              {codeError}
            </div>
          )}

          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div className="flex justify-between gap-2">
              {codeDigits.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (codeInputsRef.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl border border-slate-700 bg-slate-900/60 text-center text-lg text-slate-100 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40"
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  onKeyDown={(e) => handleDigitKeyDown(idx, e)}
                />
              ))}
            </div>

            <div className="text-xs text-slate-500 space-y-1">
              <p>
                Didn&apos;t receive the code? Wait a few seconds and check your
                SMS or try again.
              </p>
            </div>

            <PrimaryButton type="submit" disabled={verifyingCode}>
              {verifyingCode ? "Verifying..." : "Verify"}
            </PrimaryButton>

            <button
              type="button"
              onClick={() => setStep(2)}
              className="mx-auto block text-xs text-slate-400 hover:text-slate-200 mt-2"
            >
              ← Change phone number
            </button>
          </form>
        </div>
      </CardLayout>
    );
  }

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------
  if (loadingInitial) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center">
        <p className="text-sm text-slate-400">Loading onboarding...</p>
      </div>
    );
  }

  if (step === 1) return renderProfileStep();
  if (step === 2) return renderPhoneStep();
  return renderCodeStep();
}
