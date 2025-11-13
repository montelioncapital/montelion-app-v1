"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "../lib/supabaseBrowser";

const supabase = createBrowserSupabaseClient();

// --- Composants UI basiques (card, input, bouton) ---------------------------

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

// --- Composant principal ----------------------------------------------------

export default function OnboardingClient() {
  const router = useRouter();

  const TOTAL_STEPS = 5; // on garde 1/5 pour rester cohérent avec ton UI

  const [loading, setLoading] = useState(true);
  const [globalError, setGlobalError] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd

  // Chargement initial: user + profil existant
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
        if (!cancelled) router.replace("/login");
        return;
      }

      try {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("first_name, last_name, date_of_birth")
          .eq("id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!cancelled && profile) {
          setFirstName(profile.first_name ?? "");
          setLastName(profile.last_name ?? "");
          if (profile.date_of_birth) setDob(profile.date_of_birth);
        }
      } catch (e) {
        console.error(e);
        if (!cancelled)
          setGlobalError("Unexpected error while loading your profile.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [router]);

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

      // On peut garder une trace d'onboarding_state si tu veux
      await supabase.from("onboarding_state").upsert({
        user_id: user.id,
        current_step: 1,
      });

      // Pour l’instant, on finit l’onboarding ici
      router.replace("/");
    } catch (e) {
      console.error(e);
      setGlobalError("Could not save your profile. Please try again.");
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-400">
        Loading...
      </div>
    );
  }

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
