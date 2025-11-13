"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function OnboardingClient() {
  const router = useRouter();

  // Step global: 1 = profil, 2 = téléphone, 3 = OTP
  const [step, setStep] = useState(1);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [userId, setUserId] = useState(null);

  // Profil (step 1)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState(""); // texte "YYYY-MM-DD"

  // Téléphone (step 2)
  const [dialCode, setDialCode] = useState("+33");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [phoneE164, setPhoneE164] = useState(""); // numéro complet pour l’OTP
  const [sendingCode, setSendingCode] = useState(false);

  // OTP (step 3)
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  // Timer pour le bouton "Resend code"
  const [resendTimer, setResendTimer] = useState(0);

  // -- TIMER: décrémente chaque seconde quand > 0
  useEffect(() => {
    if (resendTimer <= 0) return;
    const id = setInterval(() => {
      setResendTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [resendTimer]);

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

      setLoading(false);
    })();
  }, [router]);

  // Soumission du profil (Step 1)
  async function handleProfileSubmit(e) {
    e.preventDefault();
    if (!userId || saving) return;

    setError("");
    setOk("");
    setSaving(true);

    try {
      if (!firstName.trim() || !lastName.trim() || !dob.trim()) {
        setError("Please fill in all fields.");
        setSaving(false);
        return;
      }

      if (!/^\d{4}-\d{2}-\d{2}$/.test(dob.trim())) {
        setError("Please use the format YYYY-MM-DD for your date of birth.");
        setSaving(false);
        return;
      }

      const { error: upsertErr } = await supabase
        .from("profiles")
        .upsert(
          {
            id: userId,
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            date_of_birth: dob.trim(),
          },
          { onConflict: "id" }
        );

      if (upsertErr) throw upsertErr;

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

      // On passe directement à l'étape téléphone
      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong, please try again.");
    } finally {
      setSaving(false);
    }
  }

  // Envoi du code SMS (Step 2)
  async function handleSendCode(e) {
    e.preventDefault();
    if (sendingCode) return;

    setError("");
    setOk("");
    setSendingCode(true);

    try {
      const local = phoneLocal.replace(/\D/g, "");
      if (!local) {
        setError("Please enter your mobile number.");
        setSendingCode(false);
        return;
      }

      const full = `${dialCode}${local}`;
      setPhoneE164(full);

      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: full }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to send verification code.");
      }

      setOk("A verification code has been sent by SMS.");
      setStep(3);
      setResendTimer(60); // 60 secondes avant de pouvoir renvoyer
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while sending the code.");
    } finally {
      setSendingCode(false);
    }
  }

  // Renvoi du code SMS depuis la page OTP
  async function handleResendCode() {
    if (sendingCode || resendTimer > 0) return;

    setError("");
    setOk("");
    setSendingCode(true);

    try {
      const full = phoneE164 || `${dialCode}${phoneLocal.replace(/\D/g, "")}`;
      if (!full) {
        setError("Missing phone number, please go back and try again.");
        setSendingCode(false);
        return;
      }

      const res = await fetch("/api/phone/send-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: full }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Failed to resend verification code.");
      }

      setOk("A new verification code has been sent by SMS.");
      setResendTimer(60);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while resending the code.");
    } finally {
      setSendingCode(false);
    }
  }

  // Vérification du code OTP (Step 3)
  async function handleVerifyCode(e) {
    e.preventDefault();
    if (verifying) return;

    setError("");
    setOk("");
    setVerifying(true);

    try {
      const code = otp.trim();
      if (!/^\d{6}$/.test(code)) {
        setError("Please enter the 6-digit code.");
        setVerifying(false);
        return;
      }

      if (!phoneE164) {
        setError("Missing phone number, please go back and try again.");
        setVerifying(false);
        return;
      }

      const res = await fetch("/api/phone/verify-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: phoneE164, code }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.error || "Invalid or expired code.");
      }

      // On marque l'onboarding comme terminé
      if (userId) {
        await supabase
          .from("onboarding_state")
          .upsert(
            {
              user_id: userId,
              current_step: 3,
              completed: true,
            },
            { onConflict: "user_id" }
          );
      }

      setOk("Your phone number has been verified.");
      // Redirection finale à décider plus tard
      // ex: router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong while verifying the code.");
    } finally {
      setVerifying(false);
    }
  }

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

  // --------------------
  // Step 1 : Profil
  // --------------------
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

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Date of birth
              </label>
              {/* type="text" pour éviter l'icône calendrier */}
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

  // --------------------
  // Step 2 : Téléphone
  // --------------------
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
              <label className="block mb-2 text-sm text-slate-300">
                Mobile number
              </label>

              <div className="flex gap-2">
                {/* Indicatif centré avec flèche custom */}
                <div className="relative w-24">
                  <select
                    className="mc-input w-full pr-7 text-center appearance-none"
                    value={dialCode}
                    onChange={(e) => setDialCode(e.target.value)}
                  >
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+33">+33</option>
                    <option value="+49">+49</option>
                    <option value="+39">+39</option>
                    <option value="+34">+34</option>
                    <option value="+31">+31</option>
                    <option value="+46">+46</option>
                    <option value="+41">+41</option>
                    <option value="+81">+81</option>
                    <option value="+82">+82</option>
                    <option value="+86">+86</option>
                    <option value="+91">+91</option>
                    <option value="+55">+55</option>
                    <option value="+52">+52</option>
                    <option value="+61">+61</option>
                    <option value="+7">+7</option>
                    <option value="+27">+27</option>
                    <option value="+65">+65</option>
                    <option value="+971">+971</option>
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-slate-500 text-xs">
                    ▾
                  </span>
                </div>

                <input
                  type="tel"
                  className="mc-input flex-1"
                  placeholder="Your mobile number"
                  value={phoneLocal}
                  onChange={(e) => setPhoneLocal(e.target.value)}
                  autoComplete="tel"
                  required
                />
              </div>

              <p className="mt-2 text-xs text-slate-500">
                Enter your full mobile number without spaces. We’ll send the
                verification code to this number by SMS.
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

  // --------------------
  // Step 3 : Saisie du code OTP
  // --------------------
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
            <label className="block mb-2 text-sm text-slate-300">
              6-digit code
            </label>
            <input
              type="text"
              className="mc-input tracking-[0.3em] text-center"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              inputMode="numeric"
              autoComplete="one-time-code"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <button
              type="submit"
              className="mc-btn mc-btn-primary"
              disabled={verifying}
            >
              {verifying ? "Verifying…" : "Verify"}
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
      </div>
    </div>
  );
}
