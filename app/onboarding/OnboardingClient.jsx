"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "../lib/supabaseBrowser"; // adapte si chemin différent

const supabase = createBrowserSupabaseClient();

export default function OnboardingPage() {
  const router = useRouter();

  // Step global (1 = profil, 2 = téléphone)
  const [step, setStep] = useState(1);

  // Profil (step 1)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // yyyy-mm-dd
  const [profileSaved, setProfileSaved] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);

  // Phone (step 2)
  const [phone, setPhone] = useState(""); // +336...
  const [code, setCode] = useState("");
  const [phoneStatus, setPhoneStatus] = useState(null); // "pending" | "approved" | "error"
  const [sendingCode, setSendingCode] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState(false);
  const [phoneMessage, setPhoneMessage] = useState("");

  // Session + onboarding_state + profil
  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
        return;
      }

      const userId = session.user.id;

      // Onboarding state
      const { data: onboarding, error: onboardingError } = await supabase
        .from("onboarding_state")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (onboardingError && onboardingError.code === "PGRST116") {
        // aucune ligne => on en crée une
        await supabase.from("onboarding_state").insert({
          user_id: userId,
          current_step: 1,
          completed: false,
        });
        setStep(1);
      } else if (onboarding) {
        setStep(onboarding.current_step || 1);
      }

      // Profil
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profile) {
        if (profile.first_name) setFirstName(profile.first_name);
        if (profile.last_name) setLastName(profile.last_name);
        if (profile.date_of_birth) setDob(profile.date_of_birth);
        if (profile.phone_e164) setPhone(profile.phone_e164);
      }

      setLoadingProfile(false);
    };

    init();
  }, [router]);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileSaved(false);

    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    const userId = session.user.id;

    const { error: upsertError } = await supabase.from("profiles").upsert(
      {
        id: userId,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dob || null,
      },
      { onConflict: "id" }
    );

    if (upsertError) {
      console.error("Error saving profile:", upsertError);
      return;
    }

    // Passe step = 2 en DB
    const { error: onboardingError } = await supabase
      .from("onboarding_state")
      .update({ current_step: 2 })
      .eq("user_id", userId);

    if (onboardingError) {
      console.error("Error updating onboarding step:", onboardingError);
    }

    setProfileSaved(true);
    setStep(2);
  };

  const handleSendCode = async () => {
    setPhoneMessage("");
    setPhoneStatus(null);

    if (!phone || !phone.startsWith("+")) {
      setPhoneMessage("Please enter a valid phone number in international format.");
      return;
    }

    setSendingCode(true);
    try {
      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        console.error("Not JSON:", text);
      }

      if (!res.ok) {
        setPhoneMessage(json?.error || "Failed to send code");
        setPhoneStatus("error");
      } else {
        setPhoneMessage("We sent you a code by SMS.");
        setPhoneStatus("pending");
      }
    } catch (err) {
      console.error(err);
      setPhoneMessage("Server error while sending code.");
      setPhoneStatus("error");
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setPhoneMessage("");
    setPhoneStatus(null);

    if (!phone || !code) {
      setPhoneMessage("Phone and code are required.");
      return;
    }

    setVerifyingCode(true);
    try {
      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code }),
      });

      const text = await res.text();
      let json;
      try {
        json = JSON.parse(text);
      } catch {
        console.error("Not JSON:", text);
      }

      if (!res.ok || !json?.ok) {
        setPhoneMessage(json?.error || "Invalid code.");
        setPhoneStatus("error");
      } else {
        setPhoneMessage("Phone number verified successfully.");
        setPhoneStatus("approved");

        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          router.replace("/login");
          return;
        }
        const userId = session.user.id;

        // Met à jour le profil
        await supabase
          .from("profiles")
          .update({
            phone_e164: phone,
            phone_verified_at: new Date().toISOString(),
          })
          .eq("id", userId);

        // Log dans phone_verifications (optionnel mais clean)
        await supabase.from("phone_verifications").insert({
          user_id: userId,
          phone_e164: phone,
          status: "verified",
        });

        // On passe à l’étape 3 (adresse) – pour l’instant juste stocké
        await supabase
          .from("onboarding_state")
          .update({ current_step: 3 })
          .eq("user_id", userId);

        // TODO: plus tard → router.push("/onboarding/address") ou step 3 UI
      }
    } catch (err) {
      console.error(err);
      setPhoneMessage("Server error while verifying code.");
      setPhoneStatus("error");
    } finally {
      setVerifyingCode(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-slate-200">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 flex items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_600px_at_50%_-200px,#101b4a_0%,#0b1226_35%,#020617_60%,#020617_100%)] opacity-80" />
      <div className="relative z-10 w-full max-w-xl">
        <div className="bg-slate-950/70 border border-slate-800/60 rounded-3xl shadow-xl px-8 py-10">
          {/* HEADER */}
          <div className="mb-8">
            <p className="text-xs font-medium tracking-[0.25em] text-slate-500 uppercase mb-2">
              Onboarding
            </p>
            <h1 className="text-3xl font-semibold text-white mb-2">
              {step === 1 ? "Welcome" : "Verify your phone"}
            </h1>
            <p className="text-sm text-slate-400">
              {step === 1
                ? "Choose how you’d like to be addressed."
                : "Enter your phone number and confirm it with the code you receive."}
            </p>
          </div>

          {/* STEP 1 : PROFIL */}
          {step === 1 && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              {profileSaved && (
                <div className="text-xs rounded-md bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 px-3 py-2">
                  Profile saved successfully.
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm text-slate-300">First name</label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-slate-900/70 border border-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/70"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-300">Last name</label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-slate-900/70 border border-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/70 uppercase"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value.toUpperCase())}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-300">Date of birth</label>
                <input
                  type="date"
                  className="w-full rounded-lg bg-slate-900/70 border border-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/70"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="mt-4 inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-medium text-white px-4 py-2 w-full sm:w-auto"
              >
                Continue
              </button>
            </form>
          )}

          {/* STEP 2 : PHONE */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-6">
              {phoneStatus === "approved" && (
                <div className="text-xs rounded-md bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 px-3 py-2">
                  Phone verified successfully.
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm text-slate-300">Phone number</label>
                <input
                  type="tel"
                  placeholder="+33612345678"
                  className="w-full rounded-lg bg-slate-900/70 border border-slate-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/70"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={sendingCode}
                  className="mt-2 inline-flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors text-xs font-medium text-slate-100 px-3 py-1.5"
                >
                  {sendingCode ? "Sending..." : "Send code"}
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-slate-300">Verification code</label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="6-digit code"
                  className="w-full rounded-lg bg-slate-900/70 border border-slate-800 px-3 py-2 text-sm tracking-[0.4em] text-center focus:outline-none focus:ring-2 focus:ring-blue-500/70 focus:border-blue-500/70"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>

              {phoneMessage && (
                <p
                  className={`text-xs ${
                    phoneStatus === "error"
                      ? "text-rose-400"
                      : phoneStatus === "approved"
                      ? "text-emerald-300"
                      : "text-slate-400"
                  }`}
                >
                  {phoneMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={verifyingCode}
                className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors text-sm font-medium text-white px-4 py-2 w-full sm:w-auto"
              >
                {verifyingCode ? "Verifying..." : "Confirm phone"}
              </button>

              <p className="mt-4 text-xs text-slate-500">
                We use your phone number for secure 2FA. It cannot be disabled.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
