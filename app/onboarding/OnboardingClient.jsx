"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "../lib/supabaseBrowser";

const supabase = createBrowserSupabaseClient();

// --- UI helpers -------------------------------------------------------------

function OnboardingCard({ step, totalSteps, title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 px-8 py-10 shadow-xl">
        <div className="mb-8">
          <p className="text-[11px] font-medium tracking-[0.28em] text-slate-500 uppercase">
            Onboarding
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Step {step} of {totalSteps}
          </p>
        </div>

        <h1 className="text-2xl font-semibold text-slate-50">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            {subtitle}
          </p>
        )}

        <div className="mt-8 space-y-6">{children}</div>
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-200">{label}</label>
      <input
        className="w-full h-11 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        {...props}
      />
    </div>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={
        "mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}

// --- Main component ---------------------------------------------------------

export default function OnboardingClient() {
  const router = useRouter();

  const TOTAL_STEPS = 5; // 1: profil, 2: téléphone, 3–5: KYC plus tard
  const [step, setStep] = useState(1);

  // Profile
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd

  // Phone
  const [phone, setPhone] = useState(""); // numéro sans indicatif, ex: 612345678
  const [sendingCode, setSendingCode] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("");
  const [phoneError, setPhoneError] = useState("");

  // Code
  const [code, setCode] = useState("");
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [codeError, setCodeError] = useState("");

  // Global
  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState("");

  // ---------------------------------------------------------------------------
  // 1. Chargement initial (profil + onboarding_state + téléphone si existant)
  // ---------------------------------------------------------------------------

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setGlobalError("");

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error(userError);
        if (!cancelled) {
          router.replace("/login");
        }
        return;
      }

      try {
        // Profil
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, last_name, date_of_birth")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!cancelled && profile) {
          setFirstName(profile.first_name ?? "");
          setLastName(profile.last_name ?? "");
          if (profile.date_of_birth) {
            setDob(profile.date_of_birth);
          }
        }

        // Onboarding_state (pour savoir si on doit sauter le step 1)
        const { data: obState, error: obError } = await supabase
          .from("onboarding_state")
          .select("current_step")
          .eq("user_id", user.id)
          .maybeSingle();

        if (obError) throw obError;

        if (!cancelled && obState?.current_step >= 2) {
          setStep(2);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled) {
          setGlobalError("Unexpected error while loading onboarding.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [router]);

  // ---------------------------------------------------------------------------
  // 2. Handlers
  // ---------------------------------------------------------------------------

  async function handleSaveProfile() {
    setGlobalError("");

    if (!firstName.trim() || !lastName.trim() || !dob) {
      setGlobalError("Please fill in all fields.");
      return;
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setGlobalError("You are not authenticated.");
      return;
    }

    try {
      const { error: upsertError } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        date_of_birth: dob,
      });

      if (upsertError) throw upsertError;

      await supabase.from("onboarding_state").upsert({
        user_id: user.id,
        current_step: 2,
      });

      setStep(2);
    } catch (e) {
      console.error(e);
      setGlobalError("Could not save your profile. Please try again.");
    }
  }

  async function handleSendCode() {
    setPhoneError("");
    setPhoneMessage("");

    const trimmed = phone.replace(/\s+/g, "");
    if (!trimmed) {
      setPhoneError("Please enter your mobile number.");
      return;
    }

    // On garde ton format actuel: tu tapes le numéro français sans +33
    const e164 = "+33" + trimmed.replace(/^0/, ""); // ex: 06.. -> +336..

    setSendingCode(true);
    try {
      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: e164 }),
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        json = null;
      }

      if (!res.ok) {
        throw new Error(json?.error || "Failed to send verification code.");
      }

      setPhoneMessage(`We sent a code to ${e164}.`);
      setStep(3); // on passe à l’écran “Enter 6-digit code”
    } catch (e) {
      console.error(e);
      setPhoneError(
        e instanceof Error ? e.message : "Could not send code. Please try again."
      );
    } finally {
      setSendingCode(false);
    }
  }

  async function handleVerifyCode() {
    setCodeError("");

    const trimmed = code.replace(/\D/g, "");
    if (trimmed.length !== 6) {
      setCodeError("Please enter the 6-digit code.");
      return;
    }

    const e164 = "+33" + phone.replace(/\s+/g, "").replace(/^0/, "");

    setVerifyingCode(true);
    try {
      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: e164, code: trimmed }),
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        json = null;
      }

      if (!res.ok) {
        throw new Error(json?.error || "Verification failed.");
      }

      // On marque le step 3 comme complété dans onboarding_state
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("onboarding_state").upsert({
          user_id: user.id,
          current_step: 3,
        });
      }

      // Pour l’instant, on redirige vers / (plus tard: step 3–5 KYC)
      router.replace("/");
    } catch (e) {
      console.error(e);
      setCodeError(
        e instanceof Error
          ? e.message
          : "Could not verify the code. Please try again."
      );
    } finally {
      setVerifyingCode(false);
    }
  }

  // ---------------------------------------------------------------------------
  // 3. Rendu des steps
  // ---------------------------------------------------------------------------

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading...
      </div>
    );
  }

  if (step === 1) {
    return (
      <OnboardingCard
        step={1}
        totalSteps={TOTAL_STEPS}
        title="Welcome"
        subtitle="Choose how you'd like to be addressed."
      >
        <Input
          label="First name"
          placeholder="Your first name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          label="Last name"
          placeholder="Your last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          label="Date of birth"
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        {globalError && (
          <p className="mt-2 text-xs text-red-400">{globalError}</p>
        )}

        <PrimaryButton onClick={handleSaveProfile}>Continue</PrimaryButton>
      </OnboardingCard>
    );
  }

  if (step === 2) {
    return (
      <OnboardingCard
        step={2}
        totalSteps={TOTAL_STEPS}
        title="Enter your mobile number"
        subtitle="We'll send you a 6-digit verification code to confirm your account."
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200">
            Mobile number
          </label>
          <div className="flex h-11 items-center gap-2">
            <div className="flex h-full items-center rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-200">
              <span className="mr-1">🇫🇷</span>
              <span className="text-slate-300 text-xs">+33</span>
            </div>
            <input
              className="flex-1 h-full rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-sm text-slate-50 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="6 12 34 56 78"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <p className="text-xs text-slate-500">
            You can enter your French number without the leading 0. We’ll send
            the code to +33… using SMS.
          </p>
        </div>

        {phoneError && (
          <p className="mt-2 text-xs text-red-400">{phoneError}</p>
        )}
        {phoneMessage && (
          <p className="mt-2 text-xs text-emerald-400">{phoneMessage}</p>
        )}

        <PrimaryButton onClick={handleSendCode} disabled={sendingCode}>
          {sendingCode ? "Sending..." : "Send OTP"}
        </PrimaryButton>
      </OnboardingCard>
    );
  }

  // step === 3 -> écran de code
  return (
    <OnboardingCard
      step={3}
      totalSteps={TOTAL_STEPS}
      title="Enter 6-digit verification code"
      subtitle="Please enter the 6-digit code we sent to your mobile number."
    >
      <div className="space-y-3">
        <label className="text-sm font-medium text-slate-200">
          Verification code
        </label>
        <input
          className="w-full h-11 rounded-xl border border-slate-700 bg-slate-900/60 px-3 text-center text-lg tracking-[0.6em] text-slate-50 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="······"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
        />
        <p className="text-xs text-slate-500">
          Didn’t receive the code? Wait a few seconds and check your SMS, or try
          sending it again.
        </p>
      </div>

      {codeError && <p className="mt-2 text-xs text-red-400">{codeError}</p>}

      <PrimaryButton onClick={handleVerifyCode} disabled={verifyingCode}>
        {verifyingCode ? "Verifying..." : "Verify"}
      </PrimaryButton>

      <button
        type="button"
        className="mt-4 w-full text-center text-xs text-slate-400 hover:text-slate-300"
        onClick={() => {
          setCode("");
          setStep(2);
        }}
      >
        ← Change phone number
      </button>
    </OnboardingCard>
  );
}
